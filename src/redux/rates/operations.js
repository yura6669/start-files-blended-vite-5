import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';    

const ratesAPI = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: '1eSs6ywDkpaSvbQ8djSUQRpHcziIXfFB' },
});

export const latestRates = createAsyncThunk(
    'rates/latestRates',
    async (baseCurrency, {rejectWithValue}) => {
        try {
        const { data } = await ratesAPI.get(`/latest?symbols&base=${baseCurrency}`);
        return Object.entries(data.rates);
    } catch (e) {
        return rejectWithValue(e.message);
    }
}
);