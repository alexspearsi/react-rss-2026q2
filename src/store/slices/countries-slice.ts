import { createSlice } from '@reduxjs/toolkit';

import { COUNTRIES } from '../../data/countries';

interface CountriesState {
  list: string[];
}

const initialState: CountriesState = {
  list: COUNTRIES,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
