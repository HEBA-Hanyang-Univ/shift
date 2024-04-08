import React, { useState, useEffect } from "react";
import "../../assets/styles/LinkReceiver/OneLineDescription.scss";
import { GuestFooter } from "../../components/Footer/GuestFooter";
  
// TODO : username 받아오기
 const OneLineDescription = ({username}) => {
   const [inputValue, setInputValue] = useState("");
   const [isNextEnabled, setIsNextEnabled] = useState(false); 

   useEffect(() => {
      setIsNextEnabled(inputValue.trim() !== "");
   }, [inputValue]);

   const handleInputChange = (e) => {
      setInputValue(e.target.value);
   };
  
   return (
    <div id="Container">
      <div className="odWrapper">
         <div className="odTitleWrapper">
            <div className="odTitleTop">
               {/* TODO : username 받아오기 */}
               <div className="odTitlePurple">{username}</div>
               <div className="odTitleBlack">님은 한 줄로 소개하자면</div>
            </div>
            <br/>
            <div className="odTitleBlack">어떤 사람인가요?</div>
         </div>
         <div className="odInputWrapper">
            {/* TODO : username 받아오기 */}
            <span className="odInputTop">{username}은 </span>
            <br/>
            {/* TODO : 사용자 입력값 처리 */}
            <input className="odInputMiddle"  placeholder="사람이지만 그냥 돌인척 하는 애" value={inputValue} onChange={handleInputChange}/>
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
         prevPageUrl={"/guest/reasoning"}
         nextPageUrl={"/guest/completion"}
         isNextEnabled={isNextEnabled}
      />
    </div>
   ) 
};

export default OneLineDescription;