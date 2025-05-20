import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const formatDate = (date) => date.toISOString().slice(0, 10);

export const fetchChartData = createAsyncThunk(
  'chartData/fetchChartData',
  async ({ countryId, dateFrom, dateTo }) => {
    const res = await fetch(`https://api.apptica.com/package/top_history/9379/${countryId}?date_from=${dateFrom}&date_to=${dateTo}&platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`);
    const data = await res.json();
    return data.data;
  }
);

const today = new Date();
const tenDaysAgo = new Date(today);
tenDaysAgo.setDate(today.getDate() - 10);

const chartDataSlice = createSlice({
  name: 'chartData',
  initialState: {
    data: {},
    loading: false,
    error: null,
    dateFrom: formatDate(tenDaysAgo),
    dateTo: formatDate(today),
  },
  reducers: {
    setDateRange(state, action) {
      const { startDate, endDate } = action.payload;
      state.dateFrom = startDate ? formatDate(startDate) : state.dateFrom;
      state.dateTo = endDate ? formatDate(endDate) : state.dateTo;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

export const { setDateRange } = chartDataSlice.actions;
export default chartDataSlice.reducer;
