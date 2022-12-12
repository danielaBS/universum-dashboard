// import requestService from '@service/services/service';

const createPaginationSlice = (set, get) => ({
  pageNumberIndiceArea: 0,
  pageNumberIndiceProceso: 0,
  pageNumberTotalArea: 0,
  pageNumberTotalProceso: 0,
  pageNumberTotalVariable: 0,
  pageNumberExecutions: 0,
  pageNumberDMDepartments: 0,
  pageNumberDMYears: 0,
  pageNumberDMTowns: 0,
  pageNumberDMInstitutions: 0,
  pageNumberDMSedes: 0,
  pageNumberDMEstamentos: 0,
  pageNumberDMAreas: 0,
  pageNumberTools: 0,
  pageNumberUsers: 0,
  setPageNumberIndiceArea: (data) => {
    set({ pageNumberIndiceArea: data });
  },
  setPageNumberIndiceProceso: (data) => {
    set({ pageNumberIndiceProceso: data });
  },
  setPageNumberTotalArea: (data) => {
    set({ pageNumberTotalArea: data });
  },
  setPageNumberTotalProceso: (data) => {
    set({ pageNumberTotalProceso: data });
  },
  setPageNumberTotalVariable: (data) => {
    set({ pageNumberTotalVariable: data });
  },
  setPageNumberExecutions: (data) => {
    set({ pageNumberExecutions: data });
  },
  setPageNumberDMDepartments: (data) => {
    set({ pageNumberDMDepartments: data });
  },
  setPageNumberDMYears: (data) => {
    set({ pageNumberDMYears: data });
  },
  setPageNumberDMTowns: (data) => {
    set({ pageNumberDMTowns: data });
  },
  setPageNumberDMInstitutions: (data) => {
    set({ pageNumberDMInstitutions: data });
  },
  setPageNumberDMSedes: (data) => {
    set({ pageNumberDMSedes: data });
  },
  setPageNumberDMEstamentos: (data) => {
    set({ pageNumberDMEstamentos: data });
  },
  setPageNumberDMAreas: (data) => {
    set({ pageNumberDMAreas: data });
  },
  setPageNumberTools: (data) => {
    set({ pageNumberTools: data });
  },
  setPageNumberUsers: (data) => {
    set({ pageNumberUsers: data });
  },
});

export default createPaginationSlice;
