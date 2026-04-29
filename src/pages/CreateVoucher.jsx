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
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar/>
      <div className="max-w-5xl mx-auto p-6 mt-6 bg-white shadow-md rounded-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Voucher Entry</h2>

        {/* Top Fields */}
        <div className="flex gap-4 mb-8">
          <div className="flex flex-col gap-1 w-1/3">
            <label className="text-sm font-semibold text-gray-600 ml-1">Voucher Type</label>
            <select
              className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Payment</option>
              <option>Received</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-2/3">
            <label className="text-sm font-semibold text-gray-600 ml-1">Account Name</label>
            <input
              className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={account}
              placeholder="Enter account name..."
              onFocus={() => setAccount("")}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">Account</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 font-semibold text-gray-700">TDS</th>
                <th className="px-4 py-3 font-semibold text-gray-700">TDS Type</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
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
        </div>

        {/* ➕ Add Row */}
        <button
          onClick={addRow}
          className="inline-flex items-center gap-2 text-blue-600 font-medium px-4 py-2 mt-4 hover:bg-blue-50 rounded-lg transition-colors border border-dashed border-blue-300"
        >
          <span className="text-xl">+</span> Add Row
        </button>

        {/* TOTALS */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg flex justify-end gap-10 border border-gray-100">
          <div className="flex flex-col items-end">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Total Debit</span>
            <span className="text-lg font-mono font-bold text-gray-800">₹{totalDebit.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-end border-l pl-10">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Total Credit</span>
            <span className="text-lg font-mono font-bold text-gray-800">₹{totalCredit.toLocaleString()}</span>
          </div>
        </div>

        {/* SAVE */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 active:transform active:scale-95 text-white font-bold px-8 py-3 rounded-lg shadow-lg shadow-green-200 transition-all"
          >
            Save Voucher
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateVoucher;