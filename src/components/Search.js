import React from 'react';
import { TextInput, Button, Box } from 'grommet';

function Search(props) {
  return (
    <div>
      <Box
        direction="row"
        pad="small"
      >
        <Box pad="small">
          <TextInput
            placeholder="Query"
            onChange={event=> {
              props.onChange("searchQuery", event.target.value);
            }}
          />
        </Box>
        <Box pad="small">
          <TextInput
            placeholder="Phrase"
            onChange={event=> {
              props.onChange("phraseQuery", event.target.value);
            }}
          />
        </Box>
      </Box>
      <Button
        label="Search"
        onClick={() => props.onSubmit()}
      />
    </div>
  );
}

export default Search;
