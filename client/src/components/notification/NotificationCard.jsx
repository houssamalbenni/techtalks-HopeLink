import { useEffect, useRef, useState } from "react";
import {
  getImageSrc,
  getStatusClass,
  getTagClass,
} from "../../../utils/helper";
const NotificationCard = ({
  type,
  title,
  time,
  message,
  buttonText,
  isNew,
  priority,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isNew) {
      setShouldAnimate(false);
      setTimeout(() => {
        setShouldAnimate(true);
      }, 20);
    }
  }, [isNew]);

  return (
    <div
      ref={ref}
      className={`notification-card
        ${getStatusClass(type)}  
        ${visible ? "show" : "hide"} 
        ${shouldAnimate ? "is-new" : ""}
      `}
      onAnimationEnd={() => setShouldAnimate(false)}
    >
      <div className="card-icon-container">
        <div className={`card-icon-bg ${getTagClass(type)}`}>
          <img src={getImageSrc(type)} alt="status" className="medium-icon" />
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <span className={`status-tag ${getTagClass(type)}`}>
            {type.toUpperCase()}
          </span>

          <div className="time-container">
            <img
              src="../../assets/clock.png"
              alt="clock"
              className="small-icon"
            />
            <span>{time}</span>
          </div>
        </div>

        <h3 className="card-title">{title}</h3>
        <p className="card-message">{message}</p>

        {buttonText && (
          <button className="card-action-btn">{buttonText}</button>
        )}
      </div>

      <div className={`card-more ${getTagClass(type)}`}>{priority}</div>
    </div>
  );
};

export default NotificationCard;
