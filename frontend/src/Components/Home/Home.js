import React from 'react';
import './Home.css';

import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="Home">
      <header className="Home-header">
      {t('main.home.title')}
      </header>
    </div>
  );
}

export default Home;
