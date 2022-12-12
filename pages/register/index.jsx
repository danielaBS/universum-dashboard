import React, { useEffect, useState } from 'react';
import styles from './registerPage.module.scss';
import shallow from 'zustand/shallow';
import useStore from '@store/index';

import FormRegister from '@common/formRegister/formRegister';
import FormRegisterPicPass from '@common/formRegister/formRegisterPicPass/formRegisterPicPass';

import Head from 'next/head';
import { useRouter } from 'next/router';

const RegisterPage = () => {

  const router = useRouter();

  const { titleFormR, formTypeStateR } = useStore(
    (state) => ({
      titleFormR: state.titleFormR,
      formTypeStateR: state.formTypeStateR,
    }),
    shallow,
  );

  const [userStorage, setUserStorage] = useState(null);
 
  const renderForm = () => {
    const FORM_STATE = {
      0: <FormRegister />,
      1: <FormRegisterPicPass />
    };
    return FORM_STATE[formTypeStateR];
  };

  return (
    <>
      <Head>
        <title>Universum SI</title>
        <meta name="description" content={'Registro'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.login}>
        <div className={styles.login__box}>          
          <div className={styles.login__content}>
            <h4>{titleFormR.title}</h4>
            <p>{titleFormR.subtitle}</p>
          </div>
          <div className={styles.login__form}>{renderForm()}</div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
