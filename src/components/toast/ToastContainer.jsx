import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContainerEl = () => {
  return (
    <ToastContainer position="top-right" autoClose={4000} theme="colored" />
  );
};
