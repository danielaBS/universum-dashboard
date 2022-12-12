import requestService from '@service/services/service';
import { textInRegister } from '@consts/textRegister';

const createRegisterSlice = (set, get) => ({    
  imgsState: { status: null, error: null, images: [] },
  registerUserState: {status: null, error: null },
  picPasswordState: { status: null, error: null },
  formTypeStateR: 0,
  titleFormR: { title: 'Crear una nueva cuenta', subtitle: 'Bienvenido Universum SI' },

  systemColor: '#18B979',
  
  setTitleFormR: () => {
    if (get().formTypeStateR === 0) {
      set({
        titleFormR: textInRegister[0],
      });
    } else if (get().formTypeStateR === 1) {
      set({
        titleFormR: textInRegister[1],
      });
    }   
  },
  setFormTypeStateR: (value) => {
    set({ formTypeStateR: value });
    get().setTitleFormR();
  },
  setSystemColor: (value) => {
    set({ systemColor: value });
  },
  fetchRegisterImgs: async () => {
    try {
      const response = await requestService.fetchImgsRegister();
      set({ imgsState: { status: response.status, error: null, images: response.data } });  
      return response;
    } catch (err) {
      set({ imgsState: { status: err.response.status, error: err.response.data.error, images: null } });      
      return err.response.status;
    }    
  },
  fetchRegisterUser: async (dataForm) => {
    try {
      const response = await requestService.fetchRegisterUser({
        dataBody: {
          username: dataForm.username,
          email: dataForm.email,
          password: dataForm.password,          
        },
      });
      set({ registerUserState: { status: response.status, error: null } });
      
      return response;
    } catch (err) {
      console.log(err);
      set({ registerUserState: { status: err.response.status, error: err.response.data.error } });
      
      return err.response.status;
    }
  },
});

export default createRegisterSlice;
