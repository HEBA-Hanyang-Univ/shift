import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, React } from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import StartHost from "./pages/LinkSender/StartHost";
import InfoHost from "./pages/LinkSender/InfoHost";
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
          <Route path="/host/info" element={<InfoHost/>}></Route>
          <Route path="/host/identity" element={<MyIdentity/>}></Route>
          <Route path="/host/aspiration" element={<MyAspiration/>}></Route>
          <Route path="/host/perception" element={<PerceivedByOthers/>}></Route>
          <Route path="/host/completion" element={<CompleteHost/>}></Route>


          {/* LinkReceiver */}
          <Route path="/guest/start" element={<StartGuest/>}></Route>
          <Route path="/guest/info" element={<InfoGuest/>}></Route>
          <Route path="/guest/keyword" element={<SelectKeyword/>}></Route>
          <Route path="/guest/reasoning" element={<Reasoning/>}></Route>
          <Route path="/guest/description" element={<OneLineDescription/>}></Route>
          <Route path="/guest/completion" element={<CompleteGuest/>}></Route>

          {/* Result */}
          <Route path="/result/dashboard" element={<ResultDashBoard/>}></Route>
          <Route path="/result/detail" element={<Result/>}></Route>
        </Routes>
      </Router>
    </div>
  )
};

export default App;
