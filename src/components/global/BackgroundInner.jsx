import React from 'react';


/**
 * Component for showing the Inner Backgrounds
 * @component
 * @subcategory Global
 * @param {string} type Type of the background wanted (A, B, clean, or default)
 *
 * REDESIGN NOTE: For homepage with clean black background (#0A0A0A), use type="clean"
 * to hide decorative purple gradient images and show only solid black background.
 */
const BackgroundInner = ({type}) => {
  // Clean black background for homepage (Phase 3.5 UX fix)
  if (type === 'clean') {
    return (
      <div className="main__backgrounds">
        <div className="main__gradient"></div>
        {/* No decorative background images - clean black background only */}
      </div>
    );
  }

  if (type === 'A') {
    return (
      <div className="main__backgrounds">
        <div className="main__gradient"></div>
        <div className="main__background main__background--top-right" style={{ backgroundImage: "url(/assets/images/main-background-top-right.png)" }}></div>
        <div className="main__background main__background--oval-top-right-secondary" style={{ backgroundImage: "url(/assets/images/main-background-oval-top-right-secondary.png)" }}></div>
        <div className="main__background main__background--top-left" style={{ backgroundImage: "url(/assets/images/main-background-top-left.png)" }}></div>
        <div className="main__background main__background--top-gradient" style={{ backgroundImage: "url(/assets/images/main-background-top.png)" }}></div>
        <div className="main__background main__background--half-oval-left" style={{ backgroundImage: "url(/assets/images/main-background-half-oval-left.png)" }}></div>
        <div className="main__background main__background--ornament-top-secondary" style={{ backgroundImage: "url(/assets/images/main-background-ornament-top-secondary.png)" }}></div>
        <div className="main__background main__background--wave-radar-bottom" style={{ backgroundImage: "url(/assets/images/main-background-wave-radar-bottom.png)" }}></div>
      </div>
    );
  }
  if (type === 'B') {
    return (
      <div className="main__backgrounds">
        <div className="main__gradient"></div>
        <div className="main__background main__background--top-right" style={{backgroundImage: "url(/assets/images/main-background-top-right.png)"}}></div>
        <div className="main__background main__background--oval-top-right-secondary" style={{backgroundImage: "url(/assets/images/main-background-oval-top-right-secondary.png)"}}></div>
        <div className="main__background main__background--top-left" style={{backgroundImage: "url(/assets/images/main-background-top-left.png)"}}></div>
        <div className="main__background main__background--top-gradient" style={{backgroundImage: "url(/assets/images/main-background-top.png)"}}></div>
        <div className="main__background main__background--half-oval-left" style={{backgroundImage: "url(/assets/images/main-background-half-oval-left.png)"}}></div>
        <div className="main__background main__background--wave-radar-bottom" style={{backgroundImage: "url(/assets/images/main-background-wave-radar-bottom.png)"}}></div>
      </div>
    );
  }

  return (
    <div className="main__backgrounds">
      <div className="main__gradient"></div>
      <div className="main__background main__background--top-right" style={{backgroundImage: "url(/assets/images/main-background-top-right.png)"}}></div>
      <div className="main__background main__background--top-left" style={{backgroundImage: "url(/assets/images/main-background-top-left.png)"}}></div>
      <div className="main__background main__background--top-gradient" style={{backgroundImage: "url(/assets/images/main-background-top.png)"}}></div>
    </div>
  );
}

export default BackgroundInner;