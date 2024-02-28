import PropTypes from 'prop-types';
// @mui
import { Box, Autocomplete, InputAdornment, TextField } from '@mui/material';

import Iconify from 'src/components/Iconify';
import { Category } from '@mui/icons-material';

// ----------------------------------------------------------------------

const CATEGORIES = [
  "Golf",
  "Other",
]

export default function EventFilterCategories({ category, onChangeCategory }) {
  return (
    <Autocomplete
      sx={{ width: 1 }}
      options={CATEGORIES}
      getOptionLabel={(option) => option}
      // getOptionLabel={(option) => typeof option === 'string'
      // || option instanceof String ? option : ""}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={category}
      onChange={(event, value) => onChangeCategory(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          variant="filled"
          placeholder="Categories"
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  width={24}
                  icon="carbon:category-new-each"
                  sx={{ color: 'text.disabled', mr: 1 }}
                />
              </InputAdornment>
            ),
            sx: { pb: 1 },
          }}
        />
      )}
    />
  );
}

EventFilterCategories.propTypes = {
  category: PropTypes.string,
  onChangeCategory: PropTypes.func,
};
