import { AlertColor } from "@mui/material";

export interface Product {
  id: number;
  name: string;
  installation: string;
  stock: number;
}
export interface State {
  products: Product[];
  isDarkMode: boolean;
}

export type Action =
  | { type: "ADD_PRODUCT"; payload: Omit<Product, "id"> }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "ACTIVE_DARK_MODE" };

export type Dispatch = React.Dispatch<Action>;

export interface StoreContextType {
  state: State;
  dispatch: Dispatch;
}

export type ProductFormData = {
  name: string;
  installation: string;
  stock: number;
};

export interface ScreenProps {
  navigate: (path: string) => void;
  showToast: (message: string, severity?: AlertColor) => void;
  showConfirm?: (message: string, onConfirm: () => void) => void;
}

export interface ReduxProviderProps {
  children: React.ReactNode;
}

export interface Product {
  id: number;
  name: string;
  installation: string;
  stock: number;
}

export interface State {
  products: Product[];
  isDarkMode: boolean;
}

export interface ProductFormProps {
  initialData?: Partial<ProductFormData & { id: number }>;
  onSubmit: (data: ProductFormData) => void;
  isEditing: boolean;
  navigate: (path: string) => void;
}

export interface InventoryTableProps {
  navigate: (path: string) => void;
  showConfirm?: (message: string, onConfirm: () => void) => void;
}
export interface HomeViewProps {
  navigate: (path: string) => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
 
}

export interface CreateViewProps {
  navigate: (path: string) => void;
 
}

export interface DetailEditViewProps {
  id: string;
  navigate: (path: string) => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
 
}

export interface NotFoundViewProps {
  navigate: (path: string) => void;
  
  path: string;
}
