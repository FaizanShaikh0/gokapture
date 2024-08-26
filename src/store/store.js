import create from 'zustand';

const useStore = create((set) => ({
  gridData: Array(320).fill(Array(32).fill({ value: '', fontSize: 'text-base', textAlign: 'left' })), // Default grid data with 320 rows and 32 columns
  currentPage: 1,
  selectedCells: [],
  selectedAlignment: 'left',
  selectedFontSize: 'text-base',
  searchQuery: '',
  history: [], // For undo
  future: [],  // For redo

  setGridData: (newData) => set((state) => {
    // Save the current state in history for undo/redo functionality
    const newHistory = [...state.history, state.gridData];
    return { gridData: newData, history: newHistory, future: [] };
  }),
  setCurrentPage: (newPage) => set({ currentPage: newPage }),
  setSelectedCells: (selectedCells) => set({ selectedCells }),
  setSelectedAlignment: (alignment) => set({ selectedAlignment: alignment }),
  setSelectedFontSize: (fontSize) => set({ selectedFontSize: fontSize }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Undo functionality
  handleUndo: () => set((state) => {
    if (state.history.length === 0) return state;
    const previousGridData = state.history[state.history.length - 1];
    const newHistory = state.history.slice(0, -1);
    const newFuture = [state.gridData, ...state.future];
    return { gridData: previousGridData, history: newHistory, future: newFuture };
  }),

  // Redo functionality
  handleRedo: () => set((state) => {
    if (state.future.length === 0) return state;
    const nextGridData = state.future[0];
    const newFuture = state.future.slice(1);
    const newHistory = [...state.history, state.gridData];
    return { gridData: nextGridData, history: newHistory, future: newFuture };
  }),
}));

export default useStore;
