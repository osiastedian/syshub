import React, { useState } from "react";
import { Collapse } from "react-collapse";

const FaqItem = ({ faq, index }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  return (
    <div className="faq-item">
      <div
        className="wizard-head"
        style={{ cursor: "pointer" }}
        onClick={toggleActive}
      >
        <span>{index}</span>
        {faq.title}
      </div>
      <Collapse
        theme={{
          collapse: "ReactCollapse--collapse",
          content: "ReactCollapse--content wizard-body",
        }}
        onWork={console.log}
        isOpened={isActive}
        initialStyle={{ height: 0, overflow: "hidden" }}
      >
        <article
          className="answer-container"
          style={{
            width: "100%",
            padding: "20px",
            background: "#ffffff1f",
            borderRadius: "3px",
            WebkitBorderRadius: "3px",
            MozBorderRadius: "3px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{margin: "0 20px"}}
            dangerouslySetInnerHTML={{
              __html: faq.description,
            }}
          ></div>
        </article>
      </Collapse>
    </div>
  );
};

export default FaqItem;