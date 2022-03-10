import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Stepper } from '@material-ui/core'
import { Step } from '@material-ui/core'
import { StepLabel } from '@material-ui/core'
import { useState } from 'react'
import AddressForm from  './AddressForm'
import PaymentForm from './PaymentForm'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import Confirmation from "./Confirmation"
import {useStateValue} from '../StateProvider'

const Styles = makeStyles((theme)=>({
  layout:{
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}))


const Checkout = () => {
  const [{paymentMessage}, dispatch] = useStateValue()
  const classes= Styles()
  const [activeStep, setActiveStep]= useState(0)
  const steps = ["Shipping address", "Payment details", "Confirmation"] 
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep)=> prevActiveStep - 1)
  const Form = ()=> activeStep === 0 ? <AddressForm nextStep={nextStep} backStep={backStep}/>: <PaymentForm nextStep={nextStep} backStep={backStep}/> 
  return (
      <main className={classes.layout}>
        <Paper>
          <Typography>
            CheckOut
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map(step=>(
              <Step key= {step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}  
          </Stepper>
          {activeStep === steps.length ? (<Confirmation message= {paymentMessage}/>) : (<Form step={activeStep}/>)}
        </Paper>
      </main>
  )
}

export default Checkout