import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<div>Landing Page</div>} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/signup" element={<div>Signup Page</div>} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/brain/:id" element={<div>Brain Page</div>} />
            <Route path="/share/:id" element={<div>Shared Brain</div>} />
        </Routes>
    )
}