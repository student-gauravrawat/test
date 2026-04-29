import { createContext, useContext, useState } from "react";

const VoucherContext = createContext();

// creating custom hook so that we can access and reuse context easily by which we do need to repeat this useContext line and every component can access voucher data eaisly 
export const useVoucher = () => useContext(VoucherContext);

// here i am creating wrapper component so any component which is inside the VoucherProvider that can access voucher data 
export const VoucherProvider = ({ children }) => {
  const [vouchers, setVouchers] = useState([]);

  // This function adds new voucher
  const addVoucher = (voucher) => {
    setVouchers([...vouchers, { ...voucher, id: Date.now() }]);
  };

  // This function removes selected voucher
  const deleteVoucher = (id) => {
    setVouchers(vouchers.filter((v) => v.id !== id)); // return all voucher that id is not matchable 
  };

  // This function updates voucher
  const updateVoucher = (updated) => {
    setVouchers(
      vouchers.map((v) => (v.id === updated.id ? updated : v))
    );
  };

  return (
    <VoucherContext.Provider
      value={{ vouchers, addVoucher, deleteVoucher, updateVoucher }}
    >
      {children}
    </VoucherContext.Provider>
  );
};