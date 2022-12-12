import React from 'react';
import storybook from '@talentumlab/storybook-design-system';
import shallow from 'zustand/shallow';
import useStore from '@store/index';
const iconClose = '/icons/close_2.svg';
import { nameModals } from '@consts/index';
import ModalEditYear from '@common/main/dataManagement/years/modalEditYear/modalEditYear';
import ModalCreateInstitution from '@common/main/dataManagement/institutions/modalCreateInstitution/modalCreateInstitution';
import ModalCreateYear from '@common/main/dataManagement/years/modalCreateYear/modalCreateYear';
import ModalDeleteYear from '@common/main/dataManagement/years/modalDeleteYear/modalDeleteYear';
import ModalEditInstitution from '@common/main/dataManagement/institutions/modalEditInstitution/modalEditInstitution';
import ModalDeleteExecution from '@common/main/executionManagement/executions/modalDeleteExecution/modalDeleteExecution';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINT } from '@consts/index';
import ModalDeleteTool from '@common/main/toolsManagement/modalDeleteExecution/modalDeleteTool';
import ModalCreateDepartment from '@common/main/dataManagement/departments/modalCreateDepartment/modalCreateDepartment';
import ModalEditDepartment from '@common/main/dataManagement/departments/modalEditDepartment/modalEditDepartment';
import ModalDeleteDepartment from '@common/main/dataManagement/departments/modalDeleteDepartment/modalDeleteDepartment';
import ModalCreateTown from '@common/main/dataManagement/towns/modalCreateTown/modalCreateTown';
import ModalCreateSede from '@common/main/dataManagement/sedes/modalCreateSede/modalCreateSede';
import ModalEditSede from '@common/main/dataManagement/sedes/modalEditSede/modalEditSede';
import ModalDeleteSede from '@common/main/dataManagement/sedes/modalDeleteSede/modalDeleteSede';
import ModalDeleteTown from '@common/main/dataManagement/towns/modalDeleteTown/modalDeleteTown';
import ModalEditTown from '@common/main/dataManagement/towns/modalEditTown/modalEditTown';
import ModalDeleteInstitution from '@common/main/dataManagement/institutions/modalDeleteInstitution/modalDeleteInstitution';
import ModalUploadInstitutions from '@common/main/dataManagement/institutions/modalUploadInstitutions/modalUploadInstitutions';
import ModalUploadSedes from '@common/main/dataManagement/sedes/modalUploadSedes/modalUploadSedes';
import ModalUploadTowns from '@common/main/dataManagement/towns/modalUploadTowns/modalUploadTowns';
import ModalHelp from '@common/main/helpManagement/modalHelp/modalHelp';
import ModalEditEstamentos from '@common/main/dataManagement/estamentos/modalEditEstamentos/modalEditEstamentos';
import ModalEditArea from '@common/main/dataManagement/areas/modalEditArea/modalEditArea';
import ModalEditExecution from '@common/main/executionManagement/executions/modalEditExecution/modalEditExecution';
import ModalDeleteUser from '@common/main/userManagement/users/modalDeleteUser/modalDeleteUser';
import ModalUploadUserFile from '@common/main/userManagement/users/modalUploadUserFile/modalUploadUserFile';
import ModalDownloadSede from '@common/main/dataManagement/sedes/modalDownloadSede/modalDownloadSede';
import ModalDownloadInstitution from '@common/main/dataManagement/institutions/modalDownloadInstitution/modalDownloadInstitution';
import ModalDownloadTowns from '@common/main/dataManagement/towns/modalDownloadTowns/modalDownloadTowns';

const ContainerModals = () => {
  const {
    openModalState,
    modalDeleteYearState,
    modalEditYearState,
    modalCreateInstitutionState,
    modalCreateYearState,
    modalEditInstitutionState,
    modalDeleteExecutionState,
    modalEditExecutionState,
    modalDeleteToolState,
    modalCreateDepartmentState,
    modalEditDepartmentState,
    modalDeleteDepartmentState,
    modalCreateTownState,
    modalCreateSedeState,
    modalEditSedeState,
    modalDeleteSedeState,
    modalDeleteTownState,
    modalEditTownState,
    modalDeleteInstitutionState,
    modalUploadInstitutionState,
    modalUploadSedeState,
    modalUploadTownState,
    modalHelpState,
    modalEditEstamentoState,
    modalEditAreaState,
    modalDeleteUsersState,
    modalUploadUserFile,
    modalDownloadSedeState,
    modalDownloadInstitutionState,
    modalDownloadTownState,
  } = useStore(
    (state) => ({
      openModalState: state.openModalState,
      modalDeleteYearState: state.modalDeleteYearState,
      modalEditYearState: state.modalEditYearState,
      modalCreateInstitutionState: state.modalCreateInstitutionState,
      modalCreateYearState: state.modalCreateYearState,
      modalEditInstitutionState: state.modalEditInstitutionState,
      modalDeleteExecutionState: state.modalDeleteExecutionState,
      modalDeleteToolState: state.modalDeleteToolState,
      modalEditExecutionState: state.modalEditExecutionState,
      modalCreateDepartmentState: state.modalCreateDepartmentState,
      modalEditDepartmentState: state.modalEditDepartmentState,
      modalDeleteDepartmentState: state.modalDeleteDepartmentState,
      modalCreateTownState: state.modalCreateTownState,
      modalCreateSedeState: state.modalCreateSedeState,
      modalEditSedeState: state.modalEditSedeState,
      modalDeleteSedeState: state.modalDeleteSedeState,
      modalDeleteTownState: state.modalDeleteTownState,
      modalEditTownState: state.modalEditTownState,
      modalDeleteInstitutionState: state.modalDeleteInstitutionState,
      modalUploadInstitutionState: state.modalUploadInstitutionState,
      modalUploadSedeState: state.modalUploadSedeState,
      modalUploadTownState: state.modalUploadTownState,
      modalHelpState: state.modalHelpState,
      modalEditEstamentoState: state.modalEditEstamentoState,
      modalEditAreaState: state.modalEditAreaState,
      modalDeleteUsersState: state.modalDeleteUsersState,
      modalUploadUserFile: state.modalUploadUserFile,
      modalDownloadSedeState: state.modalDownloadSedeState,
      modalDownloadInstitutionState: state.modalDownloadInstitutionState,
      modalDownloadTownState: state.modalDownloadTownState,
    }),
    shallow,
  );

  const { width } = useWindowSize();

  const closeModal = (name) => openModalState(name);

  return (
    <>
      <storybook.Modal
        isOpen={modalDeleteYearState}
        isClose={() => closeModal(nameModals.modalDeleteYearState)}
        iconClose={iconClose}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        backdrop={'static'}
      >
        <ModalDeleteYear />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalEditYearState}
        isClose={() => closeModal(nameModals.modalEditYearState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalEditYear />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalCreateYearState}
        isClose={() => closeModal(nameModals.modalCreateYearState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalCreateYear />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalCreateInstitutionState}
        isClose={() => closeModal(nameModals.modalCreateInstitutionState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalCreateInstitution />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalEditInstitutionState}
        isClose={() => closeModal(nameModals.modalEditInstitutionState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalEditInstitution />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDeleteExecutionState}
        isClose={() => closeModal(nameModals.modalDeleteExecutionState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalDeleteExecution />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalEditExecutionState}
        isClose={() => closeModal(nameModals.modalEditExecutionState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalEditExecution />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDeleteToolState}
        isClose={() => closeModal(nameModals.modalDeleteToolState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalDeleteTool />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalCreateDepartmentState}
        isClose={() => closeModal(nameModals.modalCreateDepartmentState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalCreateDepartment />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalEditDepartmentState}
        isClose={() => closeModal(nameModals.modalEditDepartmentState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalEditDepartment />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDeleteDepartmentState}
        isClose={() => closeModal(nameModals.modalDeleteDepartmentState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalDeleteDepartment />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalCreateTownState}
        isClose={() => closeModal(nameModals.modalCreateTownState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalCreateTown />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalCreateSedeState}
        isClose={() => closeModal(nameModals.modalCreateSedeState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalCreateSede />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalEditSedeState}
        isClose={() => closeModal(nameModals.modalEditSedeState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalEditSede />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDeleteSedeState}
        isClose={() => closeModal(nameModals.modalDeleteSedeState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalDeleteSede />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDeleteTownState}
        isClose={() => closeModal(nameModals.modalDeleteTownState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalDeleteTown />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalEditTownState}
        isClose={() => closeModal(nameModals.modalEditTownState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalEditTown />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDeleteInstitutionState}
        isClose={() => closeModal(nameModals.modalDeleteInstitutionState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalDeleteInstitution />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalUploadInstitutionState}
        isClose={() => closeModal(nameModals.modalUploadInstitutionState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '50%' : '85%'}
        height="auto"
      >
        <ModalUploadInstitutions />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalUploadSedeState}
        isClose={() => closeModal(nameModals.modalUploadSedeState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '50%' : '85%'}
        height="auto"
      >
        <ModalUploadSedes />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalUploadTownState}
        isClose={() => closeModal(nameModals.modalUploadTownState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '50%' : '85%'}
        height="auto"
      >
        <ModalUploadTowns />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalHelpState}
        isClose={() => closeModal(nameModals.modalHelpState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '70%' : '70%'}
        height={width >= BREAKPOINT ? '55%' : '65%'}
      >
        <ModalHelp />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalEditEstamentoState}
        isClose={() => closeModal(nameModals.modalEditEstamentoState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalEditEstamentos />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalEditAreaState}
        isClose={() => closeModal(nameModals.modalEditAreaState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalEditArea />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDeleteUsersState}
        isClose={() => closeModal(nameModals.modalDeleteUsersState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalDeleteUser />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalUploadUserFile}
        isClose={() => closeModal(nameModals.modalUploadUserFile)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '40%' : '85%'}
        height="auto"
      >
        <ModalUploadUserFile />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDownloadSedeState}
        isClose={() => closeModal(nameModals.modalDownloadSedeState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '60%' : '65%'}
        height="auto"
      >
        <ModalDownloadSede />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDownloadInstitutionState}
        isClose={() => closeModal(nameModals.modalDownloadInstitutionState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '60%' : '85%'}
        height="auto"
      >
        <ModalDownloadInstitution />
      </storybook.Modal>
      <storybook.Modal
        isOpen={modalDownloadTownState}
        isClose={() => closeModal(nameModals.modalDownloadTownState)}
        iconClose={iconClose}
        backdrop={'static'}
        width={width >= BREAKPOINT ? '60%' : '85%'}
        height="auto"
      >
        <ModalDownloadTowns />
      </storybook.Modal>
    </>
  );
};

export default ContainerModals;
