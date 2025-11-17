import React from 'react';
import PropTypes from 'prop-types';
import './StatsCard.scss';

/**
 * StatsCard component - displays individual stat cards
 * Reusable card for displaying statistics with optional secondary values and change indicators
 *
 * @component
 * @category Stats
 * @example
 * <StatsCard
 *   label="Total SYS"
 *   value="100,000"
 *   unit="SYS"
 *   subValue="$330.16"
 *   size="large"
 * />
 */
const StatsCard = ({
  label,
  value,
  unit,
  subValue,
  change,
  size = 'medium',
  className = ''
}) => {
  // Build CSS classes
  const cardClasses = [
    'stats-card',
    `stats-card--${size}`,
    className
  ].filter(Boolean).join(' ');

  const changeClasses = [
    'stats-card__change',
    change?.direction && `stats-card__change--${change.direction}`
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      <div className="stats-card__value-container">
        <p className="stats-card__value">
          {value}
          {unit && <span className="stats-card__unit"> {unit}</span>}
        </p>
        {subValue && (
          <p className="stats-card__subvalue">{subValue}</p>
        )}
      </div>
      <p className="stats-card__label">{label}</p>
      {change && (
        <span className={changeClasses}>
          {change.direction === 'up' && '↑ '}
          {change.direction === 'down' && '↓ '}
          {change.value}
          {change.percentage && '%'}
        </span>
      )}
    </div>
  );
};

StatsCard.propTypes = {
  /** Label for the stat (e.g., "Total SYS") */
  label: PropTypes.string.isRequired,
  /** Main value to display */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Optional unit (e.g., "SYS", "BTC") */
  unit: PropTypes.string,
  /** Optional secondary value */
  subValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Optional change indicator */
  change: PropTypes.shape({
    value: PropTypes.number,
    direction: PropTypes.oneOf(['up', 'down']),
    percentage: PropTypes.bool
  }),
  /** Card size variant */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Additional CSS classes */
  className: PropTypes.string
};

export default StatsCard;
