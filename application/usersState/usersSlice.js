import requestService from '@service/services/service';
import { columnsTableUsers, statusAlerts } from '@consts/index';

const createUserSlice = (set, get) => ({
  searchByColumnUsers: columnsTableUsers[0],
  listAllUsers: [],
  dataUserToEdit: {},
  dataUserToDelete: {},
  uploadedFileUser: null,
  uploadedFileUserByInstitution: null,
  uploadedFileUserBySede: null,
  viewUser: 0,
  checkedTableUserstate: [],
  idRoleUser: { value: { id: 0, name: 'Seleccionar' }, id: 0 },
  idInstitutionUser: { value: { id: 0, name: 'Seleccionar' }, id: 0 },
  checkedUserSedeState: [],
  listSedesUser: [],
  setSearchByUser: (data) => {
    set({ searchByColumnUsers: data });
  },
  setCheckedUserstate: (value) => {
    set({ checkedTableUserstate: value });
  },
  setViewUser: (id) => {
    set({ viewUser: id });
  },
  setDataUserToEdit: async (id) => {
    const response = await requestService.getUserById({ idUser: id });
    // console.log(response);
    set({ dataUserToEdit: response.data[0] });
  },
  setDataUserToDelete: (data) => {
    set({ dataUserToDelete: data });
  },
  setDataUploadedFileUser: (file) => {
    set({ uploadedFileUser: file });
  },
  setDataUploadedFileUserByInstitution: (file) => {
    set({ uploadedFileUserByInstitution: file });
  },
  setDataUploadedFileUserBySede: (file) => {
    set({ uploadedFileUserBySede: file });
  },
  setIdRoleUser: (data) => {
    set({ idRoleUser: data });
  },
  setIdInstitutionUser: (data) => {
    set({ idInstitutionUser: data });
  },
  setCheckedUserSedeState: (value) => {
    set({ checkedUserSedeState: value });
  },
  fetchAllUsers: async () => {
    const response = await requestService.getAllUsers();
    // console.log(response);
    set({ listAllUsers: response.data });
  },
  fetchCreateUser: async (dataForm) => {
    try {
      const response = get().valueParameter.stateSede
        ? await requestService.setCreateUserBySede({
            dataBody: {
              first_name: dataForm.first_name,
              last_name: dataForm.last_name,
              // username: dataForm.username,
              email: dataForm.email,
              password: dataForm.password,
              roles: dataForm.roles,
              idSedes: dataForm.idSedes,
            },
          })
        : await requestService.setCreateUserByInstitution({
            dataBody: {
              first_name: dataForm.first_name,
              last_name: dataForm.last_name,
              // username: dataForm.username,
              email: dataForm.email,
              password: dataForm.password,
              roles: dataForm.roles,
              institucionId: dataForm.institucionId,
            },
          });
      console.log(response);
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El usuario se ha guardado exitosamente',
        },
      });
      get().fetchAllUsers();
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: { ...statusAlerts.error, title: 'No se ha podido agregar el usuario' },
      });
    }
    get().hideAlert();
  },  
  fetchEditUser: async ({
    first_name,
    last_name,
    email,
    institucionId,
    roles,
    password,
    idSedes,
  }) => {
    // const isSedeActive = get().setEditUserBySede;
    // setEditUserBySede

    console.log(get().dataUserToEdit);

    const dataUserToEdit = get().dataUserToEdit.user[0]
      ? get().dataUserToEdit.user[0]
      : get().dataUserToEdit.user;
    // console.log(dataUserToEdit);
    try {
      const response = get().valueParameter.stateSede
        ? await requestService.setEditUserBySede({
            idUser: dataUserToEdit.id,
            dataBody: {
              user: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                roles: roles,
                password: password,
              },
              idSedes: idSedes,
            },
          })
        : await requestService.setEditUserByInstitution({
            idUser: dataUserToEdit.id,
            dataBody: {
              user: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                roles: roles,
                password: password,
              },
              institucionId: institucionId,
            },
          });
      console.log(response);
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El usuario se ha editado exitosamente',
        },
      });
      get().fetchAllUsers();
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: { ...statusAlerts.error, title: 'No se ha podido editar el usuario' },
      });
    }
    get().hideAlert();
  },
  fetchDeleteUser: async () => {
    const dataUser = get().dataUserToDelete;
    try {
      await requestService.setDeleteUser({
        idUser: dataUser.id,
      });
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'El usuario se ha eliminado exitosamente',
        },
      });
      get().fetchAllUsers();
    } catch (err) {
      console.log(err);
      // const errorMessage = err.response.data.error.message;
      set({ alertEditStatus: { ...statusAlerts.error, title: 'No se pudo eliminar el usuario' } });
    }
    get().hideAlert();
  },
  fetchUploadFileUser: async () => {
    const stateSede = get().valueParameter.stateSede;
    const uploadedFile = stateSede
      ? get().uploadedFileUserBySede
      : get().uploadedFileUserByInstitution;
    const formData = new FormData();

    formData.append('File', uploadedFile);

    try {
      const response = stateSede
        ? await requestService.setDataFileUserBySede({
            dataBody: formData,
          })
        : await requestService.setDataFileUserByInstitution({
            dataBody: formData,
          });
      console.log(response);
      set({
        alertEditStatus: {
          ...statusAlerts.success,
          title: 'Los datos del archivo se han enviado con éxito',
        },
      });

      let fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'FeedbackUsers.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
      get().fetchAllInstitutions();
      get().hideAlert();
    } catch (err) {
      console.log(err);
      set({
        alertEditStatus: {
          ...statusAlerts.error,
          title: stateSede
            ? 'Ha ocurrido un error, Solo se permite el archivo con nombre usuariosSede.xlsx'
            : 'Ha ocurrido un error, Solo se permite el archivo con nombre usuariosInstitucion.xlsx',
        },
      });
      get().hideAlert();
    }
  },
  cleanFiltersUsers: () => {
    const valueEmptyFilter = {
      value: { id: 0, name: 'Seleccionar' },
      id: 0,
    };
    get().setIdRoleUser(valueEmptyFilter);
    get().setIdInstitutionUser(valueEmptyFilter);
    set({ listSedesUser: [] });
  },
  fetchlistSedeUserByInstitution: async (data) => {
    const response = await requestService.getSedesUserByInstitution({
      idInstitution: data.value.id,
    }); // CAMBIAR
    console.log(response.data);
    set({
      listSedesUser: response.data.map((data) => {
        return { id: data.idSede, name: data.name_sede };
      }),
    });
  },
});

export default createUserSlice;
