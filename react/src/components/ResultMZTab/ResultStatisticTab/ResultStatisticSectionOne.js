import React from "react";
import "../../../assets/styles/Result/Result.scss";
import FEMALE_ICON from "../../../assets/images/statisticGenderFe.png";
import MALE_ICON from "../../../assets/images/statisticGenderMale.png";
import FAMILY_ICON from "../../../assets/images/statisticFamily.png";
import FRIEND_ICON from "../../../assets/images/statisticFriend.png";
import COWORKER_ICON from "../../../assets/images/statisticCoworker.png";
import COUPLE_ICON from "../../../assets/images/statisticCouple.png";
import UNKNOWN_ICON from "../../../assets/images/statisticUnknown.png";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

const colors = ['#F79090', '#F8B148', '#A4D5A3', '#BE6C6C', '#B7B6D5']

// TODO: the response data should be fetched from the server
const data = [
  {
    value: '10대',
    responsesByAge: 5,
  },
  {
   value: '20대',
    responsesByAge: 10, 
  },
  {
    value: '30대',
    responsesByAge: 3, 
  },
  {
    value: '40대',
    responsesByAge: 2,
  },
  {
    value: '50대',
    responsesByAge: 6,
  }
]

const ResultStatisticSectionOne = () => {

  return (
    <div className="rstSectionOneWrapper">
      <div className="rstSectionOneTitleBox">
        <span className="rstSectionOneTitle">총 응답자</span>
        <span className="rstSectionOneSubTitle">
          20명
        </span>
      </div>
      <div className="rstSectionOneContentWrapper">
        <div className="rstSectionOneContentBox rstGenderBox">
          <div className="rstGender">
            <div className="rstFemale">
              <img src={FEMALE_ICON} alt="female icon"/>
              <span>여성 8명</span>
            </div>
            <div className="rstMale">
              <img src={MALE_ICON} alt="male icon"/>
              <span>남성 12명</span>
            </div> 
          </div>
        </div>
        <div className="rstSectionOneContentBox rstRelationBox">
          <div className="rstRelation">
            <div className="rstRelationContent">
              <div className="rstImgWrapper">
                <img src={FAMILY_ICON} alt="family icon"/>
              </div>
              <span>가족 3명</span>
            </div>
            <div className="rstRelationContent">
              <div className="rstImgWrapper">
                <img src={FRIEND_ICON} alt="friend icon"/>
              </div>
              <span>친구 10명</span>
            </div>
            <div className="rstRelationContent">
              <div className="rstImgWrapper">
                <img src={COWORKER_ICON} alt="coworker icon"/>
              </div>
              <span>동료 10명</span>
            </div>
            <div className="rstRelationContent">
              <div className="rstImgWrapper">
                <img src={COUPLE_ICON} alt="couple icon"/>
              </div>
              <span>애인 0명</span>
            </div>
          </div>
        </div>
        <div className="rstSectionOneContentBox rstUnknownBox">
          <div className="rstUnknown">
            <img src={UNKNOWN_ICON} alt="unknown icon"/>
            <span>전체 응답자 중 8명은 익명으로 응답했어요!</span>
          </div>
        </div>
        <div className="rstSectionOneContentBox rstChartBox">
          <div className="rstChartTitle">
            <span>10대 여성이 가장 많이 응답했어요!</span>
          </div>
          <div className="rstChart">
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="value" tickLine={false} axisLine={{ stroke: '#9C76AC'}} interval={0} />
                <Bar dataKey="responsesByAge" barSize={19.8}>
                {
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))
                }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultStatisticSectionOne;