import storybook from '@talentumlab/storybook-design-system';
import useStore from '@store/index';
import Title from '@common/title/title';
import styles from './dataManagement.module.scss';
import TabsDataManagement from '@common/main/dataManagement/tabsDataManagement/tabsDataManagement';
import shallow from 'zustand/shallow';
import Years from './years/years';
import Institutions from './institutions/institutions';
import Estamentos from './estamentos/estamentos';
import Areas from './areas/areas';
import Departments from './departments/departments';
import Towns from './towns/towns';
import Sedes from './sedes/sedes';

const DataManagement = () => {
  const { tabDataManagementState, alertEditStatus } = useStore(
    (state) => ({
      tabDataManagementState: state.tabDataManagementState,
      alertEditStatus: state.alertEditStatus,
    }),
    shallow,
  );

  function renderContentPerTab() {
    const RENDER_BY_TAB = {
      0: <Years />,
      1: <Departments />,
      2: <Towns />,
      3: <Institutions />,
      4: <Sedes />,
      5: <Estamentos />,
      6: <Areas />,
    };
    return RENDER_BY_TAB[tabDataManagementState.id]
      ? RENDER_BY_TAB[tabDataManagementState.id]
      : null;
  }

  return (
    <>
      <div className={styles.container_periods}>
        {alertEditStatus && (
          <div className={styles.container__alert}>
            <storybook.Alert
              width="22rem"
              srcIcon={alertEditStatus.icon}
              text={alertEditStatus.title}
              bgColor={alertEditStatus.background}
            />
          </div>
        )}
        <main className={styles.data_management}>
          <Title text="Gestión de datos" />
          <TabsDataManagement />
          {renderContentPerTab()}
        </main>
      </div>
    </>
  );
};

export default DataManagement;
