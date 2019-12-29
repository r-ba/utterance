import React from 'react';

function SearchInput(props) {
  return (
    <input
      className="search-input"
      type="text"
      defaultValue={props.value}
      placeholder={props.placeholder}
      onChange={ e => {
        props.onChange(e.target.value)
        props.setHasChanged(props.value !== e.target.value);
      }}
    />
  );
}

export default SearchInput;
