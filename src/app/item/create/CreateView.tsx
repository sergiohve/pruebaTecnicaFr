"use client";

import ProductForm from '@/app/components/forms/ProductForm';
import { useAppDispatch } from '@/app/hooks/useStore';
import { CreateViewProps, ProductFormData } from '@/app/types';
import React from 'react';


const CreateView: React.FC<CreateViewProps> = ({ navigate }) => {
    const dispatch = useAppDispatch();

    const handleCreate = (productData: ProductFormData) => {
        dispatch({ type: 'ADD_PRODUCT', payload: productData }); 
        navigate('/');
    };

    return <ProductForm onSubmit={handleCreate} navigate={navigate} isEditing={false} />;
};

export default CreateView;