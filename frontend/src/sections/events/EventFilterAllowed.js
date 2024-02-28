import PropTypes from 'prop-types';
// @mui
import { Box, Autocomplete, InputAdornment, TextField } from '@mui/material';
// _mock
import Iconify from 'src/components/Iconify';


// ----------------------------------------------------------------------

const ALLOWED_OPTIONS = [
  "Sponsor",
  "Veteran",
  "Community"
]

export default function EventFilterAllowed({ allowed, onChangeAllowed }) {
  return (
    <Autocomplete
      sx={{ width: 1 }}
      options={ALLOWED_OPTIONS}
      getOptionLabel={(option) => option}

      // getOptionLabel={(option) => typeof option === 'string'
      // || option instanceof String ? option : ""}
      // isOptionEqualToValue={(option, value) => option.value === value.value}
      value={allowed}
      onChange={(event, value) => onChangeAllowed(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          variant="filled"
          placeholder="Open To"
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  width={24}
                  icon="fluent:people-list-16-regular"
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

EventFilterAllowed.propTypes = {
  allowed: PropTypes.string,
  onChangeAllowed: PropTypes.func,
};
