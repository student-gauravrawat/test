import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  // when it reurns true i show dashboard page  
  const handleLogin = () => {
    const success = login(form.username, form.password);
    if (success) navigate("/dashboard");
    else alert("Invalid credentials");
  };

  return (
 <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="p-10 bg-white shadow-2xl rounded-3xl w-96 border border-white/50 backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-slate-800 tracking-tight">
          Welcome Back
        </h2>

        <input
          placeholder="Username"
          className="border border-slate-200 bg-slate-50/50 p-3 mb-4 w-full rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 placeholder:text-slate-400"
          onChange={(e) => setForm({ ...form, username: e.target.value })} //[cite: 2]
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-slate-200 bg-slate-50/50 p-3 mb-6 w-full rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 placeholder:text-slate-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })} //[cite: 2]
        />

        <button
          onClick={handleLogin} //[cite: 2]
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 w-full rounded-xl shadow-lg shadow-blue-200 active:scale-[0.97] transition-all duration-200"
        >
          Login
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          Secure authentication for your account.
        </p>
      </div>
    </div>
  );
};

export default Login;