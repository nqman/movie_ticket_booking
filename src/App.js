import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./modules/detail/pages/Detail.jsx";
import Signup from "./modules/auth/page/Signup/Signup.jsx";
import Signin from "./modules/auth/page/Signin/Signin";
import PrivateRoute from "./routers/PrivateRoute.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import AdminRoute from "./admin/adminRoutes/AdminRoute.jsx";
import CreateMovie from "./admin/AddMovie/CreateMovie.jsx";
import AdminLayout from "./admin/AdminLayout/AdminLayout.jsx";
import Home from "./modules/Home/pages/Home.jsx";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import AdminUser from "./admin/AdminUser/AdminUser.jsx";
import AdminShowtime from "./admin/AdminShowtime/AdminShowtime.jsx";
import User from "./user/components/user/User.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Phàn người dùng */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/details/:movieId" element={<Detail />} />
            <Route
              path="/tickets/:ticketId"
              element={
                <PrivateRoute>
                  <h1>Tickets</h1>
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/profile" element={<User />} />
          {/* TRANG ĐĂNG KÝ */}
          <Route path="/sign-up" element={<Signup />} />
          {/* TRANG ĐĂNG NHẬP */}
          <Route path="/sign-in" element={<Signin />} />
          {/* Phàn quản tri */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="movies/create" element={<CreateMovie />} />
            <Route path="users/create" element={<AdminUser />} />
            <Route path="showing/create" element={<AdminShowtime />} />
          </Route>
          {/* protectedadmin */}
          {/* TRANG NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
