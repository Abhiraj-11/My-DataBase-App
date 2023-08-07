import axios from "axios";
import React, { /*useContext,*/ useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
// import { UpdateContext } from "../App";
import loading from "../Gif/Loading.gif";
import Table from "./Table";

const url = "https://64bf9dde0d8e251fd1112096.mockapi.io/crud-operation";

const DataBase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  // const { setData } = useContext(UpdateContext);
  const fetchData = async () => {
    try {
      const res = await axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setIsLoading(false);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${url}/${id}`).then(() => {
      fetchData();
    });
  };
  const navigate = useNavigate();

  // const handleUpdate = (id, firstName, lastName, age, email, password) => {
  //   navigate("/update", {
  //     state: {
  //       id: id,
  //       firstName: firstName,
  //       lastName: lastName,
  //       age: age,
  //       email: email,
  //       password: password,
  //     },
  //   });
  // };
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Sl No.",
      dataIndex: "id",
      key: "1",
      fixed: "left",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "2",
      // fixed: "left",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "3",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "4",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "5",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "6",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "7",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "8",
      fixed: "right",
      render: (id) => {
        return (
          <ButtonGroup>
            {/* <Link to={`/update/${id}`}> */}
            <Button
              sx={{ zIndex: 0 }}
              startIcon=<UpgradeIcon />
              variant="contained"
              color="success"
              type="button"
              className="m-1"
              onClick={() => handleUpdate(id)}
            >
              Update
            </Button>
            {/* </Link> */}
            <Button
              startIcon=<DeleteIcon />
              variant="contained"
              color="error"
              type="button"
              className="m-1"
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <>
      <h1 className="mt-4">DATA BASE</h1>
      <div className="m-4 ">
        <Table
          dataSource={users}
          columns={columns}
          scroll={{ x: true, y: true }}
        />
        <Link to="/">
          <Button
            className="m-4"
            variant="contained"
            color="info"
            startIcon=<HomeIcon />
          >
            Home
          </Button>
        </Link>
      </div>
      <section className="mt-5">
        {isLoading && <img src={loading} style={{ width: "300px" }} alt="" />}
      </section>
    </>
  );
};

export default DataBase;
