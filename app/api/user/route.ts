import mongoose from "mongoose";
import { User } from "@/app/models/User";
import { NextRequest } from "next/server";
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
      email: user.email
    } 
  
    return new Response(JSON.stringify(resUser))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  mongoose.connect(process.env.MONGO_URL as string)

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if('name' in data ){
      await User.updateOne({email}, {name: data.name})
      // console.log('first: ', {email, data})
  }



  return new Response(JSON.stringify('ok'))
}