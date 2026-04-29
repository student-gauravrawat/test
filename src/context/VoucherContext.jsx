import { createContext, useContext, useState } from "react";

const VoucherContext = createContext();

export const useVoucher = () => useContext(VoucherContext);

export const VoucherProvider = ({ children }) => {
  const [vouchers, setVouchers] = useState([]);

  const addVoucher = (voucher) => {
    setVouchers([...vouchers, { ...voucher, id: Date.now() }]);
  };

  const deleteVoucher = (id) => {
    setVouchers(vouchers.filter((v) => v.id !== id));
  };

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