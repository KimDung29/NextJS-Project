
import z from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User } from '@/app/models/User';
import dotenv from 'dotenv'
dotenv.config();

const LoginUserSchema = z.object({
    email: z.string().email("Please add a valid email address."),
    password: z.string().min(6, "Password must be at least 8 characters long."),
});

// const now = new Date();
// const tokenExpiresDate = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); 
// const refreshExpiresDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); 

// // Function to login
export async function POST(req: NextRequest,) {
    try {
        const body = await req.json();

        mongoose.connect(process.env.MONGO_URL as string);

        // Validate form data
        const validatedFields = LoginUserSchema.safeParse(body);

        // Handle validation errors
        if (!validatedFields.success) {
            return NextResponse.json({
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Failed to login',
            }, { status: 400 });
        }

        // Extract validated data
        const { email, password } = validatedFields.data;

        // Check if email already exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({
                errors: { email: ['The account does not exist.'] },
                message: 'Failed to login',
            }, { status: 404 });
        }

        // Compare the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({
                errors: { password: ['Incorrect password.'] },
                message: 'Failed to login',
            }, {status: 405});
        }

        // // Create payload for accessToken
        // const accessTokenPayload = {
        //     name: user.name,
        //     email: user.email,
        // };
        // // Create accessToken
        // const accessToken = jwt.sign(
        //     accessTokenPayload,
        //     secretKey,
        //     { expiresIn: Math.floor(tokenExpiresDate.getTime()) }
        // );

        // const refreshToken = jwt.sign(
        //     accessTokenPayload,
        //     secretKey
        // );
        
        // cookies().set({
        //     name: 'refreshToken',
        //     value: refreshToken,
        //     httpOnly: true,
        //     path: '/',
        //     expires: refreshExpiresDate 
        // });

        return new Response(JSON.stringify({
            message: 'Login successful',
            // token: accessToken,
            user: {
                name: user.name,
                email: user.email,
                id: user._id.toString(),
                avatar: user.avatar,
            }
        }), { status: 200 });
    } catch (error) {
        console.error('Error login:', error);
        return NextResponse.json({
            message: 'Failed to login.',
        }, { status: 500 });
    }
};