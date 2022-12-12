import storybook from '@talentumlab/storybook-design-system';
import styles from './addUsers.module.scss';
import { useForm } from 'react-hook-form';
const iconArrow = '/icons/arrow_dropdown.svg';
const iconSearch = '/icons/search_input.svg';
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
// import { useAuth } from '@hooks/useAuth';
import { listRoles } from '@consts/roles';
import { scrollToTop } from '@hooks/scrollToTop';
import useInstitutions from '@hooks/useInstitutions';
// import useSedes from '@hooks/useSedes';
// import useDataFilters from '@hooks/useDataFilters';

const AddUsers = ({ type }) => {
  const { institutions } = useInstitutions();
  const {
    fetchCreateUser,
    setViewUser,
    dataUserToEdit,
    // dataUserToDelete,
    fetchEditUser,
    idRoleUser,
    setIdRoleUser,
    idInstitutionUser,
    setIdInstitutionUser,
    cleanFiltersUsers,
    valueParameter,
    checkedUserSedeState,
    setCheckedUserSedeState,
    fetchAllSedes,
    // listAllSedes,
    fetchlistSedeUserByInstitution,
    listSedesUser,
  } = useStore(
    (state) => ({
      fetchCreateUser: state.fetchCreateUser,
      setViewUser: state.setViewUser,
      dataUserToEdit: state.dataUserToEdit,
      dataUserToDelete: state.dataUserToDelete,
      fetchEditUser: state.fetchEditUser,
      idRoleUser: state.idRoleUser,
      setIdRoleUser: state.setIdRoleUser,
      idInstitutionUser: state.idInstitutionUser,
      setIdInstitutionUser: state.setIdInstitutionUser,
      cleanFiltersUsers: state.cleanFiltersUsers,
      isEditExecution: state.isEditExecution,
      valueParameter: state.valueParameter,
      checkedUserSedeState: state.checkedUserSedeState,
      setCheckedUserSedeState: state.setCheckedUserSedeState,
      fetchAllSedes: state.fetchAllSedes,
      listAllSedes: state.listAllSedes,
      fetchlistSedeUserByInstitution: state.fetchlistSedeUserByInstitution,
      listSedesUser: state.listSedesUser,
    }),
    shallow,
  );
  // const { sedes } = useDataFilters();
  // console.log('las sedes', sedes);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [valueRol, setValueRol] = useState(null);
  const [errorRole, setErrorUser] = useState(null);
  const [valueInstitution, setValueInstitution] = useState(null);
  const [showValidate, setShowValidate] = useState(false);
  const [sedesArrayToSend, setSedesArrayToSend] = useState([]);

  useEffect(() => {
    if (listSedesUser.length > 0) {
      const arrayMapped = checkedUserSedeState.map((data, index) => {
        if (data) {
          return listSedesUser[index].id;
        }
      });
      const arrayFiltered = arrayMapped.filter((data) => (data ? data : null));
      // console.log('el array nuevo', arrayFiltered);
      setSedesArrayToSend(arrayFiltered);
    }
  }, [checkedUserSedeState, listSedesUser]);

  useEffect(() => {
    fetchAllSedes();
  }, [fetchAllSedes]);

  useEffect(() => {
    console.log('lista: ', listSedesUser);
    console.log('checkedState: ', checkedUserSedeState);
  }, [listSedesUser, checkedUserSedeState]);

  useEffect(() => {
    setCheckedUserSedeState(new Array(listSedesUser.length).fill(false));
  }, [setCheckedUserSedeState, listSedesUser]);

  const initialRoleEditValue = useMemo(() => {
    if (dataUserToEdit.user) {
      return dataUserToEdit.user[0]
        ? {
            value: {
              id: dataUserToEdit.user[0].id,
              name: dataUserToEdit.user[0].roles,
            },
            id: dataUserToEdit.user[0].id,
          }
        : {
            value: {
              id: dataUserToEdit.user.id,
              name: dataUserToEdit.user.roles,
            },
            id: dataUserToEdit.user.id,
          };
    }
  }, [dataUserToEdit]);

  const initialInstitutionEditValue = useMemo(() => {
    if (dataUserToEdit.user) {
      return dataUserToEdit.user[0]
        ? {
            value: {
              id: dataUserToEdit.user[0].idInstitution,
              name: dataUserToEdit.user[0].name_institution,
            },
            id: dataUserToEdit.user[0].idInstitution,
          }
        : {
            value: {
              id: dataUserToEdit.user.idInstitution,
              name: dataUserToEdit.user.name_institution,
            },
            id: dataUserToEdit.user.idInstitution,
          };
    }
  }, [dataUserToEdit]);

  useEffect(() => {
    if (type === 'edit' && dataUserToEdit.user) {
      setValueRol(initialRoleEditValue);
      setValueInstitution(initialInstitutionEditValue);
      setIdRoleUser(initialRoleEditValue);
      setIdInstitutionUser(initialInstitutionEditValue);
      setValue(
        'first_name',
        dataUserToEdit.user[0] ? dataUserToEdit.user[0].first_name : dataUserToEdit.user.first_name,
      );
      setValue(
        'last_name',
        dataUserToEdit.user[0] ? dataUserToEdit.user[0].last_name : dataUserToEdit.user.last_name,
      );
      setValue(
        'email',
        dataUserToEdit.user[0] ? dataUserToEdit.user[0].email : dataUserToEdit.user.email,
      );
      fetchlistSedeUserByInstitution(initialInstitutionEditValue);
    }
  }, [
    type,
    dataUserToEdit,
    initialRoleEditValue,
    initialInstitutionEditValue,
    setIdRoleUser,
    setIdInstitutionUser,
    setValue,
    fetchlistSedeUserByInstitution,
  ]);

  useEffect(() => {
    if (type === 'edit' && dataUserToEdit.idSedes) {
      const items = dataUserToEdit.idSedes.map((data) => data.idSede);
      setSedesArrayToSend(
        dataUserToEdit.idSedes.map((data) => ({ id: data.idSede, name: data.name_sede })),
      );
      // console.log(items);

      const itemToSelected = listSedesUser.map((data) => {
        // console.log(editSede.includes(data));
        if (items.includes(data.id)) {
          return true;
        } else {
          return false;
        }
      });
      // console.log(itemToSelected);
      setCheckedUserSedeState(itemToSelected);
    }
  }, [dataUserToEdit, setCheckedUserSedeState, listSedesUser, type]);

  const onSubmit = async (data) => {
    // console.log(type === 'add', valueRol !== null, data.password !== data.confirm_passwor);
    if (data.password !== data.confirm_password) {
      setShowValidate(true);
    }

    // console.log(valueRol);
    if (!valueRol) {
      setErrorUser('Este campo es requerido');
    } else {
      setErrorUser(null);
    }

    if (type === 'add' && valueRol !== null && data.password === data.confirm_password) {
      console.log('entrassssss');
      const dataBody = valueParameter.stateSede
        ? {
            ...data,
            first_name: data.first_name.toString(),
            last_name: data.last_name.toString(),
            username: 'userDeMentiras' + Math.floor(Math.random() * 10).toString(),
            email: data.email.toString(),
            password: data.password.toString(),
            roles: valueRol.value.name.toString(),
            idSedes: sedesArrayToSend,
          }
        : {
            ...data,
            first_name: data.first_name.toString(),
            last_name: data.last_name.toString(),
            username: 'userDeMentiras' + Math.floor(Math.random() * 10).toString(),
            email: data.email.toString(),
            password: data.password.toString(),
            roles: valueRol.value.name.toString(),
            institucionId: valueInstitution.value.id,
          };

      // console.log('DATABODY: ', dataBody);
      fetchCreateUser(dataBody);

      setViewUser(0);
    } else if (type === 'edit' && valueRol !== null && data.password === data.confirm_password) {
      const dataBody = valueParameter.stateSede
        ? {
            ...data,
            first_name: data.first_name.toString(),
            last_name: data.last_name.toString(),
            email: data.email.toString(),
            password: data.password.toString(),
            roles: valueRol.value.name.toString(),
            idSedes: sedesArrayToSend,
          }
        : {
            ...data,
            first_name: data.first_name.toString(),
            last_name: data.last_name.toString(),
            email: data.email.toString(),
            password: data.password.toString(),
            roles: valueRol.value.name.toString(),
            institucionId: valueInstitution.value.id,
          };
      // console.log('DATABODY: ', dataBody);
      fetchEditUser(dataBody);
      setViewUser(0);
    }
    scrollToTop();
  };

  return (
    <div className={styles.add}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.column_container}>
          <div className={styles.inputs_container}>
            <div className={styles.add__title}>
              <div>
                <span style={{ color: 'red' }}>*</span>
                {'Nombre (s)'}
              </div>
              <div className={styles.add_input}>
                <storybook.Input
                  isLabel={false}
                  inputColor="#a1a1a1"
                  placeholder={''}
                  type="text"
                  id="first_name"
                  register={register}
                />
                {errors.first_name && (
                  <span role="alert" style={{ color: 'red' }}>
                    {errors.first_name.message}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.add__title}>
              <div>
                <span style={{ color: 'red' }}>*</span>Correo electrónico
              </div>
              <div className={styles.add_input}>
                <storybook.Input
                  isLabel={false}
                  inputColor="#a1a1a1"
                  placeholder={''}
                  type="text"
                  id="email"
                  register={register}
                />
                {errors.email && (
                  <span role="alert" style={{ color: 'red' }}>
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.add__user}>
              <div>
                <span style={{ color: 'red' }}>*</span>Rol de usuario
              </div>
              <div className={styles.add_dropdown}>
                <storybook.DropdownSearch
                  width="auto"
                  height="36px"
                  srcDown={iconArrow}
                  valueSelected={(info) => setValueRol(info)}
                  initialValue={idRoleUser}
                  options={listRoles}
                  backgroundColor={listRoles.length === 0 ? '#c8c8c8' : '#FFFFFF'}
                  iconSearch={iconSearch}
                />
                {errorRole && (
                  <span role="alert" style={{ color: 'red' }}>
                    {errorRole}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.add__user}>
              {valueRol && (
                <>
                  {valueRol.value.name === 'admin' ||
                    valueRol.value.name === 'gobernacion' ||
                    (valueRol.value.name === 'secretaria' ? null : (
                      <>
                        <div>
                          <span style={{ color: 'red' }}>*</span>Asignar institución
                        </div>
                        <div className={styles.add_dropdown}>
                          <storybook.DropdownSearch
                            width="auto"
                            height="36px"
                            srcDown={iconArrow}
                            valueSelected={(info) => {
                              setValueInstitution(info);
                              setIdInstitutionUser(info);
                              fetchlistSedeUserByInstitution(info);
                            }}
                            initialValue={idInstitutionUser}
                            options={institutions}
                            backgroundColor={institutions.length === 0 ? '#c8c8c8' : '#FFFFFF'}
                            iconSearch={iconSearch}
                          />
                          {errorRole && (
                            <span role="alert" style={{ color: 'red' }}>
                              {errorRole}
                            </span>
                          )}
                        </div>
                      </>
                    ))}
                </>
              )}
            </div>
            {valueParameter.stateSede && (
              <div className={styles.add__user}>
                {valueRol && (
                  <>
                    {valueRol.value.name === 'admin' ||
                      valueRol.value.name === 'gobernacion' ||
                      (valueRol.value.name === 'secretaria' ? null : (
                        <>
                          <div>
                            <span style={{ color: 'red' }}>*</span>Asignar sedes
                          </div>
                          <div className={styles.add_dropdown}>
                            <storybook.DropDownCheck
                              width="auto"
                              height="36px"
                              srcDown={iconArrow}
                              // valueSelected={(info) => console.log('el checked', info)}
                              initialValue={checkedUserSedeState.filter((data) => data === true)}
                              options={listSedesUser.map((data, index) => ({
                                id: index,
                                name: data.name,
                              }))}
                              disabled={listSedesUser.length === 0 ? true : false}
                              backgroundColor={listSedesUser.length === 0 ? '#AEAEAE' : '#FFFFFF'}
                              iconSearch={iconSearch}
                              checkedState={checkedUserSedeState}
                              setCheckedState={setCheckedUserSedeState}
                            />
                            {errorRole && (
                              <span role="alert" style={{ color: 'red' }}>
                                {errorRole}
                              </span>
                            )}
                          </div>
                        </>
                      ))}
                  </>
                )}
              </div>
            )}
          </div>
          <div className={styles.inputs_container}>
            <div className={styles.add__title}>
              <div>
                <span style={{ color: 'red' }}>*</span>
                {'Apellido (s)'}
              </div>
              <div className={styles.add_input}>
                <storybook.Input
                  isLabel={false}
                  inputColor="#a1a1a1"
                  placeholder={''}
                  type="text"
                  id="last_name"
                  register={register}
                />
                {showValidate && errors.last_name && (
                  <span role="alert" style={{ color: 'red' }}>
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.add__title}>
              <div>
                <span style={{ color: 'red' }}>*</span>Contraseña
              </div>
              <div className={styles.add_input}>
                <storybook.Input
                  isLabel={false}
                  inputColor="#a1a1a1"
                  placeholder={''}
                  type="text"
                  id="password"
                  register={register}
                  valueRequired={type === 'create' ? 'Este campo es requerido' : false}
                />
                {errors.password && (
                  <span role="alert" style={{ color: 'red' }}>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.add__title}>
              <div>
                <span style={{ color: 'red' }}>*</span>Confirme contraseña
              </div>
              <div className={styles.add_input}>
                <storybook.Input
                  isLabel={false}
                  inputColor="#a1a1a1"
                  placeholder={''}
                  type="text"
                  id="confirm_password"
                  register={register}
                  valueRequired={type === 'create' ? 'Este campo es requerido' : false}
                />
                {showValidate && (
                  <span role="alert" style={{ color: 'red' }}>
                    {'Las contraseñas no coinciden'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.add_buttons}>
          <storybook.ButtonCommon
            text="VOLVER"
            width="8rem"
            height="36px"
            borderradius="5px"
            color="#00A4AD"
            bgColor="transparent"
            passedFunction={() => {
              setViewUser(0);
              cleanFiltersUsers();
              // setValueRol(initialEditValue);
              // (initialEditValue);
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

export default AddUsers;

AddUsers.propTypes = {
  listRoles: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

AddUsers.defaultProps = {
  listRoles: [],
  type: 'add',
};
