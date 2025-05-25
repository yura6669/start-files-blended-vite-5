import { createSlice } from "@reduxjs/toolkit";
import { latestRates } from "./operations";

const initialState = {
    rates: [],
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: "rates",
    initialState: initialState,
    extraReducers: (builder) => { 
        builder.addCase(latestRates.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(latestRates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.rates = action.payload;
                state.rates =  state.rates.filter(([key]) => key !== state.baseCurrency);
                state.rates = state.rates.map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
            })
            .addCase(latestRates.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
             })
    },
});

export const ratesReducer = slice.reducer;