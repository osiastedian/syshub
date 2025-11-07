import React from 'react'

/**
 * Component that shows a subtitle with h2
 * @component
 * @subcategory Global
 * @param {string} heading The content of the subtitle
 * @param {string} className Optional additional classes to apply
 */
export default function SubTitle({heading, propsRef, className}) {
  const classes = className ? `text-center ${className}` : 'text-center';
  return (
    <h2 ref={propsRef} className={classes}>
      {heading}
    </h2>
  )
}
