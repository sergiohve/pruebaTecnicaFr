"use client";

import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { ArrowBack, Delete } from '@mui/icons-material';
import { DetailEditViewProps, ProductFormData } from '@/app/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks/useStore';
import ProductForm from '@/app/components/forms/ProductForm';


const DetailEditView: React.FC<DetailEditViewProps> = ({ id, navigate, showConfirm }) => {
    const products = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    
    const productId = parseInt(id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h4" color="error" gutterBottom>Error 404</Typography>
                    <Typography variant="h6">Artículo con ID: {id} no encontrado.</Typography>
                    <Button 
                        variant="contained" 
                        sx={{ mt: 3, borderRadius: 2 }} 
                        startIcon={<ArrowBack />} 
                        onClick={() => navigate('/')}
                    >
                        Volver al Inventario
                    </Button>
                </Paper>
            </Container>
        );
    }

    const handleUpdate = (updatedData: ProductFormData) => {
        const productUpdate = { id: product.id, ...updatedData };
        dispatch({ type: 'UPDATE_PRODUCT', payload: productUpdate });
       
        navigate('/');
    };

    const handleDelete = () => {
        const message = `¿Estás seguro de que quieres eliminar el artículo: ${product.name}?`;
        showConfirm(message, () => {
            dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
            navigate('/');
        });
    };

    return (
        <Box>
            <ProductForm 
                initialData={product} 
                onSubmit={handleUpdate} 
                isEditing={true}
                navigate={navigate}
            />
            <Container maxWidth="sm" sx={{ mt: 2 }}>
                <Button 
                    fullWidth
                    variant="contained" 
                    color="error" 
                    size="large"
                    startIcon={<Delete />}
                    onClick={handleDelete}
                    sx={{ borderRadius: 2 }}
                >
                    Eliminar Artículo
                </Button>
            </Container>
        </Box>
    );
};

export default DetailEditView;