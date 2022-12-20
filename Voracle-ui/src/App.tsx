import {lazy, Suspense, useEffect, useState} from "react";
import "./App.css";
import "./reset.css";
import "./global.css";
import Head from "./head/";
import Technology from "./technology";
import EconomicModelApplicationScenario from "./economicModelApplicationScenario";
import Road from "./road";
import Join from "./join";
import classnames from "classnames";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BinanceAccount } from "./demo/binance/account_verifier";

function App() {
  const [widgetShow, setWidgetShow] = useState(true);
  const [browserType, setBrowserType] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    const isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent);
    const isChrome = /chrome/i.test(userAgent);

    if (isSafari) {
        setBrowserType("safari");
    } else if (isChrome) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://crypto.com/price/static/widget/index.js";
        document.getElementById("root")?.appendChild(script);
        setBrowserType("chrome");
    }
  }, []);


  return (
      <>
        <BrowserRouter>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route exact path="/">
                <div
                    className={classnames(
                        "App",
                        window.screen.width <= 1279 ? "m" : ""
                    )}
                >
                  <Head/>
                  <Technology/>
                  <EconomicModelApplicationScenario/>
                  <Road/>
                  <Join/>
                  {
                    browserType === "chrome" &&
                      <div className="widget" style={{display: `${widgetShow ? "block" : "none"}`}}>
                        <div className="close">
                          <span onClick={() => setWidgetShow(!widgetShow)}>×</span>
                        </div>
                        <div id="crypto-widget-CoinList" data-design="classic" data-coins="ares-protocol"></div>
                      </div>
                  }
                </div>
              </Route>
              <Route exact path="/binanceAccountCheck">
                  <BinanceAccount />
              </Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </>
  );
}

export default App;
