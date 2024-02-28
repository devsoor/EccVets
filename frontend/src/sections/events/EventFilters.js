import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { 
	Box,
	Stack, 
	Drawer, 
	Button,
	TextField,
	Typography, 
	Autocomplete, 
	InputAdornment, 
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// config
import { NAV } from 'src/config';
import Iconify from 'src/components/Iconify';

// api
import { EventFilterAllowed, EventFilterCategories } from '.';

// ----------------------------------------------------------------------
const ALLOWED_OPTIONS = [
	"Sponsor",
	"Veteran",
	"Community"
];
const CATEGORIES = [
	"Golf",
	"Other",
];

const defaultValues = 
	{
		type: "",
		value: "",
	}

EventFilters.propTypes = {
    mobileOpen: PropTypes.bool,
    onMobileClose: PropTypes.func,
    onFilterChange: PropTypes.func,
};

export default function EventFilters({ mobileOpen, onMobileClose, onFilterChange }) {
    const isMdUp = useResponsive('up', 'md');

    // const [filter, setFilter] = useState(defaultValues);
	const [allowed, setAllowed] = useState();
	// const [category, setCategory] = useState();

	const handleChangeFilter = (type, value) => {
		if (!value) {
			setAllowed("");
			// setCategory("");
		}
		onFilterChange(type, value);
	}

	// const handleResetFilters = () => {
	// 	setAllowed("");
	// 	// setCategory("");
	// 	onFilterChange(null, null);
	// }


	const renderOptions = (type, options, value, label, icon) => {
		return <Autocomplete
			sx={{ width: 1 }}
			options={options}
			getOptionLabel={(option) => option}
			// getOptionLabel={(option) => typeof option === 'string'
			// || option instanceof String ? option : ""}
			isOptionEqualToValue={(option, value) => option.value === value.value}
			value={value}
			onChange={(event, value) => handleChangeFilter(type, value)}
			renderInput={(params) => (
				<TextField
				{...params}
				hiddenLabel
				variant="filled"
				placeholder={label}
				InputProps={{
					...params.InputProps,
					autoComplete: 'search',
					startAdornment: (
						<InputAdornment position="start">
							<Iconify
								width={24}
								icon={icon}
								sx={{ color: 'text.disabled', mr: 1 }}
							/>
						</InputAdornment>
					),
					sx: { pb: 1 },
				}}
				/>
			)}
		/>

	}


    const renderContent = (
        <Stack
            spacing={2.5}
            sx={{
                flexShrink: 0,
                width: { xs: 1, md: NAV.W_DRAWER },
            }}
        >
			{/* <Box display="flex" justifyContent="flex-end">
				<Button size="small" variant="filled" onClick={handleResetFilters}>Reset</Button>
			</Box> */}
      		<Block title="Open to">
				{renderOptions("allowed", ALLOWED_OPTIONS, allowed, "Filter ...", "fluent:people-list-16-regular")}
            </Block>

      		{/* <Block title="Category">
			  {renderOptions("category", CATEGORIES, category, "Category", "carbon:category-new-each")}
            </Block> */}
        </Stack>
    )
    return (
        <>
          {isMdUp ? (
            renderContent
          ) : (
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={onMobileClose}
              ModalProps={{ keepMounted: true }}
              PaperProps={{
                sx: {
                  pt: 5,
                  px: 3,
                  width: NAV.W_DRAWER,
                },
              }}
            >
              {renderContent}
            </Drawer>
          )}
        </>
      );
}

// ----------------------------------------------------------------------

Block.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  };
  
  function Block({ title, children }) {
    return (
      <Stack spacing={1.5}>
        <Typography variant="overline" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
  
        {children}
      </Stack>
    );
  }
  