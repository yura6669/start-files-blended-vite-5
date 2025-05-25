import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, exchangeCurrency } from "./operations";

const initialState = {
    baseCurrency: null,
    exchangeInfo: null,
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: "currency",
    initialState: initialState,
    extraReducers: (builder) => { 
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.baseCurrency = action.payload.results[0].annotations.currency.iso_code;
        }).addCase(getUserInfo.rejected, (state) => { state.baseCurrency = 'USD'; })
            .addCase(exchangeCurrency.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(exchangeCurrency.fulfilled, (state, action) => {
                state.isLoading = false;
                state.exchangeInfo = action.payload;
            }).addCase(exchangeCurrency.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        
    },
    reducers: {
        setBaseCurrency: (state, action) => { 
            state.baseCurrency = action.payload;
        },
    },
});

export const { setBaseCurrency } = slice.actions;
export const currencyReducer = slice.reducer;