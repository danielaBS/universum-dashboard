import styles from './sidebar.module.scss';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import { optionsSideBar } from '@consts/index';
// import { useAuth } from '@hooks/useAuth';
import { scrollToTop } from '@hooks/scrollToTop';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const {
    changeTabState,
    tabState,
    fetchAllYearsGeneral,
    fetchAllEstamentos,
    fetchAllAreas,
    fetchAllDepartments,
    fetchAllTowns,
    fetchAllInstitutions,
    fetchAllSedes,
    // cleanFilters,
    // setListContentReport,
    isViewExecutions,
    isViewReport,
    isViewDataManagement,
    isViewTool,
    isViewHelp,
    isViewConfiguration,
    isViewUserModule,
  } = useStore(
    (state) => ({
      changeTabState: state.changeTabState,
      tabState: state.tabState,
      fetchAllYearsGeneral: state.fetchAllYearsGeneral,
      fetchAllEstamentos: state.fetchAllEstamentos,
      fetchAllAreas: state.fetchAllAreas,
      fetchAllDepartments: state.fetchAllDepartments,
      fetchAllTowns: state.fetchAllTowns,
      fetchAllInstitutions: state.fetchAllInstitutions,
      fetchAllSedes: state.fetchAllSedes,
      // cleanFilters: state.cleanFilters,
      // setListContentReport: state.setListContentReport,
      isViewExecutions: state.isViewExecutions,
      isViewReport: state.isViewReport,
      isViewDataManagement: state.isViewDataManagement,
      isViewTool: state.isViewTool,
      isViewHelp: state.isViewHelp,
      isViewConfiguration: state.isViewConfiguration,
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
    if (isViewConfiguration) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 6));
    }
  }, [isViewConfiguration]);

  useEffect(() => {
    if (isViewHelp) {
      setOptions((state) => [...state]);
    } else {
      setOptions((state) => [...state].filter((data) => data.id !== 7));
    }
  }, [isViewHelp]);

  const handleTabButton = (item) => {
    if (item.id === 4) {
      // cleanFilters();
      changeTabState(item);
      scrollToTop();
      // setListContentReport([]);
    } else if (item.id === 3) {
      fetchAllYearsGeneral();
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
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__grid}>
        {options.map((item) => (
          <div
            key={item.id}
            className={
              tabState.id === item.id
                ? `${styles.sidebar__grid__option} ${styles.sidebar__grid__option_active}`
                : styles.sidebar__grid__option
            }
            onClick={() => handleTabButton(item)}
          >
            <div className={styles.icon__button} style={{ backgroundImage: `url(${item.icon})` }} />
            <div className={styles.text__button}>{item.text}</div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
