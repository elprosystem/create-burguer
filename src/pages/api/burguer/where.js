
//import { eLog } from "elog-console";
import { burger, findwhere, options } from "../../../../lib";



export default async function handler(req, res) {

  try {

    const where = req.body

    const result = await findwhere(
      burger,
      where
      //    whereIn: {
      //      burger_id: [1,2]
      // }
      // {
      //   where: {
      //     EQ: {
      //       burger_id: id//, burger_price: 2.41
      //     },
      //     // GT: {
      //     //   burger_price: 2.41
      //     // },
      //     // LIKE: {
      //     //   burger_name: '%Cow'
      //     // }
      //   },
      //   //    orwhere: { LTE: { burger_ounces: '250g' } }
      // }
      //  { burger_id: 4 }
      , options
    )

    res.status(200).json(result)

    return
  } catch (error) {
    console.log(error);
  }

}





