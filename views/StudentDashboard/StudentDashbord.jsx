import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
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
  Select,
  Button,
} from 'antd';
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
  CalendarOutlined,
} from '@ant-design/icons';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import axios from '../../utils/axios';

import StudentMenu from './Menu';
import Enrollments from './Enrollments';

import './Dashboard.css';
import openNotification from '../../utils/openAntdNotification';
import Enrollment from './Enrollment';
import LogoComponent from 'views/LogoComponent/LogoComponent';
import { Option } from 'antd/lib/mentions';

const { Content, Header } = Layout;
const { Title } = Typography;

const StudentDashboard = () => {
  const screen = useBreakpoint();

  const [headerHeight, setHeaderHeight] = useState(null);
  const [menuVisibile, setMenuVisibility] = useState(false);

  useLayoutEffect(() => {
    if (screen.md) {
      setMenuVisibility(true);
    } else {
      setMenuVisibility(false);
    }
  }, [screen.md]);

  // const handleLogout = async () => {
  // 	try {
  // 		const res = await axios.get("/esummit-user/logout");
  // 		if (res.data.success) {
  // 			window.location.href = SERVER_URL;
  // 		}
  // 	} catch (error) {
  // 		console.log(error);
  // 		openNotification("error", "Could not log out.", error.message);
  // 	}
  // };

  const [enrollments, setEnrollments] = useState([]);
  const [student, setStudent] = useState({});

  useEffect(() => {
    setIsFetching(true);
    getEnrollments();
    setIsFetching(false);

    return () => { };
  }, []);

  const studentID = '60638f1736973647084247ee';

  const getEnrollments = useCallback(async () => {
    const res = await axios.post('/student-dashboard/enrollments', {
      studentID,
    });
    console.log(res.data.data.enrollments);
    setEnrollments(res.data.data.enrollments);
    setStudent(res.data.data.student)
  }, []);

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let height = document.getElementsByTagName('header')[0].clientHeight;
    setHeaderHeight(height);
  }, [headerHeight]);

  function cancel(e) {
    // console.log(e);
    message.error('Click on No');
  }
  const history = useHistory();
  // const dispatch = useDispatch();
  // const student = useSelector((state) => state.student);

  const [visibleMenu, setVisibleMenu] = useState(false);

  const showMenuDrawer = () => {
    setVisibleMenu(true);
  };
  const onMenuClose = () => {
    setVisibleMenu(false);
  };

  const [visibleProfile, setVisibleProfile] = useState(false);
  const [dates, setDates] = useState([]);
  // const [visibleAvatarUpdater, setVisibleAvatarUpdater] = useState(false);

  const showProfileDrawer = () => {
    setVisibleProfile(true);
    // setVisibleAvatarUpdater(false);
  };
  const onClose = () => {
    setVisibleProfile(false);
  };
  const handleLogout = async () => {

    try {

      const res = await axios.get('/student-dashboard/logout')
      handleLogoutSuccess()

    }
    catch (err) {
      let error = err.response ? err.response.data : err;
      let errorMsg = error.data ? error.data.msg : error.msg;
      // dispatch(addCourseFailure(error));
      handleError(errorMsg)

    }

  };

  const handleLogoutSuccess = () => {
    localStorage.removeItem('studentData');
    history.push('/');
  };
  const handleError = (errorMsg) => {
    openNotification('error', 'Error in logging out', errorMsg);
  };
  // dispatch(logoutAdmin(handleSuccess, handleError));



  const handleDateSubmit = async (enrollmentID) => {
    const dateToBeSet = dates.filter(
      (dateObj) => dateObj.enrollmentID === enrollmentID
    )[0];
    console.log(dates, dateToBeSet, 'h');
    if (dateToBeSet) {
      try {
        setLoading(true);
        const res = await axios.post(
          '/student-dashboard/update-class-date',
          dateToBeSet
        );
        getEnrollments();
        setLoading(false);
        console.log(res);
        openNotification('success', 'Date set successfully');
      } catch (err) {
        let error = err.response ? err.response.data : err;
        let errorMsg = error.data ? error.data.msg : error.msg;
        // dispatch(addCourseFailure(error));
        openNotification('error', errorMsg);
      }
    } else {
    }
  };

  function onDateChange(enrollmentID, date) {
    console.log(enrollmentID);
    if (
      dates.filter((dateObj) => dateObj.enrollmentID === enrollmentID).length
    ) {
      const dateObj = dates.filter(
        (dateObj) => dateObj.enrollmentID === enrollmentID
      )[0];

      setDates([
        ...dates.filter((dateObj) => dateObj.enrollmentID !== enrollmentID),
        { ...dateObj, date: date },
      ]);
    } else {
      setDates([...dates, { enrollmentID, date }]);
    }

    console.log(dates);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Drawer
          width={300}
          placement="left"
          closable={false}
          onClose={onMenuClose}
          visible={visibleMenu}
          drawerStyle={{ background: 'FireBrick' }}
        >
          <Menu
            theme="dark"
            // defaultSelectedKeys={['1']}
            mode="inline"
            inlineIndent="30"
            style={{ background: 'FireBrick' }}
          >
            <Menu.Item key="1" onClick={showProfileDrawer} >
              <Avatar
                style={{ backgroundColor: '#44b4ca' }}
                icon={<UserOutlined />}
                src={student.avatarUrl !== undefined ? student.avatarUrl : null}
              />
              <Typography.Text
                strong
                style={{ paddingLeft: '20px', color: 'white' }}
              >
                {student.name}
              </Typography.Text>
            </Menu.Item>
            <Menu.Item
              key="2"
              title="My Profile"
              icon={<UserOutlined />}
              onClick={showProfileDrawer}
            >
              My Profile
            </Menu.Item>
            <Menu.Item
              key="3"
              title="My Profile"
              icon={<HomeOutlined />}
              onClick={onMenuClose}
            >
              <Link to="/student-dashboard">Home</Link>
            </Menu.Item>
            {/* <Menu.Item
              key="4"
              title="My Profile"
              icon={<BookOutlined />}
              onClick={onMenuClose}
            >
              <Link to="/student-dashboard/enrollments">Enrollments</Link>
            </Menu.Item>
            <Menu.Item
              key="5"
              title="My Profile"
              icon={<SolutionOutlined />}
              onClick={onMenuClose}
            >
              <Link to="/student-dashboard/instructors">Instructors</Link>
            </Menu.Item>
            <Menu.Item
              key="6"
              title="My Profile"
              icon={<FileDoneOutlined />}
              onClick={onMenuClose}
            >
              <Link to="/student-dashboard/subjects">Subjects</Link>
            </Menu.Item>
            <Menu.Item
              key="7"
              title="My Profile"
              icon={<UsergroupAddOutlined />}
              onClick={onMenuClose}
            >
              <Link to="/student-dashboard/students">Students</Link>
            </Menu.Item>
            <Menu.Item
              key="8"
              title="My Profile"
              icon={<DeploymentUnitOutlined />}
              onClick={onMenuClose}
            >
              <Link to="/student-dashboard/enrollments">Enrollments</Link>
            </Menu.Item> */}
            <Menu.Item key="7" title="Logout" icon={<LogoutOutlined />}>
              <Popconfirm
                title="Are you sure you want to log out?"
                onConfirm={handleLogout}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
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
          visible={visibleProfile}
        >
          <Descriptions title={student.name}>
            <Col span={24} style={{ paddingTop: '1em', textAlign: 'center' }}>
              <Avatar src={student.avatarUrl} alt={student.name} size={200}>
                <UserOutlined />
              </Avatar>
            </Col>

            <Descriptions.Item span={12} label="Email">
              {student.email}
            </Descriptions.Item>
            <Descriptions.Item span={12} label="Phone">
              {student.phone}
            </Descriptions.Item>
          </Descriptions>
        </Drawer>

        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 10, background: 'FireBrick' }}
          >
            <Row justify="center">
              <Col
                xs={{ span: 4, offset: 0 }}
                sm={{ span: 2, offset: 0 }}
                md={{ span: 2, offset: 0 }}
                lg={{ span: 1, offset: 0 }}
              >
                <MenuUnfoldOutlined
                  onClick={showMenuDrawer}
                  style={{ color: 'whitesmoke', fontSize: screen.md ? 40 : 30 }}
                />
              </Col>
              <Col
                xs={{ span: 16, offset: 0 }}
                sm={{ span: 10, offset: 8 }}
                md={{ span: 8, offset: 8 }}
                lg={{ span: 6, offset: 8 }}
              >
                {/* <Typography.Title level={2} style={{ color: "#fefefe", margin: 0, lineHeight: "200%" }}>
                                SSB-Tech Admin <span style={{ fontWeight: "lighter" }}></span>
                            </Typography.Title> */}
                <LogoComponent></LogoComponent>
              </Col>
              {screen.md && (
                <Col
                  xs={{ span: 1, offset: 4 }}
                  sm={{ span: 1, offset: 3 }}
                  md={{ span: 1, offset: 3 }}
                  lg={{ span: 1, offset: 6 }}
                >
                  <Avatar
                    size={40}
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      backgroundColor: '#00152a',
                    }}
                    icon={<UserOutlined />}
                    onClick={showProfileDrawer}
                    src={
                      student.avatarUrl !== undefined ? student.avatarUrl : null
                    }
                  />
                </Col>
              )}

              <Col
                xs={{ span: 4, offset: 0 }}
                sm={{ span: 1, offset: 1 }}
                md={{ span: 1, offset: 1 }}
                lg={{ span: 1, offset: 0 }}
              >
                <Popconfirm
                  title="Are you sure you want to log out?"
                  onConfirm={handleLogout}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Avatar
                    size={40}
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      backgroundColor: '#00152a',
                    }}
                    icon={<LogoutOutlined />}
                  />
                </Popconfirm>
              </Col>
            </Row>
          </Header>

          <Content style={{ margin: '20px 16px' }}>
            <Route exact path="/student-dashboard">
              <Row>
                <Col
                  xs={{ offset: 2 }}
                  sm={{ offset: 5 }}
                  md={{ offset: 7 }}
                  lg={{ offset: 10 }}
                  xl={{ offset: 9 }}
                >
                  <Title
                    style={{
                      textAlign: 'center',
                      paddingTop: 20,
                      paddingLeft: 20,
                    }}
                    level={2}
                  >
                    Welcome to your dashboard
                  </Title>
                </Col>
              </Row>

              <Divider />

              <Row gutter={24}>
                {enrollments
                  ? enrollments.map((enrollment) => (
                    <Col
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 24, offset: 0 }}
                      md={{ span: 12, offset: 0 }}
                      lg={{ span: 8, offset: 0 }}
                    >
                      <Card
                        hoverable={true}
                        style={{ backgroundColor: '#fffffffa' }}
                      >
                        <Row gutter={16}>
                          <Col span={16}>
                            <Row>
                              <Title level={3}>
                                {enrollment.course.title}
                              </Title>
                            </Row>
                            <Row>
                              <Tag color="#87d068">
                                {enrollment.course.subject.name}
                              </Tag>
                            </Row>
                          </Col>
                          <Col span={8}>
                            <a
                              // to={enrollment.course.instructor.classLink}

                              style={{ fontSize: '20px' }}
                              href={enrollment.course.instructor.classLink}
                            >
                              {' '}
                                Class Link
                              </a>
                          </Col>
                          <Col span={24}>
                            <Link
                              // to={`/student-dashboard/${enrollment._id}`}
                              onClick={() => {
                                // console.log("here,.,.,.,,.,")
                                // dispatch(getParticipants(enrollment._id))
                              }}
                              style={{ fontSize: '20px' }}
                            >
                              <Typography.Text
                                style={{
                                  color: 'blue',
                                  // fontWeight: ,
                                }}
                              >
                                {enrollment.course.instructor.name}
                              </Typography.Text>
                            </Link>
                          </Col>
                          <Col span={24}>
                            {enrollment.date ? (
                              <Typography.Text>
                                <CalendarOutlined />{' '}
                                {enrollment.date.split('G')[0]}
                              </Typography.Text>
                            ) : (
                              <Row>
                                <Col>
                                  <Row>
                                    <Typography.Text level={5}>
                                      Please Select your class date
                                      </Typography.Text>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <Select
                                        allowClear
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Select an Date"
                                        optionFilterProp="children"
                                        onChange={(value) =>
                                          onDateChange(enrollment._id, value)
                                        }
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                          option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                        }
                                      >
                                        {enrollment.course.availableDates &&
                                          enrollment.course.availableDates.map(
                                            (date) => (
                                              <Option value={date}>
                                                {date}
                                              </Option>
                                            )
                                          )}
                                        {/* <Option value="jack">Jack</Option>
               <Option value="lucy">Lucy</Option>
               <Option value="tom">Tom</Option> */}
                                      </Select>
                                    </Col>
                                    <Col>
                                      <Popconfirm
                                        title="Are you sure you want to save the date. This action can't be undone"
                                        onConfirm={() =>
                                          handleDateSubmit(enrollment._id)
                                        }
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                      >
                                        <Button type="primary">Save</Button>
                                      </Popconfirm>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            )}
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))
                  : null}
              </Row>
            </Route>

            {/* {student.enrollments
                        ? student.enrollments.map((enrollment) => (
                            <Route key={enrollment._id} path={`/student-dashboard/enrollments/enrollment-info`}>
                                <Enrollment enrollmentID={enrollment._id} />
                            </Route>
                        ))
                        : null}

                    {student.instructors
                        ? student.instructors.map((instructor) => (
                            <Route key={instructor._id} path={`/student-dashboard/instructors/instructor-info`}>
                                <Instructor instructorID={instructor._id} />
                            </Route>
                        ))
                        : null}

                    {student.subjects
                        ? student.subjects.map((subject) => (
                            <Route key={subject._id} path={`/student-dashboard/subjects/subject-info`}>
                                <Subject subjectID={subject._id} />
                            </Route>
                        ))
                        : null}

                    <Route exact path="/student-dashboard/students">
                        <Students />
                    </Route>
                    <Route exact path="/student-dashboard/enrollments">
                        <Enrollments />
                    </Route>
                    <Route exact path="/student-dashboard/instructors">
                        <Instructors />
                    </Route>
                    <Route exact path="/student-dashboard/subjects">
                        <Subjects />
                    </Route>
                    <Route exact path="/student-dashboard/enrollments">
                        <Enrollments />
                    </Route> */}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default StudentDashboard;
