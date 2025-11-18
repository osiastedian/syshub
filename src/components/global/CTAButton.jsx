import React from 'react';
import PropTypes from 'prop-types';
import './CTAButton.scss';

/**
 * Reusable CTA Button component with configurable icon and background colors
 * @component
 * @subcategory Global
 * @param {Object} props
 * @param {string} props.background - Background color of the button (e.g., "gold", "transparent")
 * @param {string} props.iconColor - Color of the arrow icon (e.g., "black", "white")
 * @param {string} props.iconBackground - Background color of the icon circle (e.g., "white", "gold")
 * @param {React.ReactNode} props.children - Button text content
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.type - Button type (button, submit, reset)
 */
const CTAButton = ({
  background = 'gold',
  iconColor = 'black',
  iconBackground = 'white',
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...rest
}) => {
  // Map color names to actual hex values
  const colorMap = {
    gold: '#FBB03B',
    black: '#0A0A0A',
    white: '#FFFFFF',
    transparent: 'transparent',
  };

  const bgColor = colorMap[background] || background;
  const iconBgColor = colorMap[iconBackground] || iconBackground;
  const iconStrokeColor = colorMap[iconColor] || iconColor;

  return (
    <button
      type={type}
      className={`cta-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ '--cta-bg': bgColor }}
      {...rest}
    >
      <span className="cta-button__icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill={iconBgColor}/>
          <path d="M17.6191 11.9533L21.6658 16L17.6191 20.0466" stroke={iconStrokeColor} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.334 16H21.554" stroke={iconStrokeColor} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span className="cta-button__text">{children}</span>
    </button>
  );
};

CTAButton.propTypes = {
  background: PropTypes.string,
  iconColor: PropTypes.string,
  iconBackground: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default CTAButton;
