import { Input, Form } from "antd";
import { FC, memo } from "react";
import { FieldValues, useController } from "react-hook-form";
import s from "./controll-input.module.css";

type ControlInputPropsType = FieldValues & { label: string; type?: string };

export const ControlInput: FC<ControlInputPropsType> = memo(
	({ control, name, label, type }) => {
		const {
			fieldState: { error },
			field: { ref, value, ...fieldProps },
		} = useController({ control, name });

		return (
			<Form.Item
				label={label}
				help={error?.message}
				validateStatus={error?.message && "error"}
			>
				<Input
					ref={ref}
					{...fieldProps}
					value={value}
					type={type}
					className={s.controlInput}
				/>
			</Form.Item>
		);
	}
);
