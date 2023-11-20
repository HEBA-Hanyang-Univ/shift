import { useEffect, React } from 'react';
import { useLocation } from 'react-router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { StartHomepage } from 'pages/StartHomepage';
import SQInterest from 'pages/SQInterest';
import SQMbti from 'pages/SQMbti';

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
  };

  return (
    <div className='App'>
      <Router>
        <ScrollToTop />
          <Routes>
            <Route path="/sh" element={< StartHomepage />} />
	          <Route path="/sq-interest" element={<SQInterest />} />
            <Route path="/sq-mbti" element={<SQMbti />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
