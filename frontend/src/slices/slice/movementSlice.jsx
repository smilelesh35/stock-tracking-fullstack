import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/movements/`
const getToken = () => {
    return localStorage.getItem("token")
}
export const addMovement = createAsyncThunk('movement/add',async (payload)=>{
    const token = getToken();
    const response = await axios.post(`${url}add` , {
            code: payload.code,
            type: payload.type,
            count: Number(payload.count),
            description: payload.description,

        },
        {
            headers: {
                Authorization: `Bearer ${token}`}
        }

    )
    return response.data
})
export const getMovement = createAsyncThunk('movement/get',async ()=>{
const token = getToken();
    const response = await axios.get(url ,{
        headers: {
           Authorization: `Bearer ${token}`
        }
    })
   return response.data
})


const initialState = {
    movements: [],
}
export const movementSlice = createSlice({
    name: "movementsSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addMovement.fulfilled, (state, action) => {
            state.movements.unshift(action.payload.movement);
        });
        builder.addCase(getMovement.fulfilled , (state,action)=>{
            state.movements = action.payload.movements
        });

    }
})

export default movementSlice.reducer;
