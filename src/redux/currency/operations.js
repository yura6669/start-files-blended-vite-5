import axios from 'axios';
import { getCurrentPosition } from '../../helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';

const exchangeAPI = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: '1eSs6ywDkpaSvbQ8djSUQRpHcziIXfFB' },
});

export const getUserInfo = createAsyncThunk(
  'currency/getCurrency',
    async (_, { rejectWithValue }) => {
        try { 
          const position = await getCurrentPosition();
          const { latitude, longitude } = position;
      const apiKey = 'd4683b09d0c94ec0aebf0b2e043decbf';
      const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;
      const { data } = await axios.get(urlPosition, {
        params: {
        key: apiKey,
        language: 'en',
      },
    });
  return data;
    } catch (e) {
      return rejectWithValue(e.message);
  }
  }
);

export const exchangeCurrency = createAsyncThunk(
    'currency/exchangeCurrency',
    async (credentials, { rejectWithValue }) => {
        try {
        const {
         data: { query, info, result },
        } = await exchangeAPI.get(`/convert`, {
        params: credentials,
    });
    return { ...query, rate: info.rate, result };
    } catch (e) {
        return rejectWithValue(e.message);
    }
}
);
