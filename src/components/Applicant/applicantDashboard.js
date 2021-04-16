import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Nav from "./ApplicantNav";

const Dashboard = (props) => {

  const fetchData = (userID) => {
    axios
      .all([
        axios.get(`${process.env.REACT_APP_API}/getApplicationStatus/${userID}`)
      ])
      .then(
        axios.spread((obj1) => {
          console.log(obj1)
          setState({
            ...state,
            Applications: obj1.data,
          });
        })
      )
      .catch((error) => { alert("Could not load data") });
  };

  useEffect(() => {
    var userID = Cookies.get("userID");
    fetchData(userID)
  }, []);

  const [state, setState] = useState({
    applications: ""
  })
  const { applications } = state;
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
          &nbsp;&nbsp;Welcome {Cookies.get('firstname') + " " + Cookies.get('lastname')}
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
                    <h2>Jobs Applied</h2>
                  </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
                    <h2>Upcoming Interviews</h2>
                  </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
                    <h2>Offers Received</h2>
                  </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
              >
                <Card.Body>
                  <Card.Title>
                    <h2>bar chart here</h2>
                  </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
                      <h1 style={{ fontSize: '3em' }}>3</h1>
                      <Card.Text>Applicantions at initial stage</Card.Text>
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
                      <h1 style={{ fontSize: '3em' }}>3</h1>
                      <Card.Text>Applicantions at interview stage</Card.Text>
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
