

import { burger, findwhere, options } from "../../../../lib";
//import excuteQuery from "../../../../utils/dataBase.js";


export default async function handler(req, res) {

  try {

    const id = +req.query.burguerId

    const result = await findwhere(
      burger,
      { burger_id: id }
      , options
    )

    // eLog('listOneBurger', result);

    res.status(200).json(result)


    // const result = await excuteQuery({
    //   query: 'SELECT * FROM burger WHERE burger_id = ?',
    //   values: [+req.query.burguerId],
    // });
    // //  console.log("result", result)
    // res.status(200).json(result) ///  return (result)
    return
  } catch (error) {
    console.log(error);
  }

}
