import { useVoucher } from "../context/VoucherContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useId } from "react";
import Navbar from "../component/Navbar";

const Dashboard = () => {
  const { vouchers, deleteVoucher } = useVoucher();
  const { user, logout } = useAuth();
  const id = useId()

  return (
   <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mt-8 mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Dashboard
          </h1>
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-100 rounded-full shadow-sm">
            {user.role}
          </span>
        </header>

        <div className="overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4 border-b">ID</th>
                <th className="px-6 py-4 border-b">Date</th>
                <th className="px-6 py-4 border-b">Type</th>
                <th className="px-6 py-4 border-b">Account number</th>
                <th className="px-6 py-4 border-b">Total Amount</th>
                <th className="px-6 py-4 border-b text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                  <td className="px-6 py-4 font-mono text-gray-500 text-xs">{id}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{v.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 font-medium">
                      {v.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{v.account}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${v.totalDebit || v.totalCredit}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {user.role === "admin" ? (
                      <div className="flex justify-center gap-4">
                        <Link
                          to={`/edit/${v.id}`}
                          className="text-indigo-600 hover:text-indigo-900 font-semibold transition-colors"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteVoucher(v.id)}
                          className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs italic bg-gray-50 px-2 py-1 rounded border border-dashed">
                        No access (Admin only)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {vouchers.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              No vouchers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;