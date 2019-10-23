import React from 'react';
import { TextInput, Button } from 'grommet';
import { Search } from 'grommet-icons';
import { BounceLoader } from 'react-spinners';

function SearchBar(props) {
  const buttonMargin = props.allow ? "search-button" : "search-loading";
  return (
    <div>
      <div className="search-bar">
        <div className="search-bar-input">
          <TextInput
            placeholder="Query"
            value={props.query}
            onChange={event=> {
              props.onChange("search", event.target.value);
            }}
          />
        </div>
        <div className="search-bar-input">
          <TextInput
            placeholder="Phrase"
            value={props.phrase}
            onChange={event=> {
              props.onChange("phrase", event.target.value);
            }}
          />
        </div>
        <div className={buttonMargin}>
          <Button disabled={!props.allow} onClick={() => props.onSubmit()}>
            {props.allow ? <Search /> : <BounceLoader size={25} />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
