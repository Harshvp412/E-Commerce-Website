import React, { useState } from 'react';
// @material-ui/core components
import axios from "../../utils/axios";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Form, Input, Button, Row, Col, Layout } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import openNotification from "../../utils/openAntdNotification";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const history = useHistory();

  const logIn = async (values) => {
      setIsLoggingIn(true);
      try {
          // eslint-disable-next-line no-unused-vars
          const res = await axios({
              method: "post",
              url: "/student-dashboard/login",
              data: values,
              withCredentials: true,
          });
          setIsLoggingIn(false);
          console.log(res, "res")
          localStorage.setItem("user", JSON.stringify(res.data.data))
          history.push("/student-dashboard");
      } catch (error) {
          setIsLoggingIn(false);
          console.log("error", error);
          const errMsg = error.response ? error.response.data.msg : error.message;
          openNotification("error", errMsg);
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
        brand="SSBready"
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
              <Form name="login" onFinish={logIn} layout="vertical" scrollToFirstError size="large">
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <h6><a href="/register-page" style={{ color: "white" }}> Or Register ! </a></h6>
                  
                  </CardHeader>
                  <CardBody>
                  <Form.Item
                            name="email"
                            label="E-Mail"
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
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password "
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password.",
                                },
                            ]}
                           
                           >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  <Form.Item>
                  <Button
                                style={{ width: "100%" , color: "purple"  }}
                                type="dark"
                                className="button"
                                htmlType="submit"
                                loading={isLoggingIn}>
                                 Get Started
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
export default LoginPage;
