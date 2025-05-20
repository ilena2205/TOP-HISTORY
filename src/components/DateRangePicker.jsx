import { useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../redux/chartDataSlice';

const DateRangePicker = () => {
  const dispatch = useDispatch();
  const dateFrom = useSelector((state) => state.chartData.dateFrom);
  const dateTo = useSelector((state) => state.chartData.dateTo);

  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  const handleChange = ([start, end]) => {
    dispatch(setDateRange({ startDate: start, endDate: end }));
  };

  const displayValue = useMemo(() => {
    const format = (date) => date?.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    const year = endDate?.getFullYear() || startDate?.getFullYear();
    return `${format(startDate)} - ${format(endDate)} ${year}`;
  }, [startDate, endDate]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'Arial',
    }}>
      <span>Период</span>
      <DatePicker
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        customInput={
          <button
            style={{
              padding: '4px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {displayValue}
          </button>
        }
      />
    </div>
  );
};

export default DateRangePicker;
