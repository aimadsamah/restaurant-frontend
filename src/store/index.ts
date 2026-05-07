import { configureStore } from '@reduxjs/toolkit';
import { restaurantApi } from '../features/api';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import menuReducer from '../features/menu/menuSlice';
import reservationReducer from '../features/reservation/reservationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    menu: menuReducer,
    reservation: reservationReducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restaurantApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
