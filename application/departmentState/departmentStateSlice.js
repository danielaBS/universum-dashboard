import requestService from '@service/services/service';
import { columnsTableDepartments, statusAlerts } from '@consts/index';

const createDepartmentSlice = (set, get) => ({
  listAllDepartments: [],
  dataDepartmentToEdit: {},
  dataDepartmentToDelete: {},
  searchByColumnDepartment: columnsTableDepartments[0],
  setDataDepartmentToEdit: (data) => {
    set({ dataDepartmentToEdit: data });
  },
  setDataDepartmentToDelete: (data) => {
    set({ dataDepartmentToDelete: data });
  },
  setSearchByDepartment: (data) => {
    set({ searchByColumnDepartment: data });
  },
  fetchAllDepartments: async () => {
    const response = await requestService.getDepartmentsAdmin();
    set({ listAllDepartments: response.data });
  },
  fetchCreateDepartment: async (dataForm) => {
    try {
      await requestService.setCreateDepartment({
        dataBody: {
          department_name: dataForm.department_name,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El departamento se ha guardado exitosamente',
        },
      });
      get().fetchAllDepartments();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchEditDepartment: async (dataForm) => {
    const dataDepartment = get().dataDepartmentToEdit;
    try {
      await requestService.setEditDepartment({
        idDepartment: dataDepartment.idDepartment,
        dataBody: {
          department_name: dataForm.department_name,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El departamento se ha actualizado exitosamente',
        },
      });
      get().fetchAllDepartments();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchDeleteDepartment: async () => {
    const dataDepartment = get().dataDepartmentToDelete;
    console.log(dataDepartment);
    try {
      await requestService.setDeleteDepartment({
        idDepartment: dataDepartment.idDepartment,
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El departamento se ha eliminado exitosamente',
        },
      });
      get().fetchAllDepartments();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
});

export default createDepartmentSlice;
