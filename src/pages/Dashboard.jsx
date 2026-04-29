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
    <div className="p-4">
    <Navbar/>
     

      <h1 className="text-lg font-bold capitalize mt-5">{user.role}</h1>
      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Type</th>
            <th>Account number</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vouchers.map((v) => (
            <tr key={v.id} className="text-center">
              <td>{id}</td>
              <td>{v.date}</td>
              <td>{v.type}</td>
              <td>{v.narration}</td>
              <td>{v.total}</td>

            <td>
  {user.role === "admin" ? (
    <>
      <Link
        to={`/edit/${v.id}`}
        className="text-blue-500 mr-2 font-medium hover:underline"
      >
        Edit
      </Link>

      <button
        onClick={() => deleteVoucher(v.id)}
        className="text-red-500 ml-2 font-medium hover:underline"
      >
        Delete
      </button>
    </>
  ) : (
    <span className="text-gray-400 text-xs italic">
      No access (Admin only)
    </span>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;