import React from "react";
import SHIFT_LOGO from "../../assets/images/ShiftLogo.svg";
import SHIFT_ICON from "../../assets/images/ShiftIcon_transparent.png";
import META_SEQUOIA_ICON from "../../assets/images/MetaSequoia.png";

export const MainFooter = () => {
  return (
    <div className="footerContainer" style={{background:'white', lineHeight:'1.9rem'}}>
      <div className="footerWrapper" style={{overflowX:'hidden', margin:'1rem 0 0 1rem'}}>
        <div>
          <img src={SHIFT_LOGO} style={{width:'6rem'}}/>
        </div>
        <div style={{background:'white', display:'flex', justifyContent:'space-between'}}>
          <div>
            <div style = {{color: '#565656', fontSize:'0.6rem', fontFamily: 'Wanted Sans', fontWeight: '800', letterSpacing: 0.96, wordWrap: 'break-word'}}>
              <span style={{marginRight:'1.5rem'}}>대표 : 이유빈</span>
              <span>사업자등록번호 612-47-00768</span>
            </div>
            <div style={{color: '#565656', fontSize: '0.6rem', fontFamily: 'Wanted Sans', fontWeight: '400', letterSpacing: 0.96, wordWrap: 'break-word'}}>
              <div>경기도 수원시 광교중앙로 145 A1827</div>
              <div>통신판매업신고번호 2023-경기하남-0843</div>
            </div>
          </div>
          <div>
            <img src={SHIFT_ICON} style={{width:'6rem'}}/>
          </div>
        </div>
        <div style={{width: '100%', height: 0, border: '1px #E4E4E4 solid'}}></div>
        <div>
          <div style={{fontSize: '0.6rem', fontFamily: 'Wanted Sans', fontWeight: '500', letterSpacing: 0.96, wordWrap: 'break-word'}}>
            <span style={{color: '#818181', textAlign:'end'}}>Contact Us : godsaenglab@gmail.com</span>
            {/*<span style={{color: '#CACACA'}}>이용약관</span>
            <span style={{color: '#CACACA'}}>개인정보처리방침</span>*/}
          </div>
        </div>
        <div style={{width:'80%', display:'flex', justifyContent: 'space-between', color: '#5A5A5A', fontSize: '0.5rem', fontFamily: 'Wanted Sans', fontWeight: '500', letterSpacing: 0.78, wordWrap: 'break-word'}}>
          <div><img src={META_SEQUOIA_ICON} style={{height:'0.9rem'}}/></div>
          <div><span>ⓒ Metasequoia Corp. All rights reserved.</span></div>
        </div>
      </div>
    </div>
  )
};
  