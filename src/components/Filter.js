import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Filter.css";

const Filter = ({ dataSource, column, setData, setIsOpen }) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedOption({ ...selectedOption, [name]: value });
    } else if (!e.target.checked) {
      const { [name]: removedProperty, ...restOption } = selectedOption;
      setSelectedOption(restOption);
    }
  };

  const selectedValue = Object.values(selectedOption);
  const handleFilter = () => {
    setData(
      selectedValue.length > 0
        ? dataSource.filter((record) => {
            return column.onFilter(selectedValue, record);
          })
        : dataSource
    );
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleReset = () => {
    setSelectedOption({});
  };

  const { filters } = column;
  return (
    <div className="filter-content">
      {column.filterSearch && (
        <div className="filter-search">
          <SearchIcon sx={{ width: 16, color: "rgb(191 191 191)" }} />
          <input
            type="text"
            placeholder="Search in filters"
            onChange={handleSearch}
          />
        </div>
      )}
      <ul>
        {filters
          .filter((filter) => {
            return search.toLowerCase() === ""
              ? filter
              : filter.value.toLowerCase().includes(search) ||
                  filter.value.toUpperCase().includes(search) ||
                  filter.value.includes(search);
          })
          .map((filter, index) => {
            return (
              <label key={filter.text + index}>
                <li>
                  <input
                    className="checkBox"
                    type="checkbox"
                    name={filter.text}
                    value={filter.value}
                    onChange={handleChange}
                    checked={!!selectedOption[filter.text]}
                  />
                  {filter.text}
                </li>
              </label>
            );
          })}
      </ul>
      <span className="btn-group">
        <button
          type="button"
          className="btn-reset"
          disabled={selectedValue.length === 0 ? true : false}
          onClick={handleReset}
        >
          Reset
        </button>
        <button type="button" className="btn-ok" onClick={handleFilter}>
          OK
        </button>
      </span>
    </div>
  );
};

export default Filter;
