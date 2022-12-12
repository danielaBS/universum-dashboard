import { useState, useEffect } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';

const useImages = () => {
  const {
    imgsState,
    fetchRegisterImgs
  } = useStore(
    (state) => ({
      imgsState: state.imgsState,
      fetchRegisterImgs: state.fetchRegisterImgs
    }),
    shallow,
  );
  
  const [ imgs, setImages ] = useState([]);
  
  useEffect(() => {   
      const fetchImages = fetchRegisterImgs().then((result)=>{
        setImages(result.data)
        console.log(result.data)
        return imgs
      });      
  }, [])  
  return {imgs}
};

export default useImages;
