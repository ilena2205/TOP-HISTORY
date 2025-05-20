const ChartLegend = ({ categories, visibleCategories, toggleCategory, stringToColor }) => {
  return (
    <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
      {categories.map(item => {
        const color = stringToColor(item.name);
        const isVisible = visibleCategories[item.id];

        return (
          <div
            key={item.id}
            onClick={() => toggleCategory(item.id)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              opacity: isVisible ? 1 : 0.4,
              border: `1px solid ${color}`,
              borderRadius: 4,
              padding: '4px 8px',
              backgroundColor: isVisible ? color + '22' : 'transparent',
              transition: 'opacity 0.3s, background-color 0.3s',
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default ChartLegend;



