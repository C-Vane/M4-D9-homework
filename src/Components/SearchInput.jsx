import React from "react";

function SearchInput({ handleInput, search }) {
  return (

    <input
      type="search"
      placeholder="Search for a movies..."
      className="form-control searchbox pl-2"
      onChange={handleInput}
      onKeyPress={search}
    />

  );
}

export default SearchInput;
