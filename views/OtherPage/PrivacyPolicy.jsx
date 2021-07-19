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
          <h1 className={classes.title} style={{color:"white"}}> Privacy Policy</h1>
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
          <h2 className={classes.title} style={{color:"black"}}>Privacy Statements</h2>
          <h5 className={classes.description}>
        <h4> <b> SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION? </b><br/></h4>
        When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
      <br/>  When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
      <br/>  Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.

            <br/> <br/>
       <h4> <b> SECTION 2 - CONSENT </b><br/></h4>
       How do you get my consent?
       <br/> When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
       <br/> If we ask for your personal information for a secondaryreason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
       <br/> How do I withdraw my consent?
       <br/>If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at support@ssbready.com 
         <br/> <br/>
         <h4> <b> SECTION 3 - DISCLOSURE </b><br/></h4>
         We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
         <br/> <br/>
         <h4> <b> SECTION 4 - PAYMENT </b><br/></h4>
          We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
         <br/>  Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
         <br/>  PCI-DSS requirements help ensure the secure handling ofcredit card information by our store and its service providers.
         <br/> For more insight, you may also want to read terms and conditions of razorpay on https://razorpay.com
         <br/> <br/>
         <h4> <b> SECTION 5 - THIRD-PARTY SERVICES </b><br/></h4>
         In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.
         <br/> However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
         <br/> For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
         <br/> In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
         <br/> Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed bythis Privacy Policy or our website’s Terms of Service.
         <br/> Links
         <br/> When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.

         <br/> <br/>
         <h4> <b> SECTION 6 - SECURITY </b><br/></h4>
         To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
         <br/> <br/>
         <h4> <b> SECTION 7 - COOKIES </b><br/></h4>
         To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
         <br/> <br/>
         <h4> <b> SECTION 8 - AGE OF CONSENT </b><br/></h4>
         By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site
         <br/> <br/>
         <h4> <b> SECTION 9 - CHANGES TO THIS PRIVACY POLICY </b><br/></h4>
         We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications willtake effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
         <br/> If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
         <br/> <br/><b>QUESTIONS AND CONTACT INFORMATION</b>
         <br/>If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at support@ssbready.com


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
