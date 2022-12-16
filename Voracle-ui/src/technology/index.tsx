import React from "react";
import "./style.scss";
import "./style1280.scss";
import "./style428.scss";
import { useTranslation } from 'react-i18next';
import classnames from "classnames";
import technology1Png from "../assets/technology1.png";
import technology2Png from "../assets/technology2.png";
import technology3Png from "../assets/technology3.png";
import technology4Png from "../assets/technology4.png";
import technology5Png from "../assets/technology5.png";

function Technology() {
  const { t } = useTranslation();
  const title = t("Technology Architecture");
  const desc =
    t("Voracle is an off-chain verifiable oracle platform powered by Mina-ZKapp. It provides reliable on-chain or off-chain data efficiently in a trustless manner.");
  const list = [
    {
      img: technology4Png,
      title: t("Data Consumer"),
      desc: t("Data consumers are zkApps that need to request&verify&utilize data.")
    },
    {
      img: technology1Png,
      title: t("Aggregator"),
      desc: t("The aggregator is a API Gateway for all requests from User Zkapps And forwards them to Node Operators.")
    },
    {
      img: technology5Png,
      title: t("Fetcher"),
      desc: t("Fetcher are nodes recieving the data requests from API Gateways and go obtaining external data then responding with data attached with their respective signature.")
    },
  ];

  return (
    <section className="technology" id='Technology'>
      <div className="technology-con">
        <h2 className="title" dangerouslySetInnerHTML={{__html:title}}></h2>
        <p className="desc">{desc}</p>
        <div className="con">
          <ul className="warp">
            {list.map((item) => {
              const { img, title, desc } = item;
              return (
                <li
                  key={item.title}
                  className="item"
                >
                  <div className={classnames("front")}>
                    <img src={img} alt="" />
                    <h2>{title}</h2>
                    <span className="info"></span>
                  </div>
                  <div className={classnames("back")}>
                    <span className="info"></span>
                    <p>{desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Technology;
