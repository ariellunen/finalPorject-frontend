import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NavLinks from '../components/NavLinks';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ItemOne = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '70vh',
  backgroundImage: 'url(https://i.postimg.cc/Kcn43hJw/Breadcrumbs-9.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '300px',
  backgroundColor: '#e4ecf4',
  backgroundPosition: 'bottom',
}));

const ItemTwo = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '70vh',
  backgroundImage: 'url(https://i.postimg.cc/VkTzHKKX/Breadcrumbs-10.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '300px',
  backgroundColor: '#e4ecf4',
  backgroundPosition: 'bottom',

}));

export default function BasicGrid() {
  return (
    <React.Fragment>
      <NavLinks />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ placeContent: 'center', marginTop: 0 }}>
          <Grid item xs={5} component={Link} to="/form" sx={{ textDecoration: 'none' }}>
            <ItemTwo>
              <Typography variant="h2" component="h2">
                תהליך הצביעה
              </Typography>
            </ItemTwo>
          </Grid>
          <Grid item xs={5} component={Link} to="/analysis" sx={{ textDecoration: 'none' }}>
            <ItemOne>
              <Typography variant="h2" component="h2">
                ניתוח הסנכרון
              </Typography>
            </ItemOne>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
