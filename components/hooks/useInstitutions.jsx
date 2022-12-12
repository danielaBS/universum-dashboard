import useStore from '@store/index';
import { useEffect, useState } from 'react';

const useInstitutions = () => {
  const listInstitutions = useStore((state) => state.listAllInstitutions);

  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const list = listInstitutions.map((data) => {
      return { id: data.idInstitution, name: data.name_institution };
    });
    setInstitutions(list);
  }, [listInstitutions]);

  return { institutions };
};

export default useInstitutions;
