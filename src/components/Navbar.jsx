import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Logo2 from './images/Logo2.JPG'
import {makeStyles} from '@material-ui/core'
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {Link, useNavigate} from 'react-router-dom'
import {useStateValue} from './StateProvider'
import { auth } from '../firebase';
import { actionTypes } from '../reducer';

const styles= makeStyles(theme=>({
    root:{
        backgroundColor:"whitesmoke",
        color:"black",
    },
    imageContainer:{
        margin:"10px 0",
        width:"33.333%",
        height:"50%",
        marginLeft:10,
        [theme.breakpoints.down('sm')]:{
          width:'33.333%'
        }
    },
    image:{
        objectFit:'contain',
        width:"50%",
        height:"100%",
        display:"flex",
        alignItems:"flex-start",
        borderRadius:15,
        marginRight:10,
        [theme.breakpoints.down('sm')]:{
          width:'100%'
        }

    },
    buttonContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:"center",
        flexDirection:'column',
        margin:"10px",
        width:"33.333%",
        height:"100%",
        [theme.breakpoints.down('sm')]:{
          
        }
    },
    button:{
        width:"100%",
        height:"100%", 
        padding:10,
        paddingBottom:10,
        borderRadius:15,
    },
    grow:{
        fontSize:20,
        margin:10,
        textAlign:'center',
        [theme.breakpoints.down('sm')]:{
          fontSize:10,
          width:"33.333%",
          color:"#000000",
          fontWeight:'bold'
        }
    },
    container_nav:{
      display:'flex',
      justifyContent:'space-around',
      padding:15

    }
}))

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
        <div className={classes.container_nav}>
          <Link to='/' className={classes.imageContainer}>
            <IconButton >
              <img src={Logo2} alt="logo" className={classes.image} />
            </IconButton>
          </Link>
          
         
          <div   className={classes.grow}>
            Hola {user ? user.email+' en que te puedo ayudar' : 'registrate para tener el gusto de ayudarte' }
          </div>
          <div className={classes.buttonContainer}>
              <Link to='/signin'>
                <button variant="outlined" className={classes.button} onClick={handleOut} >
                    <strong>{user ? "Sign Out" : "Sign In"}</strong>
                </button>
              </Link>
              <Link to='/checkoutpage'>
                <IconButton aria-label='show car items' color='inherit'>
                    <Badge badgeContent={parseInt(basket.length)} color='secondary' style={{padding:10}}>
                        <ShoppingCart fontSize='large' color='primary'/>
                    </Badge>
                </IconButton>
              </Link>
              
            </div>
        </div>
      </div>
    </Box>
  );
}
