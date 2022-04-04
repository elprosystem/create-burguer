import { useContext } from "react"
import { CreateBurguerContext } from "./index.js"


export const useCreateBurguerContext = () => {

  const context = useContext(CreateBurguerContext)

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useCreateBurguerContext was used outside of its Provider");
  }


  return context
}