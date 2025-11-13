import React from 'react';
import PropTypes from 'prop-types';
import './StatsChart.scss';

/**
 * StatsChart component - wrapper for chart visualizations
 * Provides consistent container styling and layout for charts
 *
 * @component
 * @category Stats
 * @example
 * <StatsChart title="Total SentryNodes" className="stats-chart--blue">
 *   <HorizontalBarChart data={chartData} />
 * </StatsChart>
 */
const StatsChart = ({ children, title, className = '' }) => {
  const chartClasses = ['stats-chart', className].filter(Boolean).join(' ');

  return (
    <div className={chartClasses}>
      {title && <h3 className="stats-chart__title">{title}</h3>}
      <div className="stats-chart__container">
        {children}
      </div>
    </div>
  );
};

StatsChart.propTypes = {
  /** Chart content to display */
  children: PropTypes.node.isRequired,
  /** Optional title for the chart */
  title: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default StatsChart;
