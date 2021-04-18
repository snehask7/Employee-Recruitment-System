import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Chart from "react-google-charts";
import Nav from "./ApplicantNav";

const Dashboard = (props) => {
  function pieChart(appl) {
    var chart = {};
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var currYear = new Date().getFullYear();
    for (var i = 0; i < appl.length; i++) {
      var date = new Date(appl[i].applicationDate);
      if (currYear === date.getFullYear()) {
        if (chart[month[date.getMonth()]]) chart[month[date.getMonth()]] += 1;
        else chart[month[date.getMonth()]] = 1;
      }
    }
    var pie = chartarr;
    console.log(pie);
    var entries = Object.entries(chart);
    for (var x in entries) pie.push(entries[x]);
    console.log(pie);
    setState({ ...state, chartarr: pie });
  }
  function fetchData(userID) {
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_API}/getApplicationStatus/${userID}`
        ),
      ])
      .then(
        axios.spread((obj1) => {
          console.log(obj1.data);
          pieChart(obj1.data);
          var initial = 0;
          var interview = 0;
          for (var x in obj1.data) {
            if (obj1.data[x].interviewStatus === "Not Scheduled") initial++;
            else if (obj1.data[x].interviewStatus === "Scheduled") interview++;
          }
          setState({
            ...state,
            applications: obj1.data,
            initialCount: initial,
            interviewCount: interview,
          });
        })
      )
      .catch((error) => {
        alert("Could not load data");
      });
  }

  useEffect(() => {
    var userID = Cookies.get("userID");
    fetchData(userID);
  }, []);

  const [state, setState] = useState({
    applications: [],
    initialCount: 0,
    interviewCount: 0,
    chartarr: [["Month", "Applications"]],
  });
  const { applications, initialCount, interviewCount, chartarr } = state;
  return (
    <body style={{ backgroundColor: "#1f1e2e", color: "#f0ece2cc" }}>
      <Nav></Nav>
      <div
        style={{
          marginTop: "3em",
          marginBottom: "3em",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          &nbsp;&nbsp;Welcome{" "}
          {Cookies.get("firstname") + " " + Cookies.get("lastname")}
        </h2>
        <div
          style={{ marginLeft: "10vw", marginRight: "3vw", marginTop: "2vw" }}
        >
          <hr></hr>

          <Row style={{ marginTop: "3vw" }}>
            <Col>
              <Card
                style={{
                  backgroundColor: "#272a3d",
                  height: "34vw",
                  width: "20vw",
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <h3>Jobs Applied</h3>
                  </Card.Title>
                  <hr></hr>
                  <Card.Text>
                    {console.log(applications)}
                    {applications.map(function (appl, index) {
                      return (
                        <div>
                          <h6>{appl.jobID.jobTitle}</h6>
                          <p>{appl.jobID.companyID.companyName}</p>
                        </div>
                      );
                    })}
                    {applications.length === 0 ? (
                      <h4>No jobs applied yet!</h4>
                    ) : null}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  backgroundColor: "#272a3d",
                  height: "16.25vw",
                  marginBottom: "1.5vw",
                  width: "22vw",
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <h3>Upcoming Interviews</h3>
                  </Card.Title>
                  <Card.Text style={{ marginTop: "2em" }}>
                    <Splide
                      options={{
                        type: "loop",
                        gap: "1rem",
                        autoplay: true,
                        pauseOnHover: false,
                        resetProgress: false,
                        arrows: "slider",
                      }}
                    >
                      <SplideSlide>
                      </SplideSlide>
                      <SplideSlide>
                      </SplideSlide>
                    </Splide>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card
                style={{
                  backgroundColor: "#272a3d",
                  height: "16.25vw",
                  width: "22vw",
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <h3>Offers Received</h3>
                  </Card.Title>
                  <Card.Text style={{ marginTop: "2em" }}>
                    <Splide
                      options={{
                        type: "loop",
                        gap: "1rem",
                        autoplay: true,
                        pauseOnHover: false,
                        resetProgress: false,
                        arrows: "slider",
                      }}
                    >
                      <SplideSlide>
                      </SplideSlide>
                      <SplideSlide>
                      </SplideSlide>
                    </Splide>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  backgroundColor: "#272a3d",
                  height: "22vw",
                  marginBottom: "1.5vw",
                  width: "26vw",
                }}
                className="center"
              >
                <Card.Body>
                  <h6 style={{ textAlign: "center" }}>
                    Month Wise Applications in {new Date().getFullYear()}
                  </h6>
                  <Card.Text>
                    <Chart
                      chartType="PieChart"
                      data={chartarr}
                      options={{
                        legend: "none",
                        pieSliceText: "label",
                        pieStartAngle: 100,
                        width: 370,
                        height: 280,
                        chartArea: { width: "80%", height: "80%" },
                        backgroundColor: "#272a3d",
                      }}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
              <Row>
                <Col>
                  <Card
                    style={{
                      backgroundColor: "#272a3d",
                      textAlign: "center",
                      height: "10.25vw",
                      width: "12vw",
                    }}
                  >
                    <Card.Body>
                      <h1 style={{ fontSize: "3em" }}>{initialCount}</h1>
                      <Card.Text>
                        {initialCount === 1 ? "Application" : "Applications"} at
                        initial stage
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card
                    style={{
                      backgroundColor: "#272a3d",
                      textAlign: "center",
                      height: "10.25vw",
                      width: "12vw",
                    }}
                  >
                    <Card.Body>
                      <h1 style={{ fontSize: "3em" }}>{interviewCount}</h1>
                      <Card.Text>
                        {initialCount === 1 ? "Application" : "Applications"} at
                        interview stage
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <hr></hr>
    </body>
  );
};

export default Dashboard;
