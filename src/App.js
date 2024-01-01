import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/Home/pages/Home.jsx";
import Detail from "./modules/detail/pages/Detail.jsx";
import Signin from "./modules/auth/page/Signin.jsx";
import Signup from "./modules/auth/page/Signup.jsx";
import PrivateRoute from "./routers/PrivateRoute.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import AdminRoute from "./routers/AdminRoute.jsx";
import CreateMovie from "./admin/AddMovie/CreateMovie.jsx";
import AdminLayout from "./admin/AdminLayout/AdminLayout.jsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

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
            {/* TRANG ĐĂNG KÝ */}
            <Route path="/sign-up" element={<Signup />} />
            {/* TRANG ĐĂNG NHẬP */}
            <Route path="/sign-in" element={<Signin />} />
          </Route>
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
