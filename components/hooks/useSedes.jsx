import useStore from '@store/index';
import { useEffect, useState } from 'react';

const useSedes = () => {
  const listSedesUser = useStore((state) => state.listSedesUser);

  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    const list = listSedesUser.map((data) => {
      return { id: data.idSede, name: data.name_sede };
    });
    setSedes(list);
  }, [listSedesUser]);

  return { sedes };
};

export default useSedes;
