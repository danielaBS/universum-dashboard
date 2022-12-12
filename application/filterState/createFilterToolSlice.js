import requestService from '@service/services/service';

const createFilterToolSlice = (set, get) => ({
  idYearTool: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idEjecutionTool: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idDepartmentTool: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idTownTool: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idInstitutionTool: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idSedeTool: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idStateTool: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  listToolExecutionsByYear: [],
  listToolDepartments: [],
  listToolTownsByDepartment: [],
  listToolInstitutionsByTown: [],
  listToolSedesByInstitution: [],
  listToolAllEstamentosFilter: [],
  setIdYearTool: (data) => {
    set({ idYearTool: data });
  },
  setIdEjecutionTool: (data) => {
    set({ idEjecutionTool: data });
  },
  setIdDepartmentTool: (data) => {
    set({ idDepartmentTool: data });
  },
  setIdTownTool: (data) => {
    set({ idTownTool: data });
  },
  setIdInstitutionTool: (data) => {
    set({ idInstitutionTool: data });
  },
  setIdSedeTool: (data) => {
    set({ idSedeTool: data });
  },
  setIdStateTool: (data) => {
    set({ idStateTool: data });
  },
  fetchlistToolExecutionsByYear: async (info) => {
    get().setIdYearTool(info);
    const response = await requestService.getExecutionsByYear(info.value.id); // CAMBIAR
    set({ listToolExecutionsByYear: response.data });
  },
  fetchlistToolDepartments: async (id, user) => {
    // console.log(user);
    // get().setIdEjecutionTool(id);
    const dataBody = JSON.stringify({
      idUser: user.id,
    });
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const response = await requestService.getDepartmentsByUser({ dataBody: dataBody });
      set({ listToolDepartments: response.data });
    } else {
      const response = await requestService.getDepartmentsAdmin(); // CAMBIAR
      set({ listToolDepartments: response.data });
    }
  },
  fetchlistToolTownsByDepartment: async (info, user) => {
    get().setIdDepartmentTool(info);
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
        listToolTownsByDepartment: response.data,
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
        listToolTownsByDepartment: response.data,
      });
    }
  },
  fetchlistToolInstitutionsByTown: async (info, user) => {
    get().setIdTownTool(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: get().idDepartmentTool.value.id,
        idTown: info.value.id,
      });
      const response = await requestService.getInstitutionsByTown({ dataBody: dataBody }); // CAMBIAR
      // console.log(response.data);
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 &&
          response.data.unshift({ idInstitution: 0, name_institution: 'TODOS' });
      }
      set({ listToolInstitutionsByTown: response.data });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: get().idDepartmentTool.value.id,
        idTown: info.value.id,
      });
      const response = await requestService.getInstitutionsByTownAdmin({ dataBody: dataBody }); // CAMBIAR
      // console.log(response.data);
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 &&
          response.data.unshift({ idInstitution: 0, name_institution: 'TODOS' });
      }
      set({ listToolInstitutionsByTown: response.data });
    }
  },
  fetchlistToolSedeByInstitution: async (info, user) => {
    get().setIdInstitutionTool(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: get().idDepartmentTool.value.id,
        idTown: get().idTownTool.value.id,
        idInstitution: info.value.id,
      });
      const response = await requestService.getSedesByInstitution({ dataBody: dataBody }); // CAMBIAR
      //   console.log(response.data);
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 && response.data.unshift({ idSede: 0, name_sede: 'TODOS' });
      }
      set({ listToolSedesByInstitution: response.data });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: get().idDepartmentTool.value.id,
        idTown: get().idTownTool.value.id,
        idInstitution: info.value.id,
      });
      const response = await requestService.getSedesByInstitutionAdmin({ dataBody: dataBody }); // CAMBIAR
      //   console.log(response.data);
      if (get().toolState !== 1 && get().toolState !== 2) {
        response.data.length > 0 && response.data.unshift({ idSede: 0, name_sede: 'TODOS' });
      }
      set({ listToolSedesByInstitution: response.data });
    }
  },
  fetchAllToolEstamentosFilter: async (info) => {
    get().valueParameter.stateSede && get().setIdSedeTool(info);
    try {
      if (get().toolState === 1) {
        const response = await requestService.getEstamentosFormA(); // CAMBIAR
        set({ listToolAllEstamentosFilter: response.data });
      } else if (get().toolState === 2) {
        const response = await requestService.getEstamentosFormB(); // CAMBIAR
        set({ listToolAllEstamentosFilter: response.data });
      } else {
        const response = await requestService.getAllEstamentos(); // CAMBIAR
        response.data.unshift({ idState: 0, name_state: 'TODOS' });
        set({ listToolAllEstamentosFilter: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  cleanFiltersTool: (user) => {
    console.log(user);
    const valueEmptyFilter = {
      value: { id: 0, name: 'TODOS' },
      id: 0,
    };
    get().setIdYearTool(valueEmptyFilter);
    get().setIdEjecutionTool(valueEmptyFilter);
    get().setIdDepartmentTool({
      value: { id: 0, name: 'Seleccionar' },
      id: 0,
    });
    get().setIdTownTool(valueEmptyFilter);
    get().setIdInstitutionTool(valueEmptyFilter);
    get().setIdSedeTool(valueEmptyFilter);
    get().setIdStateTool(valueEmptyFilter);
    set({
      listAllPeriodos: [],
      listToolExecutionsByYear: [],
      // listToolDepartments: [],
      listToolTownsByDepartment: [],
      listToolInstitutionsByTown: [],
      listToolSedesByInstitution: [],
      listToolAllEstamentosFilter: [],
      listAllTools: [],
    });
    get().fetchAllTools(user);
  },
  unlockFilterTool: (type, info, user) => {
    const valueEmptyFilter = {
      value: { id: 0, name: 'TODOS' },
      id: 0,
    };
    const UNLOCK = {
      0: () => {
        get().fetchlistToolExecutionsByYear(info);
        // set({
        //   listToolDepartments: [],
        //   listToolTownsByDepartment: [],
        //   listToolInstitutionsByTown: [],
        //   listToolSedesByInstitution: [],
        //   listAllToolEstamentosFilter: [],
        // });
        get().setIdEjecutionTool(valueEmptyFilter);
        // get().setIdDepartmentTool(valueEmptyFilter);
        // get().setIdTownTool(valueEmptyFilter);
        // get().setIdInstitutionTool(valueEmptyFilter);
        // get().setIdSedeTool(valueEmptyFilter);
        // get().setIdStateTool(valueEmptyFilter);
      },
      1: () => {
        // get().fetchlistToolDepartments(info, user);
        get().setIdEjecutionTool(info);
        // set({
        //   listToolTownsByDepartment: [],
        //   listToolInstitutionsByTown: [],
        //   listToolSedesByInstitution: [],
        //   listToolAllEstamentosFilter: [],
        // });
        // get().setIdDepartmentTool(valueEmptyFilter);
        // get().setIdTownTool(valueEmptyFilter);
        // get().setIdInstitutionTool(valueEmptyFilter);
        // get().setIdSedeTool(valueEmptyFilter);
        // get().setIdStateTool(valueEmptyFilter);
      },
      2: () => {
        get().fetchlistToolTownsByDepartment(info, user);
        get().fetchAllYears();
        get().fetchAllToolEstamentosFilter(info);
        set({
          listToolInstitutionsByTown: [],
          listToolSedesByInstitution: [],
        });
        get().setIdYearTool(valueEmptyFilter);
        get().setIdTownTool(valueEmptyFilter);
        get().setIdInstitutionTool(valueEmptyFilter);
        get().setIdSedeTool(valueEmptyFilter);
      },
      3: () => {
        get().fetchlistToolInstitutionsByTown(info, user);
        set({
          listToolSedesByInstitution: [],
        });
        get().setIdInstitutionTool(valueEmptyFilter);
        get().setIdSedeTool(valueEmptyFilter);
      },
      4: () => {
        // get().setIdInstitutionTool(info);
        get().fetchlistToolSedeByInstitution(info, user);
        // set({ listToolAllEstamentosFilter: [], listToolAllAreasFilter: [] });
        // get().setIdSedeTool(valueEmptyFilter);
        // get().setIdStateTool(valueEmptyFilter);

        if (!get().valueParameter.stateSede) {
          get().setIdSedeTool({
            value: { id: -1, name: 'Seleccionar' },
            id: 0,
          });
          get().fetchAllToolEstamentosFilter(info);
        } else {
          // console.log('entras false');
          get().setIdSedeTool(valueEmptyFilter);
        }
      },
      5: () => {
        get().setIdSedeTool(info);
        // get().fetchAllToolEstamentosFilter(info);
        // set({ listAllEstamentosFilter: [], listAllAreasFilter: [] });
        // get().setIdStateTool(valueEmptyFilter);
      },
      6: () => {
        get().setIdStateTool(info);
      },
    };
    UNLOCK[type] ? UNLOCK[type]() : null;
  },
});

export default createFilterToolSlice;
