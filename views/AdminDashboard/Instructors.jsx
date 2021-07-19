import React, { useCallback, useEffect, useState } from "react";
import { Typography, Row, Col, Card, Divider, Tag, Button, Modal, Grid } from "antd";
import {
    PlusOutlined

} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getInstructors } from "../../redux/admin/adminActions";
import openNotification from "../../utils/openAntdNotification"
import Instructor from "./Instructor";
import AddInstructorModal from "./AddInstructorModal";



const { Title } = Typography;
const { useBreakpoint } = Grid


function Instructors() {

    const screen = useBreakpoint()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const instructors = useSelector((state) => state.admin.data.instructors);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        dispatch(getInstructors(), handleSuccess, handleError)
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
                    <Title level={2}>Instructors</Title>
                </Col>
                <Col span={4}>
                    {
                        screen.md ? <Button onClick={() => showModal()}><PlusOutlined />Add new Instructor</Button> : <Button onClick={() => showModal()}><PlusOutlined /></Button>
                    }

                </Col>
            </Row>
            <Row gutter={24}>
                {instructors
                    ? instructors.map((instructor) => (
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 12, offset: 0 }}
                            lg={{ span: 8, offset: 0 }}>
                            <Card hoverable={true} style={{ backgroundColor: "#fffffffa" }}>
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Title level={3}>{instructor.name}
                                            {/* <Tag color="#87d068">{instructor}</Tag> */}
                                        </Title>
                                    </Col>
                                    <Col span={4}>
                                        {/* {instructor.isLive ? <Tag color="#f40606">Live</Tag> : <Tag color="default">Not Live</Tag>} */}
                                    </Col>
                                    <Col span={24}>
                                        <Link
                                            to={`/admin-dashboard/instructors/instructor-info`}
                                            // component={<Instructor instructorID={instructor._id} />}
                                            onClick={() => {
                                                // console.log("here,.,.,.,,.,")
                                                // dispatch(getParticipants(instructor._id))
                                            }}
                                            style={{ fontSize: "20px" }}>
                                            Go to Instructor
                                          </Link>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))
                    : null}
            </Row>
            <Modal title="Add new Instructor" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <AddInstructorModal handleCancel={handleCancel} />
            </Modal>
        </div>
    );
}

export default Instructors;
