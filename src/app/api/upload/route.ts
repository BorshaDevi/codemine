import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from "stream";

type CloudinaryResponse = {
  secure_url: string;
  public_id: string;
  asset_id: string;
};
cloudinary.config ({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,

})
export async function  POST (req:NextRequest) {
          const formData=await req.formData() as FormData;
          const file=formData.get('file') as File;
          if(!file){
            return NextResponse.json({error:'Please select a file'},{status:400});
          }
         const bufferArray=await file.arrayBuffer() as ArrayBuffer;
         const buffer=Buffer.from(bufferArray);
         const stream= Readable.from(buffer) ;
          try{
            const upload=await new Promise((resolve , reject)=>{
              const uploadFile=cloudinary.uploader.upload_stream({folder:'gallery'} ,(error , result )=>{
                if(error || !result){
                  return reject ('Error uploading file ')
                }else{
                  console.log(result , 'uploaded image url'); 
                   resolve (result);
                }
          })
          stream.pipe(uploadFile);
            })
              
          
          const {secure_url , public_id , asset_id}=upload as CloudinaryResponse;
            return NextResponse.json({
              secure_url , public_id , asset_id
            });

          }
          catch (error){
            console.log(error);
            return NextResponse.json({status:500});
          }
}