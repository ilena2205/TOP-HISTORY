import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from './redux/countriesSlice';
import { fetchCategories } from './redux/categoriesSlice';
import { fetchChartData } from './redux/chartDataSlice';

import ChartComponent from './components/ChartComponent';

const App = () => {
  const dispatch = useDispatch();
  const { selectedCountry } = useSelector(state => state.countries);
  const { dateFrom, dateTo } = useSelector(state => state.chartData);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(fetchChartData({ countryId: selectedCountry, dateFrom, dateTo }));
    }
  }, [dispatch, selectedCountry, dateFrom, dateTo]);

  return (
    <div className="app">
      <ChartComponent />
    </div>
  );
};

export default App;

