import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/styles/LinkReceiver/OneLineDescription.scss";
import { GuestFooter } from "../../components/Footer/GuestFooter";
import TryFetch from "../../components/FetchComponent/FetchComponent";
import secureLocalStorage from "react-secure-storage";
import { loadDataWithExpiration } from "../../components/CookieUtils/SecureLocalStorageExtends";

const OneLineDescription = () => {
  const { tid } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("username");
  const [inputValue, setInputValue] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    setIsNextEnabled(inputValue.trim() !== "");
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const t = loadDataWithExpiration("epa_received_test");
    if (t === null || t === undefined || t.tid !== tid) {
      alert("잘못된 접근입니다. 다시 시도해주세요.");
      navigate("/");
    }
    setUsername(t.nickname);
  });

  const saveKeywords = () => {
    const rep = loadDataWithExpiration("epa_reply");
    if (rep === null || rep === undefined) {
       alert("잘못된 접근입니다. 다시 시도해주세요.");
       navigate("/");
    }
    rep.one_line_intro = inputValue;
    rep.tid = tid;

    const date = new Date();
    const options = { timeZone: 'Asia/Seoul', hour12: false };
    rep.reply_time = date.toLocaleString('en-US', options);
    TryFetch("save_epa_reply", "POST", rep, (data) => {
      secureLocalStorage.removeItem("epa_reply");
      secureLocalStorage.removeItem("epa_received_test");
    }, (error) => {
      alert("서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      navigate("/");
    });
  }

  return (
    <div id="Container">
      <div className="odWrapper">
        <div className="odTitleWrapper">
          <div className="odTitleTop">
            <div className="odTitlePurple">{username}</div>
            <div className="odTitleBlack">님은 한 줄로 소개하자면</div>
          </div>
          <br/>
          <div className="odTitleBlack">어떤 사람인가요?</div>
        </div>
        <div className="odInputWrapper">
          <span className="odInputTop">{username}은(는) </span>
          <br/>
          {/* TODO : 사용자 입력값 처리 */}
          <input className="odInputMiddle"  placeholder="사람이지만 그냥 돌인척 하는 애" value={inputValue} type="text" maxLength={30} onChange={handleInputChange}/>
          <br/>
          <span className="odInputBottom">이다.</span>
        </div>
        <div className="odExContainer">
          <div className="odExWrapper">
            <div className="odExTitle">
              <span>🫶 여러분을 도와줄 </span>
              <span style={{color: '#9C76AC'}}>예시</span>
              <span>입니다!</span>
            </div>
            <div className="odExBox">
              <div className="odEx1">
                <span className="odSpanBlack">홍길동은 </span>
                <span className="odSpanPurple">나이스한 미친놈</span>
                <span className="odSpanBlack">이다.</span>
              </div>
              <div className="odEx2">
                <span className="odSpanBlack">엄복동은 </span>
                <span className="odSpanPurple">김치찌개를 잘 끓이는 바보</span>
                <span className="odSpanBlack">이다.</span>
              </div>
              <div className="odEx3">
                <span className="odSpanBlack">신데렐라는 </span>
                <span className="odSpanPurple">12시까지 집에 가야하는 통금바보</span>
                <span className="odSpanBlack">이다.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GuestFooter 
        prevPageUrl={`/guest/reasoning/${tid}`}
        nextPageUrl={'/guest/completion/'}
        isNextEnabled={isNextEnabled}
        doBeforeNext={saveKeywords}
      />
    </div>
  )
};

export default OneLineDescription;