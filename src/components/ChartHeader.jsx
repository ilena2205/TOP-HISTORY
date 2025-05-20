import CountrySelect from './CountrySelect';
import ExportButtons from './ExportButtons';
import DateRangePicker from './DateRangePicker';

const ChartHeader = ({ chartRef, chartData }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '20px' }}>Top History</h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <ExportButtons chartRef={chartRef} chartData={chartData}/>
        <CountrySelect />
        <DateRangePicker />
      </div>
    </div>
  );
};

export default ChartHeader;



