import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from "stream";



cloudinary.config ({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,

})
export async function  POST (req:NextRequest){
          const formData=await req.formData() as FormData;
          const file=formData.get('file') as File;
          if(!file){
            return NextResponse.json({error:'Please select a file'},{status:400});
          }
         const bufferArray=await file.arrayBuffer() as ArrayBuffer;
         const buffer=Buffer.from(bufferArray);
         const stream= Readable.from(buffer) ;
          try{
            const upload= await new Promise((resolve, reject)=>{
              const uploadFile=cloudinary.uploader.upload_stream({folder:'gallery'} ,(error , result )=>{
                if(error || !result){
                  return reject(error , 'Error uploading file ');
                }else{
                  console.log(result);
                  resolve({url:result.secure_url});
                }
          })
          stream.pipe(uploadFile)
            });
            const { secure_url}=upload as {secure_url:string};
            return NextResponse.json({url : secure_url},{status:200});

          }
          catch (error){
            console.log(error);
            return NextResponse.json({status:500});
          }
}