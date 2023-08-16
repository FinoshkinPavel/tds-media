export interface UserType {
	name: {
		first: string;
		last: string;
	};
	gender: string;
	email: string;
	login: {
		uuid: string;
	};
	phone: string;
}
