import { createTheme } from '@mui/material/styles';

export const createAppTheme = (isDarkMode: boolean) => {
    return createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: isDarkMode ? '#64b5f6' : '#1976d2', 
            },
            secondary: {
                main: isDarkMode ? '#ffb74d' : '#ff9800', 
            },
            background: {
                default: isDarkMode ? '#1a1a1a' : '#f0f2f5', 
                paper: isDarkMode ? '#2c2c2c' : '#ffffff', 
            }
        },
        typography: {
            fontFamily: 'Roboto, Arial, sans-serif',
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        textTransform: 'none', 
                        fontWeight: 'bold',
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '12px', 
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        backgroundColor: isDarkMode ? '#3a3a3a' : '#e0e0e0', 
                        fontWeight: '600',
                    }
                }
            }
        }
    });
};