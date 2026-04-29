import { useVoucher } from "../context/VoucherContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { vouchers, deleteVoucher } = useVoucher();
  const { user, logout } = useAuth();

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2">
          Create
        </Link>

        <button onClick={logout} className="bg-red-500 text-white px-4 py-2">
          Logout
        </button>
      </div>

      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Narration</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vouchers.map((v) => (
            <tr key={v.id} className="text-center">
              <td>{v.date}</td>
              <td>{v.type}</td>
              <td>{v.narration}</td>
              <td>{v.total}</td>

              <td>
                {user.role === "admin" && (
                  <>
                    <Link
                      to={`/edit/${v.id}`}
                      className="text-blue-500 mr-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteVoucher(v.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </>
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