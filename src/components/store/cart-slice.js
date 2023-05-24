import { createSlice } from "@reduxjs/toolkit";


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

export const cartActions= cartSlice.actions;
const cartReducer =cartSlice.reducer;
export default cartReducer;