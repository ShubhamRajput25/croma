import  {configureStore} from '@reduxjs/toolkit'
import productReducer from './slice/product'
const store = configureStore({
    reducer: {
        products: productReducer
    }
}) 

export default store
