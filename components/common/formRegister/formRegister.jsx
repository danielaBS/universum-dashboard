import React, { useState, useEffect } from 'react';
import styles from './formRegister.module.scss';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import InputLogin from './inputLogin/inputLogin';
import { MiscProvider } from '@hooks/useMisc';
import useStore from '@store/index';

const FormRegister = () => {
  const {   
    register,
    handleSubmit, 
    reset   
  } = useForm({ 
    email:"",
    username:"",
    password:""});

  const { registerUser } = MiscProvider();

  const [show, setShow] = useState(false);

  const { registerUserState, setFormTypeStateR } = useStore((state) => ({
    registerUserState: state.registerUserState,
    setFormTypeStateR: state.setFormTypeStateR,
  }));  

  const onSubmit = async (data) => {
    const data1 = registerUser(data); 
    if (data1 ){
      setShow(true)
      reset({email:"", username:"",password:""})      
    }
  };

  useEffect(() => {
    // increment the count by 1
    if (show) {
      const countTimer = setInterval(() => {
        setShow(false);
      // every 1000 milliseconds
      }, 1000);
      // and clear this timer when the component is unmounted
      return function cleanup() {
        clearInterval(countTimer);
      };
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>          
      {registerUserState.status == 201? 
      (
        <p role="alert" className={show? styles.error: styles.show}>
          Usuario registrado con éxito
        </p>
      ) : null}      
      {registerUserState.error? 
      (
        <p role="alert" className={show? styles.error: styles.show}>
          El usuario no pudo registrarse
        </p>
      ) : null}      
      <div style={{display:'flex', width:'98%', marginLeft:'1rem'}}>        
          <label className={styles.switch}>
            <input type="checkbox" onChange={() => setFormTypeStateR(1)}/>
            <span className={`${styles.slider}  ${styles.round}`}></span>
          </label>
          <label style={{width:'90%'}}>
            <span>Crear cuenta con contraseña de imagen. (Para estudiantes con acceso a Universum.)</span>
          </label>                  
      </div>
      <div className={styles.form__group}>  
        <label>Nombre de usuario</label>             
        <input
        type="text"
        id="username"
        placeholder=""
        {...register("username")}        
        />        
      </div>
      <div className={styles.form__group}>          
        <label>Correo electrónico</label>             
        <input
        type="text"
        id="email"
        placeholder=""
        {...register("email")}            
        />          
      </div>
      <div className={styles.form__group}>
        <label>Contraseña</label>             
        <input
        type="password"
        id="password"
        placeholder=""
        {...register("password")}          
        />  
      </div>
      <div className={styles.form__group}>
        <input
          value="Registrarse en Universum"
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

export default FormRegister;
