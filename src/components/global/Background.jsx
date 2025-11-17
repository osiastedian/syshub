import React from 'react';

/**
 * Component for showing the Main Backgrounds
 * @component
 * @subcategory Global
 */
const Background = (props) => {
  const className = props.gradient === false ? 'main' : 'main main--gradient';

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default Background;
