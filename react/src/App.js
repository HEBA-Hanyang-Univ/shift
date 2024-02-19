import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, React } from "react";
import { Header } from "./components/Header/Header";
import { StartHost } from "./pages/LinkSender/StartHost";
import { InfoHost } from "./pages/LinkSender/InfoHost";
import { CompleteHost } from "./pages/LinkSender/CompleteHost";

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
          <Route path="/startHost" element={<StartHost/>}></Route>
          <Route path="/inputInfo" element={<InfoHost/>}></Route>
          <Route path="/completeHost" element={<CompleteHost/>}></Route>
        </Routes>
      </Router>
    </div>
  )
};

export default App;