import { useState, useEffect, ReactElement } from "react";
import "./style.scss";
import "./style1280.scss";
import "./style428.scss";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import logoImg from "../assets/logo.png";
import parityImg from "../assets/mina.webp";
import topImg from "../assets/top.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Head() {
  const { t, i18n } = useTranslation();
  const head = {
    desc: t("Voracle - Verifiable Oracle Platform Based On Mina"),
    farmsUrl: "https://trojan.aresprotocol.io/",
    farmBtnText: t("Startup"),
    uniswapUrl:
      "https://app.uniswap.org/#/swap?outputCurrency=0x358AA737e033F34df7c54306960a38d09AaBd523&use=V2",
    uniswapBtnText: t("Voracle Contracts"),
    parity: t("Voracle is based on Mina-zkApp"),
    substrateUrl: "https://www.parity.io/technologies/substrate/",
    substrateBtnText: "Substrate",
    navs: [
      {
        name: t("Networks"),
        children: [
          {
            name: t("BerkeleyTestnet"),
            url: "",
          },          
          {
            name: "DevnetTestnet",
            className: "aresProtocol",
            url: "",
          },
        ],
      },
      {
        name: t("Introduction"),
        children: [
          {
            name: t("Technology"),
            id: "Technology",
            url: "#Technology",
            minScrollTop: 998,
            maxScrollTop: 2051,
            minScrollTop1280: 759,
            maxScrollTop1280: 1562,
          },
          {
            name: t("Application"),
            id: "Application",
            url: "#Application",
            minScrollTop: 3097,
            maxScrollTop: 10000,
            minScrollTop1280: 2359,
            maxScrollTop1280: 10000,
          },
        ],
      },
      {
        name: t("About"),
        children: [
          {
            name: t("Documentation"),
            id: "Documentation",
            url: "https://github.com/coldstar1993/Voracle",
          },
          {
            name: t("Contact"),
            className: "Contact",
            url: "#Join",
          },
        ],
      },
      {
        name: "Apps",
        id: "Apps",
        url: "./binanceAccountCheck",
      },
    ],
    language: {
      select: [
        {
          name: "English",
          id: "en",
        },
        {
          name: "中文",
          id: "cn",
        }
      ],
      localIndex: 0,
    },
  };

  // const [addressSwitch, setAddressSwitch] = useState(true);
  const [mNav, setmNavSwitch] = useState(false);
  const [languageStatus, setlanguageStatus] = useState(false);
  const [scrollTop, setScroll] = useState(0);
  const [phone, setPhone] = useState(false);
  const [language, setlanguage] = useState(
    head.language.select[head.language.localIndex].name
  );
  const [navChildActive, setNavChildActive] = useState<null | number>(null);
  const [tips, setTips] = useState<null | Array<any>>(null);

  const fetchTips = async () => {
    const result = await (await fetch("/tips.json?t=" + new Date().getTime())).json();
    setTips(result);
  };

  useEffect(() => {
    const isPhone = window.screen.width <= 1279;
    isPhone && setPhone(isPhone);
    setScroll(
      document?.documentElement?.scrollTop || document?.body?.scrollTop
    );
    window.onscroll = () => {
      setScroll(
        document?.documentElement?.scrollTop || document?.body?.scrollTop
      );
    };
    document.body.onclick = (e) => {
      const navChildClassName = (e?.target as any)?.getAttribute("class");
      if (navChildClassName?.includes("nav-child") || navChildClassName?.includes("isShowLanguage")
          || navChildClassName?.includes("language-arrow"))
      {
        return;
      }
      setNavChildActive(null);
      setlanguageStatus(false);
    };
  }, []);

  const makeTips = () => {
    // {tips && tips.map(tip => {
    //   const ee = (<div>{tip.label}</div>)
    //   const e = ee as ReactElement;
    //   return e;
    // })}
    let tempArray = new Array<ReactElement>();
    if (tips) {
      tips.forEach(tip => {
        const e = (<div className="address" key={tip.id}>
          <a href={tip.link} target="_blank" rel="noreferrer">{tip.label}</a>
        </div>);
        tempArray.push(e as ReactElement);
      })
    }

    return tempArray;
  }

  return (
    <>
      <section className="head" id="Home">
        <div className={classnames("head-top", { fixed: !!scrollTop })}>
          {tips && (<div className="head-top-address">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={5000}
              showIndicators={false}
              showStatus={false}
              showThumbs={false}>{makeTips()}</Carousel>
          </div>)}
          {phone ? (
            <div className="mNav-warp">
              <div className="mNav">
                <a href="/" className="mlogo">
                  <img src={logoImg} alt="" />
                </a>
                <div
                  className="mnavbutton-con"
                  onClick={() => setmNavSwitch(true)}
                >
                  <span className="mnavbutton">-</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="head-top-nav">
              <div className="nav">
                <div className="nav-left">
                  <a href="/">
                    <img src={logoImg} alt="" />
                  </a>
                </div>
                <div className="nav-right">
                  <ul className="list">
                    {head.navs.map((nav, index) => {
                      const {
                        children,
                        name,
                        url,
                        id,
                        minScrollTop,
                        maxScrollTop,
                        minScrollTop1280,
                        maxScrollTop1280,
                      } = nav as any;
                      let active = null;
                      if (
                        window.screen.width >= 1280 &&
                        window.screen.width <= 1679
                      ) {
                        active =
                          minScrollTop1280 &&
                          scrollTop >= minScrollTop1280 &&
                          maxScrollTop1280 &&
                          scrollTop < maxScrollTop1280;
                      } else {
                        active =
                          minScrollTop &&
                          scrollTop >= minScrollTop &&
                          maxScrollTop &&
                          scrollTop < maxScrollTop;
                      }
                      return (
                        <li key={id || index}>
                          {children ? (
                            <div className="item">
                              <span
                                className="nav-child-text"
                                onClick={() =>
                                  setNavChildActive(
                                    navChildActive === index ? null : index
                                  )
                                }
                              >
                                {name}
                              </span>
                              <span
                                onClick={() =>
                                  setNavChildActive(
                                    navChildActive === index ? null : index
                                  )
                                }
                                className={classnames("nav-child-arrow", {
                                  top: navChildActive === index,
                                  bottom: navChildActive !== index,
                                })}
                              />
                              {navChildActive === index}
                              {navChildActive === index ? (
                                <div className="nav-child">
                                  {children.map((sNav: any, sindex: number) => {
                                    const {
                                      name,
                                      url,
                                      className,
                                      minScrollTop,
                                      maxScrollTop,
                                      minScrollTop1280,
                                      maxScrollTop1280,
                                    } = sNav as any;
                                    let active = null;
                                    if (
                                      window.screen.width >= 1280 &&
                                      window.screen.width <= 1679
                                    ) {
                                      active =
                                        minScrollTop1280 &&
                                        scrollTop >= minScrollTop1280 &&
                                        maxScrollTop1280 &&
                                        scrollTop < maxScrollTop1280;
                                    } else {
                                      active =
                                        minScrollTop &&
                                        scrollTop >= minScrollTop &&
                                        maxScrollTop &&
                                        scrollTop < maxScrollTop;
                                    }
                                    return (
                                      <a
                                        key={`${index}${sindex}`}
                                        className={classnames(
                                          "nav-child-item",
                                          className,
                                          {
                                            active,
                                          }
                                        )}
                                        href={url}
                                        target={
                                          url?.[0] === "#" ? "_self" : "_blank"
                                        }
                                        rel="noreferrer"
                                      >
                                        {name}
                                      </a>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <a
                              className={classnames("item", id, {
                                active,
                              })}
                              href={url}
                              target={url?.[0] === "#" ? "_self" : "_blank"}
                              rel="noreferrer"
                            >
                              {name}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="language">
                    <div className="language-name">
                      <span
                        className={classnames("one", {
                          isShowLanguage: languageStatus,
                        })}
                        onClick={(e) => {
                          setlanguageStatus(!languageStatus);
                        }}
                      >
                        {
                          language
                          // === "EN" ? "EN" : "CN"
                        }
                      </span>
                      {languageStatus ? (
                          <div className="language-dropdown">
                            {
                              head.language.select
                                  .filter((item, index) => item.name !== language)
                                  .map((item, index) => {
                                    return <span
                                        key={`language-${index}`}
                                        className={`two ${index !== 0 ? "three" : ""}`}
                                        onClick={(e) => {
                                          setlanguageStatus(!languageStatus);
                                          if ((e.target as any).innerText === "English") {
                                            head.language.localIndex = 0;
                                          } else if ((e.target as any).innerText === "中文") {
                                            head.language.localIndex = 1;
                                          }
                                          const language =
                                              head.language.select[head.language.localIndex]
                                                  .name;


                                          document
                                              .querySelector("#root")
                                              ?.setAttribute(
                                                  "class",
                                                  head.language.select[head.language.localIndex]
                                                      .id
                                              );

                                          setlanguage(language);
                                          setlanguageStatus(!languageStatus);
                                          i18n.changeLanguage(
                                              head.language.select[head.language.localIndex].id
                                          );
                                        }}
                                    >
                                      {item.name}
                                    </span>
                                  })
                            }
                          </div>
                      ) : null}
                    </div>
                    <span
                      onClick={(e) => {
                        setlanguageStatus(!languageStatus);
                      }}
                      className={classnames("language-arrow", {
                        top: languageStatus,
                        bottom: !languageStatus,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {mNav ? (
          <div className={classnames("mNav-con", { isAddress: Boolean(tips) })}>
            <div className="mNav-list">
              <ul className="list">
                {head.navs.map((nav, index) => {
                  const {
                    children,
                    name,
                    url,
                    id,
                    minScrollTop,
                    maxScrollTop,
                    minScrollTop1280,
                    maxScrollTop1280,
                  } = nav as any;
                  let active = null;
                  if (
                    window.screen.width >= 1280 &&
                    window.screen.width <= 1679
                  ) {
                    active =
                      minScrollTop1280 &&
                      scrollTop >= minScrollTop1280 &&
                      maxScrollTop1280 &&
                      scrollTop < maxScrollTop1280;
                  } else {
                    active =
                      minScrollTop &&
                      scrollTop >= minScrollTop &&
                      maxScrollTop &&
                      scrollTop < maxScrollTop;
                  }
                  return (
                    <li key={id || index}>
                      {children ? (
                        <div className="item">
                          <div className="nav-child-left">
                            <span
                              className="nav-child-text"
                              onClick={() =>
                                setNavChildActive(
                                  navChildActive === index ? null : index
                                )
                              }
                            >
                              {name}
                            </span>
                            <span
                              onClick={() =>
                                setNavChildActive(
                                  navChildActive === index ? null : index
                                )
                              }
                              className={classnames("nav-child-arrow", {
                                top: navChildActive === index,
                                bottom: navChildActive !== index,
                              })}
                            />
                          </div>
                          {navChildActive === index ? (
                            <div className="nav-child">
                              {children.map((sNav: any, sindex: number) => {
                                const {
                                  name,
                                  url,
                                  className,
                                  minScrollTop,
                                  maxScrollTop,
                                  minScrollTop1280,
                                  maxScrollTop1280,
                                } = sNav as any;
                                let active = null;
                                if (
                                  window.screen.width >= 1280 &&
                                  window.screen.width <= 1679
                                ) {
                                  active =
                                    minScrollTop1280 &&
                                    scrollTop >= minScrollTop1280 &&
                                    maxScrollTop1280 &&
                                    scrollTop < maxScrollTop1280;
                                } else {
                                  active =
                                    minScrollTop &&
                                    scrollTop >= minScrollTop &&
                                    maxScrollTop &&
                                    scrollTop < maxScrollTop;
                                }
                                return (
                                  <a
                                    key={`${index}${sindex}`}
                                    className={classnames(
                                      "nav-child-item",
                                      className,
                                      {
                                        active,
                                      }
                                    )}
                                    href={url}
                                    target={
                                      url?.[0] === "#" ? "_self" : "_blank"
                                    }
                                    rel="noreferrer"
                                  >
                                    {name}
                                  </a>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <a
                          className={classnames("item", id, {
                            active,
                          })}
                          href={url}
                          target={url?.[0] === "#" ? "_self" : "_blank"}
                          rel="noreferrer"
                        >
                          {name}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="language">
                <div className="language-name">
                  <span
                    className={classnames("one", {
                      isShowLanguage: languageStatus,
                    })}
                    onClick={(e) => {
                      setlanguageStatus(!languageStatus);
                    }}
                  >
                    {language}
                  </span>
                  {languageStatus ? (
                      head.language.select
                          .filter((item, index) => item.name !== language)
                          .map((item, index) => {
                            return <span
                                key={item.name}
                                className={`two ${index !== 0 ? "three" : ""}`}
                                onClick={(e) => {
                                  setlanguageStatus(!languageStatus);
                                  if ((e.target as any).innerText === "English") {
                                    head.language.localIndex = 0;
                                  } else if ((e.target as any).innerText === "中文") {
                                    head.language.localIndex = 1;
                                  } else if ((e.target as any).innerText === "Español") {
                                    head.language.localIndex = 2;
                                  } else if ((e.target as any).innerText === "日本語") {
                                    head.language.localIndex = 3;
                                  } else if ((e.target as any).innerText === "Русский") {
                                    head.language.localIndex = 4;
                                  } else if ((e.target as any).innerText === "한국어") {
                                    head.language.localIndex = 5;
                                  } else if ((e.target as any).innerText === "العربية") {
                                    head.language.localIndex = 6;
                                  } else if ((e.target as any).innerText === "Українська") {
                                    head.language.localIndex = 7;
                                  } else if ((e.target as any).innerText === "Français") {
                                    head.language.localIndex = 8;
                                  } else if ((e.target as any).innerText === "Türkçe") {
                                    head.language.localIndex = 9;
                                  }
                                  const language =
                                      head.language.select[head.language.localIndex]
                                          .name;

                                  document
                                      .querySelector("#root")
                                      ?.setAttribute(
                                          "class",
                                          head.language.select[head.language.localIndex]
                                              .id
                                      );

                                  setlanguage(language);
                                  setlanguageStatus(!languageStatus);
                                  i18n.changeLanguage(
                                      head.language.select[head.language.localIndex].id
                                  );
                                }}
                            >
                              {item.id.toUpperCase()}
                            </span>
                          })
                  ) : null}
                </div>
                <div
                  onClick={(e) => {
                    setlanguageStatus(!languageStatus);
                  }}
                  className={classnames("language-arrow", {
                    top: languageStatus,
                    bottom: !languageStatus,
                  })}
                />
              </div>
            </div>
            <span className="mNav-close" onClick={() => setmNavSwitch(false)}>
              +
            </span>
          </div>
        ) : null}
        <header className="head-con">
          <div className="head-content">
            <div className="head-warp">
              <p className="content-desc">{head.desc}</p>
              <div className="substrat">
                {window.screen.width ? (
                  <div className="substratLogo-con">
                    <img className="substratLogo" src={parityImg} alt="" />
                  </div>
                ) : (
                  <img className="substratLogo" src={parityImg} alt="" />
                )}
                <span className="parity">{head.parity}</span>
                {/* <a
                  className="substrateBtnText"
                  href={head.substrateUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {head.substrateBtnText}
                </a> */}
              </div>
            </div>
          </div>
          <div className="head-content-line"></div>
        </header>
        <img
          className={classnames("toTop", { active: scrollTop >= 500 })}
          src={topImg}
          alt=""
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        />
      </section>
    </>
  );
}

export default Head;
