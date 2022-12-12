const createModalSlice = (set) => ({
  modalDeleteYearState: false,
  modalEditYearState: false,
  modalCreateYearState: false,
  modalCreateInstitutionState: false,
  modalEditInstitutionState: false,
  modalDeleteExecutionState: false,
  modalEditExecutionState: false,
  modalDeleteToolState: false,
  modalHelpState: false,
  modalCreateDepartmentState: false,
  modalEditDepartmentState: false,
  modalDeleteDepartmentState: false,
  modalCreateTownState: false,
  modalCreateSedeState: false,
  modalDeleteSedeState: false,
  modalDeleteTownState: false,
  modalEditTownState: false,
  modalDeleteInstitutionState: false,
  modalUploadInstitutionState: false,
  modalUploadSedeState: false,
  modalUploadTownState: false,
  modalEditEstamentoState: false,
  modalEditAreaState: false,
  modalDeleteUsersState: false,
  modalUploadUserFile: false,
  modalDownloadSedeState: false,
  openModalState: (nameModal) =>
    set((state) => {
      const SELECT_MODAL = {
        modalDeleteYearState: { modalDeleteYearState: !state.modalDeleteYearState },
        modalEditYearState: { modalEditYearState: !state.modalEditYearState },
        modalCreateInstitutionState: {
          modalCreateInstitutionState: !state.modalCreateInstitutionState,
        },
        modalCreateYearState: { modalCreateYearState: !state.modalCreateYearState },
        modalEditInstitutionState: {
          modalEditInstitutionState: !state.modalEditInstitutionState,
        },
        modalEditExecutionState: { modalEditExecutionState: !state.modalEditExecutionState },
        modalDeleteExecutionState: { modalDeleteExecutionState: !state.modalDeleteExecutionState },
        modalDeleteToolState: { modalDeleteToolState: !state.modalDeleteToolState },
        modalHelpState: { modalHelpState: !state.modalHelpState },
        modalCreateDepartmentState: {
          modalCreateDepartmentState: !state.modalCreateDepartmentState,
        },
        modalEditDepartmentState: {
          modalEditDepartmentState: !state.modalEditDepartmentState,
        },
        modalDeleteDepartmentState: {
          modalDeleteDepartmentState: !state.modalDeleteDepartmentState,
        },
        modalCreateTownState: {
          modalCreateTownState: !state.modalCreateTownState,
        },
        modalCreateSedeState: {
          modalCreateSedeState: !state.modalCreateSedeState,
        },
        modalEditSedeState: {
          modalEditSedeState: !state.modalEditSedeState,
        },
        modalDeleteSedeState: {
          modalDeleteSedeState: !state.modalDeleteSedeState,
        },
        modalDeleteTownState: {
          modalDeleteTownState: !state.modalDeleteTownState,
        },
        modalEditTownState: {
          modalEditTownState: !state.modalEditTownState,
        },
        modalDeleteInstitutionState: {
          modalDeleteInstitutionState: !state.modalDeleteInstitutionState,
        },
        modalUploadInstitutionState: {
          modalUploadInstitutionState: !state.modalUploadInstitutionState,
        },
        modalUploadSedeState: {
          modalUploadSedeState: !state.modalUploadSedeState,
        },
        modalUploadTownState: {
          modalUploadTownState: !state.modalUploadTownState,
        },
        modalEditEstamentoState: {
          modalEditEstamentoState: !state.modalEditEstamentoState,
        },
        modalEditAreaState: {
          modalEditAreaState: !state.modalEditAreaState,
        },
        modalDeleteUsersState: { modalDeleteUsersState: !state.modalDeleteUsersState },
        modalUploadUserFile: { modalUploadUserFile: !state.modalUploadUserFile },
        modalDownloadSedeState: { modalDownloadSedeState: !state.modalDownloadSedeState },
        modalDownloadInstitutionState: {
          modalDownloadInstitutionState: !state.modalDownloadInstitutionState,
        },
        modalDownloadTownState: { modalDownloadTownState: !state.modalDownloadTownState },
      };

      return SELECT_MODAL[nameModal] ? SELECT_MODAL[nameModal] : null;
    }),
});

export default createModalSlice;
