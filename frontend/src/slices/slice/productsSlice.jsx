import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:3000/products/'
const getToken = ()=>{
    return localStorage.getItem("token");
}

export const getProducts = createAsyncThunk("getProducts", async () => {
    const token = getToken();
    const response = await axios.get(API_URL,{
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
    return response.data.products ;
})
export const addProduct = createAsyncThunk("products/addProduct", async (payload) => {
    const token = getToken();

    const response = await axios.post(
        `${API_URL}add`,
        {
            name: payload.name,
            code: payload.code,
            stock: Number(payload.stock),
            category: payload.category,
            price: Number(payload.price),
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );

    return response.data.product;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId) => {
    const token = getToken();
    await axios.delete(`${API_URL}${productId}`, {

        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return productId
})
export const updateProduct = createAsyncThunk("products/updateProduct", async (editpayload) => {
    const token = getToken();
    const response = await axios.put(`${API_URL}${editpayload.id}`, {
        price: Number(editpayload.price),
    },{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data.product;

})


const initialState = {
    products: [],
    search:"",
    updatedProducts:[],

}
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },

    },
    extraReducers(builder) {
        builder.addCase(getProducts.fulfilled , (state, action) => {
            state.products = action.payload;

        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.products.unshift(action.payload);
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const updatedProducts = action.payload

            state.products = state.products.map((product) =>
            product.id === updatedProducts.id ? updatedProducts : product
            );
        })


    }
})


export const {setSearch} = productsSlice.actions;
export default productsSlice.reducer;
