import { createGlobalStyle } from "styled-components";
import PretendardWoff2 from 'assets/fonts/PretendardVariable.woff2';
import WantedWoff2 from 'assets/fonts/WantedSansVariable.woff2';


export default createGlobalStyle `
  @font-face {
    font-family: "Pretendard Variable";
    src: url(${PretendardWoff2}) format("woff2");
  }
  @font-face {
    font-family: "Wanted Sans Variable";
    src: url(${WantedWoff2}) format("woff2");
  }
`
