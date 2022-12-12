import useStore from '@store/index';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

const useDataFiltersTool = () => {
  const {
    listToolExecutionsByYear,
    listToolDepartments,
    listToolTownsByDepartment,
    listToolInstitutionsByTown,
    listToolSedesByInstitution,
    listToolAllEstamentosFilter,
    idInstitution,
  } = useStore(
    (state) => ({
      listToolExecutionsByYear: state.listToolExecutionsByYear,
      listToolDepartments: state.listToolDepartments,
      listToolTownsByDepartment: state.listToolTownsByDepartment,
      listToolInstitutionsByTown: state.listToolInstitutionsByTown,
      listToolSedesByInstitution: state.listToolSedesByInstitution,
      listToolAllEstamentosFilter: state.listToolAllEstamentosFilter,
      idInstitution: state.idInstitution,
    }),
    shallow,
  );
  const [toolEjecuciones, setToolEjecuciones] = useState([]);
  const [toolDepartments, setToolDepartments] = useState([]);
  const [toolTownsBy, setToolTownsBy] = useState([]);
  const [toolInstitutions, setToolInstitutions] = useState([]);
  const [toolSedes, setToolSedes] = useState([]);
  const [toolEstamentos, setToolEstamentos] = useState([]);

  useEffect(() => {
    const listConvertedExecutions = listToolExecutionsByYear.map((data) => {
      return { id: data.idEjecution, name: data.name_aplication };
    });
    const listConvertedDepartments = listToolDepartments.map((data) => {
      return { id: data.idDepartment, name: data.department_name };
    });
    const listConvertedTownsBy = listToolTownsByDepartment.map((data) => {
      return { id: data.idTown, name: data.town_name };
    });
    const listConvertedInstitutions = listToolInstitutionsByTown.map((data) => {
      return { id: data.idInstitution, name: data.name_institution };
    });
    const listConvertedSedes = listToolSedesByInstitution.map((data) => {
      return { id: data.idSede, name: data.name_sede };
    });
    const listConvertedEstamentos = listToolAllEstamentosFilter.map((data) => {
      return { id: data.idState, name: data.name_state };
    });

    setToolEjecuciones(listConvertedExecutions);
    setToolDepartments(listConvertedDepartments);
    setToolTownsBy([...listConvertedTownsBy]);
    setToolInstitutions(listConvertedInstitutions);
    setToolSedes(listConvertedSedes);
    setToolEstamentos(idInstitution !== 0 ? listConvertedEstamentos : []);
  }, [
    listToolExecutionsByYear,
    listToolDepartments,
    listToolTownsByDepartment,
    listToolInstitutionsByTown,
    listToolSedesByInstitution,
    listToolAllEstamentosFilter,
    idInstitution,
  ]);

  return {
    toolEjecuciones,
    toolDepartments,
    toolTownsBy,
    toolInstitutions,
    toolSedes,
    toolEstamentos,
  };
};

export default useDataFiltersTool;
