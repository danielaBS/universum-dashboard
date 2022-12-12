import requestService from '@service/services/service';
import { textInReset } from '@consts/textRegister';

const createResetPassSlice = (set, get) => ({    
  titleFormPass : { status: null, error: null },
  formTypeStatePass: 0,
  sendNewPassState: { status: null, error: null },
  
  titleFormReset: { title: 'Cambiar contraseña de Universum', subtitle: 'Bienvenido Universum SI' },

  systemColor: '#18B979',
  
  setTitleFormPass: () => {
    if (get().formTypeStatePass === 0) {
      set({
        titleFormReset: textInReset[0],
      });
    }
  },
  setFormTypeStatePass: (value) => {
    set({ formTypeStatePass: value });
    get().setTitleFormPass();
  },
  setSystemColor: (value) => {
    set({ systemColor: value });
  },
  fetchSendPassUser: async (dataForm) => {
    console.log(dataForm)
    try {
      const response = await requestService.setResetPassFinish({
        dataBody: {
          resetPasswordToken: dataForm.token,
          password: dataForm.password,
        },
      });
      set({ sendNewPassState: { status: 200, error: null } });
      //   console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      set({
        sendNewPassState: {
          status: err.response.status,
          error: err.response.data.message,
        },
      });
      return err.response.data.statusCode;
    }
  },    
});

export default createResetPassSlice;
