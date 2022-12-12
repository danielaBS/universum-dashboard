import React, { useEffect, useState } from 'react';
import styles from './loginPage.module.scss';
import shallow from 'zustand/shallow';
import useStore from '@store/index';

import FormLogin from '@common/formLogin/formLogin';
import FormRecoveryEmail from '@common/formLogin/formRecoveryEmail/formRecoveryEmail';
import FormLoginPicPass from '@common/formLogin/formLoginPicPass/formLoginPicPass';
import EmailSentConf from '@common/formLogin/emailSentConfirmation/emailSentConf';

import Head from 'next/head';
import { scrollToTop } from '@hooks/scrollToTop';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { user } = useAuth();

  const router = useRouter();

  const { titleForm, formTypeState } = useStore(
    (state) => ({
      titleForm: state.titleForm,
      formTypeState: state.formTypeState,
    }),
    shallow,
  );

  const [userStorage, setUserStorage] = useState(null);
  useEffect(() => {
    setUserStorage(user);
  }, [user]);

  useEffect(() => {
    scrollToTop();
  }, []);

  // useEffect(() => {
  //   console.log(userStorage);
  // }, [userStorage]);

  useEffect(() => {
    if (userStorage) {
      typeof window !== 'undefined' && router.push('/');
    }
  }, [userStorage, router]);

  const renderForm = () => {
    const FORM_STATE = {
      0: <FormLogin />,
      1: <FormLoginPicPass />,
      2: <FormRecoveryEmail />,
      3: <EmailSentConf />,
    };
    return FORM_STATE[formTypeState];
  };

  return (
    <>
      <Head>
        <title>Universum SI</title>
        <meta name="description" content={'Logín'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.login}>
        <div className={styles.login__box}>          
          <div className={styles.login__content}>
            <h4>{titleForm.title}</h4>
            <p>{titleForm.subtitle}</p>
          </div>
          <div className={styles.login__form}>{renderForm()}</div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
