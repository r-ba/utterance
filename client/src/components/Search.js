import React from 'react';
import { TextInput, Button, Box } from 'grommet';
import { Search } from 'grommet-icons';

function SearchBar(props) {
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
            onChange={event=> {
              props.onChange("search", event.target.value);
            }}
          />
        </Box>
        <Box pad="small">
          <TextInput
            placeholder="Phrase"
            onChange={event=> {
              props.onChange("phrase", event.target.value);
            }}
          />
        </Box>
        <Box pad="small">
          <Button onClick={() => props.onSubmit()}>
            <Search className="search-button" />
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default SearchBar;
