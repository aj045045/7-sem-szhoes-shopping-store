import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./feature/error";
import loadingReducer from "./feature/loading";

const rootReducer = {
    error: errorReducer,
    loading: loadingReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
