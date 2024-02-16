import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./modules/auth/page/Signup/Signup.jsx";
import Signin from "./modules/auth/page/Signin/Signin";
import PrivateRoute from "./routers/PrivateRoute.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import AdminRoute from "./pages/admin/adminRoutes/AdminRoute.jsx";
import Home from "./modules/Home/pages/Home.jsx";
import Details from "./modules/detail/pages/Details.jsx";
import Tickets from "./modules/Tickets/pages/Tickets.jsx";
import CreateMovie from "./pages/admin/MovieAdmin/AddMovie/CreateMovie.jsx";
import AdminLayout from "./pages/admin/MovieAdmin/AdminLayout/AdminLayout.jsx";
import AdminShowtime from "./pages/admin/MovieAdmin/AdminShowtime/AdminShowtime.jsx";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import MovieList from "./pages/admin/MovieAdmin/MovieList/MovieList.jsx";
import EditMovie from "./pages/admin/MovieAdmin/EditMovie/EditMovie.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Phàn người dùng */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {/* TRANG DETAIL  */}
            <Route path="movies/:movieId" element={<Details />} />

            <Route
              path="/tickets/:ticketId"
              element={
                <PrivateRoute>
                  <Tickets />
                </PrivateRoute>
              }
            />
          </Route>
          {/* <Route path="/user" element={<User />} /> */}
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
            <Route path="showing/:movieId" element={<AdminShowtime />} />
            <Route path="movieList" element={<MovieList />} />
            <Route path="editMovie/:movieId" element={<EditMovie />} />

            {/* <Route path="users/create" element={<AdminUser />} /> */}
          </Route>

          {/* TRANG NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
