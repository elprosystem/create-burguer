

// ......................................
//// howManyEnabled
// ......................................

const howManyEnabled = (x) => {

  const enabled = Object.keys(x).filter(key => x[key]['quantity'] > 0)
  return ({
    enabled,
    value: enabled.length
  })
}



// ......................................
//// caseChoicesZero
// ......................................

const caseChoicesZero = (x, ingredientsItems) => updateDisabled(add(x, ingredientsItems))



// ......................................
//// add
// ......................................

const add = (x, ingredientsItems) => {

  const { items_id, items_name, items_limit } = ingredientsItems

  return Object.keys(x).reduce((acc, key) => {
    return items_name === key
      ? ({
        ...acc,
        [key]: {
          quantity: x[key]['quantity'] > items_limit ? x[key]['quantity'] - 1 : x[key]['quantity'] + 1,
          disabled: x[key]['quantity'] > items_limit >= items_limit || x[key]['quantity'] + 1 >= items_limit ? true : false
        }
      })
      : acc
  }, x)

}



// ......................................
//// updateDisabled
// ......................................

const updateDisabled = (x) => {

  const { enabled, value } = howManyEnabled(x)

  return Object.keys(x).reduce((acc, key) => {
    return enabled.includes(key)
      ? acc
      : ({
        ...acc,
        [key]: {
          quantity: 0,
          disabled: true
        }
      })

  }, x)

}





// ......................................
//// checkQuantity
// ......................................

const checkQuantity = (oldX, newX, maxchoices, ingredientsItems) => {

  const { enabled, value } = howManyEnabled(newX)
  const equalValue = value === maxchoices

  return equalValue
    ? updateDisabled(newX)
    : newX

}




// ......................................
//// addIngredients
// ......................................

const addIngredients = (oldX, newX, maxchoices, ingredientsItems) => {

  const { enabled, value } = howManyEnabled(newX)
  const exceededValue = value > maxchoices

  return exceededValue
    ? oldX
    : checkQuantity(oldX, newX, maxchoices, ingredientsItems)
}



// ......................................
//// firstAddIngredients
// ......................................


const firstAddIngredients = (oldX, ingredientsItems) => add(oldX, ingredientsItems)




// ......................................
//// caseMultChoices
// ......................................


const caseMultChoices = (oldX, maxchoices, ingredientsItems) => {

  const { enabled, value } = howManyEnabled(oldX)

  return !value
    ? firstAddIngredients(oldX, ingredientsItems)
    : addIngredients(oldX, add(oldX, ingredientsItems), maxchoices, ingredientsItems)
}



// ......................................
//// incrementIngredients
// ......................................


export const incrementIngredients = (_count, ingredientsItems, ingredientsActive) => {

  const { ingredients_choices, ingredients_maxchoices } = ingredientsActive


  return ingredients_choices
    ? caseMultChoices(_count, ingredients_maxchoices, ingredientsItems)
    : caseChoicesZero(_count, ingredientsItems)


}



