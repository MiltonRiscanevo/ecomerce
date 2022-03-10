import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logo2 from './images/Logo2.JPG'
import {makeStyles} from '@mui/styles'
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom'
import {useStateValue} from './StateProvider'
import { auth } from '../firebase';
import { actionTypes } from '../reducer';
import { useNavigate } from 'react-router-dom';

const styles= makeStyles({
    root:{
        backgroundColor:"whitesmoke",
        color:"black",
    },
    imageContainer:{
        width:"25%",
        height:"50%",
        marginLeft:10
    },
    image:{
        width:"50%",
        height:"50%",
        display:"flex",
        alignItems:"flex-start",
        borderRadius:15,
        marginRight:10

    },
    buttonContainer:{
        marginLeft:"5%",
        width:"20%",
        height:"100%"
    },
    button:{
        width:"50%",
        height:"100%", 
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15,
    },
    grow:{
        flexGrow:1
    }
})

export default function Navbar() {

    const classes = styles()
    const [{basket, user}, dispatch]= useStateValue()
    const history = useNavigate()

    const handleOut= () =>{
      if (user) {
        auth.signOut()
        dispatch({
          type: actionTypes.EMPTY_BASKET,
          basket:[],
        });
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        })
        history('/')
      }
    }
  return (
    <Box >
      <div position="fixed" className={classes.root}>
        <Toolbar>
          <Link to='/'>
            <IconButton className={classes.imageContainer}>
              <img src={Logo2} alt="logo" className={classes.image} />
            </IconButton>
          </Link>
          
          <div className={classes.grow}/>
          <Typography variant="h6" component="p" color="textPrimary">
            Hola {user ? user.email+' en que te puedo ayudar' : 'registrate para tener el gusto de ayudarte' }
          </Typography>
          <div className={classes.buttonContainer}>
              <Link to='/signin'>
                <button variant="outlined" className={classes.button} onClick={handleOut} >
                    <strong>{user ? "Sign Out" : "Sign In"}</strong>
                </button>
              </Link>
              <Link to='/checkoutpage'>
                <IconButton aria-label='show car items' color='inherit'>
                    <Badge badgeContent={parseInt(basket.length)} color='secondary'>
                        <ShoppingCart fontSize='large' color='primary'/>
                    </Badge>
                </IconButton>
              </Link>
              
            </div>
        </Toolbar>
      </div>
    </Box>
  );
}
