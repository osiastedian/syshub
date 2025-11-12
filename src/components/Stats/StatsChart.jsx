import React from 'react';
import './StatsChart.scss';

/**
 * StatsChart component - displays charts for stats visualization
 * @component
 * @category Stats
 */
const StatsChart = ({ data, title }) => {
  return (
    <div className="stats-chart">
      {title && <h3 className="stats-chart__title">{title}</h3>}
      {/* Chart implementation in future phase */}
    </div>
  );
};

export default StatsChart;
