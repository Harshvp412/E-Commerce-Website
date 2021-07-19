import React, { useCallback, useEffect, useState } from "react";
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Row, Col, Card, Divider, Button, Tag, Form, Input, Select, InputNumber, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getSubjects, getInstructors, addCourse, getCourses } from "../../redux/admin/adminActions";
import openNotification from "../../utils/openAntdNotification"
import axios from "../../utils/axios";
import Text from "antd/lib/typography/Text";



function AddCourseModal({ handleCancel }) {

    const hist = useHistory()
    const dispatch = useDispatch()

    const handleSuccess = () => {
        hist.push('/admin-dashboard/courses')
        dispatch(getCourses(), handleSuccess, handleError)
        handleCancel()
        openNotification("success", "Course added successfully ",)

    }

    const handleError = (errMsg) => {
        openNotification("error", errMsg)
    }

    const handleSubmit = useCallback(
        async (courseInfo) => {
            dispatch(addCourse(courseInfo, handleSuccess, handleError))
        },
        [],
    )

    // const [requiredMark, setRequiredMarkType] = useState('optional');
    const [form] = Form.useForm();

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    // function disabledDateTime() {
    //     return {
    //         disabledHours: () => range(0, 24).splice(4, 20),
    //         disabledMinutes: () => range(30, 60),
    //         disabledSeconds: () => [55, 56],
    //     };
    // }

    // function disabledRangeTime(_, type) {
    //     if (type === 'start') {
    //         return {
    //             disabledHours: () => range(0, 60).splice(4, 20),
    //             disabledMinutes: () => range(30, 60),
    //             disabledSeconds: () => [55, 56],
    //         };
    //     }
    //     return {
    //         disabledHours: () => range(0, 60).splice(20, 4),
    //         disabledMinutes: () => range(0, 31),
    //         disabledSeconds: () => [55, 56],
    //     };
    // }



    const subjects = useSelector((state) => state.admin.data.subjects);
    const instructors = useSelector((state) => state.admin.data.instructors);



    const { Option } = Select;



    useEffect(() => {
        dispatch(getSubjects(), handleSuccess, handleError)
        dispatch(getInstructors(), handleSuccess, handleError)
        return () => {

        }
    }, [])

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };

    const DynamicFieldSet = () => {
        const onFinish = values => {
            console.log('Received values of form:', values);
        }
    }





    function onChange(value, fieldName) {
        const fname = fieldName;
        const fvalue = value;
        form.setFieldsValue({
            [fname]: fvalue

        })
        console.log(`selected ${value}`);
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

        <Form
            form={form}
            onFinish={(values) => {

                form.validateFields(['title'])
                console.log(values, form)
                handleSubmit(values)
            }}
            layout="vertical"
        // initialValues={{
        //     requiredMarkValue: requiredMark,
        // }}
        // onValuesChange={onRequiredTypeChange}s
        // requiredMark={requiredMark}


        >
            {/* <Form.Item label="Required Mark" name="requiredMarkValue">
                <Radio.Group>
                    <Radio.Button value="optional">Optional</Radio.Button>
                    <Radio.Button value>Required</Radio.Button>
                    <Radio.Button value={false}>Hidden</Radio.Button>
                </Radio.Group>
            </Form.Item> */}



            < Form.Item label="Title" name="title" rules={[
                {
                    required: true,
                    message: 'Please input title',
                },
            ]} tooltip="This is a required field" >
                <Input placeholder="Course Title" />
            </Form.Item >
            < Form.Item label="Subject" name="subject" rules={[
                {
                    required: true,
                    message: 'Please input Subject',
                },
            ]} tooltip="This is a required field"  >
                <Select
                    allowClear
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a Subject"
                    optionFilterProp="children"
                    onChange={(value) => onChange(value, "subject")}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >

                    {
                        subjects && subjects.map(subject => {

                            console.log(subject._id)
                            return <Option value={subject._id}>{subject.name}</Option>
                        }

                        )
                    }
                    {/* <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option> */}
                </Select>,
            </Form.Item >

            < Form.Item label="Instructor" name="instructor" rules={[
                {
                    required: true,
                    message: 'Please input instructor',
                },
            ]} tooltip="This is a required field" >
                <Select
                    allowClear
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select an Instructor"
                    optionFilterProp="children"
                    onChange={(value) => onChange(value, "instructor")}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >

                    {
                        instructors && instructors.map(instructor =>
                            <Option value={instructor._id}>{instructor.name}</Option>
                        )
                    }
                    {/* <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option> */}
                </Select>,
            </Form.Item >
            <Form.Item name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please input description',
                    },
                ]}
                tooltip={{
                    title: 'Tooltip with customize icon',
                    // icon: <InfoCircleOutlined />,
                }}
            >
                <Input.TextArea placeholder="Course Description" />
            </Form.Item>

            <Form.Item name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        message: 'Please input price',
                    },
                ]}
                tooltip={{
                    title: 'Tooltip with customize icon',
                    // icon: <InfoCircleOutlined />,
                }}
            >
                <InputNumber placeholder={300} />

            </Form.Item>

            {/* <Form.Item name="availableDates"
                label="Available Dates"
                required
                tooltip={{
                    title: 'Tooltip with customize icon',
                    // icon: <InfoCircleOutlined />,
                }}
            >
                <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                    showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                />
            </Form.Item> */}
            <Text>Available Dates</Text>
            <Form.List
                name="availableDates"
            // label={'Available Dates'}
            // rules={[
            //     {
            //         validator: async (_, names) => {
            //             if (!names || names.length < 2) {
            //                 return Promise.reject(new Error('At least 2 passengers'));
            //             }
            //         },
            //     },
            // ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(formItemLayout)}
                                // label={index === 0 ? 'Available Dates' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            // whitespace: true,
                                            message: "Please input a date or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm"
                                        disabledDate={disabledDate}
                                        // disabledTime={disabledDateTime}
                                        showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                                    />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Add Date
              </Button>
                            {/* <Button
                                type="dashed"
                                onClick={() => {
                                    add('The head item', 0);
                                }}
                                style={{ width: '60%', marginTop: '20px' }}
                                icon={<PlusOutlined />}
                            >
                                Add field at head
              </Button> */}
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>



            {/* <Form.Item name="description"
                label="Description"
                required
                tooltip={{
                    title: 'Tooltip with customize icon',
                    // icon: <InfoCircleOutlined />,
                }}
            >
                <Input.TextArea placeholder="Course Description" />
            </Form.Item> */}
            <Form.Item>
                <Button type="primary" htmlType="submit" >Submit</Button>
            </Form.Item>
        </Form >

    )
}

export default AddCourseModal
