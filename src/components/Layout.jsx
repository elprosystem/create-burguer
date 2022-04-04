import React from 'react'
import Head from 'next/head'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';





// ......................................
////  layout
// ......................................

const Layout = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar sx={{ backgroundColor: '#000000' }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href={`/`} passHref>
            <Typography sx={{ flexGrow: 1, cursor: 'pointer' }} variant="h6" component="div" >
              ELPROSYSTEM
            </Typography>
          </Link>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

    </>

  )
}

export default Layout