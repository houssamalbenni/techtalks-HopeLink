import { useLanguage } from './LanguageContext';
import { t } from './translations';

const MapTopBar = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="map-topbar">
      <div className="map-topbar-left">
        <h1 className="map-topbar-title">{t(language, 'topbar.title')}</h1>
        <span className="map-topbar-divider">|</span>
        <div className="map-location-badge">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
          {t(language, 'topbar.location')}
        </div>
      </div>
      <div className="map-topbar-right">
        <button 
          className="map-language-toggle"
          onClick={toggleLanguage}
          title={language === 'en' ? 'Arabic' : 'English'}
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
        <div className="map-icon-btn">
          <svg viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </div>
        <button className="map-report-btn">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {t(language, 'topbar.reportIssue')}
        </button>
      </div>
    </div>
  );
};

export default MapTopBar;
