import React, { useState } from "react";
// import Cookies from "js-cookie";
import { Row, Col, Form, Modal, Input, Button, Select, Tabs, Tooltip } from "antd";
import {
	UserOutlined,
	CalendarOutlined,
	PhoneOutlined,
	BankOutlined,
	KeyOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import openAntdNotification from "../../../utils/openAntdNotification";
import compareFields from "./compareFields";
import axios from "../../../utils/axios";
import { PhoneInput, YearOfStudyInput } from "../../../common/AntdFormComponents";
import states from "../../../utils/indian-states";

const { Option } = Select;
const { TabPane } = Tabs;

const EditInfoModal = ({ userDetails, visible, setVisible }) => {
	const [noChanges, setNoChanges] = useState(false);
	const [loading, setLoading] = useState({ info: false, password: false });
	const initialValues = {
		...userDetails,
		yearOfStudy: [userDetails.degree, userDetails.yearOfStudy],
		linkedInURL: "https://linkedin.com/in/" + userDetails.linkedInURL,
	};

	// const participatedEvents = Cookies.getJSON("participatedEvents");
	// const youthEvents = [
	// 	"markathon",
	// 	"boardroom",
	// 	"biz-quiz",
	// 	"stocks-are-high",
	// 	"business-simulation-game",
	// ];
	// const innovatorEvents = ["bootcamp", "unconference", "product-construct"];

	// const isSSParticipant = participatedEvents.some(
	// 	(event) => event === "elevate" || event === "startup-showcase"
	// );
	// const isYouthParticipant = participatedEvents.some((event) => youthEvents.includes(event));
	// const isInnoParticipant = participatedEvents.some((event) => innovatorEvents.includes(event));

	const onInfoFinish = async (newValues) => {
		const normalizedNewValues = {
			...newValues,
			degree: newValues.yearOfStudy[0],
			yearOfStudy: newValues.yearOfStudy[1],
			linkedInURL: newValues.linkedInURL
				.split("/")
				.filter((w) => w)
				.pop(),
		};
		const changes = compareFields(userDetails, normalizedNewValues);
		if (!changes) {
			setNoChanges(true);

			setTimeout(() => {
				setNoChanges(false);
			}, 3000);
		} else {
			try {
				setLoading({ info: true, password: false });
				//console.log(changes);
				// const res = await axios.post("/esummit-user/update/info", changes);
				//console.log(res);
				// if (res.data.success) {
				// 	openAntdNotification(
				// 		"success",
				// 		"Information updated successfully",
				// 		"This page will refresh."
				// 	);
				// 	setTimeout(() => {
				// 		window.location.reload();
				// 	}, 1000);
				// }
			} catch (error) {
				console.log(error);
				openAntdNotification("error", "Error occured in updating info", error.message);
			} finally {
				setLoading({ info: false, password: false });
			}
		}
	};

	const onPasswordChange = async (passwords) => {
		try {
			setLoading({ info: false, password: true });

			//console.log(passwords);
			// const res = await axios.post("/esummit-user/update/password", passwords);
			//console.log(res);
			// if (res.data.success) {
			// 	openAntdNotification(
			// 		"success",
			// 		"Password updated successfully",
			// 		"This page will refresh."
			// 	);
			// 	setTimeout(() => {
			// 		window.location.reload();
			// 	}, 1000);
			// }
		} catch (error) {
			console.log(error);
			openAntdNotification("error", "Error occured in changing password", error.message);
		} finally {
			setLoading({ info: false, password: false });
		}
	};
	return (
		<Modal visible={visible} footer={null} destroyOnClose={true} closable={false} zIndex={1003}>
			<Tabs>
				<TabPane tab="USER INFO" key="1" disabled={loading.password}>
					<Form layout="vertical" initialValues={initialValues} onFinish={onInfoFinish}>
						<Row gutter={12}>
							<Col span={24}>
								<Form.Item
									name="name"
									rules={[{ required: true }]}
									label={
										<span>
											<UserOutlined /> Name
										</span>
									}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col md={12} xs={24}>
								<Form.Item
									name="dob"
									label={
										<span>
											<CalendarOutlined /> Date of Birth
										</span>
									}
									validateFirst
									rules={[
										{
											required: false,
										},
										{
											type: "pattern",
											pattern: /^\d{1,2}-\d{1,2}-\d{4}$/,
											message: "Please follow the DD-MM-YYYY format.",
										},
										{
											validator: (rule, val) => {
												if (!val) return Promise.resolve();
												const arr = val.split("-");
												if (
													arr[0] > 31 ||
													arr[0] < 1 ||
													arr[1] > 12 ||
													arr[1] < 1 ||
													arr[2] > 2021 ||
													arr[2] < 1900
												) {
													return Promise.reject(
														"Please enter a valid date."
													);
												}
												return Promise.resolve();
											},
										},
									]}
								>
									<Input placeholder="DD-MM-YYYY" />
								</Form.Item>
							</Col>
							<PhoneInput
								colProps={{ xs: 24, md: 12 }}
								label={
									<span>
										<PhoneOutlined /> Phone
									</span>
								}
							/>
							{/* <YearOfStudyInput
								colProps={{ xs: 24, md: 12 }}
								rules={[
									{
										required: isYouthParticipant || isInnoParticipant,
									},
								]}
							/> */}
							<Col md={12} xs={24}>
								{/* <Form.Item
									name="linkedInURL"
									label="LinkedIn URL"
									rules={[
										{ type: "url" },
										// {
										// 	required: isSSParticipant,
										// },
									]}
								>
									<Input />
								</Form.Item> */}
							</Col>
							{/* <Col xs={24} md={12}>
								<Form.Item
									name="branchOfStudy"
									label={
										<span>
											<BankOutlined /> Branch
										</span>
									}
								>
									<Input />
								</Form.Item>
							</Col> */}
							{/* <Col span={24}>
								<Form.Item
									rules={[{ required: true }]}
									name="instituteName"
									label={
										<span>
											<UserOutlined /> Institute Name
										</span>
									}
								>
									<Input />
								</Form.Item>
							</Col> */}
							<Col xs={24} md={12}>
								<Form.Item
									name="city"
									label="City"
								// rules={[{ required: isYouthParticipant }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item
									name="state"
									label="State"
								// rules={[{ required: isYouthParticipant }]}
								>
									<Select>
										{states.map((state) => (
											<Option key={state} title={state} value={state}>
												{state}
											</Option>
										))}
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={[12, 0]} justify="end">
							<Col>
								<Button onClick={() => setVisible(false)}>Discard</Button>
							</Col>
							<Col>
								<Form.Item style={{ marginBottom: 0 }}>
									<Tooltip
										visible={noChanges}
										title="No changes to be made!"
										trigger="focus"
									>
										<Button
											type="primary"
											htmlType="submit"
											loading={loading.info}
										>
											Save Changes
										</Button>
									</Tooltip>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</TabPane>
				<TabPane tab="CHANGE PASSWORD" disabled={loading.info}>
					<Form layout="vertical" onFinish={onPasswordChange}>
						<Form.Item
							name="newPassword"
							extra={
								<span>
									Keep it more than 6 letters. <SmileOutlined />
								</span>
							}
							rules={[
								{
									min: 6,
									message: "Please input at least 6 characters.",
								},
								{
									required: true,
									message:
										"Please input a new password if you want to change your current one.",
								},
							]}
							label={
								<span>
									<KeyOutlined /> New Password
								</span>
							}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name="currentPassword"
							rules={[
								{ required: true, message: "Please input your current password." },
							]}
							label={
								<span>
									<KeyOutlined /> Current Password
								</span>
							}
						>
							<Input.Password />
						</Form.Item>
						<Row gutter={[12, 0]} justify="end">
							<Col>
								<Button onClick={() => setVisible(false)}>Discard</Button>
							</Col>
							<Col>
								<Form.Item style={{ marginBottom: 0 }}>
									<Button
										type="primary"
										htmlType="submit"
										loading={loading.password}
									>
										Change Password
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</TabPane>
			</Tabs>
		</Modal>
	);
};

export default EditInfoModal;
