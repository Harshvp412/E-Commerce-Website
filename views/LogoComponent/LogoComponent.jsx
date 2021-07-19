import React from 'react'
import {
    Row,
    Col,
    Card,
    Typography,
    Avatar,
    Grid

} from "antd";
import logo from '../../assets/img/logo/LOGO.png'

const { useBreakpoint } = Grid;
function LogoComponent() {
    const screen = useBreakpoint()
    return (
        <div>
            <Row justify="center">

                <Col span={6}>
                    <Avatar src={logo} size={screen.md ? 50 : 40} >

                    </Avatar>
                </Col>
                <Col span={18}>
                    <Row >
                        <Typography.Title level={screen.md ? 4 : 5} style={{ color: 'white' }}>
                            SSB <br>
                            </br>READY
                </Typography.Title>
                    </Row>
                </Col> </Row>

        </div>
    )
}

export default LogoComponent
