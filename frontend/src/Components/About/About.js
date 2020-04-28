import React from 'react';
import './About.css';

import { useTranslation } from 'react-i18next';

function About() {

  const { t } = useTranslation();

  return (
    <div className="About">
      <header className="About-header">
        {t('main.about.title')}
      </header>
    </div>
  );
}

export default About;