import { useEffect, React } from 'react';
import { useLocation } from 'react-router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { StartHomepage } from 'pages/StartHomepage';

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
          </Routes>
      </Router>
    </div>
  );
}

export default App;
