import requestService from '@service/services/service';
import { statusAlerts } from '@consts/index';

const createReportSlice = (set, get) => ({
  listContentReport: [],
  checkedState: [],
  valueReport: 0,
  typeChart: 0,
  typeChart2: 0,
  reportData: {
    idYear: 0,
    idEjecution: 0,
    idInstitution: 0,
    idState: 0,
    idAreaA: 0,
    idAreaB: 0,
    idAreaC: 0,
    idAreaD: 0,
    idDepartment: 0,
    idTown: 0,
    idSede: 0,
    arrayElementos: [
      { id: 0, state: false },
      { id: 1, state: false },
      { id: 2, state: false },
      { id: 3, state: false, type: 'bar' },
      { id: 4, state: false, type: 'bar' },
      { id: 5, state: false },
      { id: 6, state: false },
      { id: 7, state: false },
    ],
  },
  setReportData: (data) => set({ reportData: data }),
  setListContentReport: (items) => set({ listContentReport: items }),
  setCheckedState: (listContent) => set({ checkedState: listContent }),
  setValueReport: (value) => set({ valueReport: value }),
  setTypeChart: (value) => set({ typeChart: value }),
  setTypeChart2: (value) => set({ typeChart2: value }),
  handleChange: (contentObject, listContent) =>
    set((state) => {
      const updatedCheckedState = state.checkedState.map((item, index) =>
        index === contentObject ? !item : item,
      );

      state.setCheckedState(updatedCheckedState);

      const arrayMapped = updatedCheckedState.map((item, index) => {
        if (item) {
          return listContent[index];
        }
      });
      const arrayFiltered = arrayMapped.filter((item) => (item ? item : null));
      return { listContentReport: arrayFiltered };
    }),

  fetchWordReportData: async (reportInfo) => {
    try {
      const reportData = reportInfo;
      const response = await requestService.setWordReportData({
        dataBody: JSON.stringify(reportData),
      });
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'Response.docx');
      document.body.appendChild(fileLink);
      fileLink.click();
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'Los datos del archivo se han enviado con éxito',
        },
      });
      get().hideAlert();
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        set({
          alertEditStatus: {
            ...statusAlerts.error,
            title: 'Ha ocurrido un error al subir los datos',
          },
        });
        get().hideAlert();
      }, 5500);
    }
  },
  fetchPdfReportData: async (reportInfo) => {
    try {
      const reportData = reportInfo;
      const response = await requestService.setPdfReportData({
        dataBody: JSON.stringify(reportData),
      });
      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'Response.pdf');
      document.body.appendChild(fileLink);
      fileLink.click();
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'Los datos del archivo se han enviado con éxito',
        },
      });
      get().hideAlert();
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        set({
          alertEditStatus: {
            ...statusAlerts.error,
            title: 'Ha ocurrido un error al subir los datos',
          },
        });
        get().hideAlert();
      }, 5500);
    }
  },
  cleanCheckedsReport: () => set({ checkedState: [], listContentReport: [] }),
});

export default createReportSlice;
