import { createSlice } from "@reduxjs/toolkit";


createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalQuantity:0,
        toatalAmount:0,
    },
    reducers:{
       addItemFromCart(state,action){
          const item=action.payload;
          const existingItem=state.items.find(item=>item.id===newItem.id);
          if(!existingItem){
            state.items.push({itemId:newItem.id,price:newItem.price
            ,quantity:1,totalPrice:newItem.price
        ,name:newItem.title});
          }else{
            existingItem.quantity=existingItem.quantity+1;
            existingItem.totalPrice=existingItem.totalPrice+newItem.price;
          }
       },
       removeItemFromCart(){}
    }
})