'use client'
import ImageGrid from "@/Component/ImageGrid";
import UploadImage from "@/Component/UploadImage";


export default function Home() {
  return (
    <div className=" text-center h-screen  items-center justify-center">
      <h1 className="text-3xl font-bold">Upload Image</h1>
      <div>
      <UploadImage ></UploadImage>
      <ImageGrid></ImageGrid>
      </div>
    </div>
  );
}
