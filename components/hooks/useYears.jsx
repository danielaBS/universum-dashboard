import useStore from '@store/index';
import { useEffect, useState } from 'react';

const useYears = () => {
  const listAllPeriodosGeneral = useStore((state) => state.listAllPeriodosGeneral);

  const [years, setYears] = useState([]);

  useEffect(() => {
    const list = listAllPeriodosGeneral.map((data) => {
      return { id: data.idYear, name: data.title };
    });
    setYears(list);
  }, [listAllPeriodosGeneral]);

  return { years };
};

export default useYears;
