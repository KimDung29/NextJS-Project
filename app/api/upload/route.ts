import { UploadImage } from "@/app/lib/upload/upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const formData =  await req.formData();
        // upload the file
       const image = formData.get('file') as unknown as File;
    
       const data:any = await UploadImage(image, "NextJSProject")
    
       const url = data && data?.secure_url;
    
       return NextResponse.json({msg: url}, {status: 200});
      
   } catch (error) {
      return NextResponse.json(error)
    }

}
