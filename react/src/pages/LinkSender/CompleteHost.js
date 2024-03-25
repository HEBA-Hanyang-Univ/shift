import React from "react";
import "../../assets/styles/LinkSender/CompleteHost.scss";
import { Button } from "../../components/Button/Button";
import CheckedImg from "../../assets/images/CheckedCircle.svg";
import KakaoImg from "../../assets/images/kakao.svg";
import InstaImg from "../../assets/images/insta.svg";
import LinkImg from "../../assets/images/linkImg.svg";

export const CompleteHost = () => {

  return (
    <div id="Container" className="chContainer">
      <div className="chImgWrapper">
        <img src={CheckedImg} alt="Completed img"></img>
      </div>
      <div className="chTextWrapper">
        <span className="chTextPurple">테스트가 완료되었습니다!</span>
        <span className="chTextBlackL">이제 링크를 지인들에게 공유하세요.</span>
        <span className="chTextBlackS">3명 이상 참여시 결과 확인이 가능합니다!</span>
      </div>
      <div className="chLinkShareWrapper">
        {/* TODO: 추후 링크 달기 */}
        <Button className="shareBtn" color="#FFF" width={3.92} height={3.92}>
          <img src={KakaoImg} alt="kakao share"></img>
        </Button>
        <Button className="shareBtn" color="#FFF" width={3.92} height={3.92}>
          <img src={InstaImg} alt="insta share"></img>
        </Button>
        <Button className="shareBtn" color="#FFF" width={3.92} height={3.92}>
          <img src={LinkImg} alt="link share"></img>
        </Button>        
      </div>
      <div className="chBtnWrapper">
        <Button className="chBtnGray chBtn" color="#EDEDED" width={8.4} height={2.5}>
          <span>이미지 저장</span>
        </Button>
        <Button className="chBtnPurple chBtn" color="#A570C4" width={8.4} height={2.5}>
          <span>결과 확인</span>
        </Button>
      </div>
    </div>
  )
};