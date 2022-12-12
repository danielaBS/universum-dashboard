import useStore from '@store/index';
import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import styles from './menuMobile.module.css';
import { optionsSideBar } from '@consts/index';
const imgLogo = '/images/logo.png';
// import { useAuth } from '@hooks/useAuth';
import storybook from '@talentumlab/storybook-design-system';
import { scrollToTop } from '@hooks/scrollToTop';
// import Image from 'next/image';

const MenuMobile = () => {
  const {
    setShowMenu,
    changeTabState,
    fetchAllEstamentos,
    fetchAllAreas,
    fetchAllDepartments,
    fetchAllTowns,
    fetchAllInstitutions,
    fetchAllSedes,
    cleanFilters,
    setListContentReport,
    isViewExecutions,
    isViewReport,
    isViewDataManagement,
    isViewTool,
    isViewHelp,
    isViewUserModule,
  } = useStore(
    (state) => ({
      setShowMenu: state.setShowMenu,
      changeTabState: state.changeTabState,
      fetchAllEstamentos: state.fetchAllEstamentos,
      fetchAllAreas: state.fetchAllAreas,
      fetchAllDepartments: state.fetchAllDepartments,
      fetchAllTowns: state.fetchAllTowns,
      fetchAllInstitutions: state.fetchAllInstitutions,
      fetchAllSedes: state.fetchAllSedes,
      cleanFilters: state.cleanFilters,
      setListContentReport: state.setListContentReport,
      isViewExecutions: state.isViewExecutions,
      isViewReport: state.isViewReport,
      isViewDataManagement: state.isViewDataManagement,
      isViewTool: state.isViewTool,
      isViewHelp: state.isViewHelp,
      isViewUserModule: state.isViewUserModule,
    }),
    shallow,
  );

  const [options, setOptions] = useState(optionsSideBar);

  useEffect(() => {
    if (isViewExecutions) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 1));
    }
  }, [isViewExecutions]);

  useEffect(() => {
    if (isViewReport) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 2));
    }
  }, [isViewReport]);

  useEffect(() => {
    if (isViewDataManagement) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 3));
    }
  }, [isViewDataManagement]);

  useEffect(() => {
    if (isViewTool) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 4));
    }
  }, [isViewTool]);

  useEffect(() => {
    if (isViewUserModule) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 5));
    }
  }, [isViewUserModule]);

  useEffect(() => {
    if (isViewHelp) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 6));
    }
  }, [isViewHelp]);

  const handleLink = (item) => {
    setShowMenu();
    if (item.id === 4) {
      cleanFilters();
      changeTabState(item);
      scrollToTop();
      setListContentReport([]);
    } else if (item.id === 3) {
      fetchAllEstamentos();
      fetchAllAreas();
      fetchAllDepartments();
      fetchAllTowns();
      fetchAllInstitutions();
      fetchAllSedes();
      changeTabState(item);
      scrollToTop();
    } else {
      changeTabState(item);
      scrollToTop();
    }
    setTimeout(() => {
      setShowMenu(true);
    }, 100);
  };

  return (
    <>
      <input type="checkbox" id={styles.active} />
      <label htmlFor={styles.active} className={styles.menu_btn}>
        <span></span>
      </label>
      <label htmlFor={styles.active} className={styles.close}></label>
      <div className={styles.wrapper}>
        <div className={styles.o_content_links}>
          <div className={styles.logo_sidebar}>
            <storybook.Image src={imgLogo} />
            {/* <Image
              // className={styles.logo_sidebar}
              src={imgLogo}
              alt="logo"
              width="89px"
              height="72px"
            /> */}
          </div>
          {options.map((item) => (
            <div
              key={item.id}
              className={styles.sidebar__grid__option}
              onClick={() => handleLink(item)}
            >
              <div
                className={styles.icon__button}
                style={{ backgroundImage: `url(${item.icon})` }}
              />
              <div className={styles.text__button}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuMobile;
