import axios from "axios";
const UploadImage=()=>{
    const handleUploadImage=async(e:React.ChangeEvent<HTMLInputElement>): Promise<void>=>{
                 const formData=new FormData();
                    const file=e.target?.files?.[0];
                    if(!file){
                        return console.log('Please select a file');
                    }
                 formData.append('file',file);
                 const response=await axios.post('/api/upload',formData)
                    console.log(response.data);
    }
    return(
        <>
        <div>
            <button   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <label>
                Upload Image
                <input type="file" name='file' onChange={handleUploadImage} className="hidden"></input>
                </label>
                </button>
        </div>
        </>
    )
}
export default UploadImage;