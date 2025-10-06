"use client";

import React from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks/useStore";
import { createAppTheme } from "./utils/theme";
import { ReduxProvider } from "./store/StoreContext";
import Header from "./components/Header/Header";

interface RootLayoutProps {
  children: React.ReactNode;
}

function LayoutUI({ children }: RootLayoutProps) {
  const { isDarkMode } = useAppSelector((state) => state);
  const muiTheme = createAppTheme(isDarkMode);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        <Header />
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
