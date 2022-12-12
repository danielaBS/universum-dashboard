import React, { useState, useEffect } from 'react';
import styles from './formResetPass.module.scss';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import InputLogin from './inputLogin/inputLogin';
import { MiscProvider } from '@hooks/useMisc';
import useStore from '@store/index';

const FormResetPass = (props) => {
  const token = props.code;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({   
    password:""});

  const { sendNewPassState } = useStore((state) => ({
    sendNewPassState: state.sendNewPassState,
  }));

  const { sendNewPassRecovery } = MiscProvider();
  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    console.log(sendNewPassState)
    data.token=token;
    sendNewPassRecovery(data);
    setShow(true);

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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__group}>
        {sendNewPassState.error ? (
          <p role="alert" className={show? styles.error: styles.show}>
            {sendNewPassState.status === 404
              ? 'No hay cuenta asociada para la clave de reinicio proporcionada'
              : sendNewPassState.status === 422
              ? sendNewPassState.error
              : 'Ocurrió un error inesperado'}
          </p>
        ) : null}
        <label>Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder=""
          {...register("password")}         
        />
        {errors.password && (
          <span role="alert" className={show? styles.error: styles.show}>
            {errors.password.message}
          </span>
        )}
      </div>

      <div className={styles.form__group}>
        <label>Confirmar contraseña</label>
        <input
          type="password"
          id="password_confirm"
          placeholder=""
          register={register}         
        />
        {errors.password && (
          <span role="alert" className={styles.error}>
            {errors.password.message}
          </span>
        )}
      </div>

      <div className={styles.form__group}>
        <input
          value="Actualizar contraseña"
          width="100%"
          height="24px"
          borderradius="5px"
          type="submit"
          //   passedFunction={handleEdit}
          className={styles.btn}
        />
      </div>
    </form>
  );
};

export default FormResetPass;
