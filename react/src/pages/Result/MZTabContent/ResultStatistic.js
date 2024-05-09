import React, { useState, useEffect } from "react";
import ResultStatisticSectionOne from "../../../components/ResultMZTab/ResultStatisticTab/ResultStatisticSectionOne";
import ResultStatisticSectionTwo from "../../../components/ResultMZTab/ResultStatisticTab/ResultStatisticSectionTwo";

const ResultStatistic = ({ data }) => {
  const [repliesInfo, setRepliesInfo] = useState([]);

  useEffect(() => {
    const repliesInfoTemp = [];
    data.replies.map((reply) => {

      // change reply_time to Date object
      const replyDate = new Date(reply.reply_time);
      const formattedReplyDate = replyDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).replace(/ /g, ".").replace(/,/g, "");

      repliesInfoTemp.push({
        gender: reply.gender,
        relationship: reply.relationship,
        anonymous: reply.anonymous,
        ageRange: reply.age_range,
        nickname: reply.nickname,
        replyTime: formattedReplyDate,
      });
    });
    setRepliesInfo(repliesInfoTemp);
  }, []);

  return (
    <div id="Container" className="rstContainer">
      <div className="rstWrapper">
        <ResultStatisticSectionOne 
          repliesInfo={repliesInfo}
        />
        <ResultStatisticSectionTwo 
          repliesInfo={repliesInfo}
        />
      </div>
    </div>
  );
}

export default ResultStatistic;