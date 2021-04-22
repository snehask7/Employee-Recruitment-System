import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/sass/styles.scss";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../assets/styles/App.css";
import Nav from "./InterviewerNav";
// const events = [

// {
//   title: "Technical Interview",
//   allDay: true,
//   start: new Date(2021, 3, 18),
//   end: new Date(2021, 3, 18),
// },
//   {
//     title: "DTS STARTS",
//     start: new Date(2021, 3, 5),
//     end: new Date(2021, 3, 5),
//   },
// ];

const Dashboard = (props) => {
  const [state, setState] = useState({
    interviews: [],
    events: [],
    currInterview: null,
  });
  const { interviews, events, currInterview } = state;

  let history = useHistory();
  const localizer = momentLocalizer(moment);
  function onEventClick(event) {
    console.log(event);
    setState({ ...state, currInterview: event });
  }

  function fetchData() {
    var userID = Cookies.get("userID");
    axios
      .get(`${process.env.REACT_APP_API}/getInterviews/${userID}`)
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          setState({ ...state, interviews: response.data });
          createCalendar(response.data);
        } else {
          alert("Could not retrieve interviews!");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Could not retrieve interviews!");
      });
  }

  function createCalendar(interviews) {
    var eventsarr = [];
    console.log(interviews);
    for (var x in interviews) {
      var interview = {
        title: "Interview",
        allDay: true,
        start: new Date(moment(interviews[x].date)),
        end: new Date(moment(interviews[x].date)),
        resource: interviews[x],
      };
      eventsarr.push(interview);
    }
    console.log(eventsarr);
    setState({ ...state, events: eventsarr });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <body style={{ backgroundColor: "#1f1e2e", color: "#f0ece2cc" }}>
      <Nav></Nav>
      <div
        style={{
          marginTop: "2em",
          marginBottom: "3em",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          &nbsp;&nbsp;Welcome{" "}
          {Cookies.get("firstname") + " " + Cookies.get("lastname")}
        </h2>
        <div
          style={{ marginLeft: "10vw", marginRight: "3vw", marginTop: "1vw" }}
        >
          <hr></hr>

          <Row style={{ marginTop: "2vw" }}>
            <Col>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600, width: 900 }}
                views={["month"]}
                selectable
                onSelectEvent={(event) => onEventClick(event)}
              // onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo)}
              />
            </Col>
            <Col>
              {currInterview ? (
                <Card className="interview">
                  <Card.Title>Interview Details</Card.Title>
                  <Card.Body>
                    <p>
                      <b>Interview Date:</b>
                      &nbsp;&nbsp;
                      {moment(currInterview.resource.date).format("DD/MM/YY")}
                    </p>
                    <p>
                      <b>Interview Time: </b>
                      &nbsp;&nbsp;
                      {moment(currInterview.resource.date).format("hh:mm A")}
                    </p>
                    <p>
                      <b>Link: </b>
                      &nbsp;&nbsp;
                      {currInterview.resource.meetingLink}
                    </p>
                  </Card.Body>
                </Card>
              ) : null}
            </Col>
          </Row>
        </div>
      </div>
      <hr></hr>
    </body>
  );
};

export default Dashboard;
