import { Header } from "components/Header";
import "assets/styles/StartHomepage.scss";
import ModifyBtn from "assets/images/modifyBtn.svg";
import DropDown from "components/DropDown";

export const StartHomepage = () => {
  return (
    <>
    <Header></Header>
    <div id="SHWrap">
      <div id="SHContainer">
        <div className="SHProfile">
          <div className="SHProfileLeft">
            <div className="userProfileImg">
              {/* TODO: 추 후 userImg 삽입 */}
            </div>
            <div className="SHProfileContent">
              <div className="userProfileBox">
                {/* TODO: 추 후 userName 삽입 */}
                <div className="userName">깍두기응애응애응님</div>
                <button className="userNameModifyBtn">
                  <img src={ModifyBtn} alt="modify button"></img>
                </button>
              </div>
              <div className="dropDownBox">
                <DropDown></DropDown>
              </div>
            </div>
          </div>
          <div className="SHProfileRight">
            <div className="SHBtnBox">
              <button className="SHBtnPurple">
                <span>시작하기</span>
              </button>
              <button className="SHBtnWhite">
                <span>결과지 확인</span>
              </button>
            </div>
            <div className="lastModifiedDate">
              <span>마지막 수정일 : </span>
              <span>2023.09.30</span>
            </div>
          </div>
        </div>
        <div className="SHProgressText">
        </div>
      </div>
    </div>
    </>
  )
}
