import React, { useState } from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DatasetIcon from "@mui/icons-material/Dataset";
import Forms from "./Forms";
import "./Add.css";

const url = "https://64bf9dde0d8e251fd1112096.mockapi.io/crud-operation";

const Add = () => {
  const [user, setUser] = useState({});
  const { firstName, lastName, age, email, password, userName, country } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName &&
      lastName &&
      age &&
      email &&
      password &&
      userName &&
      country
    ) {
      try {
        await axios
          .post(
            url,
            {
              ...user,
            },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then(() => {
            navigate("/");
          });
      } catch (error) {
        console.log(error.res);
      }
    }
  };

  const navigate = useNavigate();

  const handleReset = () => {
    setUser({
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      userName: "",
      password: "",
      country: "",
    });
    console.log("reset");
  };

  return (
    <>
      <div
        className="rounded"
        style={{
          boxShadow: "10px 0px 36px 0px rgba(0, 0, 0, 0.28)",
        }}
      >
        <Forms
          title="Add your Data"
          instructions="Fill the form below"
          bg="rgb(67 221 14)"
          user={user}
          setUser={setUser}
          buttonIcon1=<SaveIcon />
          buttonColor1="info"
          buttonType1="Submit"
          handleButtton1={handleSubmit}
          handleButton2={handleReset}
          buttonIcon2=<RestartAltIcon />
          buttonColor2="error"
          buttonType2="Reset"
        />
      </div>
      <section style={{ width: "250px" }}>
        <Link to="/">
          <Button
            className="mt-3"
            variant="contained"
            type="reset"
            color="secondary"
            startIcon=<DatasetIcon />
          >
            Show Data
          </Button>
        </Link>
      </section>
    </>
  );
};

export default Add;
