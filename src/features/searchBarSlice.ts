import { createSlice } from '@reduxjs/toolkit';

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState: {
    isVisible: false,
  },
  reducers: {
    setSearchBarVisible: (state) => {
      state.isVisible = true;
    },
    resetSearchBar: (state) => {
      state.isVisible = false;
    },
  },
});

export const { setSearchBarVisible, resetSearchBar } = searchBarSlice.actions;

export default searchBarSlice.reducer;
