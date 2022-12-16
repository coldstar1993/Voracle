import React from "react";
import "./style.scss";
import "./style1280.scss";
import { useTranslation } from "react-i18next";
import roadIcon from "../assets/road.png";
// import roadLogo from "../assets/link-logo-btn.png";
import AwesomeSwiper from "react-awesome-swiper";

function Road() {
  let swiperRef = null;
  const { t } = useTranslation();
  const title = t("Road Map");
  const desc = t(
    "Go ahead with Plan & Courage & Persistence"
  );
  const data = [
    {
      year: "2022",
      envy: "Q4",
      text: [
        t("Got the ideas"),
        t("Core protocol design"),
        t("Join zkIgnite, Cohort 0"),
        t("Develop prototype based on Mina snarkyjs & zkCli work"),
      ],
    },
    {
      year: "2023",
      envy: "Q1",
      text: [
        t("Increase datasources"),
        t("Expand the network nodes"),
        t("Design the economic model"),
        t("Integrate Voracle Defi projects")
      ],
    }
  ];

  if (document.body.clientWidth <= 1779 && document.body.clientWidth > 750) {
    const swiperConfig = {
      // loop: true,
      // autoplay: {
      //   delay: 3000,
      //   stopOnLastSlide: false,
      //   disableOnInteraction: true,
      // },
      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: true,
      speed: 500,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // pagination: {
      //   el: ".swiper-pagination-team",
      //   bulletElement: "li",
      //   hideOnClick: true,
      //   clickable: true,
      // },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      // breakpoints: {
      //   640: {
      //     slidesPerView: 4,
      //     spaceBetween: 0
      //   }
      // },
      on: {
        slideChange: function () {},
      },
    };
    return (
      <section className="road m">
        <div className="road-con">
          <h2 className="title">{title}</h2>
          <p className="desc">{desc}</p>
          <div className="warp">
            <div className="team-con">
              <AwesomeSwiper
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ref={(ref) => (swiperRef = ref)}
                config={swiperConfig}
                className="team-swiper"
              >
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <ul className="swiperItemWrapper item1">
                      {data.slice(0, 2).map((item, index) => {
                        const { year, envy, text } = item;
                        return (
                            <li className="wrapItem" key={index}>
                              <h2 className="wrap-road-title">
                                {year}
                                <span>{envy}</span>
                              </h2>
                              <p className="wrap-road-info">
                                <img src={roadIcon} alt="" />
                              </p>
                              <div className="wrap-road-text">
                                {text.map((t, index) => (
                                    <p key={index}>{t}</p>
                                ))}
                              </div>
                            </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </AwesomeSwiper>

              {/*<div className="swiper-pagination"></div>*/}
            </div>
          </div>
        </div>
      </section>
    );
  }


  if (document.body.clientWidth <= 750) {
    const swiperConfig = {

      preloadImages: false,
      // Enable lazy loading
      lazy: true,
      speed: 500,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      on: {
        slideChange: function () {},
      },
    };
    return (
        <section className="road m phone">
          <div className="road-con">
            <h2 className="title">{title}</h2>
            <p className="desc">{desc}</p>
            <div className="warp">
              <div className="team-con">
                <AwesomeSwiper
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ref={(ref) => (swiperRef = ref)}
                    config={swiperConfig}
                    className="team-swiper"
                >
                  <div className="swiper-wrapper">
                    {data.map((item, index) => {
                      const { year, envy, text } = item;
                      return (
                        <div className="swiper-slide">
                          <div className="item" key={index}>
                            <h2 className="road-title">
                              {year}
                              <span>{envy}</span>
                            </h2>
                            <p className="road-info">
                              <img src={roadIcon} alt="" />
                            </p>
                            <div className="road-text">
                              {text.map((t, index) => (
                                <p key={index}>{t}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="swiper-pagination"></div>
                </AwesomeSwiper>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                {/*<div className="swiper-pagination"></div>*/}
              </div>
            </div>
          </div>
        </section>
    );
  }


  return (
    <section className="road">
      <div className="road-con">
        <div className="road-con-header">
          <h2 className="title">{title}</h2>
        </div>
        <p className="desc">{desc}</p>
        <ul className="warp">
          {data.map((item, index) => {
            const { year, envy, text } = item;
            return (
              <li className="item" key={index}>
                <h2 className="road-title">
                  {year}
                  <span>{envy}</span>
                </h2>
                <p className="road-info">
                  <img src={roadIcon} alt="" />
                </p>
                <div className="road-text">
                  {text.map((t, index) => (
                    <p key={index}>{t}</p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Road;
