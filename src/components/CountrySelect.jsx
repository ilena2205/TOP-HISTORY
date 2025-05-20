import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCountry } from '../redux/countriesSlice';

const CountrySelect = () => {
  const dispatch = useDispatch();
  const { countries, selectedCountry } = useSelector(state => state.countries);
  
  const handleChange = (e) => {
    dispatch(setSelectedCountry(e.target.value));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'Arial',
      }}
    >
      <span>Страна</span>
      <select
        value={selectedCountry}
        onChange={handleChange}
        style={{
            margin: 0,
            padding: '4px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            background: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
        }}
      >
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CountrySelect;


