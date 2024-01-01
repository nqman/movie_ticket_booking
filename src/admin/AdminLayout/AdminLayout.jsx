import React from "react";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <h1>AdminLayout</h1>
      <Outlet />
    </div>
  );
}
