import {configureStore} from '@reduxjs/toolkit';
import {productsSlice} from "./slice/productsSlice.jsx";
import {movementSlice} from "./slice/movementSlice.jsx";

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        movements : movementSlice.reducer,
    }
})
export default store;