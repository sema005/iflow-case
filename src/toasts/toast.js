import { toast } from 'react-toastify';

export const sucessToast = () =>
  toast.success("Timer registrert", {
    position: "bottom-center",
  });
export const errorToast = () =>
  toast.warn("Husk å fylle inn", {
    position: "bottom-center",
  });
export const deletedToast = () =>
  toast.success("Slettet", {
    position: "bottom-center",
  });
export const editToast = () =>
  toast.success("Endret", {
    position: "bottom-center",
  });
  
export const alertHoursToast = () => {
    toast.info("Nå begynner det å bli en del timer",{
        position: "bottom-center",
    })
}