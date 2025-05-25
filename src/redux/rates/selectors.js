import { createSelector } from "@reduxjs/toolkit";
import { selectFilterQuery } from "../filter/selectors";

export const selectRates = state => state.rates.rates;
export const selectIsLoading = state => state.rates.isLoading;
export const selectError = state => state.rates.error;

export const selectFilteredRates = createSelector(selectRates, selectFilterQuery, (rates, query) => { 
    if (!query) return rates;
    const lowerCaseQuery = query.toLowerCase();
    return rates.filter(rate => rate.key.toLowerCase().includes(lowerCaseQuery));
});