'use server';
import z from 'zod';
import bcrypt from 'bcrypt';
import { closeConnectdb, connectdb, connectUserTable } from '../connect-db';
import { State, User } from '../type-definitions';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

const CreateUserSchema = z.object({
    username: z.string().min(1, "Please add your name."),
    email: z.string().email("Please add a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirm_password: z.string(),
}).refine(data => data.confirm_password === data.password, {
    message: "Passwords do not match.",
    path: ['confirm_password']
})



// Function to create a user 
export const createUser = async (state: State, formData: FormData) => {
    try {
        // Connect to MongoDB
        const db = await connectUserTable();

        // Validate form data
        const validatedFields = CreateUserSchema.safeParse({
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
        });

        // Handle validation errors
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Failed to Create User.',
            };
        }

        // Extract validated data
        const { username, email, password } = validatedFields.data;

        // Check if email already exists
        const existingUser = await db.findOne({ email: email });
        if (existingUser) {
            return {
                errors: { email: ['Email already exists.'] },
                message: 'Failed to create user',
            };
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        // Insert user into MongoDB
        await db.insertOne({
            username,
            email,
            password: hashPass,
            createdAt: new Date().toISOString(),
        });

        // Return success message
        return {
            message: 'User created successfully.',
            success: true,
        };

    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        return {
            message: 'Failed to create user.'
        };
    } finally {
        // Close the MongoDB connection
        await closeConnectdb();
    }
};


const LoginUserSchema = z.object({
    email: z.string().email("Please add a valid email address."),
    password: z.string().min(6, "Password must be at least 8 characters long."),
});

// // Function to login
export const login = async (state: State, formData: FormData) => {
    const AWEEK = 7 * 24 * 60 * 60 * 1000;
    try {
        // Connect to MongoDB
        const db = await connectUserTable();

        // Validate form data
        const validatedFields = LoginUserSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        // Handle validation errors
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Failed to Login',
            };
        }

        // Extract validated data
        const { email, password } = validatedFields.data;

        // Check if email already exists
        const user = await db.findOne({ email: email });
        if (!user) {
            return {
                errors: { email: ['The account does not exist.'] },
                message: 'Failed to login',
            };
        }

        // Compare the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return {
                errors: { password: ['Incorrect password.'] },
                message: 'Failed to login',
            };
        }

        // Create payload for accessToken
        const accessTokenPayload = {
            userName: user.username,
            email: user.email,
        };

        // Create accessToken
        const accessToken = jwt.sign(
            accessTokenPayload,
            secretKey,
            { expiresIn: '1d' }
        );
        // Create accessToken
        const refreshToken = jwt.sign(
            accessTokenPayload,
            secretKey,
        );

        cookies().set({
            name: 'refreshToken',
            value: refreshToken,
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + AWEEK)
        })

        return {
            message: 'Login successful',
            success: true,
            accessToken: accessToken,
        };
    } catch (error) {
        console.error('Error login:', error);
        return {
            message: 'Failed to login.',
        };
    }
};

export const logout = async (state: State) => {
    try {
        const cookieStore = cookies();
        const existingRefreshToken = cookieStore.get('refreshToken');

        if (existingRefreshToken) {
            cookies().set({
                name: 'refreshToken',
                value: '',
                httpOnly: true,
                path: '/',
                expires: new Date(0),
            });
        }

        return {
            message: 'Logout successful',
            success: true,
        };
    } catch (error) {
        console.error('Error logging out:', error);
        return {
            message: 'Failed to logout.',
        };
    } finally {
        // Close the MongoDB connection
        await closeConnectdb();
    }
};




