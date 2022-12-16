import React, { useEffect } from "react";
import AwesomeSwiper from "react-awesome-swiper";
import { useTranslation } from "react-i18next";
// import classnames from "classnames";
// import EconomicImg from "../assets/Economic.png";
// import applicationScenarioImg from "../assets/applicationScenario.png";
import "./style.scss";
import "./style1280.scss";
import "./style428.scss";

function EconomicModelApplicationScenario() {
  const { t } = useTranslation();
  // const [economicSwiperIndex, seteconomicSwiperIndex] = useState(1);
  let economicModelRef: any = null;
  let applicationScenarioRef = null;
  useEffect(() => {
    economicModelRef?.swiper?.on("slideChange", function () {
      for (let i = 1; i <= 5; i++) {
        document
          .querySelector(`.economic${i}`)
          ?.setAttribute("class", `economic${i} common`);
      }
      const index = economicModelRef.swiper.activeIndex;
      if (index === 6 || index === 1) {
        document
          .querySelector(`.economic5`)
          ?.setAttribute("class", `economic5 common hover`);
      }
      if (index === 2) {
        document
          .querySelector(`.economic4`)
          ?.setAttribute("class", `economic4 common hover`);
      }
      if (index === 3) {
        document
          .querySelector(`.economic3`)
          ?.setAttribute("class", `economic3 common hover`);
      }
      if (index === 4) {
        document
          .querySelector(`.economic2`)
          ?.setAttribute("class", `economic2 common hover`);
      }
      if (index === 5) {
        document
          .querySelector(`.economic1`)
          ?.setAttribute("class", `economic1 common hover`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const applicationScenario = {
    title: t("Application Scenario"),
    desc: t(
      "Voracle provides precise and reliable real-time off-chain data for all zkApps."
    ),
    swiper: [
      {
        title: t("Decentralized Finance"),
        desc: t(
          "Voracle in the future could provide precise and reliable real-time off-chain data for DeFi use cases such as decentralized stable coins, AMMs, lending, insurance, and financial derivatives. It provides convenient out-of-the-box stable infrastructure for the development of DeFi projects."
        ),
      },
      {
        title: t("Decentralized Identity"),
        desc: t(
          "Decentralized identity solutions provide secure, controllable, and portable digital identities, and offer one-stop solutions to wallet providers, verification providers, DAPP developers, and infrastructure providers."
        ),
      },
      {
        title: t("Internet of Things"),
        desc: t(
          "Data parameters captured by IoT devices can be used to trigger smart contracts and create new business models within supply chains, smart home industries identity confirmation and more. Voracle In the future can work as a secure middleware between these IoT devices and the blockchain. It can verify the data coming from IoT devices before delivering it to the blockchain."
        ),
      },
      {
        title: t("Prediction Market"),
        desc: t(
          "Decentralized prediction markets, such as Augur and Gnosis, use the wisdom of the crowd to predict real-world results, such as presidential elections and sports betting results."
        ),
      },
      {
        title: t("Games and NFTs"),
        desc: t(
          "In the future, Voracle can provide verifiable randomness on the chain which can be used to generate unpredictable gameplay scenarios in block chain games or enable the minting of NFTs."
        ),
      },
    ],
    swiperConfig: {
      loop: true,
      autoHeight: true,
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
      },
      preloadImages: false,
      lazy: true,
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    },
  };
  return (
    <>
      <section
        className="economicModelApplicationScenario applicationScenario"
        id="Application"
      >
        <div className="economicModelApplicationScenario-con">
          <h2 className="title">{applicationScenario.title}</h2>
          <p className="desc">{applicationScenario.desc}</p>
          <div className="economicModelApplicationScenario-warp">
            <div className="economicModelApplicationScenario-swiper applicationSwiper">
              <AwesomeSwiper
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ref={(ref) => (applicationScenarioRef = ref)}
                config={applicationScenario.swiperConfig}
                className="economicModelApplicationScenario-swiper-awesomeSwiper"
              >
                <div className="swiper-wrapper">
                  {applicationScenario.swiper.map((item, index) => {
                    const { title, desc } = item || {};
                    return (
                      <div className="swiper-slide" key={index}>
                        <h2 className="economicModelApplicationScenario-swiper-title">
                          {title}
                        </h2>
                        <p className="economicModelApplicationScenario-swiper-info"></p>
                        <p className="economicModelApplicationScenario-swiper-desc">
                          {desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="swiper-pagination"></div>
              </AwesomeSwiper>
            </div>
            <div className="applicationScenario-img">
              <span className="application img">{t('Voracle')}</span>
              <span className="line1"></span>
              <span className="line2"></span>
              <span className="line3"></span>
              <div className=" common application11">
                <span className="img"></span>
              </div>
              <div className="common application22">
                <span className="img"></span>
              </div>
              <div className="common application33">
                <span className="img"></span>
              </div>
              <div className="common application1">
                <span className=" img"></span>
                <span className=" text">{t('Financial Derivates')}</span>
              </div>
              <div className="common application2">
                <span className=" img"></span>
                <span className=" text">{t('Stable Coins')}</span>
              </div>
              <div className="common application3">
                <span className=" img"></span>
                <span className=" text">{t('Insurance')}</span>
              </div>
              <div className="common application4">
                <span className=" img"></span>
                <span className=" text">{t('Lending')}</span>
              </div>
              <div className="common application5">
                <span className=" img"></span>
                <span className=" text">{t('IOT')}</span>
              </div>
              <div className=" common application6">
                <span className=" img"></span>
                <span className=" text">{t('Prediction Marketr')}</span>
              </div>
              <div className="common application7">
                <span className=" img"></span>
                <span className=" text">{t('NFT')}</span>
              </div>
              <div className="common application8">
                <span className=" img"></span>
                <span className=" text">{t('DEX')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EconomicModelApplicationScenario;
