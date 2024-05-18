import React, { useState, useEffect } from "react";
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
          placeholder="Enter the search line"
          className="search-input"
        />
      </div>
        <Button
          variant="dark"
          disabled={isLoading}
          onClick={!isLoading ? onSearch : null}
          className="search-button"
        >
          {isLoading ? "Cargando..." : "Buscar"}
        </Button>{" "}
        </>
    );
  };
  

export default SearchInput;
