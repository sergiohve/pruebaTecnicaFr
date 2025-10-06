import React, { useMemo, useState, useEffect } from "react";
import { Paper, Typography, Box, Container, useTheme } from "@mui/material";
import dynamic from 'next/dynamic';
import { ApexOptions } from "apexcharts";
import { useAppSelector } from "../../hooks/useStore";
import { Product } from "@/app/types";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { 
  ssr: false 
});

const Chart: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark'; 
  const [isClient, setIsClient] = useState(false);

  const { products } = useAppSelector((state) => state) as { products: Product[] };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const productsOrdenados = useMemo(() => 
    products
      .slice()
      .sort((a, b) => b.stock - a.stock)
  , [products]);

  const seriesData = productsOrdenados.map((p) => p.stock);
  const categories = productsOrdenados.map((p) => `${p.name} (${p.installation})`);
  
  const textColor = isDarkMode ? '#f0f0f0' : '#333';
  const gridLineColor = isDarkMode ? '#444444' : '#e0e0e0';

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: productsOrdenados.length * 50 + 100,
      toolbar: {
        show: false,
      },
      foreColor: textColor,
      animations: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toString();
      },
      style: {
        colors: [isDarkMode ? '#ffffff' : '#304758'] 
      },
      offsetX: 40,
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Unidades en Stock',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: textColor
        }
      },
      labels: {
        style: {
            colors: textColor,
        },
        formatter: function (val: any) {
          return val % 1 === 0 ? val.toString() : '';
        }
      }
    },
    yaxis: {
        labels: {
            style: {
                fontSize: '12px',
                fontWeight: 500,
                colors: textColor,
            }
        }
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      y: {
        formatter: function (val) {
          return `${val} unidades`;
        }
      }
    },
    colors: [theme.palette.primary.main],
    grid: {
        show: true,
        borderColor: gridLineColor,
        xaxis: {
            lines: {
                show: true
            }
        }
    }
  };

  const chartSeries = [
    {
      name: "Stock",
      data: seriesData,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "primary.main",
            borderBottom: 1,
            borderColor: "divider",
            pb: 1,
            fontWeight: "bold",
          }}
        >
          Artículos de Stock
        </Typography>
        <Box sx={{ minHeight: 400, pt: 2 }}>
          {productsOrdenados.length > 0 ? (
            isClient && (
              <ReactApexChart 
                options={chartOptions} 
                series={chartSeries} 
                type="bar" 
                height={productsOrdenados.length * 50 + 100}
              />
            )
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 400,
              }}
            >
              <Typography variant="h6" color="textSecondary">
                No hay datos para mostrar en el gráfico.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Chart;