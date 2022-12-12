import React, { useState, useEffect } from 'react';
import styles from './formLogin.module.scss';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import useStore from '@store/index';
import { useRouter } from 'next/router';

const FormLogin = () => {  
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userState, setFormTypeState } = useStore((state) => ({
    userState: state.userState,
    setFormTypeState: state.setFormTypeState,
  }));  

  const { login } = useAuth();
  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    login(data);
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
    <>             
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div style={{display:'flex', width:'98%', marginLeft:'1rem'}}>        
          <label className={styles.switch}>
            <input type="checkbox" onChange={() => setFormTypeState(1)}/>
            <span className={`${styles.slider}  ${styles.round}`}></span>
          </label>
          <label style={{width:'90%'}}>
            <span>Iniciar sesión con contraseña de imagen. (Para estudiantes con acceso a Universum.)</span>
          </label>                  
      </div>
        <br></br> 
        <div className={styles.form__group}>
          {userState.status == 404 ? (
            <p role="alert" className={show? styles.error: styles.show}>
              El usuario no existe
            </p>
          ) : null}
          {userState.status == 500 ? (
            <p role="alert" className={show? styles.error: styles.show}>
              Usuario o contraseña incorrectas
            </p>
          ) : null}
          <label>Nombre de usuario</label>             
          <input
            type="text"
            id="username"
            placeholder=""
            {...register("username")}                   
          />
          {errors.username && (
            <span role="alert" className={show? styles.error: styles.show}>
              {errors.username.message}
            </span>
          )}
        </div>

        <div className={styles.form__group}>
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
          <div className={styles.form__remember}>
            <div onClick={() => setFormTypeState(2)}>
              <a className={styles.form__group_link}>¿Olvidaste tu contraseña?</a>
            </div>
          </div>
        </div>

        <div className={styles.form__group}>
          <input
            value="Iniciar Sesión"
            width="100%"
            height="36px"
            borderradius="5px"
            type="submit"
            //   passedFunction={handleEdit}
            className={styles.btn}
          />
          <div className={styles.form__actionLink}>
            <div>
              <span>¿Nuevo en Universum?</span>
              <a className={styles.form__group_link} onClick={()=>{router.push('/register')}}> Crea una cuenta.</a>
            </div>
          </div>
        </div>
      </form>    
    </>    
  );
};

export default FormLogin;
