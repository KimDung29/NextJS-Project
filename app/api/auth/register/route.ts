import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';
import bcrypt from 'bcrypt'

const secretKey = process.env.SECRET_KEY as string;
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const CreateUserSchema = z.object({
    name: z.string().min(1, "Please add your name."),
    email: z.string().email("Please add a valid email address."),
    avatar: z.object({
        data: z.string().optional(), // Adjust validation for avatar field
        contentType: z.string().optional(),
    }).optional(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirm_password: z.string(),
}).refine(data => data.confirm_password === data.password, {
    message: "Passwords do not match.",
    path: ['confirm_password']
});

// Function to create a user 
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        mongoose.connect(process.env.MONGO_URL as string);

        // Validate form data
        const validatedFields = CreateUserSchema.safeParse(body);

        // Handle validation errors
        if (!validatedFields.success) {
            return new Response(JSON.stringify({
                errors: validatedFields.error.flatten().fieldErrors ,
                message: 'Failed to Create User!',
            }), {status: 400})
        }

        // Extract validated data
        const { name, email, password, avatar } = validatedFields.data;

        // Check if email already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return new Response(JSON.stringify({
                errors: { email: ['The email is existed!'] },
                message: 'Failed to Create User!',
            }), { status: 404 });
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(password, salt);
    
            // Insert user into MongoDB
            await User.create({
                name,
                email,
                password: hashPass,
                avatar, // Include the avatar in the user creation
                createdAt: new Date().toISOString(),
            });
    
            // Return success message
            return new Response(JSON.stringify({
                message: 'User created successfully.',
            }), { status: 200 });
        }

    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({
            message: 'Error creating user',
        }), { status: 500 });
    } 
};
