import { Bounce, Flip, Slide, Zoom, toast } from 'react-toastify';

const successToast = (message) =>{
  toast.success(message, {
    position:"top-center",
    autoClose: 4000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
  });
}
const errorToast = (message) =>{
  toast.error(message, {
    position:"top-center",
    autoClose: 4000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    transition:Zoom,
  });
}
const cartToast = (message) =>{
  toast.info(message, {
    position:"top-center",
    autoClose: 4000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    transition:Flip,
  });
}
const warningToast = (message) =>{
  toast.warning(message, {
    position:"top-left",
    autoClose: 4000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    transition:Slide,
  });
}

export { successToast, errorToast, cartToast, warningToast };