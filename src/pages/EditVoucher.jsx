import { useParams, useNavigate } from "react-router-dom";
import { useVoucher } from "../context/VoucherContext";
import { useState, useEffect } from "react";

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

  return (
    <div className="p-4">
      <h2>Edit Voucher</h2>

      <input
        value={voucher.narration}
        onChange={(e) =>
          setVoucher({ ...voucher, narration: e.target.value })
        }
        className="border p-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 mt-2"
      >
        Update
      </button>
    </div>
  );
};

export default EditVoucher;