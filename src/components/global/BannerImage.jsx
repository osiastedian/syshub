import React from "react";

/**
 * Component to show the new banner of sysnode
 * @component
 * @subcategory Global
 * @param {*} props Direction to choose the image direction, heading is the title
 */

export default function BannerImage(props) {
    return (
        <section className="hero-section">
            <div className="hero-section__image">
                <img src={'/assets/images/masternode.png'} alt="" />
            </div>

            <div className="hero-section__content">
                <h1 className="hero-section__title">
                    {props.heading}
                </h1>
                
                {props.children}
            </div>
        </section>
    );
}
