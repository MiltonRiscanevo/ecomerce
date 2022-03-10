import {Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {useStateValue} from "../StateProvider"
import {getBasketTotal} from "../../reducer"
import accounting from "accounting"
import axios from 'axios'

const CheckoutForm = ({nextStep, backStep}) => {
    const [{basket} , dispatch] = useStateValue()
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit= async(e) => {
        e.preventDefault()
        const {error, paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })
        if (!error) {
            const {id} = paymentMethod
            try {
                const {data} =await axios.post(
                    "http://localhost:3001/api/checkout",
                {
                    id,
                    amount:getBasketTotal(basket) * 100,
                })
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
    <form onSubmit={handleSubmit} >
        <CardElement/>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:"1rem"}}>
            <Button variant= 'outlined'  onClick={backStep}>
                Back
            </Button>
            <Button disabled={false} type="submit" variant= 'contained'  color="primary">
            {`pay ${accounting.formatMoney(getBasketTotal(basket))}`}
            </Button>
        </div>
        
    </form>
  )
}

export default CheckoutForm