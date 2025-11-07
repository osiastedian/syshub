import React from 'react'

/**
 * Component that shows a subtitle with h2
 * @component
 * @subcategory Global
 * @param {string} heading The content of the subtitle
 * @param {string} className Optional additional classes to apply
 * @param {boolean} highlightFirstWord Whether to highlight the first word in gold
 */
export default function SubTitle({heading, propsRef, className, highlightFirstWord}) {
  const classes = className ? `text-center ${className}` : 'text-center';

  const renderHeading = () => {
    if (!highlightFirstWord || !heading) return heading;

    const words = heading.split(' ');
    if (words.length === 0) return heading;

    const firstWord = words[0];
    const restOfText = words.slice(1).join(' ');

    return (
      <>
        <span style={{ color: '#FBB03B' }}>{firstWord}</span>
        {restOfText && <span> {restOfText}</span>}
      </>
    );
  };

  return (
    <h2 ref={propsRef} className={classes}>
      {renderHeading()}
    </h2>
  )
}
