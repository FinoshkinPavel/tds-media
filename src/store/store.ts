import {
	AnyAction,
	ThunkDispatch,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/users-reduser";

const rootReducer = combineReducers({
	usersSlice: userReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type AppStoreType = ReturnType<typeof rootReducer>;
export type AppDispatchType = ThunkDispatch<AppStoreType, void, AnyAction>;
