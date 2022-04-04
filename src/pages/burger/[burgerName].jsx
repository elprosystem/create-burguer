import cssStyle from '../../../styles/Home.module.css';
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Slide, Typography, keyframes, Button, Divider, List, ListItem, ListItemText, Grid, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/system';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

//import theme from '../../theme.js';
import { burguerCustom, burguerRequest, burguerRequestById, burguerWhereRequest } from '../api/services/utils.js'
import Image from 'next/image';
import { useTheme } from "@mui/material/styles"
import { useRouter } from 'next/router';
import { ingredientsRequest } from '../../utils/ingredients.js';
import { useCreateBurguerContext } from '../../context/createBurguerProvider/useCreateBurguerContext.js';
import CreateBurger from '../../components/CreateBurger.jsx';
import { removeAllBurguerStore, removeBurguerStore, setBurguerStore } from '../../utils/store.js';
import { incrementIngredients } from '../../utils/increment.js';
import { decrementIngredients } from '../../utils/decrement.js';
import Cookies from 'js-cookie'
import { existEnabled } from '../../context/createBurguerProvider/index.js';
import BurguerCard from '../../components/BurguerCard.jsx';
import IngredientsMenu from '../../components/IngredientsMenu.jsx';
import IngredientsItemsData from '../../components/IngredientsItemsData.jsx';
import IngredientsItemsAction from '../../components/IngredientsItemsAction.jsx';
import Layout from '../../components/Layout.jsx';


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
  burger: {
    link: (theme) => ({
      color: theme.palette.error.danger
    })
  },
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
  ingredientsItems: {
    display: 'flex',
    flexDirection: 'column',
    items: {
      display: 'flex',
      alignItems: 'center'
    }

  }
};


const initializeEnabled = x => x.reduce((acc, prev) => ({
  ...acc,
  [prev.items_name]: {
    quantity: 0,
    disabled: false
  }
}
), {})





// ......................................
////   BurgerName (page)
// ......................................

const BurgerName = ({ burger, ingredients }) => {

  //console.log('enabled.....[increment]........', { burger });


  // // ......................................
  // ////   access the global theme
  // // ......................................

  const theme = useTheme()



  // // ......................................
  // ////   access the context value
  // // ......................................

  const { setContextBurguer, getContextBurguer, setContextConfirmBurguer, setContextClearBurguer, setContextClearAllBurguer } = useCreateBurguerContext()



  // ......................................
  ////   controls the active fade effect
  // ......................................

  const [initialFade, setInitialFade] = useState('initial')
  const [index, setIndex] = useState(0)
  const [ingredientsFade, setIngredientsFade] = useState(index)

  const handleActiveFade = x => {
    setInitialFade('')
    setIngredientsFade(x)
    setIndex(x - 1) // because of using array index x 'ingredients_id'
  };





  // ......................................
  ////  current ingredients active (views state)
  // ......................................

  const [ingredientsActive, setIngredientsActive] = useState(ingredients[0])// useState(createdBurguer.ingredients ? createdBurguer.ingredients[0] : ingredients[0])//

  useEffect(() => {
    setIngredientsActive(ingredients[index])
  }, [ingredients, ingredientsActive, index, ingredientsFade !== index])



  // ......................................
  ////  persists current ingredients enabled (views state store)
  // ......................................

  const [ingredientsEnabled, setIngredientsEnabled] = useState({});

  useEffect(() => {

    const cookiesEnabled = getContextBurguer(ingredientsActive.ingredients_name)

    cookiesEnabled
      ? setIngredientsEnabled(cookiesEnabled)
      : setIngredientsEnabled(() => initializeEnabled(ingredientsActive.ingredientsItems)
      )
  }, [ingredientsActive])

  useEffect(() => {

  }, [ingredientsEnabled])




  // ......................................
  ////  increment
  // ......................................


  const increment = (ingredientsItems, ingredientsActive) => {

    const newIngredients = incrementIngredients(ingredientsEnabled, ingredientsItems, ingredientsActive)

    setIngredientsEnabled(newIngredients)

    setContextBurguer(newIngredients, ingredientsActive.ingredients_name)

  }




  // ......................................
  ////  decrement
  // ......................................


  const decrement = (ingredientsItems, ingredientsActive) => {

    const newIngredients = decrementIngredients(ingredientsEnabled, ingredientsItems, ingredientsActive)

    setIngredientsEnabled(newIngredients)

    setContextBurguer(newIngredients, ingredientsActive.ingredients_name)
  }



  // ......................................
  ////  confirmBurguer
  // ......................................

  const confirm = (enabled, ingredientsActive) => {

    // only if there is enabled
    const _enabled = existEnabled(enabled)

    _enabled
      ? setContextConfirmBurguer(burger, enabled, ingredientsActive)
      : clear(ingredientsActive)
  }


  // ......................................
  ////  clearBurguer
  // ......................................

  const clear = (ingredientsActive) => {

    const enabledInitialized = initializeEnabled(ingredientsActive.ingredientsItems)

    setIngredientsEnabled(enabledInitialized)

    setContextClearBurguer(burger, enabledInitialized, ingredientsActive)

  }

  // ......................................
  ////  clearAllBurguer
  // ......................................

  const clearAll = () => {

    const enabledInitialized = initializeEnabled(ingredientsActive.ingredientsItems)

    setIngredientsEnabled(enabledInitialized)

    setContextClearAllBurguer()

  }


  return (
    <>
      <Layout title='Setting Burguer' />


      <Box p={4} sx={{ flexGrow: 1 }}>

        <Grid container spacing={{ xs: 2, md: 3 }} >

          <Grid item xs={6} sm={4} md={4}>
            <BurguerCard burguer={burger} />
          </Grid>

          <Grid item xs={6} sm={4} md={4}>
            <CreateBurger clearAll={clearAll} />
          </Grid>

        </Grid>
      </Box>


      <Box m={4} p={4} sx={styles.ingredients}>
        {ingredients && ingredients.map(ingredient => {

          return (

            <IngredientsMenu
              ingredient={ingredient}
              ingredientsFade={ingredientsFade}
              initialFade={initialFade}
              handleActiveFade={handleActiveFade}>
            </IngredientsMenu>

          )
        })}
      </Box>

      {
        (ingredientsActive && ingredientsActive.ingredientsItems && ingredientsEnabled) &&

        ingredientsActive.ingredientsItems.map(ingredientsItem => {

          return (

            <Box p={2}
              key={ingredientsItem.items_id}
              sx={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between'
              }}>

              <IngredientsItemsData
                ingredientsItem={ingredientsItem}
                ingredientsFade={ingredientsFade}>
              </IngredientsItemsData>

              <IngredientsItemsAction
                ingredientsItem={ingredientsItem}
                ingredientsActive={ingredientsActive}
                ingredientsEnabled={ingredientsEnabled}
                increment={increment}
                decrement={decrement}>
              </IngredientsItemsAction>

            </Box>)
        }
        )
      }


      <Box mb={8} mx={8} p={2} sx={{ display: 'flex' }}>

        <Button variant="outlined" size="large" sx={{ width: '100%', marginInline: '1.25rem' }}
          onClick={() => clear(ingredientsActive)} >
          clear
        </Button>

        <Button variant="outlined" size="large" sx={{ width: '100%', marginInline: '1.25rem' }}
          onClick={() => confirm(ingredientsEnabled, ingredientsActive)} >
          confirm
        </Button>
      </Box>


      {/* <div>ingredientsActive</div>
      <pre>
        {JSON.stringify(ingredientsEnabled, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(burger, null, 2)}
      </pre> */}
    </>
  )
}


export default BurgerName




export async function getStaticProps(context) {

  // request ingredients
  const createdIngredients = await ingredientsRequest()

  const { params } = context

  // request burger
  const burgerResult = await burguerWhereRequest(
    { burger_name: params.burgerName }
  )

  const { data: { rows, sql }, error, message } = burgerResult

  return {
    props: {
      burger: rows[0],
      ingredients: createdIngredients
    },
  };
}


export async function getStaticPaths(ctx) {

  const burgerResult = await burguerRequest()
  const { data: { rows, sql }, error, message } = burgerResult


  const paths = rows.map((burger) => (
    { params: { burgerName: burger.burger_name } })
  )

  return {
    paths,
    fallback: false,
  }
}