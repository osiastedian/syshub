import React from 'react';
import './StatsGrid.scss';

/**
 * StatsGrid component - grid layout for stat cards
 * @component
 * @category Stats
 */
const StatsGrid = ({ children }) => {
  return (
    <div className="stats-grid">
      {children}
    </div>
  );
};

export default StatsGrid;
