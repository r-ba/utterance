import React from 'react';
import { TextInput, Button, Box } from 'grommet';
import { Search } from 'grommet-icons';
import { BounceLoader } from 'react-spinners';

function SearchBar(props) {
  const buttonMargin = props.allow ? "search-button" : "search-loading";
  return (
    <div>
      <Box
        className="search-bar"
        direction="row"
        pad="small"
      >
        <Box pad="small">
          <TextInput
            placeholder="Query"
            value={props.query}
            onChange={event=> {
              props.onChange("search", event.target.value);
            }}
          />
        </Box>
        <Box pad="small">
          <TextInput
            placeholder="Phrase"
            value={props.phrase}
            onChange={event=> {
              props.onChange("phrase", event.target.value);
            }}
          />
        </Box>
        <Box pad="small">
          <Button className={buttonMargin} disabled={!props.allow} onClick={() => props.onSubmit()}>
            {props.allow ? <Search /> : <BounceLoader size={25} />}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default SearchBar;
