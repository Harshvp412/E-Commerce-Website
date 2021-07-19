import React, { useCallback, useEffect, useState } from "react";
import { Typography, Row, Col, Card, Divider, Button, Form, Input, Modal, Tag, Grid } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
    PlusOutlined

} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getSubjects } from "../../redux/admin/adminActions";
import openNotification from "../../utils/openAntdNotification"
import Subject from "./Subject";
import AddSubjectModal from "./AddSubjectModal";


const { Title } = Typography;
const { useBreakpoint } = Grid;

function Subjects() {

    const screen = useBreakpoint()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const subjects = useSelector((state) => state.admin.data.subjects);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        dispatch(getSubjects(), handleSuccess, handleError)
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
                    <Title level={2}>Subjects</Title>
                </Col>
                <Col span={4}>
                    {
                        screen.md ? <Button onClick={() => showModal()}><PlusOutlined />Add new subject</Button> : <Button onClick={() => showModal()}><PlusOutlined /></Button>
                    }

                </Col>
            </Row>


            <Row gutter={24}>
                {subjects
                    ? subjects.map((subject) => (
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 12, offset: 0 }}
                            lg={{ span: 8, offset: 0 }}>
                            <Card hoverable={true} style={{ backgroundColor: "#fffffffa" }}>
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Title level={3}>{subject.name}
                                            {/* <Tag color="#87d068">{subject}</Tag> */}
                                        </Title>
                                    </Col>
                                    <Col span={4}>
                                        {/* {subject.isLive ? <Tag color="#f40606">Live</Tag> : <Tag color="default">Not Live</Tag>} */}
                                    </Col>
                                    <Col span={24}>
                                        <Link
                                            to={`/admin-dashboard/subjects/subject-info`}

                                            onClick={() => {

                                            }}
                                            style={{ fontSize: "20px" }}>
                                            Go to Subject
                                          </Link>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))
                    : null}
            </Row>
            <Modal title="Add new subject" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <AddSubjectModal handleCancel={handleCancel} />
            </Modal>
        </div>
    );
}

export default Subjects;
