import create from 'zustand';
import createAreaSlice from './areaState/areaStateSlice';
import createAuthenticationSlice from './authenticationState/createAuthenticationSlice';
import createPaginationSlice from './dashboardState/createPaginationSlice';
import createEjecucionSlice from './ejecucionState/createEjecucionSlice';
import createEstamentoSlice from './estamentoState/createEstamentoSlice';
import createInstitucionSlice from './institucionState/createInstitucionSlice';
import createMenuSlice from './menuState/createMenuSlice';
import createModalSlice from './modalState/createModalSlice';
import createMunicipioSlice from './municipioState/createMunicipioSlice';
import createPeriodoSlice from './periodoState/createPeriodoSlice';
import createReportSlice from './reportState/createReportSlice';
import createToolSlice from './toolState/createToolSlice';
import createTableSlice from './dashboardState/createTableSlice';
import createFilterSlice from './filterState/createFilterSlice';
import createFilterToolSlice from './filterState/createFilterToolSlice';
import createFilterExecutionSlice from './filterState/createFilterExecutionSlice';
import createRoleSlice from './roleState/createRoleSlice';
import createDepartmentSlice from './departmentState/departmentStateSlice';
import createTownSlice from './townState/townStateSlice';
import createSedeSlice from './sedeState/sedeStateSlice';
import createHelpSlice from './helpState/helpStateSlice';
import createUserSlice from './usersState/usersSlice';
import createFilterFormSlice from './filterState/createFilterFormSlice';
import createRegisterSlice from './registerState/createRegisterSlice';
import createResetPassSlice from './resetPassState/createResetPassSlice';

const useStore = create((set, get) => ({
  ...createResetPassSlice(set, get),
  ...createRegisterSlice(set, get),
  ...createAuthenticationSlice(set, get),
  ...createMenuSlice(set, get),
  ...createPeriodoSlice(set, get),
  ...createModalSlice(set, get),
  ...createInstitucionSlice(set, get),
  ...createEjecucionSlice(set, get),
  ...createMunicipioSlice(set, get),
  ...createPaginationSlice(set, get),
  ...createEstamentoSlice(set, get),
  ...createAreaSlice(set, get),
  ...createReportSlice(set, get),
  ...createToolSlice(set, get),
  ...createTableSlice(set, get),
  ...createFilterSlice(set, get),
  ...createFilterToolSlice(set, get),
  ...createFilterExecutionSlice(set, get),
  ...createRoleSlice(set, get),
  ...createDepartmentSlice(set, get),
  ...createTownSlice(set, get),
  ...createSedeSlice(set, get),
  ...createHelpSlice(set, get),
  ...createUserSlice(set, get),
  ...createFilterFormSlice(set, get),
}));

export default useStore;
