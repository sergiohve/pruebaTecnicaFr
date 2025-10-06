"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { InventoryTableProps } from "../../types";

const InventoryTable: React.FC<InventoryTableProps> = ({
  navigate,
  showConfirm,
}) => {
  const { products } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatStock = (stock: number) => {
    if (!isClient) {
      return stock.toString();
    }

    try {
      return new Intl.NumberFormat().format(stock);
    } catch (error) {
      return stock.toString();
    }
  };

  const handleDelete = (id: number, name: string) => {
    const message = `¿Estás seguro de que quieres eliminar el artículo: ${name}?`;

    if (showConfirm) {
      showConfirm(message, () => {
        dispatch({ type: "DELETE_PRODUCT", payload: id });
      });
    } else {
      if (typeof window !== "undefined") {
        if (window.confirm(message)) {
          dispatch({ type: "DELETE_PRODUCT", payload: id });
        }
      }
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", mb: { xs: 2, sm: 0 } }}
        >
          Inventario de Artículos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate("/item/create")}
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Nuevo Artículo
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Instalación</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Stock
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.installation}</TableCell>
                  <TableCell align="right">{formatStock(item.stock)}</TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/item/${item.id}`)}
                      aria-label="modificar/detalle"
                      title="Modificar/Detalle"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id, item.name)}
                      aria-label="eliminar"
                      title="Eliminar"
                      sx={{ ml: 1 }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No hay artículos en el inventario.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />
      </Paper>
    </Container>
  );
};

export default InventoryTable;
