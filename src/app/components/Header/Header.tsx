"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useStore";

export default function Header() {
  const { isDarkMode } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch({ type: "ACTIVE_DARK_MODE" });
  };

  return (
    
        <AppBar position="sticky" elevation={4} color="primary">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => {
                 if (typeof window !== 'undefined') {
                window.location.href = "/"
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

      
  );
}


