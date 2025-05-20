import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const res = await fetch('https://api.apptica.com/v1/geo?B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l');
  const data = await res.json();
  return data.data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: null,
  },
  reducers: {
    setSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        if (action.payload.length > 0 && !state.selectedCountry) {
          state.selectedCountry = action.payload[0].id;
        }
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
