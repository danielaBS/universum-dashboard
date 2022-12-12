import storybook from '@talentumlab/storybook-design-system';
import useStore from '@store/index';
// import Title from '@common/title/title';
import styles from './reportManagement.module.scss';
import shallow from 'zustand/shallow';
import Reports from './reports/reports';

const ReportManagement = () => {
  const { alertEditStatus } = useStore(
    (state) => ({
      alertEditStatus: state.alertEditStatus,
    }),
    shallow,
  );

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
          {/* <Title text="Nombre del archivo" /> */}
          <Reports />
        </main>
      </div>
    </>
  );
};

export default ReportManagement;
