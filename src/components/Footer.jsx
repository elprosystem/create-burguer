import React from 'react'
import { BottomNavigationAction, BottomNavigation, Grid, Paper, Box, Toolbar, AppBar } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';


const styles = {
  root: {
    color: "green",
    "&$selected": {
      color: "red"
    }
  },
  selected: {}
};

const Footer = () => {
  return (

    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

      <BottomNavigation sx={{
        bgcolor: 'black',
        '& .Mui-selected': {
          '& .MuiBottomNavigationAction-label': {
            fontSize: theme => theme.typography.caption,
            transition: 'none',
            fontWeight: 'bold',
            lineHeight: '20px'
          },
          '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
            color: theme => theme.palette.secondary.main
          }
        }
      }}
        showLabels
        value={'value'}
      >
        <BottomNavigationAction sx={{ color: 'white' }} label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction sx={{ color: 'white' }} label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction sx={{ color: 'white' }} label="Archive" icon={<ArchiveIcon />} />
      </BottomNavigation>

    </Paper>


  )
}

export default Footer