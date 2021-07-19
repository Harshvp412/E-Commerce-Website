import React, { Fragment, useEffect, useRef, useState } from "react";
import { Tabs, Card, Button, Typography, Input, Row, Col, Table, Space, Popconfirm, Switch, Tag, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import Highlighter from 'react-highlight-words';
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined, } from '@ant-design/icons';
import { getStudents } from "../../redux/admin/adminActions";
import { Link, Route } from "react-router-dom";
// import Statistics from "./Statistics";
// import Participant from "./Participant";
// import TeamLeader from "./TeamLeader"
import openNotification from "../../utils/openAntdNotification"
import { CSVLink } from "react-csv"
// import FileUpload from "./FileUpload";
// import Submissions from "./Submissions";
import { useHistory } from "react-router-dom";

const { Paragraph } = Typography;


const Students = (props) => {

    var j = 0
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    // const instituteNameRef = useRef(null)
    // const summitIDRef = useRef(null)
    // const teamNameRef = useRef(null)

    const dispatch = useDispatch()

    const hist = useHistory();

    // const [loading, setLoading] = useState(false)
    // const [loading, setLoading] = useState(false)

    const loading = useSelector(state => state.admin.data.loading)
    const students = useSelector(state => state.admin.data.students)
    console.log(students)


    const [searchState, setSearchState] = useState({
        searchText: '',
        searchedColumn: '',
    })

    useEffect(() => {
        dispatch(getStudents(), null, handleError)
        return () => {

        }
    }, [])

    const getColumnSearchProps = (dataIndex, ref) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={ref}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            return record[dataIndex]
                ? record[dataIndex].toLowerCase().includes(value.toLowerCase())
                : ''
        },
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => ref.current.select(), 100);
            }
        },
        render: text =>
            searchState.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchState.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchState({ searchText: '' });
    };

    // const handleSuccess = () => {
    //     openNotification("success", "The selected student(s) were promoted ", "Check the tab coresponding to next round")
    //     setSelectionState({  selectedIDs: [], // Check here to configure the default column
    //         numOfTeams: 0})

    //         setTimeout(() => {
    //             hist.push(`/`);
    //         }, 2000);
    //         setTimeout(() => {
    //             hist.push(`/admin-p/admin-dashboard/${event._id}`);
    //         }, 2010);
    //     dispatch(getParticipants(event._id));
    // }


    const handleError = (errMsg) => {
        openNotification("error", errMsg)
        // dispatch(getParticipants(event._id));
    }


    return (

        <Fragment >
            {/* <Route key={event._id} exact path={`/admin-p/admin-dashboard/${event._id}`} >

                {
                    console.log(admin.isEvaluator, " admin.isEvaluator")
                } */}

            <Row style={{ padding: 10, paddingTop: 20 }}>
                <Col span={15} >
                    <Title level={3} >

                        Students
                        </Title>
                </Col>

            </Row>
            <Spin
                spinning={false}
            >


                <Table
                    // loading={loading}
                    // rowSelection={{
                    //     type: "checkbox",
                    //     ...rowSelection,

                    // }}
                    dataSource={students}
                    columns={students ? ['name', 'email', 'phone'].map(key => {




                        if (key === "name") {
                            return {
                                title: "Name",
                                dataIndex: "name",
                                key: "name",
                                ...getColumnSearchProps("name", nameRef),
                            }
                        }

                        else if (key === "email") {
                            return {
                                title: "Email",
                                dataIndex: "email",
                                key: "email",
                                ...getColumnSearchProps("email", emailRef),
                            }
                        }
                        else if (key === "phone") {
                            return {
                                title: "Phone",
                                dataIndex: "phone",
                                key: "phone",
                                ...getColumnSearchProps("phone", phoneRef),
                            }
                        }
                        // else if (key === "instituteName") {
                        //     return {
                        //         title: "Institute Name",
                        //         dataIndex: "instituteName",
                        //         key: "instituteName",
                        //         ...getColumnSearchProps("instituteName", instituteNameRef),
                        //     }
                        // }
                        // else if (key === "summitID") {
                        //     return {
                        //         title: "E-Summit ID",
                        //         dataIndex: "summitID",
                        //         key: "summitID",
                        //         ...getColumnSearchProps("summitID", summitIDRef),
                        //     }
                        // }
                        else return null
                    }) : null}
                    // expandable={{
                    //     expandedRowRender: (teamLeader => {
                    //         if (admin.isEvaluator) {
                    //             return <Submissions submissions={teamLeader.submissions} event={event} />
                    //         }
                    //         else {
                    //             return <TeamLeader teamLeader={teamLeader} event={event} />
                    //         }

                    //     }
                    //     ),
                    // }}
                    size="default" />
                <div style={{ marginBottom: 16 }}>

                    <Row justify="center">
                        <Col offset={0}>
                            <Row>
                                <Col >
                                    {
                                        students ?
                                            (<Button type="primary"  >
                                                <CSVLink
                                                    filename={`SSBReady_Students_data.csv`}
                                                    data={
                                                        students.map(student => {
                                                            j++



                                                            return {
                                                                name: student.name, email: student.email,
                                                                phone: student.phone,
                                                                key: String(j)
                                                            }

                                                        })
                                                    }
                                                    className="btn btn-primary"
                                                >
                                                    Download data as CSV
            </CSVLink>
                                            </Button>) : null
                                    }

                                </Col>
                            </Row>
                        </Col>
                    </Row>



                </div>

            </Spin >
            {/* </Route> */}


        </Fragment >

    );

}
export default Students
