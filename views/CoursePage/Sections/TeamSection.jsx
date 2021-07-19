import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
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

import team1 from "assets/img/faces/avatar.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";
import ProfilePage from "views/ProfilePage/ProfilePage";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const [Courses, setCourses] = useState([]);

  useEffect(async () => {
    try {
      const res = await axios.get("/student-dashboard/courses");
      const courses = res.data.data.courses;
      setCourses(courses);
    } catch (error) {
      console.log("error", error.response);
    }
    return () => {};
  }, []);
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        {Courses
          ? Courses.map((course) => (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card carousel>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={2}
                      className={classes.itemGrid}
                    >
                      <img src={team1} alt="..." className={imageClasses} />
                    </GridItem>
                    <h4 className={classes.cardTitle}>
                      {course.title}

                      <br />
                      <small className={classes.smallTitle}>
                        {course.instructor.designation}{" "}
                      </small>
                    </h4>
                    <CardBody>
                      <p className={classes.description}>
                        {course.shortDescription}
                      </p>
                    </CardBody>
                    <CardFooter className={classes.justifyCenter}>
                      <Link to={{pathname: `/profile-page`, state: course }}>
                        <Button
                          color="rose"
                          size="lg"
                        >
                          View More
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
              </GridItem>
            
              </GridContainer>
            ))
          : null}
            <Route
                path={`/profile-page`}
                exact>
                <ProfilePage />
            </Route>
      </div>
    </div>
  );
}
