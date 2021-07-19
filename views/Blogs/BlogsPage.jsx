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
import BlogsSection from './BlogsSection.js';
import SectionCarousel from '../Components/Sections/SectionCarousel.js';

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
        <GridItem xs={20} sm={20} md={3}>
          <h1 className={classes.title} style={{color:"white"}}> Blogs</h1>
        </GridItem>
      </GridContainer>
      </div>
      </div>
        </Parallax>
     
        <div className={classNames(classes.main)}>
        <div className={classNames(classes.main, classes.mainRaised)}>
    
          <BlogsSection />
          <SectionCarousel />
        </div>

        
      </div> 
      <Footer  />
    </div>
  );
}
