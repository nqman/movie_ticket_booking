import React from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { AccountCircle } from "@mui/icons-material";
import { SigninAndSignup, SpanHeader } from "./stylesHeader";
export default function Header(props) {
  const pages = [
    { id: "showing", label: "Lịch chiếu" },
    { id: "cinema", label: "Cụm rạp" },
    { id: "tintuc", label: "Tin tức" },
    { id: "ungdung", label: "Ứng dụng" },
  ];

  return (
    <>
      <CssBaseline />

      <AppBar color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LiveTvIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} color="error" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
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
              // noWrap
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
              <Box sx={{ flexGrow: 0 }}>
                <>Bạn có phải là Admin?</>
              </Box>

              {/* Signin */}
              <Box sx={{ flexGrow: 0 }}>
                <SigninAndSignup borderRight="1px solid #9e9e9e">
                  <Tooltip title="Đăng nhập">
                    <AccountCircle fontSize="large" />
                  </Tooltip>
                  <SpanHeader>Đăng nhập</SpanHeader>
                </SigninAndSignup>
              </Box>

              {/* Signup */}
              <Box sx={{ flexGrow: 0 }}>
                <SigninAndSignup>
                  <Tooltip title="Đăng kí">
                    <AccountCircle fontSize="large" />
                  </Tooltip>
                  <SpanHeader>Đăng kí</SpanHeader>
                </SigninAndSignup>
              </Box>
            </>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
