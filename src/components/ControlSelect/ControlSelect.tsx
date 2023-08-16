import { Select, Form } from "antd";
import { FC } from "react";
import { FieldValues, useController } from "react-hook-form";

export const ControlSelect: FC<FieldValues> = ({ control, name }) => {
	const { Option } = Select;
	const {
		fieldState: { error },
		field: { ref, ...fieldProps },
	} = useController({ control, name });

	return (
		<Form.Item
			label="Gender"
			help={error?.message}
			validateStatus={error?.message && "error"}
		>
			<Select ref={ref} {...fieldProps} allowClear>
				<Option value="male">male</Option>
				<Option value="female">female</Option>
			</Select>
		</Form.Item>
	);
};
