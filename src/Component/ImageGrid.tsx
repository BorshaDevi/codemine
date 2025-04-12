import { useEffect, useState } from "react";
import { CldImage } from 'next-cloudinary';
import Swal from "sweetalert2";
import ModalImage from "./ModalImage";


const ImageGrid= () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalImage, setModalImage] = useState(null);
    const[open, setOpen]=useState(false);
    const[close, setClose]=useState(false);

    useEffect(()=>{
        const images=JSON.parse(localStorage.getItem('image') || '[]');
        if(images){
            setImages(images);
            setLoading(false);
        }
        console.log(images,'images')
    },[])


    //handle modal
    const handleModal=(url)=>{
        console.log(url,'url')
             setModalImage(url)
                setOpen(true);
    }

    //handle close modal
    const handleClose=()=>{
        setOpen(false);
        setClose(true);
        
    }

    //delete image
    const handleDelete=async(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete Image!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                const image=JSON.parse(localStorage.getItem('image') || '[]');
                const deleteImage=image.filter(img => img.asset_id !== id);
                localStorage.setItem('image',JSON.stringify(deleteImage));
                if(deleteImage){
                    setImages(deleteImage);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Delete Your image successfully .",
                        icon: "success"
                      });
                      
                }
            }
          });
        
        
    }

    return(
        <>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-4 mt-4">
            {loading ? <p className="text-xl text-green-700 flex justify-center items-center">Loading...</p> : <>
            {images.map(image => <div key={image.public_id} className="flex justify-center items-center flex-col border-2 border-gray-300 rounded-lg p-4 bg-white">
                <CldImage
            src={image.secure_url}
            width="400"
            height="300"
            sizes="100vw"
            loading="lazy"
            quality="auto"
            alt={image.public_id}
            className="object-contain aspect-[4/3] hover:cursor-pointer"
            onClick={()=>handleModal(image.secure_url)}
            ></CldImage>
             <button onClick={()=>handleDelete(image.asset_id)} className="mt-5 bg-red-700 p-2 font-extrabold rounded-md">Delete</button>
            </div>)}
            </>}
        </div>
            {<ModalImage url={modalImage} open={open} close={handleClose}></ModalImage>}
        </>
    )
}
export default ImageGrid;