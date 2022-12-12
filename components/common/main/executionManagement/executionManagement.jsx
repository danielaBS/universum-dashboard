import { useEffect } from 'react';
import storybook from '@talentumlab/storybook-design-system';
import useStore from '@store/index';
import Title from '@common/title/title';
import styles from './executionManagement.module.scss';
import shallow from 'zustand/shallow';
import Executions from '@common/main/executionManagement/executions/executions';
import AddExecution from './addExecution/addExecution';

const ExecutionManagement = () => {
  const {
    alertEditStatus,
    fetchAllExecutions,
    setViewExecution,
    listAllPeriodosGeneral,
    viewExecution,
    dataExecutionToEdit,
  } = useStore(
    (state) => ({
      alertEditStatus: state.alertEditStatus,
      fetchAllExecutions: state.fetchAllExecutions,
      setViewExecution: state.setViewExecution,
      listAllPeriodosGeneral: state.listAllPeriodosGeneral,
      viewExecution: state.viewExecution,
      dataExecutionToEdit: state.dataExecutionToEdit,
    }),
    shallow,
  );

  useEffect(() => {
    fetchAllExecutions();
    setViewExecution(0);
    // console.log(dataExecutionToEdit);
  }, [fetchAllExecutions, setViewExecution]);

  function renderContentPerTab() {
    const RENDER_BY_TAB = {
      0: (
        <main className={styles.execution_management}>
          <Title text={renderTitle()} />
          <Executions />
        </main>
      ),
      1: (
        <>
          <main className={styles.execution_management_action}>
            <Title text={renderTitle()} />
            <AddExecution type="add" listYears={listAllPeriodosGeneral} />,
          </main>
        </>
      ),
      2: (
        <>
          <main className={styles.execution_management_action}>
            <Title text={renderTitle()} />
            <AddExecution type="edit" listYears={listAllPeriodosGeneral} />,
          </main>
        </>
      ),
    };
    return RENDER_BY_TAB[viewExecution] ? RENDER_BY_TAB[viewExecution] : null;
  }

  const renderTitle = () => {
    return viewExecution === 0
      ? 'Ejecuciones'
      : viewExecution === 1
      ? 'Nueva ejecución'
      : viewExecution === 2
      ? dataExecutionToEdit.name_aplication
      : null;
  };

  return (
    <>
      <div className={styles.container_executions}>
        {alertEditStatus && (
          <div className={styles.container__alert}>
            <storybook.Alert
              width="25rem"
              srcIcon={alertEditStatus.icon}
              text={alertEditStatus.title}
              bgColor={alertEditStatus.background}
            />
          </div>
        )}
        {renderContentPerTab()}
      </div>
    </>
  );
};

export default ExecutionManagement;
