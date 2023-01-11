import { configureStore } from "@reduxjs/toolkit";
import gridReducer from '../features/grid/gridSlice';
import wordbankReducer from '../features/wordbank/wordbankSlice';

export default configureStore({
  reducer: {
    grid: gridReducer,
    wordbank: wordbankReducer,
  },
});
