import useStore from '@store/index';
import { useEffect, useState } from 'react';

const useTowns = () => {
  const listTowns = useStore((state) => state.listTowns);

  const [towns, setTowns] = useState([]);

  useEffect(() => {
    const list = listTowns.map((data) => {
      return { id: data.idTown, name: data.town_name };
    });
    setTowns(list);
  }, [listTowns]);

  return { towns };
};

export default useTowns;
