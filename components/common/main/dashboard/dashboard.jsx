import React, { useState } from 'react';
import Chartjs from './chartjs/chartjs';
import styles from './dashboard.module.scss';
import storybook from '@talentumlab/storybook-design-system';
const iconOptions = '/icons/optionMenu.svg';
const iconRefresh = '/icons/clean.svg';
const iconDashboard = '/images/Mascotas-02.png';
import TableSection from './tableSection/tableSection';
import PropTypes from 'prop-types';
import { typesOfCharts, listContentDashboard, filtersDashboard } from '@consts/index';
// import { useState } from 'react';
import DoughnutChart from './doughnut/doughnut';
import useDataFilters from '@hooks/useDataFilters';
import FilterComponent from './filterComponent/filterComponent';
import CheckboxList from '@common/checkboxList/checkboxList';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import { useEffect } from 'react';
import { scrollToTop } from '@hooks/scrollToTop';
import TableInterpretation from './tableInterpretation/tableInterpretation';
// import useWindowSize from '@hooks/useWindowSize';
// import Sidebar from '@common/sidebar/sidebar';

const Dashboard = ({ listContent, type }) => {
  const { years, ejecuciones, departments, townsBy, institutions, sedes, estamentos, areas } =
    useDataFilters();

  const {
    setListContentReport,
    checkedState,
    setCheckedState,
    handleChange,
    typeChart,
    setTypeChart,
    typeChart2,
    setTypeChart2,
    listContentReport,
    cleanFilters,
    indice,
    tables,
    graphics,
    // setCheckedAreaState,
    cleanCheckedsReport,
    idYear,
    idEjecution,
    idDepartment,
    idTown,
    idInstitution,
    idSede,
    idState,
    listAllAreasFilter,
    checkedAreaState,
    valueParameter,
    loading,
    setInterpretationIndice,
    setInterpretationAreas,
    interpretationIndice,
    interpretationArea,
    // checkedAreaState,
  } = useStore(
    (state) => ({
      setListContentReport: state.setListContentReport,
      checkedState: state.checkedState,
      setCheckedState: state.setCheckedState,
      handleChange: state.handleChange,
      typeChart: state.typeChart,
      setTypeChart: state.setTypeChart,
      typeChart2: state.typeChart2,
      setTypeChart2: state.setTypeChart2,
      listContentReport: state.listContentReport,
      cleanFilters: state.cleanFilters,
      indice: state.indice,
      tables: state.tables,
      graphics: state.graphics,
      // setCheckedAreaState: state.setCheckedAreaState,
      cleanCheckedsReport: state.cleanCheckedsReport,
      idYear: state.idYear,
      idEjecution: state.idEjecution,
      idDepartment: state.idDepartment,
      idTown: state.idTown,
      idInstitution: state.idInstitution,
      idSede: state.idSede,
      idState: state.idState,
      listAllAreasFilter: state.listAllAreasFilter,
      checkedAreaState: state.checkedAreaState,
      valueParameter: state.valueParameter,
      loading: state.loading,
      setInterpretationIndice: state.setInterpretationIndice,
      setInterpretationAreas: state.setInterpretationAreas,
      interpretationIndice: state.interpretationIndice,
      interpretationArea: state.interpretationArea,
      // checkedAreaState: state.checkedAreaState,
    }),
    shallow,
  );

  const [valuesAreaToReport, setValuesAreaToReport] = useState([]);

  const indiceName = indice.length > 0 ? indice[0].name : null;
  const indiceData = indice.length > 0 ? indice[0].data : null;
  const indiceDataFixed = indiceData ? indiceData.toFixed(2) : null;

  const tableName = tables.map((data) => {
    return data.name;
  });
  const tableHeaders = tables.map((data) => {
    return data.headers;
  });
  const tableContent = tables.map((data) => {
    return data.data;
  });
  const graphicsName = graphics.map((data) => {
    return data.name;
  });
  const graphicsData = graphics.map((data) => data.data);
  const graphicsLabels1 =
    graphicsData.length > 0
      ? graphicsData[0].map((data) => {
          return data[0];
        })
      : null;
  const graphicsInfo1 =
    graphicsData.length > 0
      ? graphicsData[0].map((data) => {
          return data[1];
        })
      : null;
  const graphicsLabels2 =
    graphicsData.length > 0
      ? graphicsData[1].map((data) => {
          return data[0];
        })
      : null;
  const graphicsInfo2 =
    graphicsData.length > 0
      ? graphicsData[1].map((data) => {
          return data[1];
        })
      : null;

  useEffect(() => {
    let timer = setTimeout(() => {
      scrollToTop();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (type === 'report') {
      setInterpretationIndice();
      setInterpretationAreas();
    }
  }, [type, setInterpretationIndice, setInterpretationAreas]);

  useEffect(() => {
    // console.log(tableContent[0]);
  }, [checkedState]);

  // const { width } = useWindowSize();

  useEffect(() => {
    if (checkedState.length === 0) {
      setCheckedState(new Array(listContent.length).fill(false));
    }
  }, [listContent, checkedState, setListContentReport, listContentReport, setCheckedState]);

  const renderOptions = (id) => {
    const SET_OPTIONS = {
      0: years,
      1: ejecuciones,
      2: departments,
      3: townsBy,
      4: institutions,
      5: sedes,
      6: estamentos,
      7: areas,
    };
    return SET_OPTIONS[id] ? SET_OPTIONS[id] : null;
  };

  useEffect(() => {
    const setValueAreaReport = () => {
      let arr = checkedAreaState.map((data, index) => {
        if (data) {
          return listAllAreasFilter[index];
        }
      });
      setValuesAreaToReport(arr.filter((data) => data));
    };
    setValueAreaReport();
  }, [checkedAreaState, listAllAreasFilter]);

  return (
    <div className={styles.dashboard_container}>
      {type !== 'report' && (
        <div className={styles.filters}>
          <h2 style={{fontSize:'24px'}}>Dashboard</h2>
          {/* {width >= BREAKPOINT ? ( */}
          <section className={styles.actions__filters}>
            <storybook.ButtonCommon
              text="LIMPIAR"
              width="8rem"
              height="36px"
              borderradius="5px"
              passedFunction={() => {
                cleanFilters();
                cleanCheckedsReport();
              }}
              showIcon
              iconButton={iconRefresh}
            />
          </section>
          <div className={styles.filters__container}>
            <div className={styles.filters__content}>
              <div className={styles.filter_group}>
                {filtersDashboard
                  .filter((info) => {
                    return valueParameter.stateSede ? info : info.name !== 'Sedes';
                  })
                  .filter((fil) => fil.id === 2 || fil.id === 3 || fil.id === 4 || fil.id === 5)
                  .map((data, index) => (
                    <FilterComponent
                      key={index}
                      title={data.name}
                      dropdownText={'Seleccionar'}
                      options={renderOptions(data.id) || []}
                      type={data.id}
                    />
                  ))}
              </div>
              <div className={styles.line}></div>
              <div className={styles.filter_group} style={{ flexDirection: 'column' }}>
                {filtersDashboard
                  .filter((fil) => fil.id === 0 || fil.id === 1)
                  .map((data, index) => (
                    <FilterComponent
                      key={index}
                      title={data.name}
                      dropdownText={'Seleccionar'}
                      options={renderOptions(data.id) || []}
                      type={data.id}
                    />
                  ))}
              </div>
              <div className={styles.line}></div>
              <div className={styles.filter_group} style={{ flexDirection: 'column' }}>
                {filtersDashboard
                  .filter((fil) => fil.id === 6 || fil.id === 7)
                  .map((data, index) => (
                    <FilterComponent
                      key={index}
                      title={data.name}
                      dropdownText={'Seleccionar'}
                      options={renderOptions(data.id) || []}
                      type={data.id}
                    />
                  ))}
              </div>
            </div>
          </div>
          {/* // ) : (
          //   <Sidebar />
          // )} */}
        </div>
      )}

      {type === 'report' && (
        <div>
          <div className={styles.filters_report_header}>Filtros de información utilizados</div>
          <section className={styles.filters_report_list}>
            {idYear.value.id !== 0 && (
              <div className={styles.filters_report_item}>
                <p>Año:</p>
                <p>{idYear.value.name.toString().toLowerCase()}</p>
              </div>
            )}
            {idEjecution.value.id !== 0 && (
              <div className={styles.filters_report_item}>
                <p>Ejecución:</p>
                <p>{idEjecution.value.name.toString().toLowerCase()}</p>
              </div>
            )}
            {idDepartment.value.id !== 0 && (
              <div className={styles.filters_report_item}>
                <p>Departamentos:</p>
                <p>{idDepartment.value.name.toString().toLowerCase()}</p>
              </div>
            )}
            {idTown.value.id !== 0 && (
              <div className={styles.filters_report_item}>
                <p>Municipio:</p>
                <p>{idTown.value.name.toString().toLowerCase()}</p>
              </div>
            )}
            {idInstitution.value.id !== 0 && (
              <div className={styles.filters_report_item}>
                <p>Est. Institución:</p>
                <p>{idInstitution.value.name.toString().toLowerCase()}</p>
              </div>
            )}
            {valueParameter.stateSede && (
              <>
                {idSede.value.id !== 0 && (
                  <div className={styles.filters_report_item}>
                    <p>Sedes:</p>
                    <p>{idSede.value.name.toString().toLowerCase()}</p>
                  </div>
                )}
              </>
            )}
            {idState.value.id !== 0 && (
              <div className={styles.filters_report_item}>
                <p>Estamentos:</p>
                <p>{idState.value.name.toString().toLowerCase()}</p>
              </div>
            )}
            {valuesAreaToReport.length > 0 && (
              <div className={styles.filters_report_item}>
                <p>Área:</p>
                {valuesAreaToReport.map((val, index) => (
                  // <div key={val.idArea} className={styles.areas_report}>
                  <p style={{ marginRight: '0.5rem' }} key={val.idArea}>
                    {`${val.name_area.toString().toLowerCase()}`}
                    {valuesAreaToReport.length - 1 !== index && ','}
                  </p>
                  // </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <div className={styles.content}>
        {!indiceData && !loading ? (
          <div className={loading ? `${styles.title} ${styles.animation_lazy}` : styles.title}>
            <img width="15%"src={iconDashboard} />
            <div style={{ padding: '1.5rem' }}>
              No hay información para los campos filtrados, seleccione los filtros
            </div>
          </div>
        ) : (
          <>
            {listContent.find((node) => node.name === 'Indice de Inclusión') &&
              listContent.find((node) => node.name === 'Indice de Inclusión').state && (
                <div
                  className={loading ? `${styles.title} ${styles.animation_lazy}` : styles.title}
                  style={
                    type === 'report' ? { marginBottom: '0rem', padding: '1.5rem 0 0 0' } : null
                  }
                >
                  <h2>{indiceName}</h2>
                  <h4>
                    El siguiente es el índice de inclusión promedio para todas las instituciones del
                    departamento
                  </h4>
                  <h3 style={type === 'report' ? { marginBottom: '0rem' } : null}>
                    {indiceDataFixed}
                  </h3>
                  {type !== 'report' && !loading && (
                    <div className={styles.checks_report}>
                      <label
                        className={styles.check_indice}
                        // htmlFor={listContent.find((obj) => obj.name === 'Indice de Inclusión').id}
                        // onChange={(e) => handleChange(e, listContent)}
                      >
                        <CheckboxList
                          checked={
                            checkedState[
                              listContent.findIndex((obj) => obj.name === 'Indice de Inclusión')
                            ]
                          }
                          idCheckbox={
                            listContent.find((obj) => obj.name === 'Indice de Inclusión').id
                          }
                          onChange={(e) => handleChange(e, listContent)}
                        />
                        Agregar al informe
                      </label>
                    </div>
                  )}
                </div>
              )}

            {type === 'report' && checkedState[0] && (
              <div className={styles.interpretation}>
                <h2>Interpretación índice global</h2>
                <h4>{interpretationIndice}</h4>
              </div>
            )}

            <TableSection
              title={tableName[0]}
              subtitle={'Muestra el resumen del indice institucional para las áreas seleccionadas.'}
              list={tableContent[0]}
              colNames={tableHeaders[0]}
              listContent={listContent}
              checkedState={checkedState}
              type={type}
              loading={loading}
              storeIndicator={1}
            />

            {type === 'report' && checkedState[1] && (
              <TableInterpretation
                title={'Interpretación por áreas'}
                subtitle={''}
                list={interpretationArea}
                colNames={['Área', 'Interpretación']}
                listContent={listContent}
                checkedState={checkedState}
                type={type}
                loading={loading}
                storeIndicator={1}
              />
            )}

            <TableSection
              title={tableName[1]}
              subtitle={'Muestra el resumen del indice de inclusión para las áreas seleccionadas.'}
              list={tableContent[1]}
              colNames={tableHeaders[1]}
              listContent={listContent}
              checkedState={checkedState}
              type={type}
              loading={loading}
              storeIndicator={2}
            />

            <div
              className={type !== 'report' ? styles.container : styles.container_report}
              style={type === 'report' ? { marginBottom: '0rem' } : null}
            >
              {listContent.find(
                (node) => node.name === 'Gráfico Indice de Inclusión por estamento',
              ) &&
                listContent.find(
                  (node) => node.name === 'Gráfico Indice de Inclusión por estamento',
                ).state && (
                  <div
                    className={
                      loading ? `${styles.chartjs} ${styles.animation_lazy}` : styles.chartjs
                    }
                    style={type === 'report' ? { width: '100%', padding: '1rem 0' } : null}
                  >
                    {!loading && (
                      <>
                        <h2>{graphicsName[0]}</h2>
                        <h4>
                          Índice de Inclusión por estamento para cada una de las áreas
                          seleccionadas.
                        </h4>
                        {type !== 'report' && (
                          <div className={styles.options__chart}>
                            <storybook.DropDownV2
                              minWidth="1rem"
                              srcDown={iconOptions}
                              width="1rem"
                              backgroundColor="transparent"
                              initialValue={{ value: { id: 0, name: '' }, id: '' }}
                              className={styles.chartjs_options}
                              valueSelected={(info) => setTypeChart(info.value.id)}
                              options={typesOfCharts}
                            />
                          </div>
                        )}
                        <div className={styles.chartjs__parent}>
                          {typeChart === 0 ? (
                            <Chartjs labels={graphicsLabels1} info={graphicsInfo1} />
                          ) : (
                            <div className={styles.chartjs__parent_donut}>
                              <DoughnutChart labels={graphicsLabels1} info={graphicsInfo1} />
                            </div>
                          )}
                        </div>
                        {type !== 'report' && (
                          <div className={styles.checks_report}>
                            <CheckboxList
                              checked={
                                checkedState[
                                  listContent.findIndex(
                                    (obj) =>
                                      obj.name === 'Gráfico Indice de Inclusión por estamento',
                                  )
                                ]
                              }
                              idCheckbox={
                                listContent.find(
                                  (obj) => obj.name === 'Gráfico Indice de Inclusión por estamento',
                                ).id
                              }
                              onChange={(e) => handleChange(e, listContent)}
                            />
                            <label
                              htmlFor={
                                listContent.find(
                                  (obj) => obj.name === 'Gráfico Indice de Inclusión por estamento',
                                ).id
                              }
                              onChange={(e) => handleChange(e, listContent)}
                            >
                              Agregar al informe
                            </label>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              {listContent.find((node) => node.name === 'Gráfico Indice de Inclusión por área') &&
                listContent.find((node) => node.name === 'Gráfico Indice de Inclusión por área')
                  .state && (
                  <div
                    className={
                      loading ? `${styles.chartjs} ${styles.animation_lazy}` : styles.chartjs
                    }
                  >
                    {!loading && (
                      <>
                        <h2>{graphicsName[1]}</h2>
                        <h4>
                          Índice de Inclusión por área de gestión e institucional para cada una de
                          las áreas seleccionadas.
                        </h4>
                        {type !== 'report' && (
                          <div className={styles.options__chart}>
                            <storybook.DropDownV2
                              minWidth="1rem"
                              srcDown={iconOptions}
                              width="1rem"
                              backgroundColor="transparent"
                              initialValue={{ value: { id: 0, name: '' }, id: '' }}
                              className={styles.chartjs_options}
                              valueSelected={(info) => setTypeChart2(info.value.id)}
                              options={typesOfCharts}
                            />
                          </div>
                        )}
                        <div className={styles.chartjs__parent}>
                          {typeChart2 === 0 ? (
                            <Chartjs labels={graphicsLabels2} info={graphicsInfo2} />
                          ) : (
                            <div className={styles.chartjs__parent_donut}>
                              <DoughnutChart labels={graphicsLabels2} info={graphicsInfo2} />
                            </div>
                          )}
                        </div>
                        {type !== 'report' && (
                          <div className={styles.checks_report}>
                            <CheckboxList
                              checked={
                                checkedState[
                                  listContent.findIndex(
                                    (obj) => obj.name === 'Gráfico Indice de Inclusión por área',
                                  )
                                ]
                              }
                              idCheckbox={
                                listContent.find(
                                  (obj) => obj.name === 'Gráfico Indice de Inclusión por área',
                                ).id
                              }
                              onChange={(e) => handleChange(e, listContent)}
                            />
                            <label
                              htmlFor={
                                listContent.find(
                                  (obj) => obj.name === 'Gráfico Indice de Inclusión por área',
                                ).id
                              }
                              onChange={(e) => handleChange(e, listContent)}
                            >
                              Agregar al informe
                            </label>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
            </div>

            <TableSection
              title={tableName[2]}
              subtitle={'Tabla del área de índice de Inclusión para las áreas seleccionadas.'}
              list={tableContent[2]}
              colNames={tableHeaders[2]}
              listContent={listContent}
              checkedState={checkedState}
              type={type}
              storeIndicator={3}
            />

            <TableSection
              title={tableName[3]}
              subtitle={
                'Tabla del área de índice de Inclusión para los procesos del área seleccionada.'
              }
              list={tableContent[3]}
              colNames={tableHeaders[3]}
              listContent={listContent}
              checkedState={checkedState}
              type={type}
              storeIndicator={4}
            />

            <TableSection
              title={tableName[4]}
              subtitle={
                'Tabla del área de índice de Inclusión para las variables del área seleccionada.'
              }
              list={tableContent[4]}
              colNames={tableHeaders[4]}
              listContent={listContent}
              checkedState={checkedState}
              type={type}
              storeIndicator={5}
            />

            {type === 'report' && (
              <div className={styles.interpretation}>
                <h4>
                  Con base en los resultados, y teniendo en cuenta que el índice de inclusión es
                  considerado una herramienta de autoevaluación institucional desde el enfoque de la
                  Educación Inclusiva, se invita a revisar los procesos que obtuvieron la puntuación
                  más baja para cada área de gestión escolar, identificando las acciones de mejora
                  que se pueden considerar y plantear en el Plan de Mejoramiento Institucional
                  (PMI). <br />
                  <br /> Para ese ejercicio, se sugiere identificar el código del proceso (ejemplo:
                  área de gestión directiva, proceso direccionamiento estratégico: código A1) y el
                  estamento que menor lo puntuó (directivo, docente, otros: cuestionario 1;
                  estudiantes, familias: cuestionario 2) para que, posteriormente, ubique las
                  acciones a las que el Establecimiento Educativo debería prestar mayor atención a
                  través de los cuestionarios según el estamento identificado con el fin de
                  fortalecer el índice de inclusión.
                </h4>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  listContent: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

Dashboard.defaultProps = {
  listContent: listContentDashboard,
  type: 'dashboard',
};
