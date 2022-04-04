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


const IngredientsMenu = ({ ingredient, ingredientsFade, initialFade, handleActiveFade }) => {
  return (
    <Box
      id='ingredients'
      key={ingredient.ingredients_id.toString()}
      onClick={() => handleActiveFade(ingredient.ingredients_id)}
      sx={
        (ingredientsFade === ingredient.ingredients_id)
          ? styles.ingredients.active
          : initialFade === 'initial' && ingredient.ingredients_id === 1
            ? styles.ingredients.active
            : {}
      }
    >
      <Avatar alt={ingredient.ingredients_name} src={`/${ingredient.ingredients_image}`}
        sx={ingredientsFade === ingredient.ingredients_id ? styles.ingredients.fade : {}}
      // className={
      //   ingredientsFade === ingredient.ingredients_id ? cssStyle.fadeIN : ''
      // }
      />
      <Typography> {ingredient.ingredients_name}</Typography>
    </Box>
  )
}

export default IngredientsMenu