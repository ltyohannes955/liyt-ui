import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';
import deliveriesReducer from './features/deliveries/deliveriesSlice';
import businessLocationsReducer from './features/businessLocations/businessLocationsSlice';

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            auth: authReducer,
            deliveries: deliveriesReducer,
            businessLocations: businessLocationsReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    });

    setupListeners(store.dispatch);
    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
