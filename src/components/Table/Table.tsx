import React, { useState } from "react";
import s from "./table.module.scss";
import { Button, Table, Modal, Input } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { UserType } from "../../types/users-types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
	deleteContactAC,
	setSortByNameAC,
} from "../../store/reducers/users-reduser";
import {
	EditOutlined,
	DeleteOutlined,
	SwapLeftOutlined,
} from "@ant-design/icons";
import { UIModal } from "../Modal/UIModal";
import { NavLink } from "react-router-dom";

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

export const UITable: React.FC = () => {
	const { users, sortUsers } = useAppSelector((state) => state.usersSlice);
	const dispatch = useAppDispatch();
	const [editContactMode, setEditContactMode] = useState(false);
	const [userID, setUserID] = useState<string | null>(null);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			position: ["bottomCenter"],
			current: 1,
			pageSize: 10,
		},
	});

	const columns: ColumnsType<UserType> = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) =>
				a.name.first > b.name.first ? -1 : a.name.first > b.name.first ? 1 : 0,
			render: (name) => `${name.first} ${name.last}`,
			width: "20%",
		},
		{
			title: "Gender",
			dataIndex: "gender",
			filters: [
				{ text: "Male", value: "male" },
				{ text: "Female", value: "female" },
			],
			onFilter: (value: string | number | boolean, record) =>
				record.gender === value,
			width: "20%",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Phone",
			dataIndex: "phone",
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (_, recodrd: UserType) => {
				return (
					<div className={s.actionWrap}>
						<EditOutlined
							onClick={() => {
								setUserID(recodrd.login.uuid);
								setEditContactMode(true);
							}}
						/>
						<DeleteOutlined
							onClick={() => deleteUserHandler(recodrd.login.uuid)}
						/>
					</div>
				);
			},
		},
	];

	const deleteUserHandler = (userID: string) => {
		Modal.confirm({
			title: "Are you sure delete this contact?",
			content: "the contact will be permanently deleted",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				dispatch(deleteContactAC({ userID }));
			},
		});
	};

	const setSearchByNameHandler = (searchParams: string) => {
		dispatch(setSortByNameAC({ searchParams }));
		console.log(searchParams);
	};

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<UserType> | SorterResult<UserType>[]
	) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	return (
		<div className={s.tableWrap}>
			<div className={s.header}>
				<Button>
					<NavLink to={"/new-contact"}>
						<SwapLeftOutlined />
						contact form
					</NavLink>
				</Button>
				<Input.Search
					placeholder="search by name"
					allowClear
					onSearch={setSearchByNameHandler}
					style={{ width: 200 }}
				/>
			</div>
			<Table
				columns={columns}
				rowKey={(record) => record.login.uuid}
				dataSource={sortUsers?.length ? sortUsers : users}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
				bordered
			/>
			<UIModal
				editContactMode={editContactMode}
				setEditContactMode={setEditContactMode}
				userID={userID}
			/>
		</div>
	);
};
