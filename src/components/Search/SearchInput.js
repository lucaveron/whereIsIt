import React from "react";
import Button from "react-bootstrap/Button";

const SearchInput = ({ value, onChange, onSearch, isLoading }) => {
    return (
      <>
      <div className="search-input-container">
        <label htmlFor="search" className="search-label">
          Which bus do you want to track?
        </label>
        <input
          type="text"
          id="search"
          value={value}
          onChange={onChange}
          placeholder="Enter the search line, only the numbers"
          className="search-input"
        />
      </div>
        <Button
          variant="dark"
          disabled={isLoading}
          onClick={!isLoading ? onSearch : null}
          className="search-button"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>{" "}
        </>
    );
  };
  

export default SearchInput;
