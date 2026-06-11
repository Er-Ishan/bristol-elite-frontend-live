import React from 'react';
import useGorentContext from './components/context/useGorentContext';

import HomeThreeOnePage from './pages/index-three-one-page/HomeThreeOnePage';

const App: React.FC = () => {
  const { isMobileManu, isSearch } = useGorentContext();

  return (
    <div className={`custom-cursor ${isMobileManu || isSearch ? 'locked' : ''}`}>
      {/* <CustomCursor />
      <Outlet />
      <SearchProp />
      <SideBar />
      <MobileNav />
      <ScrollToTop />
      <VideoPopup /> */}

      <HomeThreeOnePage></HomeThreeOnePage>
    </div>
  );
};

export default App;