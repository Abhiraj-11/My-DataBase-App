import React, { useState } from "react";
import "./Table.css";

const Table = ({ dataSource, columns, scroll }) => {
  const [sorted, setSorted] = useState([]);
  let myStyle = {};
  const handleFixed = (fixed) => {
    myStyle = {
      backgroundColor: "white",
      position: "sticky",
      [fixed]: 0,
    };
  };

  const handleSort = ({ dataIndex, sorter }) => {
    setSorted(dataSource.sort((a, b) => a[dataIndex] - b[dataIndex]));
  };

  const x = scroll ? scroll.x : null;
  const y = scroll ? scroll.y : null;
  return (
    <>
      <div
        className="table-content"
        style={
          scroll
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
            : null
        }
      >
        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                const { key, title } = column;
                return (
                  <>
                    <th
                      onClick={() =>
                        "sorter" in column ? handleSort(column) : null
                      }
                      key={key}
                      style={
                        (scroll !== undefined
                          ? {
                              position: "sticky",
                              top: 0,
                              backgroundColor: "#fafafa",
                              zIndex: 1,
                            }
                          : null) ||
                        ("fixed" in column
                          ? {
                              backgroundColor: "#fafafa",
                              position: "sticky",
                              [column.fixed]: 0,
                            }
                          : null)
                      }
                    >
                      {title}
                    </th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((data) => {
              const { id } = data;
              return (
                <tr key={id}>
                  {columns.map((column) => {
                    const { dataIndex } = column;
                    return (
                      <>
                        {"fixed" in column ? handleFixed(column.fixed) : null}
                        {"render" in column ? (
                          <td
                            key={dataIndex}
                            style={"fixed" in column ? myStyle : {}}
                          >
                            {column.render(id)}
                          </td>
                        ) : (
                          <td
                            key={dataIndex}
                            style={"fixed" in column ? myStyle : {}}
                          >
                            {data[dataIndex]}
                          </td>
                        )}
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
