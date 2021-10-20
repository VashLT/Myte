import { Box } from '@mui/material';
import React, { useContext } from 'react';
import SidePanel from '../Core/Panels/Side/SidePanel';
import SidePanelContext, { SidePanelProvider } from '../Contexts/SidePanel';
import TopPanel from '../Core/Panels/Top/TopPanel';
import WorkArea from '../Core/WorkArea/WorkArea';

// import { makeStyles } from '@mui/styles';
// import { Theme } from '@mui/material';

// const useStyles = makeStyles((theme: Theme) => ({
//     contentWrapper: {
//         width: 
//     }
// }));

export const Dashboard: React.FC = () => {
    return (
        <SidePanelProvider>
            <Container />
        </SidePanelProvider>
    );
}

export const Container: React.FC = () => {
    const { panelWidth } = useContext(SidePanelContext);
    // const classes = useStyles();
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SidePanel />
                <Box sx={{
                    width: { md: `calc(100vw - ${panelWidth}px)`, sm: '100vw' }
                }}>
                    <TopPanel />
                    <WorkArea />
                </Box>
            </Box>
            <div id="_overlay"></div>
        </>
    )
}


export default Dashboard;