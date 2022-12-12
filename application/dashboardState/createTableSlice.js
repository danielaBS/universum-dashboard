import { statusAlerts } from '@consts/index';
import requestService from '@service/services/service';
const createTableSlice = (set, get) => ({
  indice: [],
  tables: [],
  graphics: [],
  loading: false,
  interpretationIndice: '',
  interpretationArea: [],
  idYear: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idEjecution: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idDepartment: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idTown: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idInstitution: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idSede: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idState: {
    value: { id: 0, name: 'TODOS' },
    id: 0,
  },
  idAreaA: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idAreaB: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idAreaC: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  idAreaD: {
    value: { id: 0, name: 'Seleccionar' },
    id: 0,
  },
  checkedAreaState: [],
  setCheckedAreaState: (value) => {
    set({ checkedAreaState: value });
  },
  setLoadingState: (value) => {
    set({ loading: value });
  },
  setIdYear: (data) => {
    set({ idYear: data });
  },
  setIdEjecution: (data) => {
    set({ idEjecution: data });
  },
  setIdDepartment: (data) => {
    set({ idDepartment: data });
  },
  setIdTown: (data) => {
    set({ idTown: data });
  },
  setIdInstitution: (data) => {
    set({ idInstitution: data });
  },
  setIdSede: (data) => {
    set({ idSede: data });
  },
  setIdState: (data) => {
    set({ idState: data });
  },
  setIdAreaA: (data) => {
    set({ idAreaA: data });
  },
  setIdAreaB: (data) => {
    set({ idAreaB: data });
  },
  setIdAreaC: (data) => {
    set({ idAreaC: data });
  },
  setIdAreaD: (data) => {
    set({ idAreaD: data });
  },
  setInterpretationIndice: () => {
    const indiceData = get().indice.length > 0 ? get().indice[0].data : null;
    const indice = indiceData ? indiceData.toFixed(2) : null;

    if (indice >= 0 && indice <= 0.99) {
      set({
        interpretationIndice:
          'Los resultados del Índice en este rango indican que en la institución no se formulan políticas ni se desarrollan acciones que favorezcan las prácticas inclusivas para la atención a la diversidad.',
      });
    }
    if (indice >= 1 && indice <= 1.99) {
      set({
        interpretationIndice:
          'Los resultados del Índice en este rango significan que se formulan políticas y se realizan algunas acciones inclusivas de manera desarticulada de la gestión institucional para la atención a la diversidad y son desconocidas por la mayoría de los integrantes de la comunidad educativa.',
      });
    }
    if (indice >= 2 && indice <= 2.79) {
      set({
        interpretationIndice:
          'Los resultados del Índice en este rango indican que se realizan acciones organizadas en las áreas de gestión, conocidas por la mayoría de los integrantes de la comunidad educativa; además se incluyen en los planes de mejoramiento las prioridades de transformación institucional para cualificar la atención a la diversidad.',
      });
    }
    if (indice >= 2.8 && indice <= 3.49) {
      set({
        interpretationIndice:
          'El resultado del Índice en este rango significa que las acciones inclusivas para la atención a la diversidad, formuladas en el plan de mejoramiento, se desarrollan y evalúan de manera continúa y están articuladas con la gestión institucional, lo que favorece el aprendizaje, la participación y la convivencia de todos los integrantes de la comunidad educativa.',
      });
    }
    if (indice >= 3.5 && indice <= 4) {
      set({
        interpretationIndice:
          'El resultado del Índice en este rango evidencia una cultura institucional caracterizada por buenas prácticas inclusivas, el trabajo colaborativo, la pertenencia a redes de apoyo y por ser centro de referencia para la atención a la diversidad; además el plan de desarrollo institucional está articulado con el de la entidad territorial.',
      });
    }
  },
  setInterpretationAreas: () => {
    const tableContent = get().tables.map((data) => {
      return data.data;
    });

    const valuesAverageAreas = tableContent[0].map((data) => {
      if (data.slice(-1)[0] >= 0 && data.slice(-1)[0] <= 0.99) {
        return [
          data[0],
          'Los resultados del Índice en este rango indican que no se desarrollan acciones inclusivas para la atención a la diversidad.',
        ];
      }
      if (data.slice(-1)[0] >= 1 && data.slice(-1)[0] <= 1.99) {
        return [
          data[0],
          'Los resultados del Índice en este rango indican que la comunidad educativa desconoce las acciones inclusivas que desarrolla la institución para la atención a la diversidad.',
        ];
      }
      if (data.slice(-1)[0] >= 2 && data.slice(-1)[0] <= 2.79) {
        return [
          data[0],
          'Los resultados del Índice en este rango indican que en algunas ocasiones se realizan acciones inclusivas para la atención a la diversidad y son conocidas por la mayoría de los integrantes de la comunidad educativa.',
        ];
      }
      if (data.slice(-1)[0] >= 2.8 && data.slice(-1)[0] <= 3.49) {
        return [
          data[0],
          'Los resultados del Índice en este rango indican que con frecuencia se realizan acciones inclusivas para la atención a la diversidad y son conocidas por todos los integrantes de la comunidad educativa.',
        ];
      }
      if (data.slice(-1)[0] >= 3.5 && data.slice(-1)[0] <= 4) {
        return [
          data[0],
          'Los resultados del Índice en este rango indican una evaluación permanente para conocer el impacto de las acciones inclusivas para la atención a la diversidad, y la usa para aportar al desarrollo institucional.',
        ];
      }
    });
    console.log(valuesAverageAreas);
    set({ interpretationArea: valuesAverageAreas });
  },
  fetchAllDashboardData: async () => {
    set({
      indice: [],
      tables: [],
      graphics: [],
    });
    get().setLoadingState(true);
    const dataBody = JSON.stringify({
      idYear: get().idYear.value.id,
      idEjecution: get().idEjecution.value.id,
      idDepartment: get().idDepartment.value.id,
      idTown: get().idTown.value.id,
      idInstitution: get().idInstitution.value.id,
      idSede: get().idSede.value.id,
      idState: get().idState.value.id,
      idAreaA: get().checkedAreaState[0] ? 1 : 0,
      idAreaB: get().checkedAreaState[1] ? 1 : 0,
      idAreaC: get().checkedAreaState[2] ? 1 : 0,
      idAreaD: get().checkedAreaState[3] ? 1 : 0,
    });
    // console.log(JSON.parse(dataBody));
    try {
      const response = await requestService.getDashboardDataUpdated({
        dataBody: dataBody,
      });
      // console.log(response.data);
      if (typeof response.data[0] === 'object') {
        set({
          indice: [],
          tables: [],
          graphics: [],
        });
        setTimeout(() => {
          get().setLoadingState(false);
        }, 500);
      } else {
        set({
          indice: response.data.data.indice,
          tables: response.data.data.tables,
          graphics: response.data.data.graphics,
        });
        setTimeout(() => {
          get().setLoadingState(false);
        }, 500);
      }
    } catch (err) {
      set({
        indice: [],
        tables: [],
        graphics: [],
      });
      setTimeout(() => {
        get().setLoadingState(false);
      }, 500);
      console.log(err);
      // const errorMessage = err.response.data.error.message;
      // set({
      //   alertEditStatus: {
      //     ...statusAlerts.error,
      //     title: 'No hay data para los campos filtrados',
      //   },
      // });
    }
    get().hideAlert();
  },
});

export default createTableSlice;
