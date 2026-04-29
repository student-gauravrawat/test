import { useState } from "react";
import { useVoucher } from "../context/VoucherContext";
import { useNavigate } from "react-router-dom";
import VoucherRow from "../component/VoucherRow";
import Navbar from "../component/Navbar";

const CreateVoucher = () => {
  const { addVoucher } = useVoucher();
  const navigate = useNavigate();

  const [type, setType] = useState("Payment");
  const [account, setAccount] = useState("On Account");

  const [rows, setRows] = useState([
    {
      account: "",
      amount: "",
      tds: "No",
      tdsType: "",
    },
  ]);

  // function for Adding Row
  const addRow = () => {
    setRows([
      ...rows,
      { account: "", amount: "", tds: "No", tdsType: "" },
    ]);
  };

  // function for Deleting Row and i am filtering by index number
  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // it adds all amount and returns total
  const total = rows.reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const totalDebit = type === "Payment" ? total : 0;
  const totalCredit = type === "Received" ? total : 0;

  // function Submit
  const handleSubmit = () => {
    addVoucher({
      type,
      account,
      rows,
      totalDebit,
      totalCredit,
      date: new Date().toLocaleDateString(),
    });

    navigate("/dashboard");
  };

  return (
    <div className="p-4">
    <Navbar/>
      <h2 className="text-xl mb-4 mt-4">Voucher Entry</h2>

      {/* Top Fields */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Payment</option>
          <option>Received</option>
        </select>

        <input
          className="border p-2"
          value={account}
          onFocus={() => setAccount("")}
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Account</th>
            <th>Amount</th>
            <th>TDS</th>
            <th>TDS Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <VoucherRow
              key={index}
              row={row}
              index={index}
              rows={rows}
              setRows={setRows}
              onDelete={deleteRow}
            />
          ))}
        </tbody>
      </table>

      {/* ➕ Add Row */}
      <button
        onClick={addRow}
        className="bg-blue-500 text-white px-3 py-1 mt-2"
      >
        + Add Row
      </button>

      {/* TOTALS */}
      <div className="mt-4 flex gap-6">
        <div>Total DR: {totalDebit}</div>
        <div>Total CR: {totalCredit}</div>
      </div>

      {/* SAVE */}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Save
      </button>
    </div>
  );
};

export default CreateVoucher;