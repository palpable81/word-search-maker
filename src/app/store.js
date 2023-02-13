import { configureStore } from "@reduxjs/toolkit";
import gridReducer from '../features/grid/gridSlice';
import wordbankReducer from '../features/wordbank/wordbankSlice';
import settingsReducer from '../features/settings/settingsSlice';

export default configureStore({
  reducer: {
    grid: gridReducer,
    wordbank: wordbankReducer,
    settings: settingsReducer,
  },
});
