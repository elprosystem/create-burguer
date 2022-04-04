import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'


// const styles = {
//   burger: {
//     link: (theme) => ({
//       color: theme.palette.error.danger
//     })
//   },
// };




const BurguerCard = ({ burguer }) => {
  return (
    <Box p={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'black' }}>

      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea sx={{ padding: '1rem' }}>
          <Image
            src={burguer.burger_image}
            alt={burguer.burger_name}
            width={'100%'}
            height={'100%'}
            layout='responsive'
          ></Image>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {burguer.burger_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {burguer.burger_description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default BurguerCard