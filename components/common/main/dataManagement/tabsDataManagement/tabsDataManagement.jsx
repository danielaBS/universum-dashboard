import React, { useEffect, useState } from 'react';
import useStore from '@store/index';
import styles from './tabsDataManagement.module.scss';
import shallow from 'zustand/shallow';
import { optionsTabs } from '@consts/index';
import storybook from '@talentumlab/storybook-design-system';
import useWindowSize from '@hooks/useWindowSize';
const iconArrow = '/icons/arrow_dropdown.svg';
// import { BREAKPOINT } from '@consts/breakpoint';

const TabsDataManagement = () => {
  const { width } = useWindowSize();
  const { changeTabDataManagementState, tabDataManagementState, valueParameter } = useStore(
    (state) => ({
      changeTabDataManagementState: state.changeTabDataManagementState,
      tabDataManagementState: state.tabDataManagementState,
      valueParameter: state.valueParameter,
    }),
    shallow,
  );

  const [valueTabDrop, setValueTabDrop] = useState({
    value: { id: tabDataManagementState.id, name: tabDataManagementState.text },
    id: '',
  });

  useEffect(() => {
    setValueTabDrop({
      value: {
        id: tabDataManagementState.id,
        name: tabDataManagementState.text || tabDataManagementState.name,
      },
      id: '',
    });
  }, [tabDataManagementState]);

  useEffect(() => {
    console.log(valueTabDrop);
  }, [valueTabDrop]);

  return (
    <>
      {width >= 1045 ? (
        <section className={styles.tabs}>
          {optionsTabs
            .filter((info) => {
              return valueParameter.stateSede ? info : info.text !== 'Sedes';
            })
            .map((data, index) => (
              <div
                key={index}
                className={
                  tabDataManagementState.id === data.id
                    ? `${styles.tabs__link} ${styles.tabs__link_active}`
                    : styles.tabs__link
                }
                onClick={() => changeTabDataManagementState(data)}
              >
                {data.text}
              </div>
            ))}
        </section>
      ) : (
        <div className={styles.options__tabs}>
          <storybook.DropDownV2
            minWidth="1rem"
            srcDown={iconArrow}
            classNameOptions={styles.options}
            width="100%"
            height={'36px'}
            // backgroundColor="transparent"
            initialValue={valueTabDrop}
            fontSize="15px"
            fontSizeOptions="15px"
            className={styles.dropdown_tabs}
            valueSelected={(info) => changeTabDataManagementState(info.value)}
            options={optionsTabs
              .filter((info) => {
                return valueParameter.stateSede ? info : info.text !== 'Sedes';
              })
              .map((data) => ({ id: data.id, name: data.text }))}
          />
        </div>
      )}
    </>
  );
};

export default TabsDataManagement;
