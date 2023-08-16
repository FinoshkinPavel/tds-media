import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/users-types";
import { v1 } from "uuid";
import { loadState, saveStateLS } from "../../utils/contact-state-ls";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: loadState(),
	} as InitialStateType,
	reducers: {
		addNewContactAC(state, action: PayloadAction<{ formData: FormValues }>) {
			const user: UserType = {
				name: {
					first: action.payload.formData.firstName,
					last: action.payload.formData.lastName,
				},
				email: action.payload.formData.email,
				gender: action.payload.formData.gender,
				phone: action.payload.formData.phone,
				login: {
					uuid: v1(),
				},
			};
			state.users.push(user);
			saveStateLS(state.users);
		},
		deleteContactAC(state, action: PayloadAction<{ userID: string }>) {
			const indexUser = state.users.findIndex(
				(el) => el.login.uuid === action.payload.userID
			);
			state.users.splice(indexUser, 1);
			saveStateLS(state.users);
		},
		upDateContactAC(
			state,
			action: PayloadAction<{ formData: FormValues; userID: string }>
		) {
			const indexUser = state.users.findIndex(
				(el) => el.login.uuid === action.payload.userID
			);

			state.users[indexUser].email = action.payload.formData.email;
			state.users[indexUser].gender = action.payload.formData.gender;
			state.users[indexUser].name.first = action.payload.formData.firstName;
			state.users[indexUser].name.last = action.payload.formData.lastName;
			state.users[indexUser].phone = action.payload.formData.phone;
			saveStateLS(state.users);
		},
		setSortByNameAC(state, action: PayloadAction<{ searchParams: string }>) {
			state.sortUsers = state.users.filter(
				(el) =>
					el.name.first === action.payload.searchParams ||
					el.name.last === action.payload.searchParams
			);
		},
	},
});

export const userReducer = usersSlice.reducer;
export const {
	addNewContactAC,
	deleteContactAC,
	upDateContactAC,
	setSortByNameAC,
} = usersSlice.actions;

type InitialStateType = {
	sortUsers: UserType[];
	users: UserType[];
};
export type FormValues = {
	gender: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
};
