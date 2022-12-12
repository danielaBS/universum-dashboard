import storybook from '@talentumlab/storybook-design-system';
import styles from './addExecution.module.scss';
import { useForm } from 'react-hook-form';
const iconArrow = '/icons/arrow_dropdown.svg';
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
import CollapseUploadFile from './collapseUploadFile/collapseUploadFile';
import { useAuth } from '@hooks/useAuth';
import { capitalizeStr } from '@hooks/capitalizeString';
const iconSearch = '/icons/search_input.svg';
import { scrollToTop } from '@hooks/scrollToTop';

const AddExecution = ({ listYears, type }) => {
  const {
    fetchCreateExecutions,
    setViewExecution,
    dataExecutionToEdit,
    fetchEditExecution,
    fetchlistExecutionDepartments,
    idYearExecution,
    uploadedFileExecutionByInstitution,
    uploadedFileExecution,
    setIdYearExecution,
    cleanFiltersExecution,
    // isLoadIndexBySedeExecution,
    isEditExecution,
  } = useStore(
    (state) => ({
      fetchCreateExecutions: state.fetchCreateExecutions,
      setViewExecution: state.setViewExecution,
      dataExecutionToEdit: state.dataExecutionToEdit,
      fetchEditExecution: state.fetchEditExecution,
      fetchlistExecutionDepartments: state.fetchlistExecutionDepartments,
      idYearExecution: state.idYearExecution,
      uploadedFileExecutionByInstitution: state.uploadedFileExecutionByInstitution,
      uploadedFileExecution: state.uploadedFileExecution,
      setIdYearExecution: state.setIdYearExecution,
      cleanFiltersExecution: state.cleanFiltersExecution,
      // isLoadIndexBySedeExecution: state.isLoadIndexBySedeExecution,
      isEditExecution: state.isEditExecution,
    }),
    shallow,
  );

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [valueYear, setValueYear] = useState(null);
  const [errorYear, setErrorYear] = useState(null);
  const [years, setYears] = useState([]);

  useEffect(() => {
    console.log(uploadedFileExecutionByInstitution);
    console.log(uploadedFileExecution);
  }, [uploadedFileExecutionByInstitution, uploadedFileExecution]);

  const initialEditValue = useMemo(
    () => ({
      value: { id: dataExecutionToEdit.yearId, name: dataExecutionToEdit.title },
      id: dataExecutionToEdit.yearId,
    }),
    [dataExecutionToEdit],
  );

  useEffect(() => {
    fetchlistExecutionDepartments(user);
  }, [fetchlistExecutionDepartments, user]);

  useEffect(() => {
    const years = listYears.map((data) => {
      return { id: data.idYear, name: data.title };
    });
    setYears(years);
  }, [listYears]);

  useEffect(() => {
    if (type === 'edit') {
      setValueYear(initialEditValue);
      setIdYearExecution(initialEditValue);
      setValue('name_aplication', dataExecutionToEdit.name_aplication);
      setValue('date_start', new Date(dataExecutionToEdit.date_start).toISOString().slice(0, 10));
      setValue('date_end', new Date(dataExecutionToEdit.date_end).toISOString().slice(0, 10));
    }
  }, [type, dataExecutionToEdit, initialEditValue, setValue, setIdYearExecution]);

  const formatStringDate = (date) => {
    let dateString = new Date(date);
    return (dateString =
      dateString.getFullYear() +
      '-' +
      ('0' + (dateString.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + dateString.getDate()).slice(-2) +
      ' ' +
      ('0' + dateString.getHours()).slice(-2) +
      ':' +
      ('0' + dateString.getMinutes()).slice(-2) +
      ':' +
      ('0' + dateString.getMilliseconds()).slice(-2));
  };

  const onSubmit = async (data) => {
    console.log(valueYear);
    if (!valueYear) {
      setErrorYear('Este campo es requerido');
    } else {
      setErrorYear(null);
    }

    if (type === 'add' && valueYear !== null) {
      fetchCreateExecutions({
        ...data,
        date_start: formatStringDate(data.date_start),
        date_end: formatStringDate(data.date_end),
        yearId: valueYear.value.id,
        userId: 2,
      });
      setViewExecution(0);
    } else if (type === 'edit' && valueYear !== null) {
      fetchEditExecution({
        ...data,
        date_start: formatStringDate(data.date_start),
        date_end: formatStringDate(data.date_end),
        yearId: valueYear.value.id,
        userId: 2,
      });
      setViewExecution(0);
    }
    scrollToTop();
  };

  return (
    <div className={styles.add}>
      {type === 'edit' && (
        <div className={styles.add_status}>
          <div>Estado ejecución:</div>
          <div
            style={
              dataExecutionToEdit.state.toLowerCase() === 'cerrado'
                ? { background: '#ffe5e5', color: '#cf2c2c' }
                : { background: '#D1FFC6', color: '#006D36' }
            }
          >
            {capitalizeStr(dataExecutionToEdit.state)}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.add__year}>
          <div>
            <span style={{ color: 'red' }}>*</span>Año
          </div>
          <div className={styles.add_dropdown}>
            <storybook.DropdownSearch
              width="auto"
              height="36px"
              srcDown={iconArrow}
              valueSelected={(info) => setValueYear(info)}
              initialValue={idYearExecution}
              options={years.sort((a, b) => b.name - a.name)}
              disabled={isEditExecution ? false : true}
              backgroundColor={years.length === 0 ? '#c8c8c8' : '#FFFFFF'}
              iconSearch={iconSearch}
            />
            {errorYear && (
              <span role="alert" style={{ color: 'red' }}>
                {errorYear}
              </span>
            )}
          </div>
        </div>
        <div className={styles.add__title}>
          <div>
            <span style={{ color: 'red' }}>*</span>Título
          </div>
          <div
            className={styles.add_input}
            style={isEditExecution ? { opacity: '1' } : { opacity: '0.3' }}
          >
            <storybook.Input
              isLabel={false}
              inputColor="#a1a1a1"
              placeholder={''}
              type="text"
              id="name_aplication"
              register={register}
              disabled={isEditExecution ? false : true}
            />
            {errors.name_aplication && (
              <span role="alert" style={{ color: 'red' }}>
                {errors.name_aplication.message}
              </span>
            )}
          </div>
        </div>
        <div className={styles.add__dates}>
          <div className={`${styles.add__calendar} ${styles.disabled_date}`}>
            <div>
              <span style={{ color: 'red' }}>*</span>Fecha inicio
            </div>
            <input
              type="date"
              style={isEditExecution ? { opacity: '1' } : { opacity: '0.3' }}
              name="date_start"
              disabled={isEditExecution ? false : true}
              id="date_start"
              {...register('date_start', {
                required: true,
              })}
            />
            {errors.date_start && (
              <span role="alert" style={{ color: 'red' }}>
                {'Campo requerido'}
              </span>
            )}
          </div>
          <div className={styles.add__calendar}>
            <div>
              <span style={{ color: 'red' }}>*</span>Fecha fin
            </div>
            <input
              type="date"
              style={isEditExecution ? { opacity: '1' } : { opacity: '0.3' }}
              name="date_end"
              id="date_end"
              disabled={isEditExecution ? false : true}
              {...register('date_end', {
                required: true,
              })}
            />
            {errors.date_end && (
              <span role="alert" style={{ color: 'red' }}>
                {'Campo requerido'}
              </span>
            )}
          </div>
        </div>
        <div className={styles.add__description}>
          <div>Descripción</div>
          <div className={styles.add_text_area}>
            <textarea
              {...register('description', {})}
              name="description"
              className={styles.description}
              id="description"
              placeholder="Añadir una descripción"
              cols="30"
              rows="5"
              disabled={isEditExecution ? false : true}
              style={isEditExecution ? { opacity: '1' } : { opacity: '0.3' }}
            ></textarea>
          </div>
        </div>
        <CollapseUploadFile />
        <div className={styles.add_buttons}>
          <storybook.ButtonCommon
            text="VOLVER"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => {
              cleanFiltersExecution();
              setViewExecution(0);
              // setValueYear(initialEditValue);
              // setIdYearExecution(initialEditValue);
            }}
          />
          <storybook.ButtonCommon
            text={type === 'add' ? 'CREAR' : 'GUARDAR'}
            width="8rem"
            height="36px"
            borderradius="5px"
            type="submit"
            // passedFunction={nothing}
          />
        </div>
      </form>
    </div>
  );
};

export default AddExecution;

AddExecution.propTypes = {
  listYears: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

AddExecution.defaultProps = {
  listYears: [],
  type: 'add',
};
