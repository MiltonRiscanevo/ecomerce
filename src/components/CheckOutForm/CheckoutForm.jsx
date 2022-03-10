import {Button } from '@material-ui/core'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {useStateValue} from "../StateProvider"
import {actionTypes, getBasketTotal} from "../../reducer"
import accounting from "accounting"
import axios from 'axios'
import { useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useEffect } from 'react'

const CheckoutForm = ({nextStep, backStep}) => {
    const [{basket, paymentMessage} , dispatch] = useStateValue()
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)

    const handleSubmit= async(e) => {
        e.preventDefault()
        const {error, paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })
        
        setLoading(true)               
        
        if (!error) {
            const {id} = paymentMethod

            try {
                const {data} =await axios.post(
                    "http://localhost:3001/api/tok_us/checkout",
                {
                    id,
                    amount:getBasketTotal(basket) * 100,
                })
                dispatch({
                    type: actionTypes.SET_PAYMENTMESSAGE,
                    paymentMessage: data.message
                })
                if (data.message === "succesfull payment") {
                    dispatch({
                        type:actionTypes.EMPTY_BASKET,
                        basket:[]
                    })
                } 
                elements.getElement(CardElement).clear()
                nextStep()
            } catch (error) {
                console.log(error)
                nextStep()
            }
        }
        setLoading(false)
    }

    return (
    <form onSubmit={handleSubmit} >
        <CardElement/>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:"1rem"}}>
            <Button variant= 'outlined'  onClick={backStep}>
                Back
            </Button>
            <Button disabled={false} type="submit" variant= 'contained'  color="primary">
            {loading ?(<CircularProgress/>) :(`pay ${accounting.formatMoney(getBasketTotal(basket))}`) }
            </Button>
        </div>
        
    </form>
  )
}

export default CheckoutForm