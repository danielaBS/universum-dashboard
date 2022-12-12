import React, { useState, useEffect } from 'react';
import styles from './formRecoveryEmail.module.scss';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import useStore from '@store/index';

const FormRecoveryEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { sendEmailState, setFormTypeState } = useStore((state) => ({
    sendEmailState: state.sendEmailState,
    setFormTypeState: state.setFormTypeState,
  }));

  const [show, setShow] = useState(false);
  const { sendEmailRecovery } = useAuth();

  const onSubmit = async (data) => {
    sendEmailRecovery(data);
    setShow(true);
    // setFormTypeState(2);
    // console.log(data);
  };
  useEffect(() => {   
    if (show) {
      const countTimer = setInterval(() => {
        setShow(false);
      }, 2000);
      // and clear this timer when the component is unmounted
      return function cleanup() {
        clearInterval(countTimer);
      };
    }
  }, );

  return (    
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>            
        <div className={styles.form__group}>
          {sendEmailState.error ? (
            <p role="alert" className={show? styles.error: styles.show}>
              No hay ninguna cuenta asociada a la dirección de correo electrónico proporcionada.
            </p>
          ) : null}
          <label>Correo electrónico</label>             
          <input
            type="text"
            id="email"
            placeholder=""
            {...register("email")}             
          />
          {errors.email && (
            <span role="alert" className={styles.error}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div className={styles.form__group}>
          <input
            value="Solicitar cambio de contraseña"
            width="100%"
            height="24px"
            borderradius="5px"
            type="submit"
            //   passedFunction={handleEdit}
            className={styles.btn}
          />
        </div>
        <button className={styles.back} onClick={() => {setFormTypeState(0)}}>Volver a Inicio de Sesión</button>  

      </form>
    </>
  );
};

export default FormRecoveryEmail;
