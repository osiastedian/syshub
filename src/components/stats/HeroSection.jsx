import React from 'react';
import './HeroSection.scss';

/**
 * HeroSection component - Stats page hero section
 * Displays the main "SENTRYNODES STATS" heading
 * @component
 * @category Stats
 */
const HeroSection = () => {
  return (
    <div className="stats-hero-content d-flex flex-column align-items-center text-center">
      <h1 className="stats-hero__title">
        <span className="stats-hero__title-gold">SENTRYNODES </span>
        <span className="stats-hero__title-white">STATS</span>
      </h1>
    </div>
  );
};

export default HeroSection;
