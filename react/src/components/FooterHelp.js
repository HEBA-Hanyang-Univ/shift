import "assets/styles/Footer.scss";
import CloseBtn from "assets/images/FooterCloseBtn.svg";

const FooterHelp = ({ content, hideHelpSlide }) => {
  return (
    <div className="footerHelpContainer">
      <button className="footerHelpCloseBtn" onClick={hideHelpSlide}>
        <img src={CloseBtn} alt="help close btn"></img>
      </button>
      <div className="footerHelpText">
        {content}
      </div>
    </div>
  );
}

export default FooterHelp;