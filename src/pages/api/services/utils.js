// console.log('LoginRequest....', JSON.stringify(data, null, 2));

import { BurguerService } from "./burguerService.js";


// ......................................
////  burguerRequest
// ......................................

export const burguerRequest = async () => {

  try {

    const { data: dataAxios } = await BurguerService.get('burguer')
    //  console.log('burguerRequest.............', data);//  { where: { lt: { burger_price: 90 } } }
    return dataAxios

  } catch (error) {
    console.log(error);
    return null
  }
}


// ......................................
////  burguerRequest / ID
// ......................................

export const burguerRequestById = async (id) => {

  try {

    const { data: dataAxios } = await BurguerService.get(`burguer/${id}`)

    return dataAxios

  } catch (error) {
    console.log(error);
    return null
  }
}

// ......................................
////  burguerMultRequest / ID
// ......................................

export const burguerWhereRequest = async (body) => {

  try {

    const { data: dataAxios } = await BurguerService.post(`/burguer/where`, body)

    return dataAxios

  } catch (error) {
    console.log(error);
    return null
  }
}


// ......................................
//// burguerSearchRequest
// ......................................

export const burguerSearchRequest = async (term) => {

  try {
    const { data: dataAxios } = await BurguerService.get(`/burguer/search`,// ?search=123
      {
        params: {
          burger_description: term
        }
      }
    )

    return dataAxios

  } catch (error) {
    console.log(error);
    return null
  }
}




// ......................................
////  burguerCustom
// ......................................

export const burguerCustom = async (query) => {


  try {

    const { data: dataAxios } = await BurguerService.get('burguer/custom',
      {
        params: {
          customQuery: query
        }
      })
    //  console.log('burguerCustom.............', data.data.rows[0]);
    return dataAxios

  } catch (error) {
    console.log(error);
    return null
  }
}


// ......................................
////  ingredientsJoin
// ......................................

export const ingredientsJoin = async (query) => {


  try {

    const { data: dataAxios } = await BurguerService.get('burguer/join',
      {
        params: {
          joinQuery: query
        }
      })
    return dataAxios

  } catch (error) {
    console.log(error);
    return null
  }
}