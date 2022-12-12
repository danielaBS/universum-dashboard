import React, { useLayoutEffect } from 'react';
import styles from './main.module.scss';
import useStore from '@store/index';
import DataManagement from '@common/main/dataManagement/dataManagement';
import Dashboard from './dashboard/dashboard';
import ExecutionManagement from '@common/main/executionManagement/executionManagement';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import ReportManagement from './reportManagement/reportManagement';
import ToolsManagement from './toolsManagement/toolsManagement';
import HelpManagement from './helpManagement/helpManagement';
import { useAuth } from '@hooks/useAuth';
import UserManagement from './userManagement/userManagement';
import ConfigurationManagement from './configurationManagement/configurationManagement';

const Main = () => {
  const { user } = useAuth();
  const {
    tabState,
    fetchAllYearsGeneral,
    fetchTowns,
    fetchAllInstitutions,
    fetchAllExecutions,
    fetchAllTools,
    fetchAllDashboardData,
    fetchlistDepartments,
    fetchlistToolDepartments,
    fetchValueParameter,
    fetchAllUsers,
    listAllAreasFilter,
    setCheckedAreaState,
    permissionsByRole,
    // valueParameter,
  } = useStore(
    (state) => ({
      tabState: state.tabState,
      fetchAllYearsGeneral: state.fetchAllYearsGeneral,
      fetchTowns: state.fetchTowns,
      fetchAllInstitutions: state.fetchAllInstitutions,
      fetchAllExecutions: state.fetchAllExecutions,
      fetchAllTools: state.fetchAllTools,
      fetchAllDashboardData: state.fetchAllDashboardData,
      fetchlistDepartments: state.fetchlistDepartments,
      fetchlistToolDepartments: state.fetchlistToolDepartments,
      fetchValueParameter: state.fetchValueParameter,
      fetchAllUsers: state.fetchAllUsers,
      listAllAreasFilter: state.listAllAreasFilter,
      setCheckedAreaState: state.setCheckedAreaState,
      permissionsByRole: state.permissionsByRole,
      // valueParameter: state.valueParameter,
    }),
    shallow,
  );

  useLayoutEffect(() => {
    if (user) permissionsByRole(user.role);
  }, [permissionsByRole, user]);

  useEffect(() => {
    fetchAllYearsGeneral();
    fetchTowns();
    fetchAllInstitutions();
    fetchAllExecutions();
    fetchAllTools(user);
    fetchAllDashboardData();
    fetchValueParameter('isSedeActive');
    fetchValueParameter('isNombreActive');
    fetchValueParameter('isApellidoActive');
    fetchAllUsers();
    if (user) {
      fetchlistDepartments(null, user);
      fetchlistToolDepartments(null, user);
    }
  }, [
    fetchAllYearsGeneral,
    fetchTowns,
    fetchAllInstitutions,
    fetchAllExecutions,
    fetchAllTools,
    fetchAllDashboardData,
    fetchlistDepartments,
    fetchlistToolDepartments,
    fetchValueParameter,
    fetchAllUsers,
    user,
  ]);

  // useEffect(() => {
  //   console.log(valueParameter);
  // }, [valueParameter]);

  useEffect(() => {
    setCheckedAreaState(new Array(listAllAreasFilter.length).fill(true));
  }, [listAllAreasFilter, setCheckedAreaState]);

  function renderContentPerTab() {
    const RENDER_BY_TAB = {
      0: <Dashboard />,
      1: <ReportManagement />,
      2: <ExecutionManagement />,
      3: <DataManagement />,
      4: <ToolsManagement />,
      5: <UserManagement />,
      6: <ConfigurationManagement />,
      7: <HelpManagement />,
    };
    return RENDER_BY_TAB[tabState.id] ? RENDER_BY_TAB[tabState.id] : null;
  }

  return (
    <>
      <main className={styles.main}>
        <div>{renderContentPerTab()}</div>
      </main>
    </>
  );
};

export default Main;
