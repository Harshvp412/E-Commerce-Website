import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Parallax from 'components/Parallax/Parallax.js';
// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.js';
import AboutUsSection from './Sections/AboutUsSection.js';
import InstructorSection from './Sections/InstructorSection.js';
import YoutubeBackground from './Sections/YoutubeSection.js';
import SectionBasics from './Sections/SectionBasics.js';
import SectionNavbars from './Sections/SectionNavbars.js';
import SectionTabs from './Sections/SectionTabs.js';
import SectionPills from './Sections/SectionPills.js';
import SectionNotifications from './Sections/SectionNotifications.js';
import SectionTypography from './Sections/SectionTypography.js';
import SectionJavascript from './Sections/SectionJavascript.js';
import SectionCarousel from './Sections/SectionCarousel.js';
import Testimonials from './Sections/Testimonials.js';
import SectionCompletedExamples from './Sections/SectionCompletedExamples.js';
import SectionLogin from './Sections/SectionLogin.js';
import SectionExamples from './Sections/SectionExamples.js';
import SectionDownload from './Sections/SectionDownload.js';

import styles from 'assets/jss/material-kit-react/views/components.js';

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="SSBready"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg.gif")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>SSBready</h1>
                <h3 className={classes.subtitle}>
                  A perfect partform for your SSB preparation
                </h3>
              </div>
              <GridItem xs={12} sm={8} md={6}>
                <Button
                  color="rose"
                  size="lg"
                  href="/login-page"
                  target="_blank"
                >
                  Login
                </Button>
                <Button
                  color="rose"
                  size="lg"
                  href="/register-page"
                  target="_blank"
                >
                  Register
                </Button>
              </GridItem>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main)}>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <AboutUsSection />
          <InstructorSection />
        </div>
        {/* <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        
        <SectionCompletedExamples />
       <SectionLogin /> 
        <SectionExamples />
        <SectionDownload />*/}

        <SectionCarousel />
        <Testimonials />
         {/*<GridContainer justify="center">
          <GridItem xs={15} sm={12} md={5}>
           <YoutubeBackground />
          </GridItem>
        </GridContainer> */}
      </div> 
      <Footer  />
    </div>
  );
}
