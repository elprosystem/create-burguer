import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Stack } from '@mui/material';



const IngredientsItemsAction = ({ ingredientsItem, ingredientsActive, ingredientsEnabled, increment, decrement }) => {

  return (
    <Box p={2} sx={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Stack direction="row" spacing={2}>

        <Button size="small" variant="outlined" startIcon={<RemoveIcon />}
          disabled={ingredientsEnabled[ingredientsItem.items_name] && ingredientsEnabled[ingredientsItem.items_name]['quantity'] === 0
            ? ingredientsEnabled[ingredientsItem.items_name]['disabled'] : false}
          onClick={() => decrement(ingredientsItem, ingredientsActive)}>
          decrement
        </Button>


        <Box px={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', borderRadius: '15%' }}>
          {ingredientsEnabled[ingredientsItem.items_name] ? ingredientsEnabled[ingredientsItem.items_name]['quantity'] : 0}
        </Box>

        <Button size="small" variant="contained" endIcon={<AddIcon />}
          onClick={() => increment(ingredientsItem, ingredientsActive)}
          disabled={ingredientsEnabled[ingredientsItem.items_name] ? ingredientsEnabled[ingredientsItem.items_name]['disabled'] : false}>
          increment
        </Button>

      </Stack>

    </Box>
  )
}

export default IngredientsItemsAction