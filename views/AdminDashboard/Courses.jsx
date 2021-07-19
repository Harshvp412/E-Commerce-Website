import React, { useCallback, useEffect, useState } from "react";
import { Typography, Row, Col, Card, Divider, Tag, Button, Modal, Grid } from "antd";
import {
    PlusOutlined

} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCourses } from "../../redux/admin/adminActions";
import openNotification from "../../utils/openAntdNotification"
import AddCourseModal from "./AddCourseModal";


const { Title } = Typography;

const { useBreakpoint } = Grid

function Courses() {

    const screen = useBreakpoint()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.admin.data.courses);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        dispatch(getCourses(), handleSuccess, handleError)
        return () => {

        }
    }, [])

    const handleSuccess = () => {
        openNotification("success", " ",)
    }

    const handleError = (errMsg) => {
        openNotification("error", errMsg)
    }

    return (
        <div>

            <Row>
                <Col span={20}>
                    <Title level={2}>Courses</Title>
                </Col>
                <Col span={4}>
                    {
                        screen.md ? <Button onClick={() => showModal()}><PlusOutlined />Add new Course</Button> : <Button onClick={() => showModal()}><PlusOutlined /></Button>
                    }

                </Col>
            </Row>

            <Row gutter={24}>
                {courses
                    ? courses.map((course) => (
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 12, offset: 0 }}
                            lg={{ span: 8, offset: 0 }}>
                            <Card hoverable={true} style={{ backgroundColor: "#fffffffa" }}>
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Title level={3}>{course.title}  <Tag color="#87d068">{course.subject.name}</Tag></Title>
                                    </Col>
                                    <Col span={4}>
                                        {course.isLive ? <Tag color="#f40606">Live</Tag> : <Tag color="default">Not Live</Tag>}
                                    </Col>
                                    <Col span={24}>
                                        <Link
                                            to={`/admin-p/admin-dashboard/${course._id}`}
                                            onClick={() => {
                                                // console.log("here,.,.,.,,.,")
                                                // dispatch(getParticipants(course._id))
                                            }}
                                            style={{ fontSize: "20px" }}>
                                            Go to course
                                          </Link>
                                    </Col>
                                    <Col span={24}>
                                        Available Dates <br></br>
                                        {
                                            course.availableDates.length && course.availableDates ? course.availableDates.map(date => {
                                                return (
                                                    <Typography.Text>
                                                        {date.split('GMT')[0]}<br>
                                                        </br>
                                                    </Typography.Text>
                                                )
                                            }) : <Typography.Text>
                                                No dates selected
                                        </Typography.Text>
                                        }

                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))
                    : null}
            </Row>
            <Modal title="Add new Course" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <AddCourseModal handleCancel={handleCancel} />
            </Modal>
        </div>
    );
}

export default Courses;
