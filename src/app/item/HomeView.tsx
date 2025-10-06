"use client";

import React from 'react';
import InventoryTable from '../components/common/InventoryTable';
import Chart from '../components/charts/Chart';
import { HomeViewProps } from '../types';

const HomeView: React.FC<HomeViewProps> = ({ navigate, showConfirm }) => {
    return (
        <>
            <InventoryTable navigate={navigate} showConfirm={showConfirm} />
            <Chart />
        </>
    );
};

export default HomeView;