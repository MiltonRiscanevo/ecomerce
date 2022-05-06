import React from 'react'
import Accounting from 'accounting'
import { makeStyles} from '@material-ui/core'
import {useStateValue} from './StateProvider'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'20vh'
    },
    button:{
        marginTop:'2rem',
        textDecoration:'none',
        backgroundColor:'#D72701',
        fontSize: '20px',
        color:"white",
        padding:'10px',
        borderRadius:'30px'
    }
})


const Total = () => {
    const classes = useStyles()
    const [{basket}, dispatch]= useStateValue()
    const TotalPayment= basket.map(el=>parseInt(el.price)).reduce((prev, curr)=>prev + curr,0)

    return (
        <div className={classes.root}>
            <h5>Total items</h5>
            <h5>{Accounting.formatMoney(TotalPayment)}</h5>
            <Link to="/checkout">
                <button className={classes.button} >Check out</button>
            </Link>           
        </div>
    )
}

export default Total
