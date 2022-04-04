import { Avatar, Box, Typography, keyframes } from '@mui/material'
import React from 'react'



const fadeInUp = keyframes`
 	0% {
		opacity: 0;
		transform: translateY(100px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;


const scale = keyframes`
   0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(2);
            transform: scale(2);
  }
`;

const styles = {
  ingredients: {
    display: 'flex',
    justifyContent: 'space-between',
    fade: {
      animation: `${fadeInUp} 0.5s `
    },
    active: {
      animation: `${scale} 0.6s both`
    }
  },
}


const IngredientsItemsData = ({ ingredientsItem, ingredientsFade }) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Box p={2}>
        <Avatar alt={ingredientsItem.items_name} src={`/${ingredientsItem.items_image}`}
          sx={ingredientsFade ? styles.ingredients.fade : {}} />
      </Box>
      <Box p={2}>
        <Typography variant="title">  {ingredientsItem.items_name}</Typography>
        <Typography variant="subtitle1" component="div"> $   {ingredientsItem.items_price}</Typography>
      </Box>
    </Box>
  )
}

export default IngredientsItemsData