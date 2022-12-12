import requestService from '@service/services/service';

const createMunicipioSlice = (set) => ({
  listTowns: [],
  fetchTowns: async () => {
    try {
      const response = await requestService.getAllTowns();
      set({ listTowns: response.data });
    } catch (error) {
      console.log(error);
    }
  },
});

export default createMunicipioSlice;
