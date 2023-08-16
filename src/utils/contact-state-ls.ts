import { UserType } from "../types/users-types";
export const loadState = () => {
	try {
		const serializedState = localStorage.getItem("contacts");
		if (serializedState === null) {
			return [];
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return [];
	}
};

export const saveStateLS = (data: UserType[]) => {
	localStorage.setItem("contacts", JSON.stringify(data.map((el) => el)));
};
