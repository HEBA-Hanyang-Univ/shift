import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, React, useState } from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { StartHost } from "./pages/LinkSender/StartHost";
import { InfoHost } from "./pages/LinkSender/InfoHost";
import { MyIdentity } from "./pages/LinkSender/MyIdentity";
import { MyAspiration } from "./pages/LinkSender/MyAspiration";
import { PerceivedByOthers } from "./pages/LinkSender/PerceivedByOthers";
import { CompleteHost } from "./pages/LinkSender/CompleteHost";


import { StartGuest } from "./pages/LinkReceiver/StartGuest";
import { InfoGuest } from "./pages/LinkReceiver/InfoGuest";
import { SelectKeyword } from "./pages/LinkReceiver/SelectKeyword";
import { Reasoning } from "./pages/LinkReceiver/Reasoning";
import { OneLineDescription } from "./pages/LinkReceiver/OneLineDescription";
import { CompleteGuest } from "./pages/LinkReceiver/CompleteGuest";

import { ResultDashBoard } from "./pages/Result/ResultDashBoard";
import { Result } from "./pages/Result/Result";

function App() {
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
        <ScrollToTop />
        <Header />
        <Routes>
          {/* LinkSender */}
          <Route path="/" element={<StartHost/>}></Route>
          <Route path="/inputInfo" element={<InfoHost/>}></Route>
          <Route path="/myIdentity" element={<MyIdentity/>}></Route>
          <Route path="/myAspiration" element={<MyAspiration/>}></Route>
          <Route path="/perceivedByOthers" element={<PerceivedByOthers/>}></Route>
          <Route path="/completeHost" element={<CompleteHost/>}></Route>


          {/* LinkReceiver */}
          <Route path="/startGuest" element={<StartGuest/>}></Route>
          <Route path="/infoGuest" element={<InfoGuest/>}></Route>
          <Route path="/selectKeyword" element={<SelectKeyword/>}></Route>
          <Route path="/reasoning" element={<Reasoning/>}></Route>
          <Route path="/oneLineDescription" element={<OneLineDescription/>}></Route>
          <Route path="/completeGuest" element={<CompleteGuest/>}></Route>

          {/* Result */}
          <Route path="/ResultDashBoard" element={<ResultDashBoard/>}></Route>
          <Route path="/result" element={<Result/>}></Route>
        </Routes>
      </Router>
    </div>
  )
};

export default App;
