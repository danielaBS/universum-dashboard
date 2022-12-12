const createMenuSlice = (set, get) => ({
  tabState: { id: 0, text: 'Dashboard' },
  tabDataManagementState: { id: 0, text: 'Años' },
  showMenu: true,
  loading: false,
  setLoadingState: () => set({ loading: !get().loading }),
  setShowMenu: () => set({ showMenu: !get().showMenu }),
  changeTabState: (item) =>
    set((state) => {
      state.setLoadingState();
      setTimeout(() => {
        state.setLoadingState();
      }, 2000);
      return { tabState: item };
    }),
  changeTabDataManagementState: (item) => set({ tabDataManagementState: item }),
});

export default createMenuSlice;
