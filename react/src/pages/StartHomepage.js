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
            <div className="userProfileBox">
              {/* TODO: 추 후 userName 삽입 */}
              <div className="userName">Username님</div>
              <button className="userNameModifyBtn">
                <img src={ModifyBtn} alt="modify button"></img>
              </button>
            </div>
	  <DropDown></DropDown>
          </div>
          <div className="SHProfileRight">
          
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
