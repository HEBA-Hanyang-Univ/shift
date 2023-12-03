import React from "react";
import ToDoImg from "assets/images/SideBarToDo.svg";
import DoneImg from "assets/images/SideBarAchieved.svg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'assets/styles/SideBar.scss';

const SideBarContent = ({mainImg, mainTitle, subTitle, isCompleted}) => {

  const image = isCompleted ? DoneImg : ToDoImg;
  // Dummy Data
  const contents = [
    { title: 'MBTI 성격 분석', link: '/' },
    { title: 'Glasser 욕구 검사', link: '/'},
    { title: '동기(1): 성공 실패 경험', link: '/'},
    { title: '동기(2): 장래희망 및 버킷리스트', link: '/' },
    { title: '가치관(1): 가치관 검사', link: '/' },
    { title: '가치관(2): 삶의 우선순위', link: '/'},
    { title: '가치관(3): 좌우명', link: '/'}
  ];           

  return (
    <>
      <div className="sideBarContentBox">
      <div className="mainTitleBox">
        <img src={mainImg} alt="mainTitle img"></img>
        <div className="mainTitle">{mainTitle}</div>
      </div>
      <Swiper navigation={true} modules={[Navigation]} className="subTitleBox">
        <SwiperSlide>
          <div className="subTitle">{subTitle}</div>
          <div className="sideBarContentListBox">
            <ul>
              {contents.map((content, index) => (
                <li key={index} className="sideBarContent">
                  <div className="sideBarContentWrap">
                    <img src={image} alt="state img"></img>
                    <Link to={content.link}className="contentTitle" >
                      <span>
                        {content.title}
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="sideBarLinkTree">
            <Link to={"/"} className="sideBarLink">
              SHIFT
            </Link>
            &nbsp;&nbsp;{">"}&nbsp;&nbsp;
            <Link to={"/"} className="sideBarLink">
              Self-definition (자기 정의)
            </Link>
            &nbsp;&nbsp;{">"}&nbsp;&nbsp;
            <Link to={"/"} className="sideBarLink">
              Self-questioning (자기이해) 
            </Link>
            <br />
            &nbsp;&nbsp;{">"}&nbsp;&nbsp;
            <Link to={"/"} className="sideBarLink">
              MBTI
            </Link>
          </div>
          <div className="sideBarBottom">
            © 2023 Metasequoia
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    </> 
  );
}

export default SideBarContent;