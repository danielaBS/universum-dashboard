import { useState } from "react";
import styles from "./reports.module.css";

const Reports = ({
  title,
  imagePath,
  imageAlt,
  summaryTitle,
  summaryColor,
  summaryInfoList,
  children,
  downloadButtonText,
  downloadButtonColor,
  downloadButtonBg,
  downloadButtonFn,
  keepClosed,
}) => {
  const [menuIsActive, setMenuIsActive] = useState(false);

  const handleMenuState = () => {
    if (keepClosed) {
      setMenuIsActive(false);
    } else if (!keepClosed) {
      if (menuIsActive) {
        setMenuIsActive(false);
      } else {
        setMenuIsActive(true);
      }
    }
  };
  return (
    <div
      className={`${styles.container} ${
        menuIsActive ? styles.containerActive : ""
      }`}
    >
      <div onClick={() => handleMenuState()} className={styles.header}>
        <button>{title}</button>
        <img
          className={`${menuIsActive ? styles.imageRotated : ""}`}
          src={imagePath}
          alt={imageAlt}
        />
      </div>
      {menuIsActive ? (
        <div className={styles.menuContent}>
          <div className={styles.divider}></div>
          <div className={styles.menuInfo}>
            <div className={styles.summary}>
              <div className={styles.summaryTitle}>
                <div
                  className={styles[`summaryType${summaryColor.toLowerCase()}`]}
                ></div>
                <p
                  className={
                    styles[`summaryTitle${summaryColor.toLowerCase()}`]
                  }
                >
                  {summaryTitle}
                </p>
              </div>
              <div className={styles.summaryInfo}>
                {summaryInfoList.map((element, index) => (
                  <div key={index} className={styles.summaryInfoBlock}>
                    <p>
                      {element.type} {element.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.menuMainData}>{children}</div>
          <div className={styles.downloadButtonContainer}>
            <button
              onClick={downloadButtonFn}
              style={{
                color: downloadButtonColor,
                background: downloadButtonBg,
              }}
              className={styles.downloadButton}
            >
              {downloadButtonText}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Reports;
