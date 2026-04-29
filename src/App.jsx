import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateVoucher from "./pages/CreateVoucher";
import EditVoucher from "./pages/EditVoucher";
import ProtectedRoute from "./router/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { VoucherProvider } from "./context/VoucherContext";

function App() {
  return (
    <AuthProvider>
      <VoucherProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateVoucher />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditVoucher />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </VoucherProvider>
    </AuthProvider>
  );
}

export default App;