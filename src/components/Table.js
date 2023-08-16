import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import classNames from "classnames";
import "./Table.css";
import { Box } from "@mui/material";
import Filter from "./Filter";

const Table = ({ dataSource, columns, scroll }) => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [color, setColor] = useState({
    upArrowColor: "action",
    downArrowColor: "action",
    filterColor: "action",
  });
  const [isOpen, setIsOpen] = useState(false);
  let columnStyling = {};
  const handleFixed = ({ fixed, key }) => {
    columnStyling = {
      backgroundColor: "white",
      position: "sticky",
      [fixed]: fixed === "left" ? (key - 1) * 142 : 0,
      zIndex: 1,
    };
  };
  const handleSort = ({ sorter, dataIndex }) => {
    if (sortOrder === "" || sortOrder === "descend") {
      setData(data.sort(sorter));
      setSortOrder("ascend");
      setColor({ ...color, upArrowColor: "primary", downArrowColor: "action" });
    } else if (sortOrder === "ascend") {
      setData(data.sort((a, b) => b[dataIndex] - a[dataIndex]));
      setSortOrder("descend");
      setColor({ ...color, downArrowColor: "primary", upArrowColor: "action" });
    }
  };

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  const handleFilters = () => {
    setIsOpen(!isOpen);
  };

  const x = scroll ? scroll.x : null;
  const y = scroll ? scroll.y : null;

  const scrollStyling = (scroll, x, y) => {
    return scroll
      ? y && x
        ? {
            maxHeight: y,
            maxWidth: x,
            overflow: "scroll",
          }
        : x
        ? {
            maxWidth: x,
            overflowX: "auto",
          }
        : y
        ? {
            maxHeight: y,
            overflowY: "auto",
          }
        : null
      : null;
  };

  const freezeStyling = (scroll, column) => {
    return {
      ...(scroll
        ? {
            position: "sticky",
            top: 0,
            backgroundColor: "#fafafa",
            zIndex: 1,
          }
        : null),
      ...(column.fixed
        ? {
            backgroundColor: "#fafafa",
            position: "sticky",
            [column.fixed]:
              column.fixed === "left" ? (column.key - 1) * 142 : 0,
            zIndex: 2,
          }
        : null),
    };
  };
  return (
    <>
      <div className="table-content" style={scrollStyling(scroll, x, y)}>
        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                const { key, title } = column;
                return (
                  <>
                    <th
                      className={classNames({
                        "table-head-sorter": column.sorter,
                        "table-head-filter": column.filters,
                      })}
                      onClick={() =>
                        column.sorter ? handleSort(column) : null
                      }
                      key={key}
                      style={freezeStyling(scroll, column)}
                    >
                      <header
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: 140,
                        }}
                      >
                        {title}

                        {column.filters ? (
                          <Box
                            className="filterIcon"
                            onClick={() =>
                              column.filters ? handleFilters() : null
                            }
                          >
                            <FilterAltIcon
                              sx={{ width: 17 }}
                              color={color.filterColor}
                              onClick={() =>
                                setColor(
                                  color.filterColor === "action"
                                    ? { ...color, filterColor: "primary" }
                                    : { ...color, filterColor: "action" }
                                )
                              }
                            />
                          </Box>
                        ) : null}
                        {column.sorter ? (
                          <Box className="filterIcon">
                            <ArrowDropUpIcon
                              color={color.upArrowColor}
                              sx={{ width: 20 }}
                            />
                            <ArrowDropDownIcon
                              color={color.downArrowColor}
                              sx={{ width: 20 }}
                            />
                          </Box>
                        ) : null}
                      </header>
                      {isOpen && column.filters ? (
                        <Filter
                          data={data}
                          setData={setData}
                          dataSource={dataSource}
                          column={column}
                        />
                      ) : null}
                    </th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              const { id } = data;
              return (
                <tr key={id}>
                  {columns.map((column) => {
                    const { dataIndex, key } = column;
                    return (
                      <>
                        {"fixed" in column ? handleFixed(column) : null}
                        <td
                          key={`key-${key}&id-${id}`}
                          style={column.fixed ? columnStyling : {}}
                        >
                          {column.render ? column.render(id) : data[dataIndex]}
                        </td>
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
