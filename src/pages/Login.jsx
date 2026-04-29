import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(form.username, form.password);
    if (success) navigate("/dashboard");
    else alert("Invalid credentials");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-xl mb-4 text-center">Login</h2>

        <input
          placeholder="Username"
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2 w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;