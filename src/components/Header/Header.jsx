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
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { AccountCircle } from "@mui/icons-material";
import { SigninAndSignup, SpanHeader } from "./stylesHeader";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { logout } from "../../modules/auth/slices/authSlice";
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

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
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

  return (
    <>
      <CssBaseline />

      <AppBar color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LiveTvIcon sx={{ display: { xs: "none", md: "flex" }, mb: 1 }} color="error" />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#d32f2f",
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
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <LiveTvIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} color="error" />
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
                color: "#d32f2f",
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
                        <Button onClick={handleLogout} sx={{ mb: 1 }}>
                          Đăng xuất
                        </Button>
                      </Box>
                    </Popover>
                  </Box>
                ) : (
                  <>
                    {/* admin */}
                    <Box sx={{ flexGrow: 0 }}>
                      <IconButton
                        sx={{
                          "&:hover": {
                            color: "rgb(211, 47, 47)",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <Typography onClick={() => navigate(`/admin`)}>
                          Bạn có phải là Admin?
                        </Typography>
                      </IconButton>
                    </Box>

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
