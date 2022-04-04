
import { burger, find, options } from "../../../../lib";

export default async function handler(req, res) {

  try {
    const result = await find(
      burger,
      options
    )

    const { error, message } = result
    // console.log('listBurger', { error, message });

    res.status(200).json(result)
    return

  } catch (error) {
    console.log(error);
  }

}

