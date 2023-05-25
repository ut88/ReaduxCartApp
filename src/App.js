import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import Notification from './components/UI/Notification';

import { sendCartData } from './components/store/cart-slice';


let isInitial=true;

function App() {
  const dispatch=useDispatch();
 const showCart= useSelector(state=>state.ui.cartIsVisible)
 const cart= useSelector((state)=>state.cart)
 const notification=useSelector(state=>state.ui.notification)

 useEffect(()=>{
   dispatch(sendCartData(cart)) 
  if(isInitial) {
    isInitial=false;
    return;
  } 
 },[cart,dispatch])
  return (
    <Fragment>
      {notification &&    <Notification status={notification.status}
      title={notification.title}
      message={notification.message} />}
     <Layout>
     {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
