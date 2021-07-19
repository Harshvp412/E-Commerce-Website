import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/mehrotra.png";
import team2 from "assets/img/faces/pandey.png";
import team3 from "assets/img/faces/tewari.png";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Our top Instructors</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..."  className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                } />
              </GridItem>
              <h4 className={classes.cardTitle}>
               Pankaj Mehrotra
                <br />
                <small className={classes.smallTitle}>Colonel</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                Veteran with 38-years long illustrious stint with the Indian Army. He is a UP Sainik School Alumni from 1977 batch. He has unparalleled experience of serving as an interviewing officer at multiple Selection Boards. Over the course of 8 years, he has tested over 20,000 candidates in stage 1 of SSB and interviewed over 6,000 candidates in stage 2. A widely respected trainer at several institutes is willing to guide you for a personal one-to-one interview experience, exactly how you would witness during your SSB. 

                </p>
              </CardBody>
            {/*   <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..."  className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                } />
              </GridItem>
              <h4 className={classes.cardTitle}>
              Rakesh Pandey 

                <br />
                <small className={classes.smallTitle}>Commander </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                
                  Highly accomplished Naval Officer with 23 years of specialized experience in Communication & Electronic warfare, Submarines and as Group Testing Officer (GTO) at SSB.  Provides best training to candidates aspiring to be officers in Indian Armed Forces. Successfully contributed the last 8 years at Corporates as Head Admin.
                  Served onboard ships and submarines. Proud to have commissioned crew Sindhukirti 1989 at Riga/ USSR. Took premature retirement in Oct 2007. Has travelled widely in India and abroad.

                </p>
              </CardBody>
           {/*   <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>*/}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..."  className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                } />
              </GridItem>
              <h4 className={classes.cardTitle}>
               Mukesh Tewari
                <br />
                <small className={classes.smallTitle}>Wing Commander(Retd).</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                Having served in the Indian Air Force for over 25 years, Wing Cmdr Tewari was commissioned in the Flying Branch (fighters). He is also a trained psychologist from DIPR.He has served as expert senior psychologist for three tenures  at AFSB Dehradun, Varanasi. He has deep insights into the process of psychology tests and wealth of knowledge material pertaining to PPDT, TAT, WAT, SRT, SD, Group Discussions. 
                </p>
              </CardBody>
            {/*  <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter> */}
            </Card>
          </GridItem>
          <GridItem>

            <Button
              color="primary"
              size="lg"
              href="/courses"
             
            >
              View More
            </Button>
            </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
