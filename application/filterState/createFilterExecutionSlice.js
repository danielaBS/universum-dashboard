import requestService from '@service/services/service';

const createFilterExecutionSlice = (set, get) => ({
  listExecutionDepartments: [],
  listExecutionTownsByDepartment: [],
  listExecutionInstitutionsByTown: [],
  listExecutionSedesByInstitution: [],
  idYearExecution: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idDepartmentExecution: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idTownExecution: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idInstitutionExecution: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idSedeExecution: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  setIdYearExecution: (data) => {
    set({ idYearExecution: data });
  },
  setIdDepartmentExecution: (data) => {
    set({ idDepartmentExecution: data });
  },
  setIdTownExecution: (data) => {
    set({ idTownExecution: data });
  },
  setIdInstitutionExecution: (data) => {
    set({ idInstitutionExecution: data });
  },
  setIdSedeExecution: (data) => {
    set({ idSedeExecution: data });
  },
  fetchlistExecutionDepartments: async (user) => {
    // console.log(user);
    const dataBody = JSON.stringify({
      idUser: user.id,
    });
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const response = await requestService.getDepartmentsByUser({ dataBody: dataBody }); // CAMBIAR
      // console.log(response.data);
      set({ listExecutionDepartments: response.data });
    } else {
      const response = await requestService.getDepartmentsAdmin(); // CAMBIAR
      // console.log(response.data);
      set({ listExecutionDepartments: response.data });
    }
  },
  fetchlistExecutionTownsByDepartment: async (info, user) => {
    get().setIdDepartmentExecution(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: info.value.id,
      });
      const response = await requestService.getTownsByDepartment({ dataBody: dataBody });
      set({
        listExecutionTownsByDepartment: response.data,
      });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: info.value.id,
      });
      const response = await requestService.getTownsByDepartmentAdmin({ dataBody: dataBody });
      set({
        listExecutionTownsByDepartment: response.data,
      });
    }
  },
  fetchlistExecutionInstitutionsByTown: async (info, user) => {
    get().setIdTownExecution(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: get().idDepartmentExecution.value.id,
        idTown: info.value.id,
      });
      const response = await requestService.getInstitutionsByTown({ dataBody: dataBody }); // CAMBIAR
      set({ listExecutionInstitutionsByTown: response.data });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: get().idDepartmentExecution.value.id,
        idTown: info.value.id,
      });
      const response = await requestService.getInstitutionsByTownAdmin({ dataBody: dataBody }); // CAMBIAR
      set({ listExecutionInstitutionsByTown: response.data });
    }
  },
  fetchlistExecutionSedeByInstitution: async (info, user) => {
    get().setIdInstitutionExecution(info);
    if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
      const dataBody = JSON.stringify({
        idUser: user.id,
        idDepartment: get().idDepartmentExecution.value.id,
        idTown: get().idTownExecution.value.id,
        idInstitution: info.value.id,
      });
      const response = await requestService.getSedesByInstitution({ dataBody: dataBody }); // CAMBIAR
      set({ listExecutionSedesByInstitution: response.data });
    } else {
      const dataBody = JSON.stringify({
        idDepartment: get().idDepartmentExecution.value.id,
        idTown: get().idTownExecution.value.id,
        idInstitution: info.value.id,
      });
      const response = await requestService.getSedesByInstitutionAdmin({ dataBody: dataBody }); // CAMBIAR
      set({ listExecutionSedesByInstitution: response.data });
    }
  },
  cleanFiltersExecution: () => {
    const valueEmptyFilter = {
      value: { id: 0, name: 'Seleccionar' },
      id: 0,
    };
    get().setIdYearExecution(valueEmptyFilter);
    get().setIdDepartmentExecution(valueEmptyFilter);
    get().setIdTownExecution(valueEmptyFilter);
    get().setIdInstitutionExecution(valueEmptyFilter);
    get().setIdSedeExecution(valueEmptyFilter);
    set({
      listExecutionDepartments: [],
      listExecutionTownsByDepartment: [],
      listExecutionInstitutionsByTown: [],
      listExecutionSedesByInstitution: [],
    });
  },
  unlockFilterExecution: (type, info, user) => {
    const valueEmptyFilter = {
      value: { id: 0, name: 'Seleccionar' },
      id: 0,
    };
    const UNLOCK = {
      2: () => {
        get().fetchlistExecutionTownsByDepartment(info, user);
        set({
          listExecutionInstitutionsByTown: [],
          listExecutionSedesByInstitution: [],
        });
        get().setIdTownExecution(valueEmptyFilter);
        get().setIdInstitutionExecution(valueEmptyFilter);
        get().setIdSedeExecution(valueEmptyFilter);
      },
      3: () => {
        get().fetchlistExecutionInstitutionsByTown(info, user);
        set({
          listExecutionSedesByInstitution: [],
        });
        get().setIdInstitutionExecution(valueEmptyFilter);
        get().setIdSedeExecution(valueEmptyFilter);
      },
      4: () => {
        // get().setIdInstitutionExecution(info)
        get().fetchlistExecutionSedeByInstitution(info, user);
        get().setIdSedeExecution(valueEmptyFilter);
      },
      5: () => {
        get().setIdSedeExecution(info);
      },
    };
    UNLOCK[type] ? UNLOCK[type]() : null;
  },
  fetchDownloadExecutionCuestionaire: async ({ idEjecution }) => {
    try {
      await requestService.setExecutionCuestionaire({
        dataBody: {
          idEjecution: idEjecution,
        },
      });
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'Response.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: 'Ha ocurrido un error al descargar el documento',
        },
      });
    }
    get().hideAlert();
  },
});

export default createFilterExecutionSlice;
