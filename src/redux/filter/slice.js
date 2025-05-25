import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: null,
};

const slice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        changeFilter: (state, action) => { 
            state.query = action.payload;
        },
    },
}); 

export const { changeFilter } = slice.actions;
export const filterReducer = slice.reducer;