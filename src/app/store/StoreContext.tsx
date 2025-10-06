"use client";
import React, { createContext, useReducer, ReactNode } from 'react';
import { State, Action, Product } from '../types';

interface StoreContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
    { id: 1, name: "Guantes de Seguridad", installation: "Pañol Finning 001", stock: 920 },
    { id: 2, name: "Destornillador cruz 10", installation: "Bodegeros", stock: 2 },
    { id: 3, name: "Martillo de Bola 2.5kg", installation: "Sierra Gorda 001", stock: 356 },
    { id: 4, name: "Taladro percutor 30mm", installation: "Laboratorio de pruebas", stock: 9 },
    { id: 5, name: "Llave neumática 1-2\"", installation: "Autoatención Minera", stock: 56 },
    { id: 6, name: "Tornillos cabeza plana M8", installation: "Bodega Central", stock: 800 },
    { id: 7, name: "Casco Minero V3", installation: "Frente de Mina", stock: 750 },
    { id: 8, name: "Cuerda de Rescate 100m", installation: "Bodega Emergencia", stock: 15 },
];

export const INITIAL_STATE: State = {
    products: INITIAL_PRODUCTS,
    isDarkMode: false,
};

export const inventoryReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const newId = state.products.length > 0 ? Math.max(...state.products.map(p => p.id)) + 1 : 1;
            return {
                ...state,
                products: [...state.products, { ...action.payload, id: newId }],
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(p =>
                    p.id === action.payload.id ? action.payload : p
                ),
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(p => p.id !== action.payload),
            };
        case 'ACTIVE_DARK_MODE':
            return { 
                ...state, 
                isDarkMode: !state.isDarkMode 
            };
        default:
            return state;
    }
};

interface ReduxProviderProps {
    children: ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(inventoryReducer, INITIAL_STATE);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContext;