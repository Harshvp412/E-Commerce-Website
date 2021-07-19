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

import team1 from "assets/img/faces/1.png";
import team2 from "assets/img/faces/1.png";
import team3 from "assets/img/faces/1.png";

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
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <GridItem xs={30} sm={30} md={12} className={classes.itemGrid}>
                <img src={team1} alt="..."  className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                } />
              </GridItem>
              <h4 className={classes.cardTitle}>
             <b> Towards a safe and pollution free Indian roads : The story of Iris controls</b>
                <br />

              </h4>
              <CardBody>
                <p className={classes.description}>
                I entered CCD and looked around. He was sitting in a quiet corner, with a book in his hand. I went and said hi. He smiled and asked me to sit. I had gotten used to these informal interviews. Having been in E-cell since freshie year, I have been able to meet and interview a diverse set of people. It was always wonderful talking to people and getting to know the various facets of entrepreneurship. Has travelled widely in India and abroad.........

                </p>
              </CardBody>
            <CardFooter className={classes.justifyCenter}>
            <Button
              color="rose"
              size="lg"
              href="/blog1"
             
            >
              View More
            </Button>
              </CardFooter> 
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card >
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                <img src={team2} alt="..."  className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                } />
              </GridItem>
              <h4 className={classes.cardTitle}>
              <b> Towards a safe and pollution free Indian roads : The story of Iris controls</b>
              </h4>
              <CardBody>
                <p className={classes.description}>
                I entered CCD and looked around. He was sitting in a quiet corner, with a book in his hand. I went and said hi. He smiled and asked me to sit. I had gotten used to these informal interviews. Having been in E-cell since freshie year, I have been able to meet and interview a diverse set of people. It was always wonderful talking to people and getting to know the various facets of entrepreneurship. Has travelled widely in India and abroad.........

                </p>
              </CardBody>
            <CardFooter className={classes.justifyCenter}>
          <Button
              color="rose"
              size="lg"
              href="/blog1"
             
            >
              View More
            </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card >
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                <img src={team3} alt="..."  className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                } />
              </GridItem>
              <h4 className={classes.cardTitle}>
              <b> Towards a safe and pollution free Indian roads : The story of Iris controls</b>
              </h4>
              <CardBody>
                <p className={classes.description}>
                I entered CCD and looked around. He was sitting in a quiet corner, with a book in his hand. I went and said hi. He smiled and asked me to sit. I had gotten used to these informal interviews. Having been in E-cell since freshie year, I have been able to meet and interview a diverse set of people. It was always wonderful talking to people and getting to know the various facets of entrepreneurship. Has travelled widely in India and abroad.........
                </p>
              </CardBody>
            <CardFooter className={classes.justifyCenter}>
          <Button
              color="rose"
              size="lg"
              href="/blog1"
             
            >
              View More
            </Button>
              </CardFooter> 
            </Card>
          </GridItem>
          <GridItem>

           
            </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
