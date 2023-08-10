import React, { useState } from "react";

function SearchBox({ extraClass, query, setQuery }) {
  return (
    <div className="search-field">
      <form action="#" className="form">
        <div
          className={extraClass ? `input-group ${extraClass}` : "input-group"}
        >
          <div className="input-group-text">
            <i className="ion-ios-search-strong blue-1"></i>
          </div>
          <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} className="form-control" placeholder="Search" />
        </div>
      </form>
    </div>
  );
}

export default SearchBox;
