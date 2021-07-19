/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import InfoArea from "components/InfoArea/InfoArea.js";


// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import Call from "@material-ui/icons/Call";

import PeopleIcon from '@material-ui/icons/People';

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses} >
     <div className={classes.section} > 
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Contact Us</h2>
          <h5 className={classes.description}>
          SSB Ready is a pioneer in technology enabled complete solution for SSB preparation and  one among the foremost choices for candidates. Having served many successful candidates, we are a team of dedicated and experienced faculty with vast experience in specialized tracks of psychology, physical training and personality assessment.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="SSBready"
              icon={Chat}
              iconColor="info"
              vertical
            />
         <GridItem xs={20} sm={20} md={14}> 
         <a href="/terms-and-conditions"><h5 style={{ color: "blue" }}><b>Terms And Conditions</b> </h5> </a>         
         <a href="/privacy-policy"><h5 style={{ color: "blue" }}><b>Privacy Policy </b> </h5></a>  
         <a href="/refund-policy"><h5 style={{ color: "blue" }}><b>Refund Policy </b> </h5></a>  
        </GridItem>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Contact Us"
              
              icon={Call}
              iconColor="success"
              vertical
            />
             <GridItem xs={20} sm={20} md={14}> <h4 ><b>+91 7895202675  (Whatsapp)</b> </h4>
             <h4 ><b>Mail : support@ssbready.com</b> </h4>
        
             </GridItem>
            
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="We are Social"
              
              icon={PeopleIcon }
              iconColor="info"
              vertical
            />
            <GridItem xs={12} sm={12} md={18}>
            
                <Button
                  justIcon
                  color="info"
                  className={classes.margin5}
                  href="https://twitter.com/"
                  target="_blank"
                  
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="danger"
                  className={classes.margin5}
                  href="https://www.instagram.com/ssb_ready/"
                  target="_blank"
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="info"
                  className={classes.margin5}
                  href="https://www.facebook.com/groups/308798490675100/"
                  target="_blank"
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              
              </GridItem>
          </GridItem>
        </GridContainer>
      </div>
    </div>
      
    </footer>
    
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
