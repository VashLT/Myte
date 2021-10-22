import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import useGetUser from '../../hooks/useGetUser';
import { avatarGen, DEFAULT_AVATAR_URL } from '../../utils/constants';
import Navbar from '../Core/Navbar/Navbar';
import Loading from './Loading';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import LatexRender from '../Core/Render/LatexRender';
import { mockUser } from '../../utils/mock';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        padding: '0',
        margin: '0',
        paddingTop: '100px',
    },
    container: {
        display: 'flex',
        alignItems: 'center !important',
        justifyContent: 'center !important'
    },
    avatarContainer: {
        marginLeft: '20px',
    },
    avatar: {
        border: 'solid 1px red !important'
    },
    formulaBody: {
        width: '280px',
        alignSelf: 'center'
    },
    dateText: {
        fontSize: '12px',
        margin: '0'
    }
}));

export const Profile: React.FC<{ username: string }> = ({ username }) => {
    const [loading, user] = useGetUser(username);
    // const loading = false;
    // const user = mockUser;
    const classes = useStyles();

    if (loading) return <Loading />;

    const avatarUrl = avatarGen.generateRandomAvatar(username) || DEFAULT_AVATAR_URL;

    console.log("Profile", { username })
    return (
        <Box className={classes.root}>
            <Navbar />
            <Divider sx={{
                position: 'absolute',
                top: '150px',
                left: '0',
                right: '0'
            }} />
            <Grid container xs={12} component='main' className={classes.container} sx={{ mb: '20px' }}>
                <Box sx={{
                    display: 'flex',
                    '@media (min-width: 900px)': {
                        // maxWidth: '900px'
                    },
                    // width: '90vw',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Grid item xs={6} className={classes.avatarContainer} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexBasis: 'auto',
                        '@media (max-width: 600px)': {
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            maxWidth: '95vw'
                        }
                    }}>
                        <Avatar
                            alt={`${username}'s avatar`}
                            src={avatarUrl}
                            sx={{
                                width: 350,
                                height: 350,
                                '@media (max-width: 600px)': {
                                    height: 250,
                                    width: 250,
                                }
                            }}
                        />
                        <Typography variant="h3" component="h3" sx={{ minWidth: '260px' }}>
                            {user.first_name}
                        </Typography>
                        <Typography variant="h4" component="h4" sx={{ minWidth: '240px' }}>
                            {user.username}
                        </Typography>

                    </Grid>
                    <Box sx={{
                        // '@media (min-width: 600px)': {
                        padding: '80px 0 0 30px'
                        // }
                    }}>
                        <Typography
                            variant="h5"
                            component="h5"
                            sx={{
                                mb: '20px', minWidth: '260px',
                                '@media (max-width: 600px)': {
                                    mt: '20px'
                                }
                            }}>
                            Created formulas
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}>
                            {user.created_formulas.map(formula => {
                                return (
                                    <Grid item justifyContent="center" sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxWidth: '300px',
                                        margin: '5px'
                                    }}>
                                        <PreviewFormula {...formula} />
                                    </Grid>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box >
    );
}

export const PreviewFormula: React.FC<IunfmtFormula> = ({ id_formula, title, added_at, latex_code }) => {
    const classes = useStyles();
    return (
        <Card
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}
            id={String(id_formula)}
        >
            <CardHeader
                title={title}
                subheader={<p className={classes.dateText}>{added_at.split("T")[0]} </p>}
            />
            <CardContent className={classes.formulaBody}>
                <LatexRender>{latex_code}</LatexRender>
            </CardContent>
        </Card>
    )
}

export default Profile;