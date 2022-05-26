import React, { useState, useEffect, useRef } from 'react';
import Cards from '../component/Cards';
import Box from '@mui/material/Box';
import NavLink from '../../user/components/NavLinks';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const breadcrumbs = [
    <Typography key="1" color="text.primary" component={Link} to='/'>
        תפריט ראשי
    </Typography>,
    <Typography key="2" color="text.primary">
        כל הציורים
    </Typography>,

];
const AllDraw = () => {
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState(false);
    useEffect(() => {
        const getDraw = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                });
                const responseData = await response.json();
                setData(responseData.drawing);
                setIsReady(true);
            } catch (err) {
                console.log(err);
            }
        }
        getDraw();
    }, [isReady]);

    return (
        <React.Fragment>
            {data === undefined &&
                <div>wait</div>
            }
            <NavLink />
            <Stack spacing={2} >
                <Breadcrumbs
                    sx={{ marginTop: 1, marginLeft: 3 }}
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Box sx={{flexWrap: 'wrap', justifyContent: 'center'}}>
            {isReady && data.map((item, key) => {
                return (
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}>
                        <Cards item={item} key={key} index={key} />
                    </Box>
                )
            })}
            </Box>
        </React.Fragment>
    )
}

export default AllDraw;