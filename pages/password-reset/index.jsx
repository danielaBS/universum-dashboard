import React, { useEffect, useState } from 'react';
import styles from './PasswordResetPage.module.scss';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
import { useAuth } from '@hooks/useAuth';

import Head from 'next/head';
import { useRouter } from 'next/router';
import FormResetPass from '@common/formResetPass/formResetPass';

const PasswordResetPage = () => {
  const router = useRouter();
  const resetToken = router.query.tk;
  console.log(resetToken)

  const { titleFormReset, formTypeStatePass } = useStore(
    (state) => ({
      titleFormReset: state.titleFormReset,
      formTypeStatePass: state.formTypeStatePass,
    }),
    shallow,
  );

  const renderForm = () => {
    const FORM_STATE = {
      0: <FormResetPass code={resetToken}/>,
    };
    return FORM_STATE[formTypeStatePass];
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
            <h4>{titleFormReset.title}</h4>
            <p>{titleFormReset.subtitle}</p>
          </div>
          <div className={styles.login__form}>{renderForm()}</div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetPage;
