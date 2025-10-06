"use client";

import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "./hooks/useStore";
import { createAppTheme } from "./utils/theme";
import { ReduxProvider } from "./store/StoreContext";

interface RootLayoutProps {
  children: React.ReactNode;
}

function LayoutUI({ children }: RootLayoutProps) {
  const { isDarkMode } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const muiTheme = createAppTheme(isDarkMode);

  const toggleTheme = () => {
    dispatch({ type: "ACTIVE_DARK_MODE" });
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        <AppBar position="sticky" elevation={4} color="primary">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/";
                }
              }}
            >
              Inventario Alliot
            </Typography>

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label="alternar modo oscuro"
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <main>{children}</main>
      </Box>
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <ReduxProvider>
          <LayoutUI>{children}</LayoutUI>
        </ReduxProvider>
      </body>
    </html>
  );
}
