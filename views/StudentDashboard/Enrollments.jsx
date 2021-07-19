import React, { useEffect, useState, useCallback } from "react";
import moment from 'moment';
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
import { List, Card, Typography, DatePicker } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import axios from "../../utils/axios";
import MyDatePicker from "./MyDatePicker.jsx";

const { Text } = Typography;


const studentID = '60638f1736973647084247ee';



const Courses = ({ filter = "none" }) => {


	const [enrollments, setEnrollments] = useState([]);

	useEffect(() => {
		setIsFetching(true)
		getEnrollments();
		setIsFetching(false)

		return () => { };
	}, []);

	const getEnrollments = useCallback(async () => {
		const res = await axios.post('/student-dashboard/enrollments', {
			studentID,
		});
		console.log(res.data.data.enrollments)
		setEnrollments(res.data.data.enrollments);

	}, []);


	const [isFetching, setIsFetching] = useState(false);
	// const participatedEventsFromCookies = Cookies.getJSON("participatedEvents");

	// const [events, setEvents] = useState([]);

	// useEffect(() => {
	// 	const fetchEvents = async () => {
	// 		setIsFetching(true);
	// 		const res = await axios.get("/esummit-user/events");
	// 		if (res.data.success) {
	// 			return res.data.data;
	// 		}
	// 	};
	// 	fetchEvents().then((data) => {
	// 		setEvents(data);
	// 		setIsFetching(false);
	// 	});
	// }, []);


	const EmptyList = () => (
		<div style={{ textAlign: "center", marginTop: "3rem" }}>
			<SmileOutlined style={{ fontSize: "3rem" }} />
			<br />
			<Text type="secondary" strong>
				You haven't enrolled in any Courses.
			</Text>
			<br />
			<Text type="secondary">
				Go to our courses to explore.
				<br />
				{/* If you are sure you've registered in some events and yet can't see it, please logout
				and login again. */}
			</Text>
		</div>
	);
	return (
		<List
			size="large"
			grid={{
				xs: 1,
				sm: 1,
				md: 1,
				lg: 2,
				column: 3,
			}}
			loading={isFetching}
			dataSource={enrollments}
			locale={{ emptyText: <EmptyList /> }}
			renderItem={(enrollment) => (
				<List.Item style={{ paddingLeft: 0 }}>
					<Card
						// title={<Link to={`/portal/event/${event.name}`}>{event.displayName}</Link>}
						extra={<a href={enrollment.classLink} target="_blank" >
							Class Link
					</a>}
						style={{ cursor: "pointer" }}
					>
						<Text>
							<strong>{enrollment.course.title}</strong>
						</Text>
						<br>
						</br>
						<Text>
							<strong>{enrollment.course.subject.name}</strong>
						</Text>
						<br>
						</br>
						<Text>
							<strong>{
								new Date(
									enrollment.date
								)
									.toDateString()
									.split(
										"1970"
									)[0]
							}
								<br>
								</br>{
									new Date(
										enrollment.date
									)
										.toTimeString()
										.split(
											"GMT"
										)[0]
								}
							</strong>
						</Text>
						<br>
						</br>
						<Text>
							<strong>{enrollment.course.instructor.name}</strong>
						</Text>
						<MyDatePicker options={enrollment.course.availableDates} enrollmentID={enrollment._id} />

					</Card>
				</List.Item>
			)}
		/>
	);
};

export default Courses;
