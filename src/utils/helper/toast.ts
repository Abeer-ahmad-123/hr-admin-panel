import { toast } from 'react-toastify';

const showErrorAlert = (title) => {
  toast.error(title, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
};

const showSuccessAlert = (title) => {
  toast.success(title, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
};
export { showErrorAlert, showSuccessAlert };
