import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const email = await req.json();
  
    mongoose.connect(process.env.MONGO_URL as string)
  
    const user = await User.findOne({email});
    if(!user) return new Response(JSON.stringify('User not found'));
  
    const resUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    } 
  
    return new Response(JSON.stringify(resUser))
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
  
    mongoose.connect(process.env.MONGO_URL as string)
  
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
  
    let updateData: any = {};
  
    if ('name' in data) {
      updateData.name = data.name;
    }
    
    if ('avatar' in data) {
      updateData.avatar = data.avatar;
    }
    
    await User.updateOne({ email }, updateData);
  
    return NextResponse.json('ok')
    
  } catch (error) {
    return NextResponse.json(error)
  }
}