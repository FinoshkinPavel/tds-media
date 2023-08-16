import { FC } from "react";
import { Button, Form, message } from "antd";
import { ControlInput } from "../ControlInput/ControlInput";
import { ControlSelect } from "../ControlSelect/ControlSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
	FormValues,
	addNewContactAC,
} from "../../store/reducers/users-reduser";
import s from "./add-contact-form.module.scss";
import { addContactSheme } from "../../shemes/add-contact-sheme";
import { SwapRightOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const AddContactForm: FC = () => {
	const { control, handleSubmit, reset } = useForm<FormValues>({
		resolver: zodResolver(addContactSheme),
	});

	const [messageApi, contextHolder] = message.useMessage();
	const success = () => {
		messageApi.open({
			type: "success",
			content: "contact added to the list",
		});
	};

	const dispatch = useAppDispatch();

	const onSubmit = (formData: FormValues) => {
		console.log(formData);
		reset();
		dispatch(addNewContactAC({ formData }));
		success();
	};

	const resetFormHandler = () => reset();

	return (
		<>
			{contextHolder}
			<div className={s.formWrap}>
				<Form onFinish={handleSubmit(onSubmit)} labelCol={{ span: 7 }}>
					<ControlInput
						name={"firstName"}
						label="First name"
						control={control}
					/>
					<ControlInput name={"lastName"} label="Last name" control={control} />
					<ControlInput name={"email"} label="Email" control={control} />
					<ControlInput
						name="phone"
						label="Phone"
						control={control}
						type="number"
					/>
					<ControlSelect name="gender" control={control} />
					<div className={s.buttonWrap}>
						<Button htmlType="submit">Save </Button>
						<Button onClick={resetFormHandler}>Reset</Button>
						<Button onClick={resetFormHandler} type="link">
							<NavLink to="/">
								contacts <SwapRightOutlined />
							</NavLink>
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
};
