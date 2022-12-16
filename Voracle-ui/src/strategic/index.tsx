import React from "react";
import { useTranslation } from "react-i18next";

import "./style.scss";
import "./style428.scss";
import "./style1280.scss";

function Strategic() {
  const { t } = useTranslation();
  const title = t("Strategic Investors");
  const desc = t(
    "An investment in knowledge pays the best interest."
  );
  return (
    <section className="strategic" id="Strategic">
      <div className="strategic-con">
        <h2 className="title">{title}</h2>
        <p className="desc">{desc}</p>
        <ul className="strategic-logo">
          {new Array(21).fill("").map((url: string | undefined, index) => {
            const idx = index + 1;
            const colorImg = require(`../assets/Color/strategic${idx}.png`).default;
            const hoverImg = require(`../assets/Hover/strategic${idx}.png`).default;
            return (
              <li className="logo" key={`${index}`}>
                <span className='color' style={{backgroundImage:`url(${colorImg})`}}></span>
                <span className='hover' style={{backgroundImage:`url(${hoverImg})`}}></span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Strategic;
