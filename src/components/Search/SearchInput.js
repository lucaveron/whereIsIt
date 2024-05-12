import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const SearchInput = ({ value, onChange, onSearch, isLoading }) => {
    return (
      <div className="search-input-container">
        <label htmlFor="search" className="search-label">
          ¿Qué colectivo desea rastrear?
        </label>
        <input
          type="text"
          id="search"
          value={value}
          onChange={onChange}
          placeholder="Ingrese la línea buscada"
          className="search-input"
        />
        <Button
          variant="dark"
          disabled={isLoading}
          onClick={!isLoading ? onSearch : null}
          className="search-button"
        >
          {isLoading ? "Cargando..." : "Buscar"}
        </Button>{" "}
      </div>
    );
  };
  

export default SearchInput;
