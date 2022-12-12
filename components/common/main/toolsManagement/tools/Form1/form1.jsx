import React from 'react';
import styles from './form1.module.scss';
import storybook from '@talentumlab/storybook-design-system';
const iconArrow = '/icons/arrow_right.svg';
const iconRefresh = '/icons/refresh.svg';
const iconDelete = '/icons/delete.svg';
import BasicData from './basicData/basicData';
import { listQuestionForm1, listQuestionForm2, nameModals } from '@consts/index';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import InputRadio from '../inputRadio/inputRadio';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import ProgressBar from '@layout/progressBar/progressBar';
import { scrollToTop } from '@hooks/scrollToTop';
import { useAuth } from '@hooks/useAuth';

const Form1 = ({ currentPage, next, currentData, maxPage, getBack }) => {
  const { user } = useAuth();
  const {
    setViewTool,
    estamentoData,
    sedeData,
    institutionData,
    executionData,
    nameData,
    lastName,
    toolState,
    fetchCreateToolA,
    fetchCreateToolB,
    typeForm,
    fetchEditToolA,
    fetchEditToolB,
    openModalState,
    cleanFiltersTool,
    setCleanBasicData,
    // dataToolToAction,
    dataFormToEdit,
    isDeleteTool,
    valueParameter,
    cleanFiltersForm,
  } = useStore(
    (state) => ({
      setViewTool: state.setViewTool,
      estamentoData: state.estamentoData,
      sedeData: state.sedeData,
      institutionData: state.institutionData,
      executionData: state.executionData,
      nameData: state.nameData,
      lastName: state.lastName,
      toolState: state.toolState,
      fetchCreateToolA: state.fetchCreateToolA,
      fetchCreateToolB: state.fetchCreateToolB,
      typeForm: state.typeForm,
      fetchEditToolA: state.fetchEditToolA,
      fetchEditToolB: state.fetchEditToolB,
      openModalState: state.openModalState,
      cleanFiltersTool: state.cleanFiltersTool,
      setCleanBasicData: state.setCleanBasicData,
      // dataToolToAction: state.dataToolToAction,
      dataFormToEdit: state.dataFormToEdit,
      isDeleteTool: state.isDeleteTool,
      valueParameter: state.valueParameter,
      cleanFiltersForm: state.cleanFiltersForm,
    }),
    shallow,
  );

  const { register, handleSubmit } = useForm();

  let listToSend = toolState === 1 ? listQuestionForm1 : listQuestionForm2;

  const [statusBar, setStatusBar] = useState(new Array(maxPage + 1).fill(false));
  const [checkedState, setCheckedState] = useState(new Array(currentData().length).fill(false));
  const [checkedOption, setCheckedOption] = useState(new Array(5).fill(false));
  const [listDataState, setListDataState] = useState(new Array(listToSend.length).fill(false));

  const [disabledPage, setDisabledPage] = useState(true);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setCheckedState(new Array(currentData().length).fill(false));
  }, [currentData]);

  useEffect(() => {
    let typeData = valueParameter.stateSede ? sedeData : institutionData;
    if (currentPage === 0) {
      if (estamentoData !== null && typeData !== null && executionData !== null) {
        setDisabledPage(true);
      } else {
        setDisabledPage(false);
      }
    } else {
      setDisabledPage(checkedState.every((currentValue) => currentValue));
    }
    // console.log(checkedState.every((currentValue) => currentValue === true));
  }, [
    checkedState,
    estamentoData,
    sedeData,
    institutionData,
    executionData,
    nameData,
    lastName,
    currentPage,
    valueParameter,
  ]);

  useEffect(() => {
    console.log(listDataState);
  }, [listDataState]);

  useEffect(() => {
    if (typeForm === 'edit' && dataFormToEdit) {
      setCheckedState(currentData());
    }
  }, [typeForm, currentData, dataFormToEdit]);

  const handleNextButton = () => {
    currentPage !== maxPage && scrollToTop();
    setTimeout(() => {
      next();
    }, 500);

    const updatedProgressState = statusBar.map((item, index) => {
      return index === currentPage ? !item : item;
    });

    console.log(currentPage, maxPage);

    setStatusBar(updatedProgressState);

    if (currentPage === maxPage) {
      setShowBar(true);
      setTimeout(() => {
        setViewTool(2);
        getBack(0);
      }, 4000);
    }
  };

  const renderProgress = () => {
    return statusBar.map((data, index) => (
      <div
        className={styles.step}
        key={index}
        style={data ? { backgroundColor: '#009848' } : null}
      ></div>
    ));
  };

  const handleChange = (value, position) => {
    // console.log(position);
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position.position ? currentData()[index] : item;
    });
    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
    updatedCheckedState.map((item, index) => {
      if (item) {
        // setChecked([...checked, { id: currentData()[position.id].id, value: value }]);
        return currentData()[index];
      }
    });
    saveData(value, position);
    // console.log(arrayMapped);
    // const arrayFiltered = arrayMapped.filter((item) => (item ? item : null));
  };

  const saveData = (value, position) => {
    const updatedListDataState = listDataState.map((item, index) => {
      return index === position.id
        ? [listToSend[position.id].id.replace(/\./g, ''), parseInt(value)]
        : item;
    });
    setListDataState(updatedListDataState);
    // console.log(updatedListDataState);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const entries = new Map(listDataState);

    const obj = Object.fromEntries(entries);

    const objToSend = {
      cuestionario: {
        ...obj,
        estamentoId: estamentoData.id,
        sedeId: valueParameter.stateSede ? sedeData.id : -1,
        ejecucionId: executionData.id,
        first_name: data.name,
        last_name: data.lastname,
      },
      institucionId: institutionData.id,
    };

    console.log(obj);

    if (typeForm === 'create') {
      toolState === 1
        ? fetchCreateToolA(JSON.stringify(objToSend), user)
        : fetchCreateToolB(JSON.stringify(objToSend), user);
    } else {
      toolState === 1
        ? fetchEditToolA(JSON.stringify(objToSend), user)
        : fetchEditToolB(JSON.stringify(objToSend), user);
    }
  };

  const backButton = () => {
    getBack(0);
    setViewTool(0);
    cleanFiltersTool(user);
    cleanFiltersForm(user);
    setCleanBasicData();
  };

  const refreshButton = () => {
    setListDataState(new Array(listToSend.length).fill(false));
    getBack(0);
    cleanFiltersTool(user);
    cleanFiltersForm(user);
    setCleanBasicData();
    setStatusBar(new Array(maxPage + 1).fill(false));
  };

  return (
    <div className={styles.container_form}>
      <div className={styles.progress_sticky}>
        <div className={styles.progress_steps}>{renderProgress()}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <header className={styles.form__header}>
          <div onClick={() => backButton()}>
            <storybook.Image src={iconArrow} />
          </div>
          <h4>{toolState === 1 ? 'Cuestionario 1' : 'Cuestionario 2'}</h4>
          <div className={styles.form__header_right}>
            <div onClick={() => refreshButton()}>
              <storybook.Image src={iconRefresh} />
            </div>
            {isDeleteTool && (
              <>
                {typeForm === 'edit' && (
                  <div onClick={() => openModalState(nameModals.modalDeleteToolState)}>
                    <storybook.Image src={iconDelete} />
                  </div>
                )}
              </>
            )}
          </div>
        </header>
        <div className={styles.form__data}>
          {currentPage === 0 && (
            <BasicData register={register} setListDataState={setListDataState} />
          )}

          {currentData().map((quest, index) => (
            <section key={quest.idIndex}>
              <h4>{quest.title}</h4>
              <div>
                <div className={styles.form__data_question}>
                  <h5>{quest.id}</h5>
                  <p>{quest.text}</p>
                </div>
                <div className={styles.form__data_options}>
                  {quest.options.map((opt, i) => (
                    <div key={i}>
                      <InputRadio
                        value={opt.id}
                        id={`${quest.idIndex}${opt.id}`}
                        checked={listToSend[quest.idIndex]}
                        quest={{ id: quest.idIndex, text: opt.quest, position: index }}
                        onChange={handleChange}
                        list={listDataState}
                        setCheckedState={setCheckedOption}
                        checkedState={checkedOption}
                        label={opt.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className={styles.send}>
          {showBar && (
            <div className={styles.view__file}>
              <div className={styles.view__file_progress_bar}>
                {/* <div>{selectedFile.name || ''}</div> */}
                <div className={styles.bar}>
                  <ProgressBar />
                </div>
              </div>
            </div>
          )}
          <div className={styles.button_next}>
            <storybook.ButtonCommon
              text={maxPage === currentPage ? 'GUARDAR' : 'SIGUIENTE'}
              width={'148px'}
              passedFunction={() => handleNextButton()}
              borderradius="5px"
              disabled={!disabledPage}
              type={maxPage === currentPage ? 'submit' : 'button'}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form1;

Form1.propTypes = {
  currentPage: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  currentData: PropTypes.func.isRequired,
  maxPage: PropTypes.number.isRequired,
  getBack: PropTypes.func.isRequired,
};

Form1.defaultProps = {
  currentPage: 0,
  next: () => {},
  currentData: () => {},
  getBack: () => {},
  maxPage: 0,
};
