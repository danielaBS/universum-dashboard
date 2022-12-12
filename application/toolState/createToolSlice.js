import requestService from '@service/services/service';
import { columnsTableTools, statusAlerts } from '@consts/index';

const createToolSlice = (set, get) => ({
  listAllTools: [],
  dataToolToAction: null,
  typeForm: 'create',
  searchByColumnTool: columnsTableTools[0],
  viewTool: 0,
  estamentoData: null,
  sedeData: null,
  institutionData: null,
  yearData: null,
  executionData: null,
  nameData: null,
  lastName: null,
  toolState: 0,
  dataFormToEdit: null,
  checkedTableToolState: [],
  setCheckedTableToolState: (value) => {
    set({ checkedTableToolState: value });
  },
  setToolState: (id) => {
    set({ toolState: id });
  },
  setTypeForm: (type) => {
    set({ typeForm: type });
  },
  setValueBasicData: (id, value) => {
    console.log(id);
    set(() => {
      const SET_DATA = {
        0: { yearData: value },
        1: { executionData: value },
        4: { institutionData: value },
        5: { sedeData: value },
        6: { estamentoData: value },
        name: { nameData: value },
        last: { lastName: value },
      };
      return SET_DATA[id] ? SET_DATA[id] : null;
    });
  },
  setCleanBasicData: () => {
    set({
      yearData: null,
      estamentoData: null,
      sedeData: null,
      executionData: null,
      nameData: null,
      lastName: null,
    });
  },
  setViewTool: (id) => {
    set({ viewTool: id });
  },
  setDataToolToAction: (data) => {
    set({ dataToolToAction: data });
  },
  setSearchByTool: (data) => {
    set({ searchByColumnTool: data });
  },
  fetchAllTools: async (user) => {
    const dataBody = {
      idYear: get().idYearTool.value.id,
      idEjecution: get().idEjecutionTool.value.id,
      idDepartment: get().idDepartmentTool.value.id,
      idTown: get().idTownTool.value.id,
      idInstitution: get().idInstitutionTool.value.id,
      idSede: get().idSedeTool.value.id,
      idState: get().idStateTool.value.id,
    };
    if (user) {
      if (user.roles === 'rector' || user.roles === 'docente' || user.roles === 'encuestador') {
        try {
          const response = await requestService.getDataCuestionariosByUser({
            dataBody: JSON.stringify({ ...dataBody, idUser: user.id }),
          });

          if (response.data[0].Error === 'No hay data para los campos filtrados') {
            // console.log('entra');
            set({ listAllTools: [] });
          } else {
            set({ listAllTools: response.data });
          }
        } catch (error) {
          set({ listAllTools: [] });
        }
      } else {
        const response = await requestService.getDataCuestionarios({
          dataBody: JSON.stringify(dataBody),
        });

        if (response.data[0].Error === 'No hay data para los campos filtrados') {
          //  console.log('entra');
          set({ listAllTools: [] });
        } else {
          set({ listAllTools: response.data });
        }
      }
    }
  },
  fetchCreateToolA: async (dataForm, user) => {
    try {
      const response = await requestService.setCreateToolA({
        dataBody: dataForm,
      });
      console.log(response);
      get().fetchAllTools(user);
    } catch (err) {
      console.log(err);
      // const errorMessage = err.response.data.error.message;
    }
    get().hideAlert();
  },
  fetchCreateToolB: async (dataForm, user) => {
    try {
      const response = await requestService.setCreateToolB({
        dataBody: dataForm,
      });
      console.log(response);
      get().fetchAllTools(user);
    } catch (err) {
      console.log(err);
      // const errorMessage = err.response.data.error.message;
    }
    get().hideAlert();
  },
  fetchDataEditPerForm: async (type) => {
    // console.log('entrras');
    const dataTool = get().dataToolToAction;
    try {
      if (type === 'Formulario 1') {
        const response = await requestService.getDataEditCuestionarioA({
          idForm: parseInt(dataTool.idCuestionarioA),
        });
        // console.log(response);
        set({
          dataFormToEdit: response.data,
        });
        // console.log('entrras');
      } else {
        const response = await requestService.getDataEditCuestionarioB({
          idForm: parseInt(dataTool.idCuestionarioB),
        });
        set({
          dataFormToEdit: response.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  fetchEditToolA: async (dataForm, user) => {
    console.log(dataForm);
    const dataTool = get().dataToolToAction;
    try {
      const response = await requestService.setEditCuestionarioA({
        idForm: parseInt(dataTool.idCuestionarioA),
        dataBody: dataForm,
      });
      console.log(response);
      get().fetchAllTools(user);
    } catch (err) {
      console.log(err);
    }
  },
  fetchEditToolB: async (dataForm, user) => {
    const dataTool = get().dataToolToAction;
    console.log(dataTool);
    try {
      const response = await requestService.setEditCuestionarioB({
        idForm: parseInt(dataTool.idCuestionarioB),
        dataBody: dataForm,
      });
      console.log(response);
      get().fetchAllTools(user);
    } catch (err) {
      console.log(err);
    }
  },
  fetchDeleteToolA: async (user) => {
    const dataTool = get().dataToolToAction;
    try {
      const response = await requestService.setDeleteCuestionarioA({
        idForm: parseInt(dataTool.idCuestionarioA),
      });
      console.log(response);
      set({
        alertEditStatus: { ...statusAlerts.success, title: 'El cuestionario se ha eliminado' },
      });
      get().fetchAllTools(user);
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: { ...statusAlerts.error, title: 'Error eliminando el cuestionario' },
      });
    }
    get().hideAlert();
  },
  fetchDeleteToolB: async (user) => {
    const dataTool = get().dataToolToAction;
    try {
      const response = await requestService.setDeleteCuestionarioB({
        idForm: parseInt(dataTool.idCuestionarioB),
      });
      console.log(response);
      set({
        alertEditStatus: { ...statusAlerts.success, title: 'El cuestionario se ha eliminado' },
      });
      get().fetchAllTools(user);
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: { ...statusAlerts.error, title: 'Error eliminando el cuestionario' },
      });
    }
    get().hideAlert();
  },
});

export default createToolSlice;
