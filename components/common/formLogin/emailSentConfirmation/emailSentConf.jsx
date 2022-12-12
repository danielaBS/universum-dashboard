import React from 'react';
import styles from './emailSentConf.module.scss';
import useStore from '@store/index';

const EmailSentConf = () => { 
  const { setFormTypeState } = useStore((state) => ({
    setFormTypeState: state.setFormTypeState,
  }));
  return (
    <div className='d-flex justify-content-center'>          
      <input type="button" value="Volver a Inicio de Sesión " className={styles.btn} onClick={() => {setFormTypeState(0)}}/>
    </div>
    
  )                      
};

export default EmailSentConf;
