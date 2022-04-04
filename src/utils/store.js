import Cookies from 'js-cookie'

// ......................................
////  setBurguerStore
// ......................................

export const setBurguerStore = (name, burguer) => {

  return !name
    ? null
    : Cookies.set(name, JSON.stringify(burguer))
}



// ......................................
////  getBurguerStore
// ......................................

export const getBurguerStore = (name) => {

  const burguer = Cookies.get(name)

  return !burguer
    ? null
    : JSON.parse(burguer) ?? null
}


// ......................................
////  removeBurguerStore
// ......................................



export const removeBurguerStore = (name) => {

  const burguer = Cookies.get(name)

  return !burguer
    ? null
    : Cookies.remove(name) ?? null
}


// ......................................
////  removeAllBurguerStore
// ......................................



export const removeAllBurguerStore = () => {

  const burguer = Cookies.get()

  return !burguer
    ? null
    : Object.keys(burguer).forEach((key) => Cookies.remove(key) ?? null)
}
