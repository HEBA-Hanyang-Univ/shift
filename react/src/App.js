import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, React } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

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
      </Router>
    </div>
  )
};

export default App;