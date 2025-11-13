import React from 'react';
import PropTypes from 'prop-types';
import './StatsGrid.scss';

/**
 * StatsGrid component - responsive grid layout for stat cards
 * Provides 1→2→4 column responsive breakpoints
 *
 * @component
 * @category Stats
 * @example
 * <StatsGrid>
 *   <StatsCard label="Collateral" value="100,000" unit="SYS" />
 *   <StatsCard label="MN Cost" value="$99.01" />
 * </StatsGrid>
 */
const StatsGrid = ({ children, className = '' }) => {
  const gridClasses = ['stats-grid', className].filter(Boolean).join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

StatsGrid.propTypes = {
  /** Stat cards to display in the grid */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default StatsGrid;
