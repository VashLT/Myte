import { Box } from '@mui/material';
import React, { useContext } from 'react';
import SidePanel from '../Core/Panels/Side/SidePanel';
import SidePanelContext, { SidePanelProvider } from '../Contexts/SidePanel';
import TopPanel from '../Core/Panels/Top/TopPanel';
import Formulas from '../Core/Objects/Formulas/Formulas';
import { TagsContainer as Tags } from '../Core/Objects/Tags/Tags';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
            <DashboardRouter />
        </SidePanelProvider>
    );
}

export const DashboardRouter: React.FC = () => {
    const { panelWidth } = useContext(SidePanelContext);
    // const classes = useStyles();
    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <SidePanel />
                <Box sx={{
                    width: { md: `calc(100vw - ${panelWidth}px)`, sm: '100vw' }
                }}>
                    <TopPanel />
                    <Switch>
                        <Route exact path='/' component={Formulas} />
                        <Route exact path='/tags' component={Tags} />
                    </Switch>
                </Box>
            </Box>
            <div id="_overlay"></div>
        </Router>
    )
}


export default Dashboard;