import requestService from '@service/services/service';
import { textInLogin } from '@consts/index';

const createAuthenticationSlice = (set, get) => ({
  userState: { status: null, error: null },
  sendUserValidState: { data:null, status: null, error: null, loaded: false },
  picPasswordState: { status: null, error: null },
  sendEmailState: { status: '', error: null },
  sendChangePasswordState: { status: '', error: null },

  formTypeState: 0,
  
  codeFromEmail: '',
  titleForm: { title: 'Iniciar sesión', subtitle: 'Bienvenido Universum SI' },

  valueParameter: {
    stateSede: true,
    stateFirstName: true,
    stateLastName: true,
  },
  systemColor: '#18B979',
  fetchValueParameter: async (id) => {
    try {
      const response = await requestService.getValueParametrizacion({
        idParametro: id,
      });
      // console.log(response);
      if (id === 'isSedeActive') {
        set({ valueParameter: { ...get().valueParameter, stateSede: response.data } });
      } else if (id === 'isNombreActive') {
        set({ valueParameter: { ...get().valueParameter, stateFirstName: response.data } });
      } else if (id === 'isApellidoActive') {
        set({ valueParameter: { ...get().valueParameter, stateLastName: response.data } });
      }
    } catch (err) {
      console.log(err);
    }
  },
  setValueParameter: async (id, state) => {
    try {
      let option;
      if (id === 1) {
        option = 'isSedeActive';
      } else if (id === 2) {
        option = 'isNombreActive';
      } else if (id === 3) {
        option = 'isApellidoActive';
      }
      await requestService.setValueParametrizacion({
        idParametro: id,
        dataBody: { value: !state },
      });
      get().fetchValueParameter(option);
    } catch (error) {
      console.log(error);
    }
  },
  setTitleForm: () => {
    if (get().formTypeState === 0) {
      set({
        titleForm: textInLogin[0],
      });
    } else if (get().formTypeState === 1) {
      set({
        titleForm: textInLogin[1],
      });
    } else if (get().formTypeState === 2) {
      set({
        titleForm: textInLogin[2],
      });
    }  
    else if (get().formTypeState === 3) {
      set({
        titleForm: textInLogin[3],
      });
    }   
  },
  setFormTypeState: (value) => {
    set({ formTypeState: value });
    get().setTitleForm();
  },  
  setSystemColor: (value) => {
    set({ systemColor: value });
  },
  fetchLoginUser: async (dataForm) => {
    try {
      const response = await requestService.setLoginUser({
        dataBody: {
          username: dataForm.username,
          password: dataForm.password,
        },
      });
      set({ userState: { status: response.status, error: null } });
      return response.data.accessToken;
    } catch (err) {
      console.log(err);
      set({ userState: { status: err.response.status, error: err.response.data.message } });
      return err.response.status;
    }
  },
  fetchUserValid: async (dataForm) => {
    try {
      const response = await requestService.fetchUserValid(dataForm.username);

      set({ sendUserValidState: { data: response.data, status: 200, error: null, loaded: true } });
      //   console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      set({
        sendUserValidState: {
          data: err.response.data,
          status: err.response.status,
          error: err.response.data.message,
          loaded: false,
        },
      });
      return err.response.data.statusCode;
    }
  },
  fetchSendEmailUser: async (dataForm) => {
    try {
      const response = await requestService.setResetPass({
        dataBody: {
          email: dataForm.email,
        },
      });
      set({ sendEmailState: { status: 200, error: null } });
      //   console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      set({
        sendEmailState: {
          status: err.response.status,
          error: err.response.data.message,
        },
      });
      return err.response.data.statusCode;
    }
  },  
  fetchChangePassword: async (dataForm) => {
    try {
      const response = await requestService.setChangePassword({
        dataBody: {
          oldPassword: dataForm.old,
          newPassword: dataForm.new
        },
      });
      set({ sendChangePasswordState: { status: 200, error: null } });
      //   console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      set({
        sendChangePasswordState: {
          status: err.response.status,
          error: err.response.data.message,
        },
      });
      return err.response.data.statusCode;
    }
  },  
});

export default createAuthenticationSlice;
