import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import "./App.scss";
import Header from "./components/Header/Header";
import SocialLogin from "./pages/SocialLogin";
import KakaoCallback from "./components/Login/SocialLoginCallback"
import TOS from "./pages/TOS";
import Privacy from "./pages/Privacy";
import Error from "./pages/Error";

import StartHost from "./pages/LinkSender/StartHost";
import InfoHost from "./pages/LinkSender/InfoHost";
import MyIdentity from "./pages/LinkSender/MyIdentity";
import MyAspiration from "./pages/LinkSender/MyAspiration";
import PerceivedByOthers from "./pages/LinkSender/PerceivedByOthers";
import CompleteHost from "./pages/LinkSender/CompleteHost";

import StartGuest from "./pages/LinkReceiver/StartGuest";
import InfoGuest from "./pages/LinkReceiver/InfoGuest";
import SelectKeyword from "./pages/LinkReceiver/SelectKeyword";
import Reasoning from "./pages/LinkReceiver/Reasoning";
import OneLineDescription from "./pages/LinkReceiver/OneLineDescription";
import CompleteGuest from "./pages/LinkReceiver/CompleteGuest";

import ResultDashBoard from "./pages/Result/ResultDashBoard";
import Result from "./pages/Result/Result";
import HandleLogin from "./components/Login/HandleLogin";

function App() {
  const loginRequired = (pathname) => {
    if (pathname === "/login" || pathname === "/kakao_callback") return false;
    return true;
  };

  const [ username, setUsername ] = useState(undefined);

  const LoginCheck = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      if (loginRequired(pathname)) {
        HandleLogin(() => {
          setUsername(secureLocalStorage.getItem("name"));
        }, (pathname !== '/') ? pathname:undefined);
      }
    }, [pathname]);
  };

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <div className="App">
      <Router>
        <LoginCheck />
        <ScrollToTop />
        <Header name={username}/>
        <Routes>
          {/* Social Login Callback */}
          <Route path="/kakao_callback" element={<KakaoCallback/>}></Route>

          {/* LinkSender */}
          <Route path="/" element={<StartHost/>}></Route>
          <Route path="/login" element={<SocialLogin/>}></Route>
          <Route path="/host/info" element={<InfoHost/>}></Route>
          <Route path="/host/identity" element={<MyIdentity/>}></Route>
          <Route path="/host/aspiration" element={<MyAspiration/>}></Route>
          <Route path="/host/perception" element={<PerceivedByOthers/>}></Route>
          <Route path="/host/completion" element={<CompleteHost/>}></Route>

          {/* LinkReceiver */}
          <Route path="/guest" element={<StartGuest/>}></Route>
          <Route path="/guest/info" element={<InfoGuest/>}></Route>
          <Route path="/guest/keyword" element={<SelectKeyword/>}></Route>
          <Route path="/guest/reasoning" element={<Reasoning/>}></Route>  
          <Route path="/guest/description" element={<OneLineDescription/>}></Route>
          <Route path="/guest/completion" element={<CompleteGuest/>}></Route>

          {/* Result */}
          <Route path="/result/dashboard" element={<ResultDashBoard/>}></Route>
          <Route path="/result/detail" element={<Result/>}></Route>

          {/* Footer Links */}
          <Route path="/terms" element={<TOS/>}></Route>
          <Route path="/privacy" element={<Privacy/>}></Route>
          <Route path="/*" element={<Error/>}></Route>
        </Routes>
      </Router>
    </div>
  )
};

export default App;
