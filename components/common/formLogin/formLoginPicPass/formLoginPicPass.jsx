import React, { useState, useEffect } from 'react';
import styles from './formLoginPicPass.module.scss';
import { useForm } from 'react-hook-form';
import storybook from '@talentumlab/storybook-design-system';
import useStore from '@store/index';
import { useAuth } from '@hooks/useAuth';

const FormLoginPicPass = () => {
  const [imgs, setImgs] = useState([]);
  const [textButton, setTextButton] = useState("Continuar");
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sendUserValidState, setFormTypeState, fetchUserValid } = useStore((state) => ({
    sendUserValidState: state.sendUserValidState,
    setFormTypeState: state.setFormTypeState,
    fetchUserValid: state.fetchUserValid,
  }));

  const { login } = useAuth();

  const onSubmit = async (data) => {    
    if(sendUserValidState.loaded) {
      data = { username: data.username, password: password }
      login(data);      
    } else {
      const data1 = await fetchUserValid(data);
      setImgs(data1.data);
      setTextButton("Iniciar Sesión")
    }     
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
              <input type="checkbox" checked onChange={() => setFormTypeState(0)}/>
              <span className={`${styles.slider}  ${styles.round}`}></span>
            </label>
            <label style={{width:'90%'}}>
              <span>Iniciar sesión con contraseña de imagen. (Para estudiantes con acceso a Universum.)</span>
            </label>                  
        </div>
        <br></br> 
        <div className={styles.form__group}>
          {sendUserValidState.error ? (
            <p role="alert"  className={show? styles.error: styles.show}>
              El usuario no exite
            </p>
          ) : null}
          <storybook.Input
            type="text"
            id="username"
            placeholder=""
            register={register}
            icon="/assets/img/logoUser.png"
            inputLabel="Nombre de usuario:"
            labelColor="#000000"
            inputFontSize="15px"
          />          
        </div> 
        <div className={styles.form__group && "d-flex flex-row "}>
          { 
          sendUserValidState.error? (
            null
          ) :
            imgs.length===0? (                                  
              null
            ):(imgs.map(function (obj, i) {
              return (
                <label key={obj.id}>
                  <input
                  type="radio"
                  name="test"
                  value={obj.id}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  />
                  <img
                  src={obj.url}
                  alt="Option 1"
                  width="100px"
                  height="100px"
                  />
                </label>
                );                  
              })
            )
          }  
        </div>
        <br></br>
        <div className={styles.form__group}>
          <input
          value={textButton}
          width="100%"
          height="36px"
          borderradius="5px"
          type="submit"
          //   passedFunction={handleEdit}
          className={styles.btn}
          />  
        </div>                
      </form>   
    </>
    
  )                      
};

export default FormLoginPicPass;
