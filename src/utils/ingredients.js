import { burguerCustom, ingredientsJoin } from "../pages/api/services/utils.js"


const createIngredientsIntens = (x, name) => x.reduce((acc, prev) =>
  prev.ingredients_name === name
    ? (
      [...acc,
      {
        items_id: prev.items_id,
        ingredients_id: prev.ingredients_id,
        items_name: prev.items_name,
        items_image: prev.items_image,
        items_quantity: prev.items_quantity,
        items_price: prev.items_price,
        items_limit: prev.items_limit,
        items_active: prev.items_active === 1 ? true : false
      }
      ]
    )
    : acc
  , [])


export const createIngredients = x => {

  // identify how many ingredient names
  const ingredientsName = x.map(m => m.ingredients_name)
  // eliminate duplicates
  const namesWithoutRepetition = ingredientsName.filter((c, index) => ingredientsName.indexOf(c) === index)

  // for each name with an ingredient with all ingredients referring items
  return namesWithoutRepetition.map((name) => {

    // filters the array for each name and takes the first one
    const ingredient = x.filter(f => f.ingredients_name === name)[0]

    // for each first ingredient includes all ingredients items with the related name
    const ingredients = ({
      ingredients_id: ingredient.ingredients_id,
      ingredients_name: ingredient.ingredients_name,
      ingredients_image: ingredient.ingredients_image,
      ingredients_choices: ingredient.ingredients_choices,
      ingredients_maxchoices: ingredient.ingredients_maxchoices,
      ingredients_items_init: ingredient.ingredients_items_init,
      ingredients_items_limit: ingredient.ingredients_items_limit,
      ingredients_active: [],// ingredient.ingredients_active,
      ingredientsItems: createIngredientsIntens(x, ingredient.ingredients_name)
    })

    return (
      ingredients
    )

  })

}


export const ingredientsRequest = async () => {

  const ingredientsResult = await ingredientsJoin(
    {
      schema: { table: 'ingredients' },
      join: [
        {
          table: 'ingredientsitems',
          on: [{ items_id: 'ingredients_id' }]
        }
      ]
    }
  )

  const { data: { rows: ingredients, sql }, error, message } = ingredientsResult

  const createdIngredients = createIngredients(ingredients)

  return createdIngredients
}


  // const customResult = await burguerCustom(
  //   `SELECT * FROM ingredients INNER JOIN ingredientsitems on ingredients.items_id = ingredientsitems.ingredients_id `
  // )