import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, React, useState } from "react";
import { Header } from "./components/Header/Header";
import { StartHost } from "./pages/LinkSender/StartHost";
import { InfoHost } from "./pages/LinkSender/InfoHost";
import { MyIdentity } from "./pages/LinkSender/MyIdentity";
import { CompleteHost } from "./pages/LinkSender/CompleteHost";

import { LandingGuest } from "./pages/LinkReceiver/LandingGuest";
import { StartGuest } from "./pages/LinkReceiver/StartGuest";
import { InfoGuest } from "./pages/LinkReceiver/InfoGuest";
import { Reasoning } from "./pages/LinkReceiver/Reasoning";
import { OneLineDescription } from "./pages/LinkReceiver/OneLineDescription";
import { CompleteGuest } from "./pages/LinkReceiver/CompleteGuest";

import { ResultDashBoard } from "./pages/Result/ResultDashBoard";

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
          <Route path="/startHost" element={<StartHost/>}></Route>
          <Route path="/inputInfo" element={<InfoHost/>}></Route> 
          <Route path="/completeHost" element={<CompleteHost/>}></Route>


          <Route path="/myIdentity" element={<MyIdentity/>}></Route>

          {/* LinkReceiver */}
          <Route path="/landing" element={<LandingGuest/>}></Route>
          <Route path="/startGuest" element={<StartGuest/>}></Route>
          <Route path="/infoGuest" element={<InfoGuest/>}></Route> 
          <Route path="/reasoning" element={<Reasoning/>}></Route>
          <Route path="/oneLineDescription" element={<OneLineDescription/>}></Route>
          <Route path="/completeGuest" element={<CompleteGuest/>}></Route>

          {/* Result */}
          <Route path="/ResultDashBoard" element={<ResultDashBoard/>}></Route>
        </Routes>
      </Router>
    </div>
  )
};

export default App;