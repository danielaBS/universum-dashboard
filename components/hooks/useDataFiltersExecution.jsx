import useStore from '@store/index';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

const useDataFiltersExecution = () => {
  const {
    listExecutionDepartments,
    listExecutionTownsByDepartment,
    listExecutionInstitutionsByTown,
    listExecutionSedesByInstitution,
  } = useStore(
    (state) => ({
      listExecutionDepartments: state.listExecutionDepartments,
      listExecutionTownsByDepartment: state.listExecutionTownsByDepartment,
      listExecutionInstitutionsByTown: state.listExecutionInstitutionsByTown,
      listExecutionSedesByInstitution: state.listExecutionSedesByInstitution,
    }),
    shallow,
  );
  const [executionDepartments, setExecutionDepartments] = useState([]);
  const [executionTownsBy, setExecutionTownsBy] = useState([]);
  const [executionInstitutions, setExecutionInstitutions] = useState([]);
  const [executionSedes, setExecutionSedes] = useState([]);

  useEffect(() => {
    const listConvertedDepartments = listExecutionDepartments.map((data) => {
      return { id: data.idDepartment, name: data.department_name };
    });
    const listConvertedTownsBy = listExecutionTownsByDepartment.map((data) => {
      return { id: data.idTown, name: data.town_name };
    });
    const listConvertedInstitutions = listExecutionInstitutionsByTown.map((data) => {
      return { id: data.idInstitution, name: data.name_institution };
    });
    const listConvertedSedes = listExecutionSedesByInstitution.map((data) => {
      return { id: data.idSede, name: data.name_sede };
    });

    setExecutionDepartments(listConvertedDepartments);
    setExecutionTownsBy([...listConvertedTownsBy]);
    setExecutionInstitutions(listConvertedInstitutions);
    setExecutionSedes(listConvertedSedes);
  }, [
    listExecutionDepartments,
    listExecutionTownsByDepartment,
    listExecutionInstitutionsByTown,
    listExecutionSedesByInstitution,
  ]);

  return {
    executionDepartments,
    executionTownsBy,
    executionInstitutions,
    executionSedes,
  };
};

export default useDataFiltersExecution;
