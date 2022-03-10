import {Divider} from '@material-ui/core'
import Review from './Review'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js' 
import { Typography } from '@material-ui/core'
import CheckoutForm from './CheckoutForm'

const stripePromise= loadStripe("pk_test_51KbE1XIZJBIlDbGXvBpZuAKwtdiQgc6hTy0d1KjgaxcLXNEhqHLdV2SvjlarSs95cbNd1x1YB42TDOAKK1q6NWRo00NtXaWNhT")

const PaymentForm = ({nextStep, backStep}) => {
  return (
    <>
      <Review/>
      <Divider/>
      <Typography variant="h6" gutterBottom style={{margin:"20px 0"}} >Payment method</Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm nextStep={nextStep} backStep={backStep}/>
      </Elements>
    </>
  )
}

export default PaymentForm