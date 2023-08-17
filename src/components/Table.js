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
  const [sortColumnName, setSortColumnName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const columnStyling = ({ fixed, key }) => {
    return {
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
    } else if (sortOrder === "ascend") {
      setData(data.sort((a, b) => b[dataIndex] - a[dataIndex]));
      setSortOrder("descend");
    }
    setSortColumnName(dataIndex);
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
      <div
        className={classNames("table-content", { "table-height": isOpen })}
        style={scrollStyling(scroll, x, y)}
      >
        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                const { key, title } = column;
                return (
                  <th
                    className={classNames({
                      "table-head-sorter": column.sorter,
                      "table-head-filter": column.filters,
                    })}
                    onClick={() => (column.sorter ? handleSort(column) : null)}
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
                            color={isOpen ? "primary" : "action"}
                          />
                        </Box>
                      ) : null}
                      {column.sorter ? (
                        <Box className="filterIcon">
                          <ArrowDropUpIcon
                            color={
                              sortColumnName === column.dataIndex &&
                              sortOrder === "ascend"
                                ? "primary"
                                : "action"
                            }
                            sx={{ width: 20 }}
                          />
                          <ArrowDropDownIcon
                            color={
                              sortColumnName === column.dataIndex &&
                              sortOrder === "descend"
                                ? "primary"
                                : "action"
                            }
                            sx={{ width: 20 }}
                          />
                        </Box>
                      ) : null}
                    </header>
                    {isOpen && column.filters ? (
                      <Filter
                        setIsOpen={setIsOpen}
                        setData={setData}
                        dataSource={dataSource}
                        column={column}
                      />
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              const { id } = data;
              return (
                <tr key={id}>
                  {columns.map((column) => {
                    const { dataIndex, key } = column;
                    return (
                      <td
                        key={`key-${key}&id-${id}`}
                        style={column.fixed ? columnStyling(column) : {}}
                      >
                        {column.render
                          ? column.render(id)
                          : //: dataIndex === "id"
                            //? index + 1
                            data[dataIndex]}
                      </td>
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
