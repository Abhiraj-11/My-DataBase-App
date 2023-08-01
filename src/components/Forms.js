import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./Forms.css";

const Forms = ({
  title,
  user,
  setUser,
  buttonIcon1,
  buttonColor1,
  handleButtton1,
  buttonIcon2,
  buttonColor2,
  handleButton2,
  buttonType1,
  buttonType2,
  shrink,
  instructions,
  bg,
}) => {
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  return (
    <>
      <div style={{ width: "500px" }}>
        <h1
          className="py-3 m-0 rounded-top"
          style={{
            backgroundColor: bg,
          }}
        >
          {title.toUpperCase()}
        </h1>
        <p className="mt-3">{instructions}</p>
        <form className="form m-3">
          <div>
            <TextField
              fullWidth
              variant="filled"
              color="error"
              type="text"
              label="First Name"
              InputLabelProps={{ shrink: shrink }}
              name="firstName"
              value={user.firstName}
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              variant="filled"
              color="warning"
              type="text"
              label="Last Name"
              InputLabelProps={{ shrink: shrink }}
              name="lastName"
              value={user.lastName}
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              variant="filled"
              color="success"
              type="number"
              label="Age"
              InputLabelProps={{ shrink: shrink }}
              name="age"
              value={user.age}
              placeholder="Age"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              variant="filled"
              color="primary"
              type="email"
              label="Email"
              InputLabelProps={{ shrink: shrink }}
              name="email"
              value={user.email}
              placeholder="example@email.com"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              variant="filled"
              color="primary"
              type="text"
              label="User Name"
              InputLabelProps={{ shrink: shrink }}
              name="userName"
              value={user.userName}
              placeholder="user_name"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              variant="filled"
              color="secondary"
              type="password"
              label="Password"
              InputLabelProps={{ shrink: shrink }}
              name="password"
              value={user.password}
              placeholder="password"
              onChange={handleChange}
            />
          </div>
        </form>
        <ButtonGroup className="mb-3">
          <Button
            startIcon={buttonIcon1}
            variant="contained"
            color={buttonColor1}
            type="submit"
            onClick={handleButtton1}
          >
            {buttonType1}
          </Button>
          <Button
            startIcon={buttonIcon2}
            variant="contained"
            type="reset"
            color={buttonColor2}
            onClick={handleButton2}
          >
            {buttonType2}
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default Forms;
