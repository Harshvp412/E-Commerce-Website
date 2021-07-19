import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Image, Form, Layout, Input, Button, Row, Col, Grid, Card, Typography } from "antd";
import openNotification from "../../../utils/openAntdNotification";
import { loginAdmin } from "../../../redux/admin/adminActions";
import "./Login.css";
// import ForgotLoginModal from "./ForgotPasswordModal/ForgotPasswordModal";
import LogoComponent from "views/LogoComponent/LogoComponent";

const { useBreakpoint } = Grid;

const { Header, Content } = Layout;

const Login = () => {
    const [forgotPasswordModalVisbility, setForgotPasswordModalVisbility] = useState(false);
    const screen = useBreakpoint();
    const dispatch = useDispatch();
    const history = useHistory();
    // const loginData = useSelector((state) => state.loginData);

    const onFinish = async (values) => {
        let dataToPost = { ...values };

        dispatch(loginAdmin(dataToPost, handleSuccess, handleError));
        function handleError(errorMsg) {
            openNotification("error", "Error occured in logging in.", errorMsg);
        }
        function handleSuccess() {
            history.push("/admin-dashboard");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Header style={{ textAlign: "center" }}>
                <Row>
                    <Col span={6}>{screen.md && <LogoComponent></LogoComponent>}</Col>
                    <Col flex="auto">
                        <Typography.Title level={2} style={{ color: "#fefefe", margin: 0, lineHeight: "200%" }}>
                            <span style={{ fontWeight: "lighter" }}> </span>
                        </Typography.Title>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </Header>
            <Content className="container">
                {/* <ForgotLoginModal
                    visible={forgotPasswordModalVisbility}
                    setVisible={setForgotPasswordModalVisbility}
                    userType="admin"
                /> */}

                <Card bordered={true} hoverable={!screen.xs} title="SSB READY Admin Login" className="loginCard">
                    <Form
                        size="large"
                        layout="vertical"
                        name="Login"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item
                            label="E-Mail"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your E-Mail!",
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        // extra={
                        //     <Button
                        //         onClick={() => setForgotPasswordModalVisbility(true)}
                        //         type="link"
                        //         style={{ paddingLeft: "0" }}
                        //         size="small">
                        //         Forgot Password?
                        //     </Button>
                        // }
                        >
                            <Input.Password />
                        </Form.Item>

                        <Row justify="end" align="bottom">
                            <Col span={8} style={{ textAlign: "right" }}>
                                <Form.Item style={{ marginBottom: "0px" }}>
                                    <Button type="primary" size="large" htmlType="submit"
                                    // loading={loginData.loggingIn}
                                    >
                                        Log In
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Content>
        </>
    );
};

export default Login;
