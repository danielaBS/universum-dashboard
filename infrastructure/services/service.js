import apiClient from '@service/api/apiClient';
import {
  configGet,
  configGetWithToken,
  configPost,
  configPut,
  configDelete,
  configPostFileXlsx,
  configPostFileDocx,
  configPostFilePdf,
  configPostDownloadXlsx,
  configPostDownloadZip,
  configPatch,
} from '@service/api/configFetch';

const createUrl = (base, path) => `${base}${path}`;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class requestService {
  // AUTH
  fetchRegisterUser = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/auth/register')], dataBody));
  
  setLoginUser = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/auth/login')], dataBody));
  
  fetchUserValid = ( un ) =>
    apiClient(configGet([createUrl(BASE_URL, `/picture/to-login?un=${un}`)]));

  setResetPass = ({ dataBody }) =>
    apiClient(configPatch([createUrl(BASE_URL, '/auth/req/reset-password')], dataBody));

  setResetPassFinish = ({ dataBody }) =>
    apiClient(configPatch([createUrl(BASE_URL, '/auth/reset-password')], dataBody));

  setChangePassword = ({ dataBody }) =>
    apiClient(configPatchWithToken([createUrl(BASE_URL, '/auth/change-password')], dataBody));

  //IMGS
  fetchImgsRegister = () =>
    apiClient(configGet([createUrl(BASE_URL, '/picture/to-register')]));

  //USERS
  getAllUsers = () => apiClient(configGetWithToken([createUrl(BASE_URL, '/users/all')]));


  getPeriodos = () => apiClient(configGet([createUrl(BASE_URL, `/periodo`)]));

  getAllYears = () => apiClient(configGet([createUrl(BASE_URL, `/year/visualizacion`)]));

  setEditYear = ({ idYear, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/year/${idYear}`)], dataBody));

  setDeleteYear = ({ idYear }) => apiClient(configDelete([createUrl(BASE_URL, `/year/${idYear}`)]));

  setPostYear = ({ dataBody }) => apiClient(configPost([createUrl(BASE_URL, '/year')], dataBody));

  getAllInstitutions = () => apiClient(configGet([createUrl(BASE_URL, `/institucion`)]));

  setCreateInstitution = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, `/institucion`)], dataBody));

  setEditInstitution = ({ idInstitution, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/institucion/${idInstitution}`)], dataBody));

  getAllEstamentos = () => apiClient(configGet([createUrl(BASE_URL, `/estamento`)]));

  getAllAreas = () => apiClient(configGet([createUrl(BASE_URL, `/area`)]));

  getAllExecutions = () => apiClient(configGet([createUrl(BASE_URL, `/ejecucion/year`)]));

  getYearById = ({ idYear }) => apiClient(configGet([createUrl(BASE_URL, `/year/${idYear}`)]));

  getAllTowns = () => apiClient(configGet([createUrl(BASE_URL, `/municipio`)]));

  getDashboardDataDeprecated = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/estadistica')], dataBody));

  getDashboardDataUpdated = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/estadisticaIndice')], dataBody));

  setCreateExecution = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, `/ejecucion`)], dataBody));

  setEditExecution = ({ idExecution, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/ejecucion/${idExecution}`)], dataBody));

  setDeleteExecution = ({ idExecution }) =>
    apiClient(configDelete([createUrl(BASE_URL, `/ejecucion/${idExecution}`)]));

  setDataFileExecutionMasivoSede = ({ dataBody, idExecution }) =>
    apiClient(
      configPostFileXlsx([createUrl(BASE_URL, `/estadistica/file/sede/${idExecution}`)], dataBody),
    );

  setDataFileExecutionMasivoInstitution = ({ dataBody, idExecution }) =>
    apiClient(
      configPostFileXlsx(
        [createUrl(BASE_URL, `/estadistica/file/institucion/${idExecution}`)],
        dataBody,
      ),
    );

  setDataFileExecutionByInstitution = ({ dataBody, idExecution }) =>
    apiClient(
      configPostFileXlsx(
        [createUrl(BASE_URL, `/estadistica/file/institucion/one/${idExecution}`)],
        dataBody,
      ),
    );

  setDataFileExecutionBySede = ({ dataBody, idExecution }) =>
    apiClient(
      configPostFileXlsx(
        [createUrl(BASE_URL, `/estadistica/file/sede/one/${idExecution}`)],
        dataBody,
      ),
    );

  setWordReportData = ({ dataBody }) =>
    apiClient(configPostFileDocx([createUrl(BASE_URL, '/reporteword')], dataBody));

  setPdfReportData = ({ dataBody }) =>
    apiClient(configPostFilePdf([createUrl(BASE_URL, '/reportepdf')], dataBody));

  getDataCuestionarios = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, `/cuestionarios`)], dataBody));

  getDataCuestionariosByUser = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, `/cuestionariosuser`)], dataBody));

  getDataCuestionarioxA = () =>
    apiClient(configGet([createUrl(BASE_URL, `/cuestionarioxas/data`)]));

  getDataCuestionarioxB = () =>
    apiClient(configGet([createUrl(BASE_URL, `/cuestionarioxbs/data`)]));

  setCreateToolA = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, `/cuestionarioxas`)], dataBody));

  setCreateToolB = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, `/cuestionarioxbs`)], dataBody));

  setEditCuestionarioA = ({ idForm, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/cuestionarioxas/${idForm}`)], dataBody));

  setEditCuestionarioB = ({ idForm, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/cuestionarioxbs/${idForm}`)], dataBody));

  getDataEditCuestionarioA = ({ idForm }) =>
    apiClient(configGet([createUrl(BASE_URL, `/cuestionarioxa/data/${idForm}`)]));

  getDataEditCuestionarioB = ({ idForm }) =>
    apiClient(configGet([createUrl(BASE_URL, `/cuestionarioxb/data/${idForm}`)]));

  setDeleteCuestionarioA = ({ idForm }) =>
    apiClient(configDelete([createUrl(BASE_URL, `/cuestionarioxas/${idForm}`)]));

  setDeleteCuestionarioB = ({ idForm }) =>
    apiClient(configDelete([createUrl(BASE_URL, `/cuestionarioxbs/${idForm}`)]));

  getDepartmentsByUser = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/departmentsByUser')], dataBody));

  getTownsByDepartment = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/getMunicipiosByUserAndDeparment')], dataBody));

  getInstitutionsByTown = ({ dataBody }) =>
    apiClient(
      configPost([createUrl(BASE_URL, '/getInstitucionesByUserAndDeparmentAndTown')], dataBody),
    );

  getExecutionsByYear = (idYear) =>
    apiClient(configGet([createUrl(BASE_URL, `/ejecucion/year/${idYear}`)]));

  getSedesByInstitution = ({ dataBody }) =>
    apiClient(
      configPost(
        [createUrl(BASE_URL, '/getSedesByUserAndDeparmentAndTownAndInstitucion')],
        dataBody,
      ),
    );

  getEstamentosFormA = () => apiClient(configGet([createUrl(BASE_URL, `/estamento/formularioa`)]));

  getEstamentosFormB = () => apiClient(configGet([createUrl(BASE_URL, `/estamento/formulariob`)]));

  getDepartmentsAdmin = () => apiClient(configGet([createUrl(BASE_URL, `/getDepartments`)]));

  getTownsByDepartmentAdmin = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/getMunicipiosAndDeparment')], dataBody));

  getInstitutionsByTownAdmin = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/getInstitucionesAndDeparmentAndTown')], dataBody));

  getSedesByInstitutionAdmin = ({ dataBody }) =>
    apiClient(
      configPost([createUrl(BASE_URL, '/getSedesByDeparmentAndTownAndInstitution')], dataBody),
    );

  getAllTowns = () => apiClient(configGet([createUrl(BASE_URL, `/municipio`)]));

  setCreateDepartment = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/departamentos')], dataBody));

  setEditDepartment = ({ idDepartment, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/departamentos/${idDepartment}`)], dataBody));

  setDeleteDepartment = ({ idDepartment }) =>
    apiClient(configDelete([createUrl(BASE_URL, `/departamentos/${idDepartment}`)]));

  setCreateTown = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/municipio')], dataBody));

  setEditTown = ({ idTown, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/municipio/${idTown}`)], dataBody));

  setDeleteTown = ({ idTown }) =>
    apiClient(configDelete([createUrl(BASE_URL, `/municipio/${idTown}`)]));

  getAllSedes = () => apiClient(configGet([createUrl(BASE_URL, `/sedes`)]));

  setCreateSede = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/sedes')], dataBody));

  setEditSede = ({ idSede, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/sedes/${idSede}`)], dataBody));

  setDeleteSede = ({ idSede }) =>
    apiClient(configDelete([createUrl(BASE_URL, `/sedes/${idSede}`)]));

  setDeleteInstitution = ({ idInstitution }) =>
    apiClient(configDelete([createUrl(BASE_URL, `/institucion/${idInstitution}`)]));

  setDataFileInstitutionData = ({ dataBody }) =>
    apiClient(configPostFileXlsx([createUrl(BASE_URL, `/institucion/file`)], dataBody));

  setDataFileSedeData = ({ dataBody }) =>
    apiClient(configPostFileXlsx([createUrl(BASE_URL, `/sede/file`)], dataBody));

  setDataFileTownData = ({ dataBody }) =>
    apiClient(configPostFileXlsx([createUrl(BASE_URL, `/municipio/file`)], dataBody));

  setEditEstamento = ({ idEstamento, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/estamento/${idEstamento}`)], dataBody));

  setEditArea = ({ idArea, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/area/${idArea}`)], dataBody));

  getValueParametrizacion = ({ idParametro }) =>
    apiClient(configGet([createUrl(BASE_URL, `/getValueParametrizacion/${idParametro}`)]));

  setValueParametrizacion = ({ idParametro, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/parametrizacion/${idParametro}`)], dataBody));


  getUserById = ({ idUser }) => apiClient(configGet([createUrl(BASE_URL, `/users/${idUser}`)]));

  setCreateUserBySede = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/users/bysede')], dataBody));

  setCreateUserByInstitution = ({ dataBody }) =>
    apiClient(configPost([createUrl(BASE_URL, '/users/byinstitucion')], dataBody));

  setEditUserBySede = ({ idUser, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/users/bysede/${idUser}`)], dataBody));

  setEditUserByInstitution = ({ idUser, dataBody }) =>
    apiClient(configPut([createUrl(BASE_URL, `/users/byinstitucion/${idUser}`)], dataBody));

  setDeleteUser = ({ idUser }) =>
    apiClient(configDelete([createUrl(BASE_URL, `/users/${idUser}`)]));

  setDataFileUserBySede = ({ dataBody }) =>
    apiClient(configPostFileXlsx([createUrl(BASE_URL, `/users/file/bysede`)], dataBody));

  setDataFileUserByInstitution = ({ dataBody }) =>
    apiClient(configPostFileXlsx([createUrl(BASE_URL, `/users/file/byinstitution`)], dataBody));

  getSedesUserByInstitution = ({ idInstitution }) =>
    apiClient(configGet([createUrl(BASE_URL, `/sedesByInstitucion/${idInstitution}`)]));

  setExecutionCuestionaire = ({ dataBody }) =>
    apiClient(configPostDownloadXlsx([createUrl(BASE_URL, `/cuestionariosEjecution`)], dataBody));

  setInstitutionCuestionaire = ({ dataBody }) =>
    apiClient(configPostDownloadXlsx([createUrl(BASE_URL, `/cuestionariosInstitucion`)], dataBody));

  setSedeCuestionaire = ({ dataBody }) =>
    apiClient(configPostDownloadXlsx([createUrl(BASE_URL, `/cuestionariosSede`)], dataBody));

  setIndiceStateExecution = ({ dataBody }) =>
    apiClient(configPostDownloadXlsx([createUrl(BASE_URL, `/reporteExcelEjecution`)], dataBody));

  setTownZip = ({ dataBody }) =>
    apiClient(configPostDownloadZip([createUrl(BASE_URL, `/reporteZipMunicipio`)], dataBody));

  setIndiceStateSede = ({ dataBody }) =>
    apiClient(configPostFilePdf([createUrl(BASE_URL, `/reportepdfSede`)], dataBody));

  setIndiceStateInstitution = ({ dataBody }) =>
    apiClient(configPostFilePdf([createUrl(BASE_URL, `/reportepdfInstitucion`)], dataBody));

  setCuestionariosExecution = ({ dataBody }) =>
    apiClient(configPostDownloadXlsx([createUrl(BASE_URL, `/cuestionariosEjecution`)], dataBody));

  setDownloadReportExecution = ({ dataBody }) =>
    apiClient(configPostDownloadXlsx([createUrl(BASE_URL, `/reporteExcelEjecution`)], dataBody));
}

export default new requestService();
