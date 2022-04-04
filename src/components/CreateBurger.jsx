import { Box, Button } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { useCreateBurguerContext } from '../context/createBurguerProvider/useCreateBurguerContext.js'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie'
import { getBurguerStore } from '../utils/store.js';
import DeleteIcon from '@mui/icons-material/Delete';


const ingredientsSort = x => x.sort((a, b) => a.order - b.order)



// ......................................
//// CreateBurger
// ......................................

const CreateBurger = ({ clearAll }) => {

  const { createBurguer } = useCreateBurguerContext()

  const [burguer, setBurguer] = useState(createBurguer)


  useEffect(() => {

    (createBurguer && createBurguer.ingredients) && ingredientsSort(createBurguer.ingredients)

    setBurguer(createBurguer)

  }, [createBurguer])

  // console.log('CreateBurger....[rerender].........', burguer)


  return (

    <Box p={2} sx={{
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column', justifyContent: 'center', fontSize: '.75rem'
    }}>
      <div>
        <h2>Create Burger</h2>
      </div>
      {
        (burguer && burguer.ingredients) && (

          <>
            <div>
              <Button size="small" variant="contained" startIcon={<DeleteIcon />}
                onClick={() => clearAll()}>
                clear all
              </Button>

              <h4>{`Burguer: ${burguer.name}`}</h4>
              <h3>{`Price: ${burguer.price}`}</h3>
            </div>


            <ul>

              {burguer.ingredients.map(ingredient => (

                <li key={ingredient.name} > {ingredient.name && ingredient.name}

                  {ingredient.items.map(item => {

                    return (
                      <ul key={item.name}>

                        {
                          <>
                            <li> {`Name: ${item.name}    Quantity: ${item.quantity}   Price: ${item.quantity * item.price}`} </li>

                          </>

                        }
                      </ul>
                    )
                  }
                  )}

                </li>

              ))}

            </ul>


          </>

        )
      }
      {/* <pre>
        {JSON.stringify(burguer, null, 2)}
      </pre> */}

    </Box >

  )
}

export default memo(CreateBurger)

