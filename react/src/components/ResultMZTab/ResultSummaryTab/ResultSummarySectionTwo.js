import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import useModal  from "../../Modal/UseModal"; 
import "../../../assets/styles/Result/Result.scss";
import ExitBtn from "../../../assets/images/delBtn.svg";

const ResultSummarySectionTwo = ({ keywordData, epaKeywords }) => {
  const { isOpen, openModal, closeModal } = useModal();
  // for set keyword in modal
  const [selectedKeyword, setSelectedKeyword] = useState();
  const username = keywordData.nickname;
  //TODO : Add logic to determine type of user
  const typeOfUser = "자기주장형"; // keyword

  const [selectNum, setSelectNum] = useState(0);
  const [anonymousNum, setAnonymousNum] = useState(0);
  const [selectedKeywordResponders, setSelectedKeywordResponders] = useState([]);

  const matchMyself = [...new Set(keywordData.replies.map((reply) => reply.keyword_in_myself).flat())]
  const selected = [...new Set(keywordData.replies.map((reply) => reply.keyword_selected).flat())]
  const boxData = {
    1: matchMyself,
    2: [...new Set(keywordData.replies.map((reply) => reply.keyword_not_in_myself).flat())],
    3: [...new Set(keywordData.keyword_myself.filter((keyword) => !matchMyself.includes(keyword)).flat())],
    4:[...new Set(keywordData.keyword_want.filter((keyword) => !selected.includes(keyword)).flat())],
  }

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);

    const num = Object.keys(epaKeywords).find((key) => epaKeywords[key] === keyword);
    let sNum = 0;
    let aNum = 0;;
    let responders = [];
    keywordData.replies.map((reply) => {
      if (reply.keyword_selected.includes(num)) {
        sNum++;
        if (reply.anonymous) {
          aNum++;
        } else {
          responders = [...responders, reply.nickname];
        }
      }
    });
    setSelectNum(sNum);
    setAnonymousNum(aNum);
    setSelectedKeywordResponders(responders);
    openModal();
  };

  return (
    <div className="rsSectionTwo">
      <div className="rsSectionTwoTitle">
        <span style={{color: "#A570C4"}}>{username}</span>
        <span>님은&nbsp;</span>
        <span style={{color: "#A570C4"}}>{typeOfUser}</span>
        <span>입니다</span>
      </div>
      <div className="rsSectionTwoLink">
          <Link to="/result">
            <button>
              <span>
                자세히 보기 {'>'}
              </span>
            </button>
          </Link>
      </div>
      <div className="rsSectionTwoGraphWrapper">
        <div className="rsSectionTwoGraphBox">
          <div className="rsSectionTwoGraph">
            <div className="colHeadOne">
              <span>
                내가 아는 나
              </span>
            </div>
            <div className="colHeadTwo">
              <span>
                내가 모르는 나
              </span>
            </div>
            <div className="rowHeadOne">
              <span>
                타인이<br/>아는 나
              </span>
            </div>
            <div className="rowHeadTwo">
              <span>
                타인이<br/>모르는 나
              </span>
            </div>
            <div className="contentBox">
              {Object.entries(boxData).map(([key, values], index) => (
                  <div className="content" key={index}>
                    {values.map((value, idx) => {
		                  const keyword = epaKeywords[value];
                      if (!keyword) {
		                    return null;
		                  }
                      return (
                      <div key={idx} className="keyword" onClick={() => handleKeywordClick(keyword)}>
                        <span>{keyword[1]} {keyword[0]}</span>
                      </div>
                    )})}                 
                  </div>
                ))}
            </div>
            {isOpen && (
              <Modal className="rsSectionKeywordModal" onClose={() => { closeModal() }} isOpen={isOpen} width={10.75}>
                <div className="keywordModalWrapper">
                  <div className="keywordModalContentBox">
                    <div className="keywordModalTitle">
                      <div className="keywordModalSelectedKeyword">
                        <span>{selectedKeyword[1]} {selectedKeyword[0]}</span>
                      </div>
                    </div>
                    <div className="keywordModalContent">
                      {/* TOOD: 선택한 사람 넣기 */}
                      <span className="totalNumOfSelectedKeyword">선택 총 {selectNum}명</span>
                      <span className="unknownNum">익명: {anonymousNum}명</span>
                      <div className="selectedKeywordResponders">
                        {
                          selectedKeywordResponders.map((responder, index) => (
                            <span key={index}>{responder}</span>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className="exitBtn">
                    <img src={ExitBtn} alt="exit" onClick={closeModal}/>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummarySectionTwo;
