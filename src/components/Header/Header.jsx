import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Popover,
  Toolbar,
  Tooltip,
  MenuItem,
  Typography,
  Menu,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { AccountCircle } from "@mui/icons-material";
import { SigninAndSignup, SpanHeader } from "./stylesHeader";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { logout } from "../../Redux/slices/authSlice";

import Swal from "sweetalert2";
function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props) {
  const pages = [
    { id: "showing", label: "Lịch chiếu" },
    { id: "cinema", label: "Cụm rạp" },
    { id: "tintuc", label: "Tin tức" },
    { id: "ungdung", label: "Ứng dụng" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleLogout = () => {
    closePopover();
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Do you want to logout right now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: " I need logout",
        cancelButtonText: " Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Logout!",
            text: "Your account has logout.",
            icon: "success",
          });
          dispatch(logout());
          setAnchorEl(null);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your account still in login :)",
            icon: "error",
          });
        }
      });
  };

  const handleProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: " me-2 btn btn-success",
      cancelButton: "me-2 btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    const element = document.getElementById(`${page.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log(`Không tìm thấy phần tử với id ${page.id}`);
    }
  };

  return (
    <>
      <CssBaseline />

      <AppBar color="default" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LiveTvIcon
              sx={{ display: { xs: "none", md: "flex" }, mb: 1.5, mr: 1, color: "#1976D2" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#1976D2",
                textDecoration: "none",
              }}
            >
              Trung & Mẫn MOVIE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => [
                  <MenuItem key={page.id} onClick={() => handleCloseNavMenu(page.id)}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>,
                ])}
                {currentUser
                  ? [
                      <MenuItem key="profile" onClick={handleProfile}>
                        <Typography>Trang cá nhân</Typography>
                      </MenuItem>,
                      <MenuItem key="admin" onClick={() => navigate(`/admin`)}>
                        <Typography>Is Admin</Typography>
                      </MenuItem>,
                      <MenuItem key="logout" onClick={handleLogout}>
                        <Typography>Đăng xuất</Typography>
                      </MenuItem>,
                    ]
                  : [
                      <MenuItem key="signin" onClick={() => navigate(`/sign-in`)}>
                        <Typography>Đăng nhập</Typography>
                      </MenuItem>,
                      <MenuItem key="signup" onClick={() => navigate(`/sign-up`)}>
                        <Typography>Đăng kí</Typography>
                      </MenuItem>,
                    ]}
              </Menu>
            </Box>
            <LiveTvIcon
              sx={{ display: { xs: "flex", md: "none" }, mb: 1.5, mr: 1, color: "#1976D2" }}
            />
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#1976D2",
                textDecoration: "none",
              }}
            >
              Movie
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
              justifyContent="center"
            >
              {pages.map((page) => (
                <Button
                  key={page.id}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    margin: "0 10px",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <>
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {currentUser ? (
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt={currentUser.name}
                      src={currentUser.avatar}
                      sx={{ mr: 1, cursor: "pointer" }}
                      onClick={openPopover}
                    />
                    <Popover
                      open={isPopoverOpen}
                      anchorEl={anchorEl}
                      onClose={closePopover}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Box sx={{ p: 2 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          Xin chào, {currentUser.hoTen}!
                        </Typography>
                        <Button onClick={handleProfile} sx={{ mb: 1 }}>
                          Trang cá nhân
                        </Button>
                        <Button onClick={() => navigate(`/admin`)} sx={{ mb: 1 }}>
                          Is Admin
                        </Button>
                        <Button onClick={handleLogout} sx={{ mb: 1 }}>
                          Đăng xuất
                        </Button>
                      </Box>
                    </Popover>
                  </Box>
                ) : (
                  <>
                    {/* Signin */}
                    <Box sx={{ flexGrow: 0 }}>
                      <SigninAndSignup
                        onClick={() => navigate(`/sign-in`)}
                        borderRight="1px solid #9e9e9e"
                      >
                        <Tooltip title="Đăng nhập">
                          <AccountCircle fontSize="large" />
                        </Tooltip>
                        <SpanHeader>Đăng nhập</SpanHeader>
                      </SigninAndSignup>
                    </Box>

                    {/* Signup */}
                    <Box sx={{ flexGrow: 0 }}>
                      <SigninAndSignup onClick={() => navigate(`/sign-up`)}>
                        <Tooltip title="Đăng kí">
                          <AccountCircle fontSize="large" />
                        </Tooltip>
                        <SpanHeader>Đăng kí</SpanHeader>
                      </SigninAndSignup>
                    </Box>
                  </>
                )}
              </Box>
            </>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
