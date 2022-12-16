import React, { useState } from "react";
import "./style.scss";
import "./style1280.scss";
import "./style428.scss";
import emailImg from "../assets/email.png";
import { useTranslation } from "react-i18next";
import Config from "../Config";

function Foot() {
  const { t, i18n } = useTranslation();
  const [sendAlert, setSendAlert] = useState(false);
  const [isClick, setClick] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const about = {
    title: t("About Us"),
    desc: t(
      "Ares is an on-chain-verified oracle platform that provides secure and reliable data services for the Polkadot DeFi ecosystem."
    ),
    email: "info@aresprotocol.io",
    emailUrl: "mailto:info@aresprotocol.io",
    emailTip: t("emailTip"),
  };
  const alert = {
    title: t("alert-title"),
    desc: t("alert-desc"),
  };
  const link = {
    title: t("Quick Links"),
    list: [
      {
        name: t("Home"),
        url: "#Home",
      },
      {
        name: t("Technology"),
        url: "#Technology",
      },
      {
        name: t("Economics"),
        url: "#Economics",
      },
      {
        name: t("Application"),
        url: "#Application",
      },
      {
        name: t("Team Members"),
        url: "#Team",
      },
      {
        name: t("Strategic Investors"),
        url: "#Strategic",
      },
    ],
  };
  const resources = {
    title: t("Resources"),
    list: [
      {
        name: t("Documentation"),
        url: "https://github.com/coldstar1993/v-Oracle",
      },
      {
        name: t("Explorer"),
        url: "https://etherscan.io/token/0x358aa737e033f34df7c54306960a38d09aabd523",
      },
      {
        name: t("AresScan"),
        url: "https://aresscan.aresprotocol.io/ares",
      },
      {
        name: t("Warehouse"),
        url: "https://warehouseui.aresprotocol.io/",
      },
      {
        name: t("Gladios"),
        url: "https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer",
      },
    ],
  };
  const subscribe = {
    title: t("Subscribe"),
    desc: t("Subscribe and receive all news and information about Ares Protocol."),
    email: "name@company.com",
    emailBtn: t("Send"),
  };
  const copyright = "Copyright © 2021.The Ares Protocol All rights reserved.";

  const handleSubscribe = async () => {
    setClick(true)
    if (
      new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      ).test(emailValue)
    ) {
      const result = await (await fetch(Config.baseMailAPI + Config.subscribeAPI + "?email=" + emailValue)).json();
      if (result.status) {
        setSendAlert(true);
      } else {
        console.warn(result.message);
      }
    }
  }

  return (
    <section className="foot">
      <footer className="foot-con">
        <div className="about">
          <h2 className="foot-title">{about.title}</h2>
          <p className="about-desc">{about.desc}</p>
          <p className="about-email">
            <img src={emailImg} alt="" />
            <a href={about.emailUrl}>{about.email}</a>
          </p>
        </div>
        <div className="link">
          <h2 className="foot-title">{link.title}</h2>
          <ul className="link-con">
            {link.list.map((item, index) => {
              const { name, url } = item;
              return (
                <li className="link-item" key={index}>
                  <a
                    href={url}
                    target={url[0] === "#" ? "_self" : "_blank"}
                    rel="noreferrer"
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="link resources">
          <h2 className="foot-title">{resources.title}</h2>
          <ul className="link-con">
            {resources.list.map((item, index) => {
              const { name, url } = item;
              return (
                <li className="link-item" key={index}>
                  <a
                    href={url}
                    target={url[0] === "#" ? "_self" : "_blank"}
                    rel="noreferrer"
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="subscribe" id='sendEmail'>
          <h2 className="foot-title">{subscribe.title}</h2>
          <p className="subscribe-desc">{subscribe.desc}</p>
          <div className="send">
            <input
              type="text"
              placeholder={subscribe.email}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <span onClick={handleSubscribe}>
              {subscribe.emailBtn}
            </span>
          </div>
          {!new RegExp(
            "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
          ).test(emailValue) && isClick ? (
            <p className="emailTip">{about.emailTip}</p>
          ) : null}
        </div>
      </footer>
      <div className="copyright">
        <p>{copyright}</p>
      </div>
      {sendAlert ? (
        <div className="alert">
          <span
            className="alert-mask"
            onClick={() => {
              setSendAlert(false);
            }}
          ></span>
          <div className="alert-content">
            <span
              className="alert-close"
              onClick={() => {
                setSendAlert(false);
              }}
            >
              +
            </span>
            <h2 className="alert-title">{alert.title}</h2>
            <p className="alert-desc">{alert.desc}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Foot;
