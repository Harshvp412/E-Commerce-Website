import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/bg2.jpg";
import image2 from "assets/img/bg3.jpg";
import team1 from "assets/img/faces/avatar.jpg";


import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";
import Grid from "antd/lib/card/Grid";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
              <div>
                 
                 <GridContainer justify="center" >
                 <GridItem xs={20} sm={20} md={4}> <img src={team1}  style={{ height: "200px" , marginTop: "50px", marginLeft:"20px"}}alt="..." className={imageClasses} /></GridItem>
                   <GridItem xs={12} sm={12} md={8}>
             
                    <h2 className={classes.title}>Testimonials</h2>
        
                    <GridItem xs={12} sm={12} md={4} className={classes.itemGrid}>
             </GridItem>
                <h5 className={classes.description}>
                   At SSB Ready, we firmly believe in enabling the young generation to not just be better prepared for the recruitment process of Indian Armed Forces, but also to imbibe essentials of character, confidence, integrity and positivity in the face of hardship. We envision to work  towards strengthening India’s forces and groom our patriotic gems to achieve their career goals. 

                    </h5>
                    </GridItem>
                    </GridContainer>
               </div>
                <div>
                 
                 <GridContainer justify="center" >
                 <GridItem xs={20} sm={20} md={4}> <img src={team1}  style={{ height: "200px" , marginTop: "50px", marginLeft:"20px"}}alt="..." className={imageClasses} /></GridItem>
                   <GridItem xs={12} sm={12} md={8}>
             
                    <h2 className={classes.title}>Testimonials</h2>
        
                    <GridItem xs={12} sm={12} md={4} className={classes.itemGrid}>
             </GridItem>
                <h5 className={classes.description}>
                   At SSB Ready, we firmly believe in enabling the young generation to not just be better prepared for the recruitment process of Indian Armed Forces, but also to imbibe essentials of character, confidence, integrity and positivity in the face of hardship. We envision to work  towards strengthening India’s forces and groom our patriotic gems to achieve their career goals. 

                    </h5>
                    </GridItem>
                    </GridContainer>
               </div>
               
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
