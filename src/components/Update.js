import React, { /*useContext,*/ useEffect, useState } from "react";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import axios from "axios";
import { /*useLocation,*/ useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Forms from "./Forms";
import Loading from "./Loading";
// import { UpdateContext } from "../App";

const url = "https://64bf9dde0d8e251fd1112096.mockapi.io/crud-operation";

const Update = () => {
  // const { data } = useContext(UpdateContext);
  // const location = useLocation();
  // const data = location.state;
  // const [user, setUser] = useState({
  // firstName: data.firstName,
  // lastName: data.lastName,
  // age: data.age,
  // email: data.email,
  // password: data.password,
  // });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const { firstName, lastName, age, email, password } = user;
  // const { id } = data;

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setUser(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (e) => {
    if (firstName && lastName && age && email && password) {
      e.preventDefault();
      axios
        .put(`${url}/${id}`, {
          ...user,
        })
        .then(() => {
          navigate("/");
        });
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return !isLoading ? (
    <div
      className="rounded"
      style={{
        boxShadow: "10px 0px 36px 0px rgba(0, 0, 0, 0.28)",
      }}
    >
      <Forms
        user={user}
        setUser={setUser}
        instructions="Edit your Details below"
        bg="rgb(0 176 182)"
        title="Update"
        shrink="true"
        buttonIcon1=<UpgradeIcon />
        buttonColor1="info"
        buttonType1="Update"
        handleButtton1={handleUpdate}
        handleButton2={handleBack}
        buttonIcon2=<ArrowBackIcon />
        buttonColor2="warning"
        buttonType2="Back"
      />
    </div>
  ) : (
    <Loading />
  );
};

export default Update;
