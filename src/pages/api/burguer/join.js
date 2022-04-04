import { burger, findwhere, fullText, innerJoin, options } from "../../../../lib";



export default async function handler(req, res) {

  try {

    const parse = JSON.parse(req.query.joinQuery)
    const { schema, join } = parse

    const result = await innerJoin(

      schema, join
    )

    res.status(200).json(result)

    return
  } catch (error) {
    console.log(error);
  }

}