const GlobeVisual = () => {
  return (
    <div className="globe-visual">
      <div className="globe-visual__inner">
        <div className="globe-visual__canvas">
          <svg className="globe-visual__svg" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
            <circle cx="130" cy="130" r="100" fill="#0d1526" stroke="#1e2d50" strokeWidth="1" />
            <g className="globe-visual__orbits">
              <ellipse cx="130" cy="130" rx="100" ry="40" fill="none" stroke="#1e2d50" strokeWidth="0.8" />
              <ellipse cx="130" cy="130" rx="60" ry="100" fill="none" stroke="#1e2d50" strokeWidth="0.8" />
              <ellipse cx="130" cy="130" rx="100" ry="65" fill="none" stroke="#1e2d50" strokeWidth="0.8" />
              <line x1="30" y1="130" x2="230" y2="130" stroke="#1e2d50" strokeWidth="0.8" />
              <line x1="130" y1="30" x2="130" y2="230" stroke="#1e2d50" strokeWidth="0.8" />
            </g>
            <g className="globe-visual__links">
              <line x1="130" y1="130" x2="80" y2="95" stroke="#4f7dff" strokeWidth="0.8" opacity="0.5" />
              <line x1="130" y1="130" x2="170" y2="85" stroke="#7b5ea7" strokeWidth="0.8" opacity="0.5" />
              <line x1="130" y1="130" x2="155" y2="160" stroke="#4f7dff" strokeWidth="0.8" opacity="0.5" />
              <line x1="130" y1="130" x2="95" y2="165" stroke="#7b5ea7" strokeWidth="0.8" opacity="0.5" />
              <line x1="130" y1="130" x2="195" y2="125" stroke="#4f7dff" strokeWidth="0.8" opacity="0.5" />
              <line x1="80" y1="95" x2="170" y2="85" stroke="#4f7dff" strokeWidth="0.5" opacity="0.3" />
              <line x1="170" y1="85" x2="195" y2="125" stroke="#7b5ea7" strokeWidth="0.5" opacity="0.3" />
              <line x1="155" y1="160" x2="95" y2="165" stroke="#4f7dff" strokeWidth="0.5" opacity="0.3" />
            </g>
            <g className="globe-visual__nodes">
              <circle cx="130" cy="130" r="5" fill="#4f7dff" opacity="0.9" style={{ '--delay': '0s' }} />
              <circle cx="80" cy="95" r="4" fill="#7b5ea7" opacity="0.8" style={{ '--delay': '0.25s' }} />
              <circle cx="170" cy="85" r="3.5" fill="#4f7dff" opacity="0.7" style={{ '--delay': '0.5s' }} />
              <circle cx="155" cy="160" r="4" fill="#7b5ea7" opacity="0.8" style={{ '--delay': '0.75s' }} />
              <circle cx="95" cy="165" r="3" fill="#4f7dff" opacity="0.6" style={{ '--delay': '1s' }} />
              <circle cx="60" cy="140" r="3" fill="#a07ed4" opacity="0.7" style={{ '--delay': '1.25s' }} />
              <circle cx="195" cy="125" r="3.5" fill="#4f7dff" opacity="0.7" style={{ '--delay': '1.5s' }} />
              <circle cx="140" cy="75" r="3" fill="#7b5ea7" opacity="0.6" style={{ '--delay': '1.75s' }} />
            </g>
          </svg>
        </div>

        <div className="globe-visual__card">
          <div className="globe-visual__icon-box">
            <svg className="globe-visual__icon" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <p className="globe-visual__title">Global Coordination</p>
          <p className="globe-visual__subtitle">Connecting needs with resources.</p>
          <p className="globe-visual__text">
            By accurately matching roles, we ensure that aid reaches those who need it most efficiently,
            while providing donors with transparent tracking of their impact.
          </p>
          <div className="globe-visual__partner-row">
            <div className="globe-visual__avatars">
              {['A', 'B', 'C'].map((letter, i) => (
                <div
                  key={letter}
                  className="globe-visual__avatar"
                  style={{ marginLeft: i > 0 ? '-6px' : '0' }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="globe-visual__trust">Trusted by 1,200+ NGOs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeVisual;
