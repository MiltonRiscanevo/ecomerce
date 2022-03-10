import { useForm } from "react-hook-form"
import {Button, TextField, makeStyles, Grid} from "@material-ui/core"
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useStateValue} from "../StateProvider"
import { actionTypes } from "../../reducer";
import {Link} from 'react-router-dom'

const Styles= makeStyles({
  h1:{
    margin:"1rem"
  },
  container:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexWrap:"wrap"
  },
  textfield:{
    margin:2,
    width:"70%"
  },
  buttonsContainer:{
    marginTop:15,
    display: "flex",
    alignItems:"center",
    justifyContent:"center"
  }
})


const AddressForm = ({nextStep, backStep}) => {
  const {register,formState:{errors} , handleSubmit}=useForm()

  const classes = Styles()
  const [{shippingData},dispatch] = useStateValue()
  
  const onSubmit= (data) => {
    dispatch({
      type: actionTypes.SET_SHIPPINGDATA,
      shippingData: data,
    })
    nextStep()
  }
  return (
    <>
      <h1 className={classes.h1}>
        Dinos a donde quieres que te enviemos tu compra
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className={classes.container} container spacing={3} sm={12} md={12} xs={12}>
          <TextField className={classes.textfield} variant="outlined" required label="First Name" id="" aria-invalid={errors.firstname ? "true":"false"}
          {...register("firstname", {required: true})}/>
          {errors.name && errors.firstname.type === "required"
             && (<span role="alert">This is required</span>
            )
          }
          <TextField className={classes.textfield} variant="outlined" required label="Last Name" id="" aria-invalid={errors.lastname ? "true":"false"} {...register("lastname", {required: true})}/>
          {errors.name && errors.lastname.type === "required"
             && (<span role="alert">This is required</span>
            )
          }
          <TextField className={classes.textfield} variant="outlined" required label="Address"  id="" aria-invalid={errors.address ? "true":"false"} {...register("address1", {required: true})}/>
          {errors.name && errors.address.type === "required"
             && (<span role="alert">This is required</span>
            )
          }
          <TextField className={classes.textfield} variant="outlined" required label="Email"  id="" aria-invalid={errors.email ? "true":"false"} {...register("email", {required: true})}/>
          {errors.name && errors.email.type === "required"
             && (<span role="alert">This is required</span>
            )
          }
          <TextField className={classes.textfield} variant="outlined" required label="City"  id="" aria-invalid={errors.city ? "true":"false"} {...register("city", {required: true})}/>
          {errors.name && errors.city.type === "required"
             && (<span role="alert">This is required</span>
            )
          }
          <TextField className={classes.textfield} variant="outlined" required label="Postal Code"  id="" aria-invalid={errors.postcode ? "true":"false"} {...register("postcode", {required: true})}/>
          {errors.name && errors.postcode.type === "required"
             && (<span role="alert">This is required</span>
            )
          }
        </Grid>
          <Stack direction="row" spacing={2} className={classes.buttonsContainer}>
            <Button component={Link} to='/checkoutpage' variant="contained" startIcon={<AddShoppingCartIcon/>} color="secondary">Regresar al carrito</Button>
            <Button variant="contained" endIcon={<SendIcon/>} type="submit" color="primary" >Enviar</Button>  
          </Stack>
      </form>
    </>
  )
}

export default AddressForm