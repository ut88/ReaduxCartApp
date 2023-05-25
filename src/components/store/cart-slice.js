import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice= createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalQuantity:0,
    },
    reducers:{
       addItemFromCart(state,action){
          const newItem=action.payload;
          const existingItem=state.items.find(item=>item.id===newItem.id);
          state.totalQuantity++;
          if(!existingItem){
            state.items.push({id:newItem.id,
              price:newItem.price
            ,quantity:1,totalPrice:newItem.price
        ,name:newItem.title});
          }else{
            existingItem.quantity=existingItem.quantity+1;
            existingItem.totalPrice=existingItem.totalPrice+newItem.price;
          }
       },
       removeItemFromCart(state,action){
        const id=action.payload;
        const existingItem =state.items.find(item=>item.id===id);
        state.totalQuantity--;
        if(existingItem.quantity===1){
          state.items=state.items.filter(item=>item.id!==id);
        }else{
          existingItem.quantity--;
          existingItem.totalPrice=existingItem.toatalPrice-existingItem.price;

        }
       }
    }
})

export const sendCartData=(cart)=>{

  return async(dispatch)=>{
    dispatch(
      uiActions.showNotification({
      status:'pending',
      title:'Sending...',
     message:'Sending cart data!',
    }))

    const sendRequest=async()=>{
      const response=await fetch('https://otp-project-ceb7f-default-rtdb.firebaseio.com/cart.json',{
        method:'PUT',
        body:JSON.stringify(cart),
      })
      if(!response.ok){
        throw new Error('Sending cart data')
      }
    }
     try{
       await sendRequest();
       dispatch(
        uiActions.showNotification({
        status:'success',
        title:'Success!',
       message:'Sent cart data successfully!',
      }))  
     }catch(error){
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error!',
       message:'Sent cart data failed!',
      }))
     }
  }
}

export const cartActions= cartSlice.actions;
const cartReducer =cartSlice.reducer;
export default cartReducer;