import axios from "axios";
import React, { /*useContext,*/ useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
// import { UpdateContext } from "../App";
import Table from "./Table";
import Loading from "./Loading";

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
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "2",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "4",
      filters: [
        {
          text: "India",
          value: "India",
        },
        {
          text: "Germany",
          value: "Germany",
        },

        {
          text: "United Kingdom",
          value: "United Kingdom",
        },
        {
          text: "United States",
          value: "United States",
        },
        {
          text: "Russia",
          value: "Russia",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => value.includes(record.country),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "5",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "6",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "7",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "8",
      render: (id) => {
        return (
          <ButtonGroup>
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
      <Typography
        variant="h3"
        boxShadow="4px 5px 10px 2px gray"
        sx={{
          fontWeight: "700",
          my: 2,
          px: 2,
          py: 1,
          backgroundColor: "#ffb11e",
          borderRadius: 3,
        }}
      >
        DATA BASE
      </Typography>
      <Link to="/add">
        <Button variant="contained" color="info" startIcon=<AddIcon />>
          Add
        </Button>
      </Link>
      <div className="m-4 ">
        <Table
          dataSource={users}
          columns={columns}
          scroll={{ x: true, y: true }}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default DataBase;
