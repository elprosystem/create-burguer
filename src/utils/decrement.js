
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
//// updateDisabled
// ......................................


const updateDisabled = (x, maxchoices) => {

  const { enabled, value } = howManyEnabled(x)

  return value < maxchoices
    ? Object.keys(x).reduce((acc, key) => {
      return enabled.includes(key)
        ? acc
        : ({
          ...acc,
          [key]: {
            quantity: 0,
            disabled: false
          }
        })

    }, x)
    : x
}





// ......................................
//// decrementIngredients
// ......................................

export const decrementIngredients = (x, ingredientsItems, ingredientsActive) => {

  console.log('enabled.....[decrement]........', {
    x, ingredientsItems, ingredientsActive
  });
  const { items_id, items_name, items_limit } = ingredientsItems
  const { ingredients_maxchoices } = ingredientsActive

  const newX = Object.keys(x).reduce((acc, key) => {
    return items_name === key
      ? ({
        ...acc,
        [key]: {
          quantity: (x[key]['quantity'] - 1) < 0 ? 0 : x[key]['quantity'] - 1,
          disabled: false
        }
      })
      : acc
  }, x)

  return updateDisabled(newX, ingredients_maxchoices)

}