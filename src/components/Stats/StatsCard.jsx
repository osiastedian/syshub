import React from 'react';
import './StatsCard.scss';

/**
 * StatsCard component - displays individual stat cards
 * @component
 * @category Stats
 */
const StatsCard = ({ label, value, unit }) => {
  return (
    <div className="stats-card">
      <p className="stats-card__label">{label}</p>
      <p className="stats-card__value">
        {value}
        {unit && <span className="stats-card__unit">{unit}</span>}
      </p>
    </div>
  );
};

export default StatsCard;
