import React, { useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
    Layout,
    Avatar,
    Descriptions,
    Typography,
    Menu,
    Popconfirm,
    Drawer,
    message,
    Row,
    Col,
    Card,
    Grid,
    Tag,
    Divider,

} from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    MenuUnfoldOutlined,
    BookOutlined,
    SolutionOutlined,
    FileDoneOutlined,
    UsergroupAddOutlined,
    DeploymentUnitOutlined,

} from "@ant-design/icons";
import Course from "./Course";
import Courses from "./Courses";
import openNotification from "../../utils/openAntdNotification";
import { logoutAdmin } from "../../redux/admin/adminActions";
import Instructors from "./Instructors";
import Instructor from "./Instructor";
import Subjects from "./Subjects";
import Students from "./Students";
import Enrollments from "./Enrollments";
import Subject from "./Subject";
import Title from "antd/lib/typography/Title";
import LogoComponent from "views/LogoComponent/LogoComponent";



const { Text } = Typography;
const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

function Structure() {
    const screen = useBreakpoint()
    function cancel(e) {
        // console.log(e);
        message.error("Click on No");
    }
    const history = useHistory();
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin);

    const [visibleMenu, setVisibleMenu] = useState(false);

    const showMenuDrawer = () => {
        setVisibleMenu(true);
    };
    const onMenuClose = () => {
        setVisibleMenu(false);
    };

    const [visibleProfile, setVisibleProfile] = useState(false);
    // const [visibleAvatarUpdater, setVisibleAvatarUpdater] = useState(false);

    const showProfileDrawer = () => {
        setVisibleProfile(true);
        // setVisibleAvatarUpdater(false);
    };
    const onClose = () => {
        setVisibleProfile(false);
    };
    const handleLogout = async () => {
        const handleSuccess = () => {
            localStorage.removeItem("adminData");
            history.push("/admin-login");
        };
        const handleError = (errorMsg) => {
            openNotification("error", "Error in logging out", errorMsg);
        };
        dispatch(logoutAdmin(handleSuccess, handleError));
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Drawer
                width={300}
                placement="left"
                closable={false}
                onClose={onMenuClose}
                visible={visibleMenu}
                drawerStyle={{ backgroundColor: "#00152a" }}>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" inlineIndent="30">
                    <Menu.Item key="1" onClick={showProfileDrawer}>
                        <Avatar
                            style={{ backgroundColor: "#44b4ca" }}
                            icon={<UserOutlined />}
                            src={admin.data.avatarUrl !== undefined ? admin.data.avatarUrl : null}
                        />
                        <Text strong style={{ paddingLeft: "20px", color: "white" }}>
                            {admin.data.name}
                        </Text>
                    </Menu.Item>
                    <Menu.Item key="2" title="My Profile" icon={<UserOutlined />} onClick={showProfileDrawer}>
                        My Profile
                    </Menu.Item>
                    <Menu.Item key="3" title="My Profile" icon={<HomeOutlined />} onClick={onMenuClose}>
                        <Link to="/admin-dashboard">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="4" title="My Profile" icon={<BookOutlined />} onClick={onMenuClose}>
                        <Link to="/admin-dashboard/courses">Courses</Link>
                    </Menu.Item>
                    <Menu.Item key="5" title="My Profile" icon={<SolutionOutlined />} onClick={onMenuClose}>
                        <Link to="/admin-dashboard/instructors">Instructors</Link>
                    </Menu.Item>
                    <Menu.Item key="6" title="My Profile" icon={<FileDoneOutlined />} onClick={onMenuClose}>
                        <Link to="/admin-dashboard/subjects">Subjects</Link>
                    </Menu.Item>
                    <Menu.Item key="7" title="My Profile" icon={<UsergroupAddOutlined />} onClick={onMenuClose}>
                        <Link to="/admin-dashboard/students">Students</Link>
                    </Menu.Item>
                    <Menu.Item key="8" title="My Profile" icon={<DeploymentUnitOutlined />} onClick={onMenuClose}>
                        <Link to="/admin-dashboard/enrollments">Enrollments</Link>
                    </Menu.Item>
                    <Menu.Item key="7" title="Logout" icon={<LogoutOutlined />}>
                        <Popconfirm
                            title="Are you sure you want to log out?"
                            onConfirm={handleLogout}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            Logout
                        </Popconfirm>
                    </Menu.Item>
                </Menu>
            </Drawer>
            <Drawer
                width={340}
                title="My Profile"
                placement="right"
                closable={false}
                onClose={onClose}
                zIndex={2000}
                visible={visibleProfile}>
                <Descriptions title={admin.data.name}>
                    <Col span={24} style={{ paddingTop: "1em", textAlign: "center" }}>
                        <Avatar
                            src={admin.data.avatarUrl}
                            alt={admin.data.name}
                            size={200}
                        ><UserOutlined /></Avatar>
                    </Col>

                    <Descriptions.Item span={12} label="Email">
                        {admin.data.email}
                    </Descriptions.Item>
                    <Descriptions.Item span={12} label="Vertical">
                        {admin.data.vertical}
                    </Descriptions.Item>

                </Descriptions>
            </Drawer>

            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 10, background: "#022036" }}>
                    <Row justify="center">
                        <Col
                            xs={{ span: 4, offset: 0 }}
                            sm={{ span: 2, offset: 0 }}
                            md={{ span: 2, offset: 0 }}
                            lg={{ span: 1, offset: 0 }}>
                            <MenuUnfoldOutlined
                                onClick={showMenuDrawer}
                                style={{ color: "whitesmoke", fontSize: screen.md ? 40 : 30 }}
                            />
                        </Col>
                        <Col
                            xs={{ span: 16, offset: 0 }}
                            sm={{ span: 10, offset: 8 }}
                            md={{ span: 8, offset: 8 }}
                            lg={{ span: 6, offset: 8 }}>
                            {/* <Typography.Title level={2} style={{ color: "#fefefe", margin: 0, lineHeight: "200%" }}>
                                SSB-Tech Admin <span style={{ fontWeight: "lighter" }}></span>
                            </Typography.Title> */}
                            <LogoComponent></LogoComponent>
                        </Col>
                        {
                            screen.md && <Col
                                xs={{ span: 1, offset: 4 }}
                                sm={{ span: 1, offset: 3 }}
                                md={{ span: 1, offset: 3 }}
                                lg={{ span: 1, offset: 6 }}>
                                <Avatar
                                    size={40}
                                    style={{ cursor: "pointer", float: "right", backgroundColor: "#00152a" }}
                                    icon={<UserOutlined />}
                                    onClick={showProfileDrawer}
                                    src={admin.data.avatarUrl !== undefined ? admin.data.avatarUrl : null}
                                />
                            </Col>
                        }

                        <Col
                            xs={{ span: 4, offset: 0 }}
                            sm={{ span: 1, offset: 1 }}
                            md={{ span: 1, offset: 1 }}
                            lg={{ span: 1, offset: 0 }}>
                            <Popconfirm
                                title="Are you sure you want to log out?"
                                onConfirm={handleLogout}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No">
                                <Avatar
                                    size={40}
                                    style={{ cursor: "pointer", float: "right", backgroundColor: "#00152a" }}
                                    icon={<LogoutOutlined />}
                                />
                            </Popconfirm>
                        </Col>
                    </Row>
                </Header>

                <Content style={{ margin: "20px 16px" }}>
                    <Route exact path='/admin-dashboard'>
                        <Row>
                            <Col xs={{ offset: 2 }} sm={{ offset: 5 }} md={{ offset: 7 }} lg={{ offset: 10 }} xl={{ offset: 9 }}>
                                <Title style={{ textAlign: "center", paddingTop: 20, paddingLeft: 20 }} level={2}>
                                    Welcome to your dashboard
                    </Title>
                            </Col>
                        </Row>

                        <Divider />

                        <Row gutter={24} >
                            <Col
                                xs={{ span: 24, offset: 0 }}
                                sm={{ span: 24, offset: 0 }}
                                md={{ span: 12, offset: 0 }}
                                lg={{ span: 8, offset: 0 }}>
                                <Card hoverable={true} style={{ backgroundColor: "#fffffffa", marginBottom: 24 }} >
                                    <Row gutter={16} justify="center">
                                        <Col span={24}>
                                            <Row justify="center">
                                                <BookOutlined size={128} style={{ fontSize: 128 }} />
                                            </Row>
                                        </Col>
                                        <Divider />
                                        <Col span={24}>
                                            <Row justify="center">
                                                <Title level={3}>
                                                    <Link
                                                        to={`/admin-dashboard/courses`}
                                                        onClick={() => {
                                                            // console.log("here,.,.,.,,.,")
                                                            // dispatch(getParticipants(course._id))
                                                        }}
                                                        style={{ fontSize: "20px" }}>
                                                        Courses
                                          </Link>
                                                </Title>
                                            </Row>
                                        </Col>
                                        {/* <Col span={4}>
                                        <Tag color="#f40606">Live</Tag>
                                    </Col> */}

                                    </Row>
                                </Card>
                            </Col>
                            <Col
                                xs={{ span: 24, offset: 0 }}
                                sm={{ span: 24, offset: 0 }}
                                md={{ span: 12, offset: 0 }}
                                lg={{ span: 8, offset: 0 }}>
                                <Card hoverable={true} style={{ backgroundColor: "#fffffffa", marginBottom: 24 }} >
                                    <Row gutter={16} justify="center">
                                        <Col span={24}>
                                            <Row justify="center">
                                                <SolutionOutlined size={128} style={{ fontSize: 128 }} />
                                            </Row>
                                        </Col>
                                        <Divider />
                                        <Col span={24}>
                                            <Row justify="center">
                                                <Title level={3}>
                                                    <Link
                                                        to={`/admin-dashboard/instructors`}
                                                        onClick={() => {
                                                            // console.log("here,.,.,.,,.,")
                                                            // dispatch(getParticipants(course._id))
                                                        }}
                                                        style={{ fontSize: "20px" }}>
                                                        Instructors
                                          </Link>
                                                </Title>
                                            </Row>
                                        </Col>
                                        {/* <Col span={4}>
                                        <Tag color="#f40606">Live</Tag>
                                    </Col> */}

                                    </Row>
                                </Card>
                            </Col>
                            <Col
                                xs={{ span: 24, offset: 0 }}
                                sm={{ span: 24, offset: 0 }}
                                md={{ span: 12, offset: 0 }}
                                lg={{ span: 8, offset: 0 }}>
                                <Card hoverable={true} style={{ backgroundColor: "#fffffffa", marginBottom: 24 }} >
                                    <Row gutter={16} justify="center">
                                        <Col span={24}>
                                            <Row justify="center">
                                                <FileDoneOutlined style={{ fontSize: 128 }} />
                                            </Row>
                                        </Col>
                                        <Divider />
                                        <Col span={24}>
                                            <Row justify="center">
                                                <Title level={3}>
                                                    <Link
                                                        to={`/admin-dashboard/subjects`}
                                                        onClick={() => {
                                                            // console.log("here,.,.,.,,.,")
                                                            // dispatch(getParticipants(course._id))
                                                        }}
                                                        style={{ fontSize: "20px" }}>
                                                        Subjects
                                          </Link>
                                                </Title>
                                            </Row>
                                        </Col>
                                        {/* <Col span={4}>
                                        <Tag color="#f40606">Live</Tag>
                                    </Col> */}

                                    </Row>
                                </Card>
                            </Col>
                            <Col
                                xs={{ span: 24, offset: 0 }}
                                sm={{ span: 24, offset: 0 }}
                                md={{ span: 12, offset: 0 }}
                                lg={{ span: 8, offset: 0 }}>
                                <Card hoverable={true} style={{ backgroundColor: "#fffffffa", marginBottom: 24 }} >
                                    <Row gutter={16} justify="center">
                                        <Col span={24}>
                                            <Row justify="center">
                                                <UsergroupAddOutlined size={128} style={{ fontSize: 128 }} />
                                            </Row>
                                        </Col>
                                        <Divider />
                                        <Col span={24}>
                                            <Row justify="center">
                                                <Title level={3}>
                                                    <Link
                                                        to={`/admin-dashboard/students`}
                                                        onClick={() => {
                                                            // console.log("here,.,.,.,,.,")
                                                            // dispatch(getParticipants(course._id))
                                                        }}
                                                        style={{ fontSize: "20px" }}>
                                                        Students
                                          </Link>
                                                </Title>
                                            </Row>
                                        </Col>
                                        {/* <Col span={4}>
                                        <Tag color="#f40606">Live</Tag>
                                    </Col> */}

                                    </Row>
                                </Card>
                            </Col>

                            <Col
                                xs={{ span: 24, offset: 0 }}
                                sm={{ span: 24, offset: 0 }}
                                md={{ span: 12, offset: 0 }}
                                lg={{ span: 8, offset: 0 }}>
                                <Card hoverable={true} style={{ backgroundColor: "#fffffffa", marginBottom: 24 }} >
                                    <Row gutter={16} justify="center">
                                        <Col span={24}>
                                            <Row justify="center">
                                                <DeploymentUnitOutlined size={128} style={{ fontSize: 128 }} />
                                            </Row>
                                        </Col>
                                        <Divider />
                                        <Col span={24}>
                                            <Row justify="center">
                                                <Title level={3}>
                                                    <Link
                                                        to={`/admin-dashboard/enrollments`}
                                                        onClick={() => {
                                                            // console.log("here,.,.,.,,.,")
                                                            // dispatch(getParticipants(course._id))
                                                        }}
                                                        style={{ fontSize: "20px" }}>
                                                        Enrollments
                                          </Link>
                                                </Title>
                                            </Row>
                                        </Col>
                                        {/* <Col span={4}>
                                        <Tag color="#f40606">Live</Tag>
                                    </Col> */}

                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                    </Route>


                    {admin.data.courses
                        ? admin.data.courses.map((course) => (
                            <Route key={course._id} path={`/admin-dashboard/courses/course-info`}>
                                <Course courseID={course._id} />
                            </Route>
                        ))
                        : null}

                    {admin.data.instructors
                        ? admin.data.instructors.map((instructor) => (
                            <Route key={instructor._id} path={`/admin-dashboard/instructors/instructor-info`}>
                                <Instructor instructorID={instructor._id} />
                            </Route>
                        ))
                        : null}

                    {admin.data.subjects
                        ? admin.data.subjects.map((subject) => (
                            <Route key={subject._id} path={`/admin-dashboard/subjects/subject-info`}>
                                <Subject subjectID={subject._id} />
                            </Route>
                        ))
                        : null}

                    <Route exact path="/admin-dashboard/students">
                        <Students />
                    </Route>
                    <Route exact path="/admin-dashboard/courses">
                        <Courses />
                    </Route>
                    <Route exact path="/admin-dashboard/instructors">
                        <Instructors />
                    </Route>
                    <Route exact path="/admin-dashboard/subjects">
                        <Subjects />
                    </Route>
                    <Route exact path="/admin-dashboard/enrollments">
                        <Enrollments />
                    </Route>

                </Content>
            </Layout>
        </Layout>
    );
}

export default Structure;
