import { Preview } from "@mui/icons-material";
import { createContext, useCallback, useEffect, useState } from "react";

import { getBurguerStore, removeAllBurguerStore, removeBurguerStore, setBurguerStore } from "../../utils/store.js";


// ......................................
//// helpers
// ......................................

export const existEnabled = x => Object.keys(x).filter(key => x[key]['quantity'] > 0).length > 0 ? true : false
const filterEnabled = x => Object.keys(x).filter(key => x[key]['quantity'] > 0)

const findIndex = (x, name) => x.findIndex(f => f.name === name)



// ......................................
//// createNewIngredients
// ......................................


const createNewIngredients = (x, ingredients) => {

  const { ingredients_id: order, ingredients_name: ingredientsName, ingredientsItems } = ingredients

  const enabled = filterEnabled(x)

  const items = ingredientsItems.reduce((acc, prev) => {

    const { items_name: itemsName, items_price: price } = prev

    return enabled.includes(itemsName)

      ? (
        [...acc, {
          name: itemsName,
          quantity: x[itemsName]['quantity'],
          price
        }]

      )
      : acc
  }, [])

  return (
    {
      name: ingredientsName,
      order,
      items
    }
  )
}



// ......................................
//// updateNewIngredients
// ......................................

const updateNewIngredients = (burguerCookiesStore, newIngredients) => {

  const indexToRemove = findIndex(burguerCookiesStore.ingredients, newIngredients.name)

  return {
    ...burguerCookiesStore,
    ingredients: [
      ...burguerCookiesStore.ingredients.filter((_, i) => i !== indexToRemove),
      newIngredients
    ]
  }

}



// ......................................
//// updateClearIngredients
// ......................................

const updateClearIngredients = (burguerCookiesStore, clearIngredientsName) => {

  const indexToRemove = findIndex(burguerCookiesStore.ingredients, clearIngredientsName)

  return {
    ...burguerCookiesStore,
    ingredients: [
      ...burguerCookiesStore.ingredients.filter((_, i) => i !== indexToRemove),
    ]
  }

}








export const CreateBurguerContext = createContext()


// ......................................
//// CreateBurguerContextProvider
// ......................................

export const CreateBurguerContextProvider = ({ children }) => {


  const [cookieBurguer, setCookieBurguer] = useState({}) // state of view '[burgerName].jsx'

  const [createBurguer, setCreateBurguer] = useState({}) // state of view 'CreateBurger.jsx'


  useEffect(() => {
    setCreateBurguer(getBurguerStore('burguer'))
  }, [])


  // ......................................
  //// getContexBurguer
  // ......................................


  const getContextBurguer = (ingredientsName) => {

    const cookieBurguerStore = getBurguerStore(ingredientsName)

    return cookieBurguerStore

  }


  // ......................................
  //// setContexBurguer
  // ......................................

  const setContextBurguer = (x, ingredientsName) => {

    setBurguerStore(ingredientsName, x)

    setCookieBurguer(x)
  }


  // ......................................
  //// setContextConfirmBurguer
  // ......................................

  const setContextConfirmBurguer = (burguer, x, ingredients) => {

    const { burger_name: name, burger_price: price } = burguer

    // cookies (get)
    const burguerCookiesStore = getBurguerStore('burguer')

    // create a new ingredient
    const newIngredients = createNewIngredients(x, ingredients)

    // const _enabled = existEnabled(enabled)

    // change the ingredients by the new ingredient
    const burguerStore = burguerCookiesStore
      ? updateNewIngredients(burguerCookiesStore, newIngredients)
      : {
        name, price,
        ingredients: [newIngredients]
      }

    // cookies (set)
    setBurguerStore('burguer', burguerStore)

    // context
    setCreateBurguer(burguerStore)
  }


  // ......................................
  //// setContextClearBurguer
  // ......................................

  const setContextClearBurguer = (burguer, x, ingredients) => {

    // cookies (get)
    const burguerCookiesStore = getBurguerStore('burguer')

    const { ingredients_name } = ingredients

    // change ingredients by removing by ingredients name
    const burguerStore = burguerCookiesStore
      ? updateClearIngredients(burguerCookiesStore, ingredients_name)
      : null// {}

    // cookies (delete)
    removeBurguerStore(ingredients_name)

    // cookies (set)
    burguerStore && burguerStore.ingredients.length > 0
      ? setBurguerStore('burguer', burguerStore)
      : removeBurguerStore('burguer')

    // context
    burguerStore && burguerStore.ingredients.length > 0
      ? setCreateBurguer(burguerStore)
      : setCreateBurguer({})
  }

  // ......................................
  //// setContextClearAllBurguer
  // ......................................

  const setContextClearAllBurguer = () => {

    // cookies
    removeAllBurguerStore()

    // context
    setCreateBurguer(null)

  }




  return (

    <CreateBurguerContext.Provider
      value={{ createBurguer, cookieBurguer, setContextBurguer, getContextBurguer, setContextConfirmBurguer, setContextClearBurguer, setContextClearAllBurguer }}>
      {children}
    </CreateBurguerContext.Provider>

  )
}