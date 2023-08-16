import { FC, useEffect } from "react";
import { Modal, Button, Form } from "antd";
import { useForm } from "react-hook-form";
import { ControlSelect } from "../ControlSelect/ControlSelect";
import { ControlInput } from "../ControlInput/ControlInput";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
	FormValues,
	upDateContactAC,
} from "../../store/reducers/users-reduser";
import { useAppSelector } from "../../hooks/useAppSelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { editContactSchema } from "../../shemes/edit-contact-sheme";

type UIModalPropsType = {
	editContactMode: boolean;
	setEditContactMode: (value: boolean) => void;
	userID: string | null;
};

export const UIModal: FC<UIModalPropsType> = ({
	editContactMode,
	setEditContactMode,
	userID,
}) => {
	const { control, handleSubmit, setValue } = useForm<FormValues>({
		resolver: zodResolver(editContactSchema),
	});

	const dispatch = useAppDispatch();

	const users = useAppSelector((state) => state.usersSlice.users);

	const findUser = users.find((el) => el.login.uuid === userID);

	//warning with render
	useEffect(() => {
		if (findUser) {
			setValue("gender", findUser.gender);
			setValue("email", findUser.email);
			setValue("firstName", findUser.name.first);
			setValue("lastName", findUser.name.last);
			setValue("phone", findUser.phone);
		}
	}, [userID]);

	const onSubmit = (formData: FormValues) => {
		console.log(formData);
		userID && dispatch(upDateContactAC({ formData, userID }));
		setEditContactMode(false);
	};

	return (
		<Modal
			title="Edit contact"
			open={editContactMode}
			closeIcon
			onCancel={() => setEditContactMode(false)}
			footer={[]}
		>
			<Form onFinish={handleSubmit(onSubmit)} labelCol={{ span: 4 }}>
				<ControlInput name={"firstName"} label="First name" control={control} />
				<ControlInput name={"lastName"} label="Last name" control={control} />
				<ControlInput name={"email"} label="Email" control={control} />
				<ControlInput
					name={"phone"}
					label="Phone"
					control={control}
					type="number"
				/>
				<ControlSelect name={"gender"} control={control} />
				<Button key={"submit"} htmlType="submit">
					Save
				</Button>
			</Form>
		</Modal>
	);
};
