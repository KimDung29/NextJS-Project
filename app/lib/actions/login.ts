'use server'
import z from 'zod';
import { State, User } from '../type-definitions';
import { closeConnectdb, connectUserTable } from '../connect-db';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

// Load environment variables from .env file
dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

const FormUserSchema = z.object({
    email: z.string().email("Please add a valid email address."),
    password: z.string().min(6, "Password must be at least 8 characters long."),
});

// // Function to login
export const login = async (state: State, formData: FormData) => {
    const AWEEK = 7 * 24 * 60 * 60 * 1000;
    try {
        // Connect to MongoDB
        const collection = await connectUserTable();

        // Validate form data
        const validatedFields = FormUserSchema.safeParse({
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
        const user = await collection.findOne({ email: email });
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
            userId: user._id,
            userName: user.username,
            userEmail: user.email,
        };

        // Create accessToken
        const accessToken = jwt.sign(
            accessTokenPayload, 
            secretKey,  
            { expiresIn: '1d' }
        );

        cookies().set({
            name: 'accessToken',
            value: accessToken, 
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + AWEEK)
        })

        return {
            message: 'Login successful',
            success: true,
        };
    } catch (error) {
        console.error('Error login:', error);
        return {
            message: 'Failed to login.',
        };
    } 
};

export const logout = async (state: State, ) => {
    try {
        cookies().set({
            name: 'accessToken',
            value: '', 
            httpOnly: true,
            path: '/',
            expires: new Date(0),
          })

          return {
            message: 'Logout successful',
            success: true,
        };
    }catch (error) {
        console.error('Error login:', error);
        return {
            message: 'Failed to login.',
        };

    } finally {
        // Close the MongoDB connection
        await closeConnectdb();
    }
}