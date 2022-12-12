import React, { useState } from 'react';
import styles from './reports.module.scss';
import storybook from '@talentumlab/storybook-design-system';
const iconDelete = '/icons/delete.svg';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import Dashboard from '@common/main/dashboard/dashboard';
import { listContentDashboard, optionsReports } from '@consts/index';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT } from '@consts/breakpoint';
const iconOptions = '/icons/optionMenu.svg';
const iconEmpty = '/images/empty_report.svg';
const iconTable = './icons/table.svg';
const iconClose = './icons/close_2.svg';

const Reports = () => {
  const {
    listContentReport,
    setListContentReport,
    handleChange,
    setValueReport,
    // valueReport,
    // fetchWordReportData,
    fetchPdfReportData,
    setReportData,
    idYear,
    idEjecution,
    idInstitution,
    idState,
    idAreaA,
    idAreaB,
    idAreaC,
    idAreaD,
    idDepartment,
    idTown,
    idSede,
    checkedState,
    typeChart,
    typeChart2,
    valueParameter,
  } = useStore(
    (state) => ({
      listContentReport: state.listContentReport,
      setListContentReport: state.setListContentReport,
      handleChange: state.handleChange,
      setValueReport: state.setValueReport,
      valueReport: state.valueReport,
      fetchWordReportData: state.fetchWordReportData,
      fetchPdfReportData: state.fetchPdfReportData,
      setReportData: state.setReportData,
      idYear: state.idYear,
      idEjecution: state.idEjecution,
      idInstitution: state.idInstitution,
      idState: state.idState,
      idAreaA: state.idAreaA,
      idAreaB: state.idAreaB,
      idAreaC: state.idAreaC,
      idAreaD: state.idAreaD,
      idDepartment: state.idDepartment,
      idTown: state.idTown,
      idSede: state.idSede,
      checkedState: state.checkedState,
      typeChart: state.typeChart,
      typeChart2: state.typeChart2,
      valueParameter: state.valueParameter,
    }),
    shallow,
  );

  const [controlInfo, setControlInfo] = useState(false);

  const { width } = useWindowSize();

  const deleteNodePdf = (data) => {
    // console.log(data);
    setListContentReport(listContentReport.filter((item) => item.id !== data.id));
    handleChange(data.id, listContentDashboard);
  };
  // useEffect(() => {
  //   console.log('print the year', idYear.value.id);
  // }, [idYear]);

  const handleClick = (data) => {
    let reportInfo = {
      idYear: idYear.value.id,
      idEjecution: idEjecution.value.id,
      idInstitution: idInstitution.value.id,
      idState: idState.value.id,
      idAreaA: idAreaA.value.id,
      idAreaB: idAreaB.value.id,
      idAreaC: idAreaC.value.id,
      idAreaD: idAreaD.value.id,
      idDepartment: idDepartment.value.id,
      idTown: idTown.value.id,
      idSede: valueParameter.stateSede ? idSede.value.id : -1,
      arrayElementos: [
        { id: 0, state: checkedState[0] },
        { id: 1, state: checkedState[1] },
        { id: 2, state: checkedState[2] },
        { id: 3, state: checkedState[3], type: typeChart === 0 ? 'bar' : 'doughnut' },
        { id: 4, state: checkedState[4], type: typeChart2 === 0 ? 'bar' : 'doughnut' },
        { id: 5, state: checkedState[5] },
        { id: 6, state: checkedState[6] },
        { id: 7, state: checkedState[7] },
      ],
    };
    setValueReport(data.value.id);
    setReportData(reportInfo);
    fetchPdfReportData(reportInfo);
    // Por si lo piden
    // {
    //   valueReport === 0 ? fetchWordReportData(reportInfo) : fetchPdfReportData(reportInfo);
    // }
  };
  return (
    <div className={styles.reports}>
      {listContentReport.length > 0 ? (
        <>
          <header>
            <div>Informe del índice de inclusión</div>
            <div className={styles.options__chart}>
              <storybook.DropDownV2
                minWidth="1rem"
                srcDown={iconOptions}
                width="1rem"
                height="36px"
                backgroundColor="transparent"
                initialValue={{ value: { id: 0, name: '' }, id: '' }}
                className={styles.chartjs_options}
                valueSelected={(info) => handleClick(info)}
                options={optionsReports}
              />
              <div className={styles.icon_mobile} onClick={() => setControlInfo(!controlInfo)}>
                <storybook.Image src={iconTable} />
              </div>
            </div>
          </header>
          <div className={styles.reports__content}>
            <div className={styles.reports__content_preview}>
              <div>
                <Dashboard listContent={listContentReport} type="report" />
              </div>
            </div>
            {width <= BREAKPOINT ? (
              controlInfo && (
                <div className={styles.reports__content_info}>
                  <div className={styles.icon_close} onClick={() => setControlInfo(false)}>
                    <storybook.Image src={iconClose} />
                  </div>
                  <div>
                    <h5>Información incluida en el informe</h5>
                  </div>
                  {listContentReport.map((data, index) => (
                    <div key={index}>
                      <p>
                        {index + 1}. {data.name}
                      </p>
                      <div
                        className={styles.table__periods_icon}
                        onClick={() => deleteNodePdf(data, index)}
                      >
                        <storybook.Image src={iconDelete} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className={styles.reports__content_info}>
                <div>
                  <h5>Información incluida en el informe</h5>
                </div>
                {listContentReport.map((data, index) => (
                  <div key={index}>
                    <p>
                      {index + 1}. {data.name}
                    </p>
                    <div
                      className={styles.table__periods_icon}
                      onClick={() => deleteNodePdf(data, index)}
                    >
                      <storybook.Image src={iconDelete} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.empty__report}>
          <div>
            <storybook.Image src={iconEmpty} />
          </div>
          <div>
            <h2>El informe está vacío</h2>
            <p>Ingresa al Dashboard y agrega la información necesaria.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
