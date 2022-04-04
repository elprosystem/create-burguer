
import { burger, findwhere, fullText, options } from "../../../../lib";



export default async function handler(req, res) {

  try {

    const query = req.query

    const result = await fullText(
      burger,
      query,
      'boolean'
    )

    res.status(200).json(result)

    return
  } catch (error) {
    console.log(error);
  }

}