import useStore from '@store/index';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

const useDataFilters = () => {
  const {
    listTowns,
    listAllPeriodos,
    listExecutionsByYear,
    listDepartments,
    listTownsByDepartment,
    listInstitutionsByTown,
    listSedesByInstitution,
    listAllEstamentosFilter,
    listAllAreasFilter,
    idInstitution,
  } = useStore(
    (state) => ({
      listTowns: state.listTowns,
      listAllPeriodos: state.listAllPeriodos,
      listExecutionsByYear: state.listExecutionsByYear,
      listDepartments: state.listDepartments,
      listTownsByDepartment: state.listTownsByDepartment,
      listInstitutionsByTown: state.listInstitutionsByTown,
      listSedesByInstitution: state.listSedesByInstitution,
      listAllEstamentosFilter: state.listAllEstamentosFilter,
      listAllAreasFilter: state.listAllAreasFilter,
      idInstitution: state.idInstitution,
    }),
    shallow,
  );

  const [towns, setTowns] = useState([]);
  const [years, setYears] = useState([]);
  const [ejecuciones, setEjecuciones] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [townsBy, setTownsBy] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [estamentos, setEstamentos] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const listConvertedTowns = listTowns.map((data) => {
      return { id: data.idTown, name: data.town_name };
    });
    const listConvertedYears = listAllPeriodos.map((data) => {
      return { id: data.idYear, name: data.title };
    });
    const listConvertedExecutions = listExecutionsByYear.map((data) => {
      return { id: data.idEjecution, name: data.name_aplication };
    });
    const listConvertedDepartments = listDepartments.map((data) => {
      return { id: data.idDepartment, name: data.department_name };
    });
    const listConvertedTownsBy = listTownsByDepartment.map((data) => {
      return { id: data.idTown, name: data.town_name };
    });
    const listConvertedInstitutions = listInstitutionsByTown.map((data) => {
      return { id: data.idInstitution, name: data.name_institution };
    });
    const listConvertedSedes = listSedesByInstitution.map((data) => {
      return { id: data.idSede, name: data.name_sede };
    });
    const listConvertedEstamentos = listAllEstamentosFilter.map((data) => {
      return { id: data.idState, name: data.name_state };
    });
    const listConvertedAreas = listAllAreasFilter.map((data) => {
      return { id: data.idArea, name: data.name_area };
    });
    setTowns(listConvertedTowns);
    setYears(listConvertedYears.slice().reverse());
    setEjecuciones(listConvertedExecutions);
    setDepartments(listConvertedDepartments);
    setTownsBy([...listConvertedTownsBy]);
    setInstitutions(listConvertedInstitutions);
    setSedes(listConvertedSedes);
    setEstamentos(idInstitution !== 0 ? listConvertedEstamentos : []);
    setAreas(idInstitution !== 0 ? listConvertedAreas : []);
  }, [
    listTowns,
    listAllPeriodos,
    listExecutionsByYear,
    listDepartments,
    listTownsByDepartment,
    listInstitutionsByTown,
    listSedesByInstitution,
    listAllEstamentosFilter,
    listAllAreasFilter,
    idInstitution,
  ]);

  return {
    towns,
    years,
    ejecuciones,
    departments,
    townsBy,
    institutions,
    sedes,
    estamentos,
    areas,
  };
};

export default useDataFilters;
