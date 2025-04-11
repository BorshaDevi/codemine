import { Box, Modal } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
const ModalImage=({url,open ,close})=>{
    
    return(
     <>
     <Modal
        open={open}
         onClose={close}
        aria-labelledby="parent-modal-title"
       aria-describedby="parent-modal-description"
  >
    
    <Box sx={{ ...style, width: 400 }}>
    <h1 className="text-green-500  font-bold text-2xl">Image</h1>
    <img src={url} className="w-[500] h-[500]"></img>
  </Box>
  
     </Modal>
     </>
    )
}
export default ModalImage;