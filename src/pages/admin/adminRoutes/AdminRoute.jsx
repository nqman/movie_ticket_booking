import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminRoute({ children }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();
  console.log(location);

  if (!currentUser) {
    // User chưa đăng nhập => Điều hướng về trang đăng nhập
    const url = `/sign-in?from=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  if (currentUser.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="*" />;
  }
  return children || <Outlet />;
}
