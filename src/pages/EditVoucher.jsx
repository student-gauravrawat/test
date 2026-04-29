import { useParams, useNavigate } from "react-router-dom";
import { useVoucher } from "../context/VoucherContext";
import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";

const EditVoucher = () => {
  const { id } = useParams();
  const { vouchers, updateVoucher } = useVoucher();
  const navigate = useNavigate();

  const [voucher, setVoucher] = useState(null);

  useEffect(() => {
    const v = vouchers.find((v) => v.id === Number(id));
    setVoucher(v);
  }, [id, vouchers]);

  if (!voucher) return <p>Loading...</p>;

  const handleSubmit = () => {
    updateVoucher(voucher);
    navigate("/dashboard");
  };
  console.log(vouchers)

  return (
    <div className="p-4">
    <Navbar/>
      <h2 className="mt-5 font-bold">Edit Voucher</h2>

      <label>Update Account Number:</label>
      <input
        value={voucher.account}
        onChange={(e) =>
          setVoucher({ ...voucher, account: e.target.value })
        }
        className="border p-2 ml-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 mt-2 ml-2"
      >
        Update
      </button>
    </div>
  );
};

export default EditVoucher;