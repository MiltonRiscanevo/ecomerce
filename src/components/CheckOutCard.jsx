import * as React from 'react';
import { makeStyles} from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Accounting from 'accounting'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IconButton } from '@material-ui/core';
import {useStateValue} from './StateProvider'
import {actionTypes} from '../reducer'





const styles=makeStyles((theme) =>({
    root: {
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        flexGrow:2,
        paddingLeft:12,
        paddingRight:12,
        paddingTop:12,
        marginTop:20
    },
    container:{
      display:"flex",
      justifyContent:"space-between",
      flexDirection:"row",
      flexWrap:"wrap",
      marginLeft:"8.33%",
      marginRight:"8.33%",
      padding:"auto"
    },
    rating:{
        display:"flex"
    }
}))

export default function CheckOutCard({
    product:{id, title, price, rating, image}
}) {
  
  const classes=styles()
  const [{basket}, dispatch]= useStateValue()

  const removeItem=()=>dispatch({
    type: actionTypes.REMOVE_ITEM,
    id: id,
  })

  return (
    
          <Card sx={{ maxWidth: 345, margin: 1 }} >
          <CardHeader
            action={
           <Typography
            variant='h5'
            color='textSecondary'
           >
             {Accounting.formatMoney(price)}
           </Typography>
           }
           title= {title}
           subheader="In stock"
          />
          <img
          component="img"
          height="194"
          src={image}
          alt=""
          style={{objectFit:'contain'}}
          />
          <CardActions disableSpacing className={classes.container}>
              <div className={classes.rating}>
                  {Array(rating).fill().map((_,i)=>(<p>&#11088;</p>))}
              </div> 
              <IconButton>
                  <DeleteRoundedIcon fontSize='large' onClick={removeItem} />
              </IconButton> 
           </CardActions>
          </Card>
        
        
       
  );
}
