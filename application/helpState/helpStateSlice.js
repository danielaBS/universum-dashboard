const createHelpSlice = (set, get) => ({
  helpModalIcon: '',
  helpModalTitle: '',
  helpModalContent: <></>,
  setHelpModalIconRoute: (data) => {
    set({ helpModalIcon: data });
  },
  setHelpModalTitle: (data) => {
    set({ helpModalTitle: data });
  },
  setHelpModalContent: (data) => {
    set({ helpModalContent: data });
  },
});
export default createHelpSlice;
