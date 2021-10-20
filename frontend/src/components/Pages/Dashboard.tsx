import { Box } from '@mui/material';
import React from 'react';
import SidePanel from '../Core/Panels/Side/SidePanel';
import { SidePanelProvider } from '../Contexts/SidePanel';
import TopPanel from '../Core/Panels/Top/TopPanel';
import WorkArea from '../Core/WorkArea/WorkArea';

export const Dashboard: React.FC = () => {
    return (
        <SidePanelProvider>
            <Box sx={{ display: 'flex' }}>
                <SidePanel />
                <div>
                    <TopPanel />
                    <WorkArea />
                </div>
            </Box>
        </SidePanelProvider>
    );
}

export default Dashboard;