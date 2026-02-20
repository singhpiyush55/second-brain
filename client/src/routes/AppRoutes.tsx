import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import BrainPage from "../pages/BrainPage";
import SharedBrain from "../pages/SharedBrain";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/share/:id" element={<SharedBrain/>} />

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/brain/:id" element={<BrainPage />} />
                </Route>
            </Route>
        </Routes>
    )
}