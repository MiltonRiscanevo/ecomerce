import './App.css';
import NavBar from './components/Navbar'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ListProducts from './components/ListProducts';
import CheckOutPage from './components/CheckOutPage';
import Checkout from './components/CheckOutForm/Checkout'
import { useEffect } from 'react';
import { auth } from './firebase';
import { actionTypes } from './reducer';
import {useStateValue} from './components/StateProvider'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const [{user}, dispatch]= useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if (authUser) {
        dispatch({
          type:actionTypes.SET_USER,
          user: authUser,
        })
      }
    })
   }, [])
  

  return (
    <Router>
       <div className="App">
         <NavBar/>
         <Routes>
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/checkoutpage" element={<CheckOutPage/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/" element={<ListProducts/>} />
         </Routes>
      </div>
    </Router>
  );
}

export default App;
