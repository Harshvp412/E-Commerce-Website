import React, { useCallback, useEffect, useState } from "react";
import { Typography, Row, Col, Card, Divider, Button, Tag, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getSubjects, addSubject } from "../../redux/admin/adminActions";
import openNotification from "../../utils/openAntdNotification"
import axios from "../../utils/axios";


function AddSubjectModal({ handleCancel }) {

    const hist = useHistory()


    const dispatch = useDispatch()

    const handleSuccess = () => {
        // hist.go(0)
        dispatch(getSubjects(), handleSuccess, handleError)
        handleCancel()
        openNotification("success", "Subject added successfully ",)
    }

    const handleError = (errMsg) => {

        openNotification("error", errMsg)
    }

    const handleSubmit = useCallback(
        (subjectInfo) => {
            dispatch(addSubject(subjectInfo, handleSuccess, handleError))
        },
        [],
    )
    return (

        <Form
            // form={form}
            onFinish={(values) => handleSubmit(values)}
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
            < Form.Item label="Name" name="name" required tooltip="This is a required field" >
                <Input placeholder="Subject Name" />
            </Form.Item >
            <Form.Item name="description"
                label="Description"
                required
                tooltip={{
                    title: 'Tooltip with customize icon',
                    // icon: <InfoCircleOutlined />,
                }}
            >
                <Input.TextArea placeholder="Subject Description" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" >Submit</Button>
            </Form.Item>
        </Form >

    )
}

export default AddSubjectModal
