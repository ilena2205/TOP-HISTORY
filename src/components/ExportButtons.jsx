
import { exportToCSV, exportToPNG } from '../utils/exportUtils';

const ExportButtons = ({ chartRef, chartData }) => {
  
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
  <button
    style={{
      padding: '4px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: '#fff',
      fontSize: '14px',
      cursor: 'pointer',
    }}
    onClick={() => exportToPNG(chartRef.current)}
  >
    PNG
  </button>
  <button
    style={{
      padding: '4px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: '#fff',
      fontSize: '14px',
      cursor: 'pointer',
    }}
    onClick={() => exportToCSV(chartData)}
  >
    CSV
  </button>
</div>
  );
};

export default ExportButtons;
