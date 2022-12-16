import "./style.scss";
import "./style1280.scss";
import "./style428.scss";
import { useTranslation } from 'react-i18next';
// import link from "../assets/link-icon.png";
import link3 from "../assets/join-link3.png";
import link4 from "../assets/join-link4.png";
import link7 from "../assets/join-link7.png";

function Join() {
  const { t } = useTranslation();
  const title = t("Please Reach Us Now.");

  return (
    <section className="join" id="Join">
      <div className="join-con">
        <h2 className="title">{title}</h2>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <div className="link-icon">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href='https://twitter.com/coldStar1993' target="_blank" rel="noreferrer"><img src={link3} alt="" /></a>
          <a href='https://discord.gg/' target="_blank" rel="noreferrer"><img src={link4} alt="" /></a>
          <a href='https://github.com/coldstar1993/v-Oracle' target="_blank" rel="noreferrer"><img src={link7} alt="" /></a>
        </div>
      </div>

      <div id="mainModalContainer" />
    </section>
  );
}

export default Join;
