'use server';
import z from 'zod';

import { State } from '../type-definitions';
import bcrypt from 'bcrypt';
import {closeConnectdb, connectdb } from '../connect-db';


const FormUserSchema = z.object({
    username: z.string().nonempty("Please add your name."),
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
        const database = await connectdb();
        const collection = database.collection('users'); 

        console.log('Connected to Mongodb');

        // Validate form data
        const validatedFields = FormUserSchema.safeParse({
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
        const existingUser = await collection.findOne({ email: email });
        if (existingUser) {
            return {
                errors: { email: ['Email already exists.'] },
                message: 'Failed to create user',
            };
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
 
        // Insert user into MongoDB
        const result = await collection.insertOne({
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





