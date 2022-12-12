import requestService from '@service/services/service';

const createFilterFormSlice = (set, get) => ({
  idYearForm: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idEjecutionForm: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idDepartmentForm: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idTownForm: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idInstitutionForm: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idSedeForm: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idStateForm: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  listFormExecutionsByYear: [],
  listFormDepartments: [],
  listFormTownsByDepartment: [],
  listFormInstitutionsByTown: [],
  listFormSedesByInstitution: [],
  listFormAllEstamentosFilter: [],
  setIdYearForm: (data) => {
    set({ idYearForm: data });
  },
  setIdEjecutionForm: (data) => {
    set({ idEjecutionForm: data });
  },
  setIdDepartmentForm: (data) => {
    set({ idDepartmentForm: data });
  },
  setIdTownForm: (data) => {
    set({ idTownForm: data });
  },
  setIdInstitutionForm: (data) => {
    set({ idInstitutionForm: data });
  },
  setIdSedeForm: (data) => {
    set({ idSedeForm: data });
  },
  setIdStateForm: (data) => {
    set({ idStateForm: data });
  },
  fetchlistFormExecutionsByYear: async (info) => {
    get().setIdYearForm(info);
    const response = await requestService.getExecutionsByYear(info.value.id); // CAMBIAR
    set({ listFormExecutionsByYear: response.data });
  },
  fetchlistFormDepartments: async (id, user) => {
    // console.log(user);
    get().setIdEjecutionForm(id);
    const dataBody = JSON.stringify({
      idUser: user.id,
    });
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const response = await requestService.getDepartmentsByUser({ dataBody: dataBody });
      set({ listFormDepartments: response.data });
    } else {
      const response = await requestService.getDepartmentsAdmin(); // CAMBIAR
      set({ listFormDepartments: response.data });
    }
  },
  fetchlistFormTownsByDepartment: async (info, user) => {
    get().setIdDepartmentForm(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: info.value.id,
      });
      const response = await requestService.getTownsByDepartment({ dataBody: dataBody }); // CAMBIAR
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 && response.data.unshift({ idTown: 0, town_name: 'TODOS' });
      }
      set({
        listFormTownsByDepartment: response.data,
      });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: info.value.id,
      });
      const response = await requestService.getTownsByDepartmentAdmin({ dataBody: dataBody }); // CAMBIAR
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 && response.data.unshift({ idTown: 0, town_name: 'TODOS' });
      }
      set({
        listFormTownsByDepartment: response.data,
      });
    }
  },
  fetchlistFormInstitutionsByTown: async (info, user) => {
    get().setIdTownForm(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: get().idDepartmentForm.value.id,
        idTown: info.value.id,
      });
      const response = await requestService.getInstitutionsByTown({ dataBody: dataBody }); // CAMBIAR
      // console.log(response.data);
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 &&
          response.data.unshift({ idInstitution: 0, name_institution: 'TODOS' });
      }
      set({ listFormInstitutionsByTown: response.data });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: get().idDepartmentForm.value.id,
        idTown: info.value.id,
      });
      const response = await requestService.getInstitutionsByTownAdmin({ dataBody: dataBody }); // CAMBIAR
      // console.log(response.data);
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 &&
          response.data.unshift({ idInstitution: 0, name_institution: 'TODOS' });
      }
      set({ listFormInstitutionsByTown: response.data });
    }
  },
  fetchlistFormSedeByInstitution: async (info, user) => {
    get().setIdInstitutionForm(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: get().idDepartmentForm.value.id,
        idTown: get().idTownForm.value.id,
        idInstitution: info.value.id,
      });
      const response = await requestService.getSedesByInstitution({ dataBody: dataBody }); // CAMBIAR
      //   console.log(response.data);
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 && response.data.unshift({ idSede: 0, name_sede: 'TODOS' });
      }
      set({ listFormSedesByInstitution: response.data });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: get().idDepartmentForm.value.id,
        idTown: get().idTownForm.value.id,
        idInstitution: info.value.id,
      });
      const response = await requestService.getSedesByInstitutionAdmin({ dataBody: dataBody }); // CAMBIAR
      //   console.log(response.data);
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 && response.data.unshift({ idSede: 0, name_sede: 'TODOS' });
      }
      set({ listFormSedesByInstitution: response.data });
    }
  },
  fetchAllFormEstamentosFilter: async (info) => {
    get().valueParameter.stateSede && get().setIdSedeForm(info);
    try {
      if (get().toolState === 1) {
        const response = await requestService.getEstamentosFormA(); // CAMBIAR
        set({ listFormAllEstamentosFilter: response.data });
      } else if (get().toolState === 2) {
        const response = await requestService.getEstamentosFormB(); // CAMBIAR
        set({ listFormAllEstamentosFilter: response.data });
      } else {
        const response = await requestService.getAllEstamentos(); // CAMBIAR
        response.data.unshift({ idState: 0, name_state: 'TODOS' });
        set({ listFormAllEstamentosFilter: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  cleanFiltersForm: (user) => {
    // console.log(user);
    const valueEmptyFilter = {
      value: { id: 0, name: 'Seleccionar' },
      id: 0,
    };
    get().setIdYearForm(valueEmptyFilter);
    get().setIdEjecutionForm(valueEmptyFilter);
    get().setIdDepartmentForm(valueEmptyFilter);
    get().setIdTownForm(valueEmptyFilter);
    get().setIdInstitutionForm(valueEmptyFilter);
    get().setIdSedeForm(valueEmptyFilter);
    get().setIdStateForm(valueEmptyFilter);
    set({
      listFormExecutionsByYear: [],
      listFormDepartments: [],
      listFormTownsByDepartment: [],
      listFormInstitutionsByTown: [],
      listFormSedesByInstitution: [],
      listFormAllEstamentosFilter: [],
      listAllTools: [],
    });
    get().fetchAllTools(user);
  },
  unlockFilterForm: (type, info, user) => {
    const valueEmptyFilter = {
      value: { id: 0, name: 'Seleccionar' },
      id: 0,
    };
    const UNLOCK = {
      0: () => {
        get().fetchlistFormExecutionsByYear(info);
        set({
          listFormDepartments: [],
          listFormTownsByDepartment: [],
          listFormInstitutionsByTown: [],
          listFormSedesByInstitution: [],
          listAllToolEstamentosFilter: [],
        });
        get().setIdEjecutionForm(valueEmptyFilter);
        get().setIdDepartmentForm(valueEmptyFilter);
        get().setIdTownForm(valueEmptyFilter);
        get().setIdInstitutionForm(valueEmptyFilter);
        get().setIdSedeForm(valueEmptyFilter);
        get().setIdStateForm(valueEmptyFilter);
      },
      1: () => {
        get().fetchlistFormDepartments(info, user);
        set({
          listFormTownsByDepartment: [],
          listFormInstitutionsByTown: [],
          listFormSedesByInstitution: [],
          listFormAllEstamentosFilter: [],
        });
        get().setIdDepartmentForm(valueEmptyFilter);
        get().setIdTownForm(valueEmptyFilter);
        get().setIdInstitutionForm(valueEmptyFilter);
        get().setIdSedeForm(valueEmptyFilter);
        get().setIdStateForm(valueEmptyFilter);
      },
      2: () => {
        get().fetchlistFormTownsByDepartment(info, user);
        set({
          listFormInstitutionsByTown: [],
          listFormSedesByInstitution: [],
          listFormAllEstamentosFilter: [],
        });
        get().setIdTownForm(valueEmptyFilter);
        get().setIdInstitutionForm(valueEmptyFilter);
        get().setIdSedeForm(valueEmptyFilter);
        get().setIdStateForm(valueEmptyFilter);
      },
      3: () => {
        get().fetchlistFormInstitutionsByTown(info, user);
        set({
          listFormSedesByInstitution: [],
          listFormAllEstamentosFilter: [],
          listToolAllAreasFilter: [],
        });
        get().setIdInstitutionForm(valueEmptyFilter);
        get().setIdSedeForm(valueEmptyFilter);
        get().setIdStateForm(valueEmptyFilter);
      },
      4: () => {
        get().setIdInstitutionForm(info);
        get().fetchlistFormSedeByInstitution(info, user);
        set({ listFormAllEstamentosFilter: [], listToolAllAreasFilter: [] });
        // get().setIdSedeForm(valueEmptyFilter);
        get().setIdStateForm(valueEmptyFilter);

        if (!get().valueParameter.stateSede) {
          get().setIdSedeForm({
            value: { id: -1, name: 'Seleccionar' },
            id: 0,
          });
          get().fetchAllFormEstamentosFilter(info);
        } else {
          // console.log('entras false');
          get().setIdSedeForm(valueEmptyFilter);
        }
      },
      5: () => {
        get().setIdSedeForm(info);
        get().fetchAllFormEstamentosFilter(info);
        // set({ listAllEstamentosFilter: [], listAllAreasFilter: [] });
        get().setIdStateForm(valueEmptyFilter);
      },
      6: () => {
        get().setIdStateForm(info);
      },
    };
    UNLOCK[type] ? UNLOCK[type]() : null;
  },
});

export default createFilterFormSlice;
