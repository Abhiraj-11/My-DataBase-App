import React from "react";
import "./Table.css";

const Table = ({ dataSource, columns }) => {
  console.log(dataSource);
  return (
    <>
      <div className="table-content">
        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                const { key, title } = column;
                return <th key={key}>{title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((data) => {
              const { id } = data;
              let index = 0;
              return (
                <tr key={id}>
                  {columns.map((coloumn) => {
                    const { dataIndex } = coloumn;
                    index += 1;
                    return (
                      <>
                        {dataIndex !== "action" ? (
                          <td key={dataIndex}>{data[dataIndex]}</td>
                        ) : null}
                      </>
                    );
                  })}
                  <td>{columns[index - 1].button(id)}</td>
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
