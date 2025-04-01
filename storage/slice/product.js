import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState:{
        products: {}
    },
    reducers:{
        addProduct: (state, action) =>{
            state.products[action.payload[0]] = action.payload[1]
        },
        removeProduct: (state, action) =>{
          delete  state.products[action.payload]
        },

    } 
})

export const { addProduct, removeProduct } = productSlice.actions

export default productSlice.reducer