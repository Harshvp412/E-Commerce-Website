import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="SSBready"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
      <div className={classes.container}>
        <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={20} sm={20} md={5}>
          <h1 className={classes.title} style={{color:"white"}}> Refund Policy</h1>
        </GridItem>
      </GridContainer>
      </div>
      </div>
        </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
        <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={30} sm={30} md={7}>
          <h2 className={classes.title} style={{color:"black"}}>Cancellations And Refund Policy</h2>
          <h5 className={classes.description}>
        <h4> <b> Cancellations: </b><br/></h4>
          As a general rule, all sales made on SSB Ready are final and you shall not be entitled to cancel your order once you have received confirmation of the same. SSB Ready reserves the sole right to cancel any order as per our discretion in case (i) we are unable to deliver the order in a satisfactory manner and/ or (ii) the user tries to take advantage of the system which violates the Terms of Use. SSB Ready will ensure that any communication of cancellation of an order or any applicable refund will be made within a reasonable period of time.
            <br/> <br/>
       <h4> <b> Refunds: </b><br/></h4>
         You shall be entitled to a refund only if SSB Ready is unable to deliver your order. For refund requests please email to support@ssbready.com within 1 week of the date of purchase. All refunds will be processed on a prorated basis, depending on the service already delivered by SSB Ready. Refunds will be done within seven working days of finalization of the claim
         <br/> <br/>
          </h5>
        </GridItem>
      </GridContainer>
      <div>
      
       </div>
     </div>
         
        </div>
      </div>
      <Footer />
    </div>
  );
}
