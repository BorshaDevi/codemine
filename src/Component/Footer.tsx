import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const  Footer=()=>{
    return(
        <>
        <div className="w-full container bg-white mt-15 h-18 p-2 ml-8 flex justify-center items-center flex-col">
            <div className="flex justify-center items-center gap-4 mt-2">
            <p className="text-center text-black">All Rights Reserved @CodeMine &copy; 2025</p>
            </div>
            <div className="flex justify-center items-center gap-4 mt-2">
            <FacebookIcon className='bg-blue-800'></FacebookIcon>
            <LinkedInIcon className='bg-blue-800'></LinkedInIcon>
            </div>
        </div>
        </>
    )
}
export default Footer;