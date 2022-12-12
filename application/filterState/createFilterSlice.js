import requestService from '@service/services/service';

const createFilterSlice = (set, get) => ({
  listExecutionsByYear: [],
  listDepartments: [],
  listTownsByDepartment: [],
  listInstitutionsByTown: [],
  listSedesByInstitution: [],
  listAllEstamentosFilter: [],
  listAllAreasFilter: [],
  fetchlistExecutionsByYear: async (info) => {
    get().setIdYear(info);
    const response = await requestService.getExecutionsByYear(info.value.id); // CAMBIAR
    set({ listExecutionsByYear: response.data });
  },
  fetchlistDepartments: async (id, user) => {
    // get().setIdEjecution(id);
    const dataBody = JSON.stringify({
      idUser: user.id,
    });
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const response = await requestService.getDepartmentsByUser({ dataBody: dataBody });
      // console.log(response.data);
      set({ listDepartments: response.data });
    } else {
      const response = await requestService.getDepartmentsAdmin();
      set({ listDepartments: response.data });
    }
    //
  },
  fetchlistTownsByDepartment: async (info, user) => {
    get().setIdDepartment(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: info.value.id,
      });
      const response = await requestService.getTownsByDepartment({ dataBody: dataBody }); // CAMBIAR
      response.data.length > 0 && response.data.unshift({ idTown: 0, town_name: 'TODOS' });
      set({
        listTownsByDepartment: response.data,
      });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: info.value.id,
      });
      const response = await requestService.getTownsByDepartmentAdmin({ dataBody: dataBody }); // CAMBIAR
      response.data.length > 0 && response.data.unshift({ idTown: 0, town_name: 'TODOS' });
      set({
        listTownsByDepartment: response.data,
      });
    }
  },
  fetchlistInstitutionsByTown: async (info, user) => {
    get().setIdTown(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: get().idDepartment.value.id,
        idTown: info.value.id,
      });
      const response = await requestService.getInstitutionsByTown({ dataBody: dataBody }); // CAMBIAR
      response.data.length > 0 &&
        response.data.unshift({ idInstitution: 0, name_institution: 'TODOS' });
      set({ listInstitutionsByTown: response.data });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: get().idDepartment.value.id,
        idTown: info.value.id,
      });
      const response = await requestService.getInstitutionsByTownAdmin({ dataBody: dataBody }); // CAMBIAR
      // console.log(response.data);
      response.data.length > 0 &&
        response.data.unshift({ idInstitution: 0, name_institution: 'TODOS' });
      set({ listInstitutionsByTown: response.data });
    }
  },
  fetchlistSedeByInstitution: async (info, user) => {
    get().setIdInstitution(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: get().idDepartment.value.id,
        idTown: get().idTown.value.id,
        idInstitution: info.value.id,
      });
      const response = await requestService.getSedesByInstitution({ dataBody: dataBody }); // CAMBIAR
      // console.log(response.data);
      response.data.length > 0 && response.data.unshift({ idSede: 0, name_sede: 'TODOS' });
      set({ listSedesByInstitution: response.data });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: get().idDepartment.value.id,
        idTown: get().idTown.value.id,
        idInstitution: info.value.id,
      });
      const response = await requestService.getSedesByInstitutionAdmin({ dataBody: dataBody }); // CAMBIAR
      // console.log(response.data);
      response.data.length > 0 && response.data.unshift({ idSede: 0, name_sede: 'TODOS' });
      set({ listSedesByInstitution: response.data });
    }
  },
  fetchAllEstamentosFilter: async () => {
    const response = await requestService.getAllEstamentos(); // CAMBIAR
    response.data.unshift({ idState: 0, name_state: 'TODOS' });
    set({ listAllEstamentosFilter: response.data });
  },
  fetchAllAreasFilter: async () => {
    const response = await requestService.getAllAreas();
    set({ listAllAreasFilter: response.data });
  },
  cleanFilters: () => {
    const valueEmptyFilter = {
      value: { id: 0, name: 'TODOS' },
      id: 0,
    };
    get().setIdYear(valueEmptyFilter);
    get().setIdEjecution(valueEmptyFilter);
    get().setIdDepartment({
      value: { id: 0, name: 'Seleccionar' },
      id: 0,
    });
    get().setIdTown(valueEmptyFilter);
    get().setIdInstitution(valueEmptyFilter);
    get().setIdSede(valueEmptyFilter);
    get().setIdState(valueEmptyFilter);
    get().setCheckedAreaState(new Array(get().listAllAreasFilter.length).fill(false));
    set({
      listAllPeriodos: [],
      listExecutionsByYear: [],
      // listDepartments: [],
      listTownsByDepartment: [],
      listInstitutionsByTown: [],
      listSedesByInstitution: [],
      listAllEstamentosFilter: [],
      listAllAreasFilter: [],
    });
    get().fetchAllDashboardData();
  },
  unlockFilter: (type, info, user) => {
    const valueEmptyFilter = {
      value: { id: 0, name: 'TODOS' },
      id: 0,
    };
    const UNLOCK = {
      0: () => {
        get().fetchlistExecutionsByYear(info);
        // set({
        //   listDepartments: [],
        //   listTownsByDepartment: [],
        //   listInstitutionsByTown: [],
        //   listSedesByInstitution: [],
        //   listAllEstamentosFilter: [],
        //   listAllAreasFilter: [],
        // });
        get().setIdEjecution(valueEmptyFilter);
        // get().setIdDepartment(valueEmptyFilter);
        // get().setIdTown(valueEmptyFilter);
        // get().setIdInstitution(valueEmptyFilter);
        // get().setIdSede(valueEmptyFilter);
        // get().setIdState(valueEmptyFilter);
        // get().setCheckedAreaState(new Array(get().listAllAreasFilter.length).fill(false));
      },
      1: () => {
        get().setIdEjecution(info);
        // get().fetchlistDepartments(null, user);
        // set({
        //   listTownsByDepartment: [],
        //   listInstitutionsByTown: [],
        //   listSedesByInstitution: [],
        //   listAllEstamentosFilter: [],
        //   listAllAreasFilter: [],
        // });
        // get().setIdDepartment(valueEmptyFilter);
        // get().setIdTown(valueEmptyFilter);
        // get().setIdInstitution(valueEmptyFilter);
        // get().setIdSede(valueEmptyFilter);
        // get().setIdState(valueEmptyFilter);
        // get().setCheckedAreaState(new Array(get().listAllAreasFilter.length).fill(false));
      },
      2: () => {
        get().fetchlistTownsByDepartment(info, user);
        get().fetchAllYears();
        get().fetchAllEstamentosFilter();
        get().fetchAllAreasFilter();
        set({
          listInstitutionsByTown: [],
          listSedesByInstitution: [],
          // listAllEstamentosFilter: [],
          // listAllAreasFilter: [],
        });
        get().setIdYear(valueEmptyFilter);
        get().setIdTown(valueEmptyFilter);
        get().setIdInstitution(valueEmptyFilter);
        get().setIdSede(valueEmptyFilter);
        // get().setIdState(valueEmptyFilter);
        // get().setCheckedAreaState(new Array(get().listAllAreasFilter.length).fill(false));
      },
      3: () => {
        get().fetchlistInstitutionsByTown(info, user);
        set({ listSedesByInstitution: [] });
        get().setIdInstitution(valueEmptyFilter);
        get().setIdSede(valueEmptyFilter);
        // get().setIdState(valueEmptyFilter);
        // get().setCheckedAreaState(new Array(get().listAllAreasFilter.length).fill(false));
      },
      4: () => {
        // get().setIdInstitution(info)
        get().fetchlistSedeByInstitution(info, user);
        // set({ listAllEstamentosFilter: [], listAllAreasFilter: [] });
        // get().setIdSede(valueEmptyFilter);
        // get().setIdState(valueEmptyFilter);
        // get().setCheckedAreaState(new Array(get().listAllAreasFilter.length).fill(false));

        // console.log(get().valueParameter.stateSede);

        if (!get().valueParameter.stateSede) {
          get().setIdSede({
            value: { id: -1, name: 'Seleccionar' },
            id: 0,
          });
          get().fetchAllEstamentosFilter();
          get().fetchAllAreasFilter();
        } else {
          get().setIdSede(valueEmptyFilter);
        }
      },
      5: () => {
        get().setIdSede(info);
        // get().fetchAllEstamentosFilter();
        // get().fetchAllAreasFilter();
        // set({ listAllEstamentosFilter: [], listAllAreasFilter: [] });
        // get().setIdState(valueEmptyFilter);
        // get().setCheckedAreaState(new Array(get().listAllAreasFilter.length).fill(false));
      },
      6: () => {
        get().setIdState(info);
      },
    };
    UNLOCK[type] ? UNLOCK[type]() : null;
  },
});

export default createFilterSlice;
