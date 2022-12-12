import { useMemo, useCallback } from 'react';
import useStore from '@store/index';
import shallow from 'zustand/shallow';

export const MiscProvider = () => {

  const {
    fetchRegisterUser,    
    setFormTypeStateR,
    setFormTypeStatePass,
    fetchSendPassUser,
  } = useStore(
    (state) => ({
      fetchRegisterUser: state.fetchRegisterUser,
      setFormTypeStateR: state.setFormTypeStateR,
      setFormTypeStatePass: state.setFormTypeStatePass,
      fetchSendPassUser: state.fetchSendPassUser,
    }),
    shallow,
  );
  
  // call this function when you want to authenticate the user
  const registerUser = useCallback(
    async (data) => {
      const resgiterState = await fetchRegisterUser(data);
      // console.log(userState);
      if(resgiterState){

      }
    },
    [fetchRegisterUser],
  );
 
  const sendNewPassRecovery = useCallback(
    async (data) => {
      const requestState = fetchSendPassUser(data);

      if ((await requestState) !== 404 && (await requestState) !== 422) {
        setFormTypeStatePass(0);
      }
    },
    [fetchSendPassUser, setFormTypeStatePass],
  );

  const value = useMemo(
    () => ({
      registerUser,
      sendNewPassRecovery,
    }),
    [registerUser, sendNewPassRecovery],
  );
  return value;
};
