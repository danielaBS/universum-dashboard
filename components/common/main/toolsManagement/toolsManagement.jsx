import storybook from '@talentumlab/storybook-design-system';
import useStore from '@store/index';
import styles from './toolsManagement.module.scss';
import shallow from 'zustand/shallow';
import Tools from './tools/tools';
import Form1 from './tools/Form1/form1';
import { listQuestionForm1, listQuestionForm2 } from '@consts/index';
import usePagination from '@hooks/usePagination';
import Success from './tools/success/success';
import { useEffect } from 'react';

const ToolsManagement = () => {
  const { alertEditStatus, viewTool, toolState, setViewTool } = useStore(
    (state) => ({
      alertEditStatus: state.alertEditStatus,
      viewTool: state.viewTool,
      toolState: state.toolState,
      setViewTool: state.setViewTool,
    }),
    shallow,
  );

  const { currentPage, next, currentData, maxPage, getBack } = usePagination(
    toolState === 1 ? listQuestionForm1 : listQuestionForm2,
    10,
  );

  useEffect(() => {
    setViewTool(0);
  }, [setViewTool]);

  function renderContentPerTab() {
    const RENDER_BY_TAB = {
      0: <Tools />,
      1: (
        <Form1
          currentPage={currentPage}
          next={next}
          currentData={currentData}
          maxPage={maxPage}
          getBack={getBack}
        />
      ),
      2: <Success />,
    };
    return RENDER_BY_TAB[viewTool] ? RENDER_BY_TAB[viewTool] : null;
  }

  return (
    <>
      <div className={styles.container_tool}>
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

export default ToolsManagement;
