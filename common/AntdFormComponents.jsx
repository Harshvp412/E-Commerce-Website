import React from 'react'
import { Form, Input, Col, Cascader } from "antd";
import axios from "../utils/axios";

import {
	PhoneOutlined,
	MailOutlined,
	SmileOutlined,
	KeyOutlined,
	NumberOutlined,
} from "@ant-design/icons";

const years = [
	{
		value: "1st year",
		label: "1st Year",
	},
	{
		value: "2nd year",
		label: "2nd Year",
	},
	{
		value: "3rd year",
		label: "3rd Year",
	},
	{
		value: "4th year",
		label: "4th Year",
	},
	{
		value: "5th year",
		label: "5th Year",
	},
];
const makeDegreeOptions = (isBootcamp) => {
	const makeYear = (program) => {
		const year = years.slice(0, program);
		if (isBootcamp) {
			year.push({
				value: "graduated",
				label: "Graduated",
			});
		}
		return year;
	};

	const degreeOptions = [
		{
			value: "B.Tech",
			label: "B.Tech",
			children: makeYear(4),
		},
		{
			value: "M.Tech",
			label: "M.Tech",
			children: makeYear(2),
		},
		{
			value: "Integrated/Dual",
			label: "Integrated/Dual",
			children: makeYear(5),
		},
		{
			value: "Ph.D.",
			label: "Ph.D.",
			children: makeYear(4),
		},
		{
			value: "MBA",
			label: "MBA",
			children: makeYear(4),
		},
		{
			value: "Others",
			label: "Others",
			children: makeYear(4),
		},
	];

	return degreeOptions;
};

const AntdFormComponents = {
	SummitIDInput: ({ inputProps, ...props }) => (
		<Form.Item
			name="summitID"
			validateFirst={true}
			label={
				<span>
					<NumberOutlined /> E-Summit ID
				</span>
			}
			rules={[
				{
					required: true,
					message: "This is a required field",
				},
				{
					pattern: /^ES21\d{4}$/g,
					message: "This is not a valid Summit ID",
				},
				{
					validator: async (rule, val) => {
						const res = await axios.get(
							`/esummit-user/check-user/summitID?summitID=${val}`
						);
						if (res.data) {
							return Promise.resolve();
						}
						return Promise.reject("This Summit ID doesn't correspond to any User.");
					},
				},
			]}
			// extra={
			// 	<span>
			// 		Check your mail if you don't remember. Only type in the last 4 digits of it.
			// 		<SmileOutlined />
			// 	</span>
			// }
			{...props}
		>
			<Input {...inputProps} />
		</Form.Item>
	),

	PhoneInput: ({ inputProps, ...props }) => (
		<Form.Item
			name="phone"
			validateFirst={true}
			label={
				<span>
					<PhoneOutlined /> Phone number
				</span>
			}
			rules={[
				{
					required: true,
					message: "Please input your phone number!",
				},
				{
					type: "string",
					message: "Please enter a valid phone number.",
				},
				{
					pattern: new RegExp(/^[0-9][s./0-9]*$/g),
					message: "Please enter a valid phone number.",
				},
				{
					max: 10,
					message: "Please enter a valid phone number.",
				},
				{
					min: 10,
					message: "Please enter a valid phone number.",
				},
			]}
			{...props}
		>
			<Input prefix="+91" {...inputProps} />
		</Form.Item>
	),

	EmailInput: ({ inputProps, ...props }) => (
		<Form.Item
			name="email"
			label={
				<span>
					<MailOutlined /> E-mail
				</span>
			}
			extra="This E-Mail will be used for logging in."
			rules={[
				{
					type: "email",
					message: "The input is not valid E-mail!",
				},
				{
					required: true,
					message: "Please input your E-mail!",
				},
			]}
			{...props}
		>
			<Input {...inputProps} />
		</Form.Item>
	),

	PasswordInput: ({ inputProps, ...props }) => (
		<Form.Item
			label="Password"
			name="password"
			rules={[
				{
					required: true,
					message: "Please input your password!",
				},
			]}
			{...props}
		>
			<Input.Password {...inputProps} />
		</Form.Item>
	),

	CreatePasswordInput: ({ inputProps, ...props }) => (
		<Form.Item
			name="password"
			extra={
				<span>
					It can be anything. Just keep it more than 6 letters. <SmileOutlined />
				</span>
			}
			rules={[
				{
					required: true,
					message: "Please create a password.",
				},
				{
					min: 6,
					message: "Please input at least 6 characters.",
				},
			]}
			label={
				<span>
					<KeyOutlined /> Create Password
				</span>
			}
			{...props}
		>
			<Input.Password {...inputProps} />
		</Form.Item>
	),

	ConfirmPasswordInput: ({ inputProps, ...props }) => (
		<Form.Item
			dependencies={["password"]}
			name="confirm"
			hasFeedback
			validateTrigger="onChange"
			rules={[
				{
					required: true,
					message: "Please confirm your password.",
				},
				({ getFieldValue }) => ({
					validator(rule, value) {
						if (!value || getFieldValue("password") === value) {
							return Promise.resolve();
						}
						return Promise.reject("");
					},
				}),
			]}
			label={
				<span>
					<KeyOutlined /> Confirm Password
				</span>
			}
			{...props}
		>
			<Input.Password {...inputProps} />
		</Form.Item>
	),
	YearOfStudyInput: ({ inputProps, isBootcamp = false, ...props } = {}) => (
		<Form.Item
			name="yearOfStudy"
			label={
				<span>
					<NumberOutlined /> Degree and Year of Study
				</span>
			}
			rules={[
				{
					required: true,
					message: "Please input your year of study",
				},
			]}
			{...props}
		>
			<Cascader
				options={makeDegreeOptions(isBootcamp)}
				size="large"
				style={{ minWidth: "200px" }}
			/>
		</Form.Item>
	),

	DegreeInput: ({ inputProps, ...props }) => (
		<Form.Item
			name="degree"
			label={
				<span>
					<NumberOutlined /> Degree
				</span>
			}
			rules={[
				{
					required: true,
					message: "This field is required",
				},
			]}
			{...props}
		>
			<Input {...inputProps} />
		</Form.Item>
	),
};

for (const component in AntdFormComponents) {
	const Component = AntdFormComponents[component];
	AntdFormComponents[component] = ({ colProps, inputProps, ...rest }) => (
		<Col {...colProps}>
			<Component inputProps={inputProps} {...rest} />
		</Col>
	);
}

// Did not use default export as we wouldn't be able to use tree-shaking then.

// And we can't do this
// export { ...AntdFormComponents }
// as rest operator is not allowed in export

const {
	EmailInput,
	PhoneInput,
	PasswordInput,
	CreatePasswordInput,
	ConfirmPasswordInput,
	SummitIDInput,
	YearOfStudyInput,
	DegreeInput,
} = AntdFormComponents;
export {
	EmailInput,
	PhoneInput,
	PasswordInput,
	ConfirmPasswordInput,
	CreatePasswordInput,
	SummitIDInput,
	YearOfStudyInput,
	DegreeInput,
};
