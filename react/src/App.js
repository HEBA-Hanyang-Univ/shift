import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.scss";
import Header from "./components/Header/Header";
import SocialLogin from "./pages/SocialLogin";
import KakaoCallback from "./components/Login/SocialLoginCallback"
import TOS from "./pages/TOS";
import Privacy from "./pages/Privacy";
import Error from "./pages/Error";
import Landing from "./pages/Landing";

import StartHost from "./pages/LinkSender/StartHost";
import InputName from "./pages/LinkSender/InputName";
import InputAge from "./pages/LinkSender/InputAge";
import InputGender from "./pages/LinkSender/InputGender";
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

import secureLocalStorage from "react-secure-storage";
import { loadDataWithExpiration, saveDataWithExpiration } from "./components/CookieUtils/SecureLocalStorageExtends";

function App() {

  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [shouldHideHeader, setShouldHideHeader] = useState(false);

  // Check if user has visited landing page
  useEffect(() => {
    const hasVisitedLanding = loadDataWithExpiration("hasVisitedLanding");
    if (!hasVisitedLanding && location.pathname === "/") {
      navigate("/landing");
    }
  }, [location, navigate]);

  // Hide header on certain paths
  useEffect(() => {
    // const hideHeaderPaths = ["/guest", "/host", "/landing"];
    const hideHeaderPaths = ["/landing", "/host"];
    const shouldHide = hideHeaderPaths.some(path => location.pathname.startsWith(path));
    const storedHideHeader = loadDataWithExpiration("hideHeader");
    const isHeaderHidden = shouldHide || storedHideHeader === "true";
    setShouldHideHeader(isHeaderHidden);
    saveDataWithExpiration("hideHeader", isHeaderHidden);
  }, [location.pathname]);

  // set Screen Size
  useEffect(() => {
    function setScreenSize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
      setScreenSize();
      window.addEventListener('resize', setScreenSize);
      
      return () => window.removeEventListener('resize', setScreenSize);
    }, []);

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  //TODO : Should change version checking method
  const CheckData = () => {
    const version = secureLocalStorage.getItem("storageVersion");
    if (version !== process.env.REACT_APP_STORAGE_VERSION) {
      secureLocalStorage.clear();
      secureLocalStorage.setItem("storageVersion", process.env.REACT_APP_STORAGE_VERSION);
    }
  };

  return (
    <>
      <CheckData />
      <ScrollToTop />
      {!shouldHideHeader && <Header />}
      <AnimatePresence mode="wait">
        <motion.div 
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
        <Routes location={location} key={location.pathname}>
          {/* Social Login Callback */}
          <Route path="/kakao_callback" element={<KakaoCallback/>}></Route>

          {/* LinkSender */}
          <Route path="/" element={<StartHost/>}></Route>
          <Route path="/landing" element={<Landing/>}></Route>
          <Route path="/login" element={<SocialLogin/>}></Route>
          <Route path="/host/info" element={<InputName/>}></Route>
          <Route path="/host/info/age" element={<InputAge/>}></Route>
          <Route path="/host/info/gender" element={<InputGender/>}></Route>
          <Route path="/host/identity" element={<MyIdentity/>}></Route>
          <Route path="/host/aspiration" element={<MyAspiration/>}></Route>
          <Route path="/host/perception" element={<PerceivedByOthers/>}></Route>
          <Route path="/host/completion" element={<CompleteHost/>}></Route>

          {/* LinkReceiver */}
          <Route path="/guest/:tid" element={<StartGuest/>}></Route>
          <Route path="/guest/info/:tid" element={<InfoGuest/>}></Route>
          <Route path="/guest/keyword/:tid" element={<SelectKeyword/>}></Route>
          <Route path="/guest/reasoning/:tid" element={<Reasoning/>}></Route>
          <Route path="/guest/description/:tid" element={<OneLineDescription/>}></Route>
          <Route path="/guest/completion/" element={<CompleteGuest/>}></Route>

          {/* Result */}
          <Route path="/result/dashboard" element={<ResultDashBoard/>}></Route>
          <Route path="/result/detail/" element={<Result/>}></Route>

          {/* Footer Links */}
          <Route path="/terms" element={<TOS/>}></Route>
          <Route path="/privacy" element={<Privacy/>}></Route>
          <Route path="/*" element={<Error/>}></Route>
        </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  )
};

export default App;
