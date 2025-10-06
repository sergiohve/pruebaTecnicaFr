import { useContext } from 'react';
import StoreContext from '../store/StoreContext';
import { State, Action } from '../types';

export const useAppSelector = <T,>(selector: (state: State) => T): T => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useAppSelector debe ser usado dentro de un ReduxProvider');
    }
    return selector(context.state);
};

export const useAppDispatch = (): React.Dispatch<Action> => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useAppDispatch debe ser usado dentro de un ReduxProvider');
    }
    return context.dispatch;
};