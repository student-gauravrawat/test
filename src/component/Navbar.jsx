import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-blue-600 text-white p-4 ">
      <h1 className="text-lg font-bold">Voucher App</h1>

      <div className="flex items-center gap-4">
        <span className="bg-white text-blue-600 px-2 py-1 rounded">
          {user?.role?.toUpperCase()}
        </span>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create">Create</Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;