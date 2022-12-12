import { ProtectedRoute } from '@layout/protectedRoute/protectedRoute';
import { RegisterRoute } from '@layout/protectedRoute/registerRoute';
import ContainerModals from '@layout/containerModals/containerModals';
import Navbar from '@common/navbar/navbar';
import Sidebar from '@common/sidebar/sidebar';
import ContainerMain from '@layout/containerMain/containerMain';
import Main from '@common/main/main';
import Head from 'next/head';
import { useAuth } from '@hooks/useAuth';
import { useEffect, useState } from 'react';
// import Router from 'next/router';

export default function Home() {
  const { user } = useAuth();
  const [userStorage, setUserStorage] = useState(null);
  useEffect(() => {
    setUserStorage(user);
  }, [user]);

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const start = () => {
  //     console.log('start');
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     console.log('finished');
  //     setLoading(false);
  //   };
  //   Router.events.on('routeChangeStart', start);
  //   Router.events.on('routeChangeComplete', end);
  //   Router.events.on('routeChangeError', end);
  //   return () => {
  //     Router.events.off('routeChangeStart', start);
  //     Router.events.off('routeChangeComplete', end);
  //     Router.events.off('routeChangeError', end);
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log(loading);
  // }, [loading]);

  return (
    <>
      <Head>
        <title>Universum SI</title>
        <meta name="description" content={'índice'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProtectedRoute>
        {userStorage ? (
          <>
            <ContainerModals />
            <Navbar />
            <Sidebar />
            <ContainerMain>
              <Main />
            </ContainerMain>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              
            }}
          >
          </div>
        )}
      </ProtectedRoute>
    </>
  );
}
