import React from 'react';

const SearchBar = ({handleSearchAttributeChange, handleSearchTermChange, searchAttribute, searchTerm}) => {


  return (
    <div>
      <label htmlFor="searchTerm" className='search-label'>Search Car By: </label>
      <select className="dropdown-search" id="searchAttribute" value={searchAttribute} onChange={handleSearchAttributeChange}>
        <option value="make">Make</option>
        <option value="model">Model</option>
        <option value="year">Year</option>
      </select>
      <input type="text" className="search-bar" id="searchTerm" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search car..."/>
   
    </div>
  );
};

export default SearchBar;
