import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/Home/pages/Home.jsx";
import Detail from "./modules/detail/pages/Detail.jsx";
import Signin from "./modules/auth/page/Signin.jsx";
import Signup from "./modules/auth/page/Signup.jsx";
import PrivateRoute from "./routers/PrivateRoute.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
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
          {/* TRANG ĐĂNG KÝ */}
          <Route path="/sign-up" element={<Signup />} />
          {/* TRANG ĐĂNG NHẬP */}
          <Route path="/sign-in" element={<Signin />} />

          {/* TRANG NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
