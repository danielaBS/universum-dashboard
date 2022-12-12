import useStore from '@store/index';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

const useDataFiltersForm = () => {
  const {
    listFormExecutionsByYear,
    listFormDepartments,
    listFormTownsByDepartment,
    listFormInstitutionsByTown,
    listFormSedesByInstitution,
    listFormAllEstamentosFilter,
    idInstitution,
  } = useStore(
    (state) => ({
      listFormExecutionsByYear: state.listFormExecutionsByYear,
      listFormDepartments: state.listFormDepartments,
      listFormTownsByDepartment: state.listFormTownsByDepartment,
      listFormInstitutionsByTown: state.listFormInstitutionsByTown,
      listFormSedesByInstitution: state.listFormSedesByInstitution,
      listFormAllEstamentosFilter: state.listFormAllEstamentosFilter,
      idInstitution: state.idInstitution,
    }),
    shallow,
  );
  const [formEjecuciones, setFormEjecuciones] = useState([]);
  const [formDepartments, setFormDepartments] = useState([]);
  const [formTownsBy, setFormTownsBy] = useState([]);
  const [formInstitutions, setFormInstitutions] = useState([]);
  const [formSedes, setFormSedes] = useState([]);
  const [formEstamentos, setFormEstamentos] = useState([]);

  useEffect(() => {
    const listConvertedExecutions = listFormExecutionsByYear.map((data) => {
      return { id: data.idEjecution, name: data.name_aplication };
    });
    const listConvertedDepartments = listFormDepartments.map((data) => {
      return { id: data.idDepartment, name: data.department_name };
    });
    const listConvertedTownsBy = listFormTownsByDepartment.map((data) => {
      return { id: data.idTown, name: data.town_name };
    });
    const listConvertedInstitutions = listFormInstitutionsByTown.map((data) => {
      return { id: data.idInstitution, name: data.name_institution };
    });
    const listConvertedSedes = listFormSedesByInstitution.map((data) => {
      return { id: data.idSede, name: data.name_sede };
    });
    const listConvertedEstamentos = listFormAllEstamentosFilter.map((data) => {
      return { id: data.idState, name: data.name_state };
    });

    setFormEjecuciones(listConvertedExecutions);
    setFormDepartments(listConvertedDepartments);
    setFormTownsBy([...listConvertedTownsBy]);
    setFormInstitutions(listConvertedInstitutions);
    setFormSedes(listConvertedSedes);
    setFormEstamentos(idInstitution !== 0 ? listConvertedEstamentos : []);
  }, [
    listFormExecutionsByYear,
    listFormDepartments,
    listFormTownsByDepartment,
    listFormInstitutionsByTown,
    listFormSedesByInstitution,
    listFormAllEstamentosFilter,
    idInstitution,
  ]);

  return {
    formEjecuciones,
    formDepartments,
    formTownsBy,
    formInstitutions,
    formSedes,
    formEstamentos,
  };
};

export default useDataFiltersForm;
