import React, {Fragment} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import CheckOutCard from './CheckOutCard'
import Total from './Total'
import {useStateValue} from './StateProvider'


const useStyles= makeStyles((theme)=>({
    root:{
        flexGrow:1,
        padding:"2rem"
    }
}))


const CheckOutPage = () => {
    const classes = useStyles()
    const [{basket}, dispatch]= useStateValue()
    function FormRow() {
        return (
            <Fragment>
                {basket?.map((item)=>(
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <CheckOutCard key={item.id} product={item}/>
                    </Grid>
                ))}
            </Fragment>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom variant='h4'>
                        Shopping Cart
                    </Typography>
                </Grid> 
                <Grid item xs={12} sm={8} md={9} container spacing={2}>
                    <FormRow/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography align='center' gutterBottom variant='h4'>
                        <Total/>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default CheckOutPage
