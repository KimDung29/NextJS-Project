import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email;
  
    mongoose.connect(process.env.MONGO_URL as string)
  
    const user = await User.findOne({email});
    if(!user) return new Response(JSON.stringify('User not found'));
  
    const resUser = {
      id: user._id,
      name: user.name,
      email: user.email
    } 
  
    return new Response(JSON.stringify(resUser))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}