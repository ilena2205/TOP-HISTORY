import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

import ChartHeader from './ChartHeader';
import ChartLegend from './ChartLegend';


const subID = {
  1: 'Top Free',
  2: 'Top Paid',
  3: 'Top Grossing',
  4: 'Top Free',
  5: 'Top Paid',
  6: 'Top Grossing',
  7: 'New Free',
  8: 'New Paid',
  9: 'Trending',
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

const ChartComponent = () => {
  const data = useSelector(state => state.chartData.data);
  const subcategories = useSelector(state => state.categories.subcategories);
  const categories = useSelector(state => state.categories.categories);
  const [visibleCategories, setVisibleCategories] = useState({});
  const chartRef = useRef(null);


  const datesSet = new Set();
  Object.values(data).forEach(subcatData =>
    Object.values(subcatData).forEach(dateValues =>
      Object.keys(dateValues).forEach(date => datesSet.add(date))
    )
  );
  const dates = Array.from(datesSet).sort();


  useEffect(() => {
    const initialVisible = {};
    Object.entries(data).forEach(([subcatId, subcatData]) => {
      const subcat = subcategories.find(s => s.id === Number(subcatId));
      const category = categories.find(c => c.id === Number(subcatId));
      const subcatName = subcat?.name || category?.name;
      Object.keys(subcatData).forEach(subId => {
        const label = `${subcatName} - ${subID[subId] || 'Unknown'}`;
        initialVisible[label] = true;
      });
    });
    setVisibleCategories(initialVisible);
  }, [data, subcategories, categories]);

  const datasets = [];

  Object.entries(data).forEach(([subcatId, subcatData]) => {
    const subcat = subcategories.find(s => s.id === Number(subcatId));
    const category = categories.find(c => c.id === Number(subcatId));
    const subcatName = subcat?.name || category?.name;

    Object.entries(subcatData).forEach(([subId, dateMap]) => {
      const label = `${subcatName} - ${subID[subId] || 'Unknown'}`;
      if (!visibleCategories[label]) return;

      const dataPoints = dates.map(date =>
        dateMap[date] !== undefined ? dateMap[date] : null
      );

      const color = stringToColor(label);

      datasets.push({
        label,
        data: dataPoints,
        borderColor: color,
        backgroundColor: color,
        spanGaps: true,
        tension: 0.3,
      });
    });
  });

  const chartData = {
    labels: dates,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      y: {
        reverse: true,
        min: 1,
        max: 200,
      },
    },
  };

  const toggleCategory = (label) => {
    setVisibleCategories(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <ChartHeader chartRef={chartRef} chartData={chartData}/>
      <Line data={chartData} ref={chartRef} options={options} />
      <ChartLegend
        categories={Object.keys(visibleCategories).map(label => ({ id: label, name: label }))}
        visibleCategories={visibleCategories}
        toggleCategory={toggleCategory}
        stringToColor={stringToColor}
      />
    </div>
  );
};

export default ChartComponent;





