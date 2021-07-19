
import React, { useState } from 'react';
import axios from "../../utils/axios";
import { useHistory, Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Form, Input, Row, Col,Button, Layout } from "antd";

import openNotification from "../../utils/openAntdNotification";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

const RegisterPage = () => {

  const [isRegistering, setIsRegistering] = useState(false);
  const history = useHistory();

  const register = async (values) => {
      setIsRegistering(true);
      try {

          const res = await axios.post("/student-dashboard/register",values)
          ;
          setIsRegistering(false);
          console.log(res)
          history.push("/login-page");
      } catch (error) {
          setIsRegistering(false);
          const errMsg = error.response ? error.response.data.msg : error.message;
          console.log("error", error.response);
          openNotification("error", "Error in registering.", errMsg);
      }
  };

      const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
      setTimeout(function() {
       setCardAnimation("");
        }, 700);
      const classes = useStyles();
    return (
      <div>
        <Header
        absolute
        color="transparent"
        brand="SSBcares"
        
         rightLinks={<HeaderLinks />}
        
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
              <Form name="register" onFinish={ register } layout="vertical" scrollToFirstError size="large">
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                    <h6><a href="/login-page" style={{ color: "white" }}> Or Login ! </a></h6>
                  </CardHeader>
  
                  <CardBody>
                 
                  <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your name!",
                                        },
                                    ]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                               <Form.Item
                                    name="phone"
                                    label="Phone Number "
                                    rules={[
                                      {
                                          required: true,
                                          message: "Please input your phone number!",
                                      },
                                      {
                                          type: "string",
                                          message: "Please enter a valid phone number.",
                                      },
                                      {
                                          pattern: new RegExp(/^[0-9][s./0-9]*$/g),
                                          message: "Please enter a valid phone number.",
                                      },
                                      {
                                          max: 10,
                                          message: "Please enter a valid phone number.",
                                      },
                                      {
                                          min: 10,
                                          message: "Please enter a valid phone number.",
                                      },
                                  ]}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                            <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: "email",
                                            message: "The input is not valid E-mail!",
                                        },
                                        {
                                            required: true,
                                            message: "Please input your E-mail!",
                                        },
                                    ]}>
                                    <Input />
                                </Form.Item>
                                
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Password.",
                                        },
                                        {
                                            min: 6,
                                            message: "Password should contain atleast 6 characters.",
                                        },
                                    ]}>
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  <Form.Item>
                            <Button
                                style={{ width: "100%" , color: "purple"  }}
                                type="dark"
                                className="button"
                                htmlType="submit"
                                loading={isRegistering}>
                                Register
                            </Button>
                        </Form.Item>
                  </CardFooter>
                  </Form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      
      </div>
    </div>
  );
}
export default RegisterPage;
