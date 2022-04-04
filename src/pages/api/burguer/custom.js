
import { burger, customQuery, find, findwhere, options } from "../../../../lib";

export default async function handler(req, res) {

  const query = req.query.customQuery

  try {
    const result = await customQuery(
      query
    )

    const { error, message } = result
    console.log('customQuery', { error, message });

    res.status(200).json(result)
    return

  } catch (error) {
    console.log(error);
  }

}
