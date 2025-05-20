import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const exportToPNG = (chartInstance) => {
  if (chartInstance) {
    const base64Image = chartInstance.toBase64Image();
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = 'chart.png';
    link.click();
  }
};

export const exportToCSV = (chartData) => {
  if (!chartData || !chartData.labels || !chartData.datasets) return;

  const rows = [];
  const header = ['Date', ...chartData.datasets.map(ds => ds.label)];
  rows.push(header);

  chartData.labels.forEach((date, index) => {
    const row = [date];
    chartData.datasets.forEach(dataset => {
      row.push(dataset.data[index] !== null ? dataset.data[index] : '');
    });
    rows.push(row);
  });

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'chart.csv');
};