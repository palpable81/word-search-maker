import { configureStore } from "@reduxjs/toolkit";
import gridReducer from '../features/grid/gridSlice';
import wordbankReducer from '../features/wordbank/wordbankSlice';
import settingsReducer from '../features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    wordbank: wordbankReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
