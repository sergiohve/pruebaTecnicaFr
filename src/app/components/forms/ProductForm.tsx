import React, { useState } from 'react';
import {
    Container,
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { ProductFormData, ProductFormProps } from '../../types';


const ProductForm: React.FC<ProductFormProps> = ({
    initialData = {} as Partial<ProductFormData & { id: number }>,
    onSubmit,
    isEditing,
    navigate
}) => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: initialData.name || '',
        installation: initialData.installation || '',
        stock: initialData.stock !== undefined ? initialData.stock : 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'stock' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        onSubmit(formData);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" alignItems="center" mb={3}>
                    <IconButton 
                        onClick={() => navigate('/')} 
                        color="primary" 
                        sx={{ mr: 1 }} 
                        aria-label="Volver"
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
                        {isEditing ? 'Modificar Artículo' : 'Crear Nuevo Artículo'}
                    </Typography>
                </Box>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Instalación"
                        name="installation"
                        value={formData.installation}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        inputProps={{ min: 0 }}
                    />

                    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            sx={{ borderRadius: 2 }}
                        >
                            {isEditing ? 'Guardar Cambios' : 'Crear Artículo'}
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="inherit" 
                            size="large"
                            onClick={() => navigate('/')}
                            sx={{ borderRadius: 2 }}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProductForm;