import React from "react";
import SQ from "assets/images/SH_sq.svg";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const SideBarContent = ({icon, mainTitle, subTitle, h}) => {
  const settings = {
    infinite: false,
    speed: 500,
    arrow: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="sideBarContentBox">
      <div className="mainTitleBox">
        <img src={SQ}></img>
        <div className="mainTitle">Self-definition 자기정의</div>
      </div>
      {/* <div className="subTitleBox"> */}
        <Slider {...settings}>
          <div className="subTitle">
            Self-questioning (자기 이해)
          </div>
          <div className="subTitle">
            Self-define 자기 정의
          </div>
        </Slider>
      {/* </div> */}
    </div>
  );
}

export default SideBarContent;