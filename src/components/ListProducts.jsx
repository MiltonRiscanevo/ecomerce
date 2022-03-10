import * as React from 'react';
import Grid from '@mui/material/Grid';
import Products from './Products';
import DataProduct from '../db/ProductData.json'
import {makeStyles} from '@material-ui/core/styles'

const useStyles= makeStyles((theme)=>({
  root:{
      flexGrow:1,
      padding:2
  }
}))

export default function ListProducts() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
      {DataProduct.map((item)=>(
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Products key={item.key} product={item} />
          </Grid>
      
      ))}
      </Grid>
    </div>
  );
}