import React, { useEffect } from 'react';
import Dashboard from '../dashboard/Dashboard';
// import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function DashboardLayout () {
  const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Chuyển hướng nếu chưa đăng nhập
        }
    }, [navigate]);
  return (
    <>
    <Dashboard />
    <main>
      {/* <Outlet /> */}
    </main>
  
  </>
  );
}

export default DashboardLayout ;