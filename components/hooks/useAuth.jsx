import { createContext, useContext, useMemo, useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import PropTypes from 'prop-types';
import useStore from '@store/index';
import shallow from 'zustand/shallow';
const AuthContext = createContext(!null);
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [userByToken, setUserByToken] = useState(true);
  const router = useRouter();

  const {
    fetchLoginUser,
    fetchUserValid,
    fetchSendEmailUser,
    fetchChangePassword,
    setFormTypeState,
  } = useStore(
    (state) => ({
      fetchLoginUser: state.fetchLoginUser,
      fetchUserValid: state.fetchUserValid,
      fetchSendEmailUser: state.fetchSendEmailUser,
      fetchChangePassword: state.fetchChangePassword,
      setFormTypeState: state.setFormTypeState,
    }),
    shallow,
  );
  
  useEffect(() => {
    // console.log(router);
    if (router.query.token) {
      // setUser('token');
      setUserByToken(true);
      loginByToken();
    } else {
      setUserByToken(false);
    }
  }, [router]);

  // call this function when you want to authenticate the user
  const login = useCallback(
    async (data) => {
      const userState = await fetchLoginUser(data);
      // console.log(userState);

      if (userState !== 401 && userState !== 404 && userState !== 500) {
        const user = jwt_decode(userState);
        user.token= userState;
        setUser(user);
        router.push('/');
      }
    },
    [fetchLoginUser, router, setUser],
  );

  const validateUser = useCallback(
    async(data) => {
      const userValidState = await fetchUserValid(data);
      if ((await userValidState) !== 404) {
        setFormTypeState(2);
      }
    },
    [fetchUserValid],
  );

  const changePassword = useCallback(
    async(data) => {
      const changePasswordState = await fetchChangePassword(data);
      if ((await changePasswordState) !== 404) {
        //setFormTypeState(2);
      }
    },
    [fetchChangePassword],
  );

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setUser(null);
    setFormTypeState(0);
    router.push('/login');
  }, [setUser, router]);

  const sendEmailRecovery = useCallback(
    async (data) => {
      const requestState = fetchSendEmailUser(data);

      if ((await requestState) !== 404) {
        setFormTypeState(3);
      }
    },
    [fetchSendEmailUser, setFormTypeState],
  );

  const value = useMemo(
    () => ({
      user,
      userByToken,
      login,
      validateUser,
      logout,
      sendEmailRecovery,
      changePassword
    }),
    [user, login, validateUser, logout, sendEmailRecovery, changePassword, userByToken],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  // console.log(useContext(AuthContext));
  return useContext(AuthContext);
};


AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

AuthProvider.defaultProps = {
  children: <></>,
};
