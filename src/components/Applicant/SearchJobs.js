import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import Nav from "./ApplicantNav";
import Slider from "./Slider.js";

const SearchJob = (props) => {
  const fetchData = (userID) => {
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_API}/getApplicationStatus/${userID}`
        ),
      ])
      .then(
        axios.spread((obj1) => {
          console.log(obj1);
          setState({
            ...state,
            Applications: obj1.data,
          });
        })
      )
      .catch((error) => {
        alert("Could not load data");
      });
  };

  useEffect(() => {
    var userID = Cookies.get("userID");
    fetchData(userID);
  }, []);

  const [state, setState] = useState({
    jobOpenings: [],
    filter: {
      companyID: "",
      salary: {
        min: "",
        max: ""
      },
      yearsOfExp: {
        min: 0,
        max: 30
      },
      location: ""
    }
  });

  const onChangeYears = data => {
    const filters = { ...filter };
    filters.yearsOfExp = data;
    setState({ ...state, filter: filters })
  };

  const { jobOpenings, filter } = state;
  return (
    <body style={{ backgroundColor: "#1f1e2e", color: "#f0ece2cc" }}>
      <Nav></Nav>
      <div
        style={{
          marginTop: "3em",
          width: "90%",
          marginBottom: "3em",
        }}
      >
        <h2 style={{ textAlign: "center" }}>&nbsp;&nbsp;Search for Jobs</h2>
        <div
          style={{ marginLeft: "10vw", marginRight: "3vw", marginTop: "2vw" }}
        >
          <hr></hr>

          <Form.Row>
            <Form.Group
              as={Col}
              md="2"
              style={{ marginLeft: "2vw", marginRight: "0.5vw" }}
            >
              <Form.Label>Company</Form.Label>
              <Form.Control size="sm" as="select">
                <option value="">Select Company</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="2" style={{ marginRight: "0.5vw" }}>
              <Form.Label>Location</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter Location"
              />
            </Form.Group>
            <Form.Group as={Col} md="3" style={{ marginRight: "1vw" }}>
              <Form.Label>Years of Experience</Form.Label>
              <br></br>
              <Slider data={filter ? filter.yearsOfExp : null} onChange={onChangeYears} />
            </Form.Group>
            <Form.Group as={Col} md="3" style={{ marginRight: "0.5vw" }}>
              <Form.Label>Annual Salary</Form.Label>
              <Form.Row>
                <Form.Group as={Col} md="6">
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Rs.</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      size="sm"
                      type="number"
                      aria-describedby="passwordHelpBlock"
                    />
                  </InputGroup>
                  <Form.Text muted>Minimum</Form.Text>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend size="sm">
                      <InputGroup.Text id="basic-addon1">Rs.</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      size="sm"
                      type="number"
                      aria-describedby="passwordHelpBlock"
                    />
                  </InputGroup>
                  <Form.Text muted>Minimum</Form.Text>
                </Form.Group>
              </Form.Row>
            </Form.Group>
            <Form.Group as={Col} md="1">
              <Button
                style={{ marginTop: "2em", height: "2em" }}
                variant="primary"
                type="submit"
              >
                Search
              </Button>{" "}
            </Form.Group>
          </Form.Row>
          <hr style={{ marginTop: '-1vw' }}></hr>
        </div>
      </div>
      <hr></hr>
    </body>
  );
};

export default SearchJob;
