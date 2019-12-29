import React, { useState } from 'react';
import SearchInput from './SearchInput';
import '../styles/SearchBar.css';

function SearchBar(props) {
  const [term, setTerm] = useState(props.searchTerm);
  const [phrase, setPhrase] = useState(props.searchPhrase);
  const [hasChanged, setHasChanged] = useState(false);

  function handleSubmit() {
    // searchTerm and searchPhrase both must be newly defined
    if (hasChanged && term !== "" && phrase !== "") {
      props.onSubmit({
          searchTerm: term,
          searchPhrase: phrase,
          searchToken: "new"
      });
    }
  }

  return (
    <div className="search-bar">
      <SearchInput
        placeholder={"Search Term"}
        value={props.searchTerm}
        onChange={setTerm}
        setHasChanged={setHasChanged}
      />
      <SearchInput
        placeholder={"Search Phrase"}
        value={props.searchPhrase}
        onChange={setPhrase}
        setHasChanged={setHasChanged}
      />
      <img
        className={`search-submit ${hasChanged && !props.isDisabled ? "enabled" : ""}`}
        src={"./img/search.png"}
        alt="Submit query"
        onClick={handleSubmit}
      />
    </div>
  );
}

export default SearchBar;
