import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "../../styles/Home.module.css";
import { burguerCustom, burguerRequest } from './api/services/utils.js';
import { useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import Link from 'next/link'
import Image from "next/image"
import { useRouter } from 'next/router';
import { useCreateBurguerContext } from '../context/createBurguerProvider/useCreateBurguerContext.js';
import Layout from '../components/Layout.jsx';





// ......................................
////  home
// ......................................

export default function Home({ burger }) {



  return (
    <Box sx={{ flexGrow: 1 }}>

      <Layout title='Create Burguer' />


      <Box p={2} >
        <Grid container spacing={4}>

          {burger && (
            burger.map((item) => (

              <Grid key={item.burger_id} item xs={12} sm={6} md={4} lg={4} xl={4} >
                <h1>
                  <Link href={`/burger/${item.burger_name}`} >
                    <a>{item.burger_name}</a>
                  </Link>
                </h1>

                <Image
                  src={item.burger_image}
                  alt={item.burger_name}
                  width={240}
                  height={240}
                  layout='responsive'
                ></Image>

              </Grid>

            ))
          )

          }
        </Grid>

      </Box>


      {/* <pre>
        {JSON.stringify(initialBurguer, null, 2)}
      </pre> */}
    </Box>
  )
}


export async function getStaticProps() {


  try {

    const burgerResult = await burguerRequest()

    const { data: { rows, sql }, error, message } = burgerResult

    return {
      props: { burger: rows }
    };
  } catch (e) {
    console.log('[error]  getStaticProps......', e);
    return { props: { burger: false } }
  }


}
