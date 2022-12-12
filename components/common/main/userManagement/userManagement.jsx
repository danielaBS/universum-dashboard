import Title from '@common/title/title';
import React from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';

// import PropTypes from 'prop-types';
import styles from './userManagement.module.scss';
import Users from './users/users';
import storybook from '@talentumlab/storybook-design-system';
import AddUsers from './addUsers/addUsers';
import { useEffect } from 'react';

const UserManagement = ({}) => {
  const { alertEditStatus, fetchAllUsers, setViewUser, listAllPeriodos, viewUser, dataUserToEdit } =
    useStore(
      (state) => ({
        alertEditStatus: state.alertEditStatus,
        fetchAllUsers: state.fetchAllUsers,
        setViewUser: state.setViewUser,
        listAllPeriodos: state.listAllPeriodos,
        viewUser: state.viewUser,
        dataUserToEdit: state.dataUserToEdit,
      }),
      shallow,
    );

  const renderEditTitle = () => {
    if (dataUserToEdit.user) {
      return dataUserToEdit.user[0]
        ? dataUserToEdit.user[0].first_name
        : dataUserToEdit.user.first_name;
    }
  };

  const renderTitle = () => {
    return viewUser === 0
      ? 'Usuarios'
      : viewUser === 1
      ? 'Nuevo usuario'
      : viewUser === 2
      ? renderEditTitle()
      : null;
  };

  useEffect(() => {
    fetchAllUsers();
    setViewUser(0);
    // console.log(dataExecutionToEdit);
  }, [fetchAllUsers, setViewUser]);

  function renderContentPerTab() {
    const RENDER_BY_TAB = {
      0: (
        <main className={styles.users_management}>
          <Title text={renderTitle()} />
          <Users />
        </main>
      ),
      1: (
        <>
          <main className={styles.users_management_action}>
            <Title text={renderTitle()} />
            <AddUsers type="add" listYears={listAllPeriodos} />,
          </main>
        </>
      ),
      2: (
        <>
          <main className={styles.users_management_action}>
            <Title text={renderTitle()} />
            <AddUsers type="edit" listYears={listAllPeriodos} />,
          </main>
        </>
      ),
    };
    return RENDER_BY_TAB[viewUser] ? RENDER_BY_TAB[viewUser] : null;
  }
  return (
    <div className={styles.container_users}>
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
  );
};

export default UserManagement;
