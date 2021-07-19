import React, { useEffect, useState } from "react";
import { Button, Typography, Row, Col, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditInfoModal from "./EditInfoModal/EditInfoModal";
import axios from "../../utils/axios";

const { Title, Text, Link } = Typography;

const StudentMenu = () => {
	// const [fileList, updateFileList] = useState([]);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [userDetails, setUserDetails] = useState({});

	// useEffect(() => {
	// 	const fetchUserDetails = async () => {
	// 		const res = await axios.get("/esummit-user/details");
	// 		if (res.data.success) {
	// 			setUserDetails(res.data.data);
	// 		}
	// 	};
	// 	fetchUserDetails();
	// }, []);

	return (
		<Row justify="center">
			<Col span={24} style={{ paddingTop: "1em", textAlign: "center" }}>
				<Title level={3} style={{ marginBottom: "0.25rem", width: "100%" }}>
					{/* {userDetails.name} */}
					Name
				</Title>
			</Col>
			<Col span={24} style={{ textAlign: "center" }}>
				<Title level={5} type="secondary" style={{ marginTop: "0" }}>
					{/* {userDetails.email} */}
					Email
				</Title>
			</Col>
			<Row>
				{/* <Col span={12} style={{ marginBottom: "1rem" }}>
					<Text strong>Summit ID</Text>
					<br />
					<Text>{userDetails.summitID}</Text>
				</Col> */}

				<Col span={24} >
					<Text strong>Contact no.</Text>
					<br />
					<Text>+91
						{/* {userDetails.phone} */}
						99999999 </Text>
				</Col>

				{/* {userDetails.degree && (
					<Col span={12}>
						<Text strong>Degree</Text>
						<br />
						<Text>{userDetails.degree}</Text>
					</Col>
				)}

				{userDetails.yearOfStudy && (
					<Col span={12} style={{ marginBottom: "1rem", textAlign: "right" }}>
						<Text strong>Year Of Study</Text>
						<br />
						<Text>{userDetails.yearOfStudy}</Text>
					</Col>
				)}

				{userDetails.branchOfStudy && (
					<Col span={12} style={{ marginBottom: "1rem" }}>
						<Text strong>Branch</Text>
						<br />
						<Text>{userDetails.branchOfStudy}</Text>
					</Col>
				)} */}

				{/* <Col span={24} style={{ marginBottom: "1rem" }}>
					<Text strong>Institution</Text>
					<br />
					<Text>{userDetails.instituteName}</Text>
				</Col> */}

				{/* {userDetails.linkedInURL && (
					<Col span={12}>
						<Text strong>LinkedIn URL</Text>
						<br />
						<Link href={"https://linkedin.com/in/" + userDetails.linkedInURL}>
							{userDetails.name}
						</Link>
					</Col>
				)} */}

				{/* {userDetails.dob && (
					<Col span={12} style={{ textAlign: "right", marginBottom: "1rem" }}>
						<Text strong>Date of Birth</Text>
						<br />
						<Text>{userDetails.dob}</Text>
					</Col>
				)} */}
				{/* 
				{userDetails.city && (
					<Col span={12}>
						<Text strong>City</Text>
						<br />
						<Text>{userDetails.city}</Text>
					</Col>
				)} */}
				{/* 
				{userDetails.state && (
					<Col span={12} style={{ textAlign: "right" }}>
						<Text strong>State</Text>
						<br />
						<Text>{userDetails.state}</Text>
					</Col>
				)} */}
			</Row>

			<Divider />
			<Row justify="space-between" style={{ width: "100%" }}>
				<Col span={24}>
					<Button
						style={{ width: "100%" }}
						type="primary"
						icon={<EditOutlined />}
						onClick={() => setEditModalVisible(true)}
					>
						EDIT INFO
					</Button>
				</Col>
			</Row>
			<EditInfoModal
				visible={editModalVisible}
				setVisible={setEditModalVisible}
				userDetails={userDetails}
			/>
		</Row>
	);
};

export default StudentMenu;
