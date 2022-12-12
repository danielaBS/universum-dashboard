import requestService from '@service/services/service';
import { columnsTableEstamentos, statusAlerts } from '@consts/index';

const createEstamentoSlice = (set, get) => ({
  listAllEstamentos: [],
  dataEstamentoToEdit: {},
  searchByColumnEstamento: columnsTableEstamentos[0],
  setDataEstamentoToEdit: (data) => {
    set({ dataEstamentoToEdit: data });
  },
  setSearchByEstamento: (data) => {
    set({ searchByColumnEstamento: data });
  },
  fetchAllEstamentos: async () => {
    const response = await requestService.getAllEstamentos(); // CAMBIAR
    // response.data.unshift({ idState: 0, name_state: 'TODOS' });
    set({ listAllEstamentos: response.data });
  },
  fetchCreateEstamento: async (dataForm) => {
    try {
      await requestService.setCreateInstitution({
        dataBody: {
          name_institution: dataForm.name_institution,
          name_headquarter: dataForm.name_headquarter,
          num_dane: dataForm.num_dane,
          municipioId: parseInt(dataForm.municipioId.id),
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'La institución se ha guardado exitosamente',
        },
      });
      get().fetchAllInstitutions();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().hideAlert();
  },
  fetchEditEstamento: async (dataForm) => {
    const dataEstamento = get().dataEstamentoToEdit;
    try {
      await requestService.setEditEstamento({
        idEstamento: parseInt(dataEstamento.idState),
        dataBody: {
          name_state: dataForm.name_state,
        },
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El estamento se ha actualizado exitosamente',
        },
      });
      get().fetchAllInstitutions();
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: errorMessage } });
    }
    get().fetchAllEstamentos();
    get().hideAlert();
  },
});

export default createEstamentoSlice;
