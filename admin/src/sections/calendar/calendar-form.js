import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';

// utils
import uuidv4 from 'src/utils/uuidv4';
import { fTimestamp } from 'src/utils/format-time';
// api
import { createEvent, updateEvent, deleteEvent } from 'src/libs/api';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFTextField, RHFSwitch, RHFSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const CATEGORY_OPTIONS = ["Golf", "Other"];

export default function CalendarForm({ currentEvent, colorOptions, onClose }) {
	const { enqueueSnackbar } = useSnackbar();
	const EventSchema = Yup.object().shape({
		title: Yup.string().max(255).required('Title is required'),
		description: Yup.string().max(5000, 'Description must be at most 5000 characters').required('Description is required'),
		color: Yup.string(),
		allDay: Yup.boolean(),
		start: Yup.mixed(),
		end: Yup.mixed(),
		extendedProps: Yup.object().shape({
			totalAttendees: Yup.number().integer(),
			cutoffDate: Yup.mixed(),
			// cutoffAttendees: Yup.number().integer(),
			cost: Yup.number().integer(),
			active: Yup.boolean(),
			location: Yup.string().required(),
			allowSponsor: Yup.boolean(),
			allowVeteran: Yup.boolean(),
			allowCommunity: Yup.boolean(),
			comment: Yup.string(),
			veteranFree: Yup.boolean(),
			category: Yup.string()
		})
	});

	const methods = useForm({
		resolver: yupResolver(EventSchema),
		defaultValues: currentEvent,
	});

	const {
		reset,
		watch,
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const values = watch();

	const onError = (errors, e) => console.log(errors, e);

	const dateError = values.start && values.end ? values.start > values.end : false;

	const onSubmit = async (data) => {
		const eventData = {};
		Object.assign(eventData, data, {id: currentEvent?.id ? currentEvent?.id : uuidv4()});

		let response;

		try {
			if (!dateError) {
				if (currentEvent?.id) {
				  response = await updateEvent(currentEvent.id, {eventData});

					if (response.statusCode === 200) {
						enqueueSnackbar('Updated event successfully!');
					} else {
						enqueueSnackbar('Failed to update event!', {variant: "error"});
					}				
				} else {
					response = await createEvent(eventData);
					if (response.statusCode === 200) {
						enqueueSnackbar('Created event successfully!');
					} else {
						enqueueSnackbar('Failed to create event!', {variant: "error"});
					}
				}
				onClose();
				reset();
			}
		} catch (error) {
		console.error(error);
		}
	};

	const onDelete = useCallback(async () => {
	  try {
	    const response = await deleteEvent(`${currentEvent?.id}`);
		if (response.statusCode === 200) {
		  	enqueueSnackbar('Deleted event successfully!');
		} else {
			enqueueSnackbar('Error deleting event!', {variant: 'error'});
		}
		onClose(null);
	  } catch (error) {
	    console.error(error);
	  }
	}, [currentEvent?.id, enqueueSnackbar, onClose]);

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onError)}>
			<Stack spacing={3} sx={{ px: 3 }}>
				<RHFSelect
					name="extendedProps.category"
					label="Category"
					size="small"
					sx={{
						maxWidth: 260,
					}}
				>
					{CATEGORY_OPTIONS.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</RHFSelect>
				<RHFTextField name="title" label="Title" />

				<RHFTextField name="description" label="Description" multiline rows={2} />
				<RHFTextField name="extendedProps.location" label="Location" />

				<Grid container spacing={2} >
					<Grid item xs={12} md={6}>
						<Stack spacing={2}>
							<RHFSwitch name="allDay" label="All day" />

							<Controller
								name="start"
								control={control}
								render={({ field }) => (
									<MobileDateTimePicker
									{...field}
									value={new Date(field.value)}
									onChange={(newValue) => {
										if (newValue) {
										field.onChange(fTimestamp(newValue));
										}
									}}
									label="Start date"
									format="MM/dd/yyyy hh:mm a"
									slotProps={{
										textField: {
										fullWidth: true,
										},
									}}
									/>
								)}
							/>

							<Controller
								name="end"
								control={control}
								render={({ field }) => (
									<MobileDateTimePicker
									{...field}
									value={new Date(field.value)}
									onChange={(newValue) => {
										if (newValue) {
										field.onChange(fTimestamp(newValue));
										}
									}}
									label="End date"
									format="MM/dd/yyyy hh:mm a"
									slotProps={{
										textField: {
											fullWidth: true,
											error: dateError,
											helperText: dateError && 'End date must be later than start date',
										},
									}}
									/>
								)}
							/>
							<Controller
								name="extendedProps.cutoffDate"
								control={control}
								render={({ field }) => (
									<MobileDateTimePicker
									{...field}
									value={new Date(field.value)}
									onChange={(newValue) => {
										if (newValue) {
										field.onChange(fTimestamp(newValue));
										}
									}}
									label="Cut off date"
									format="MM/dd/yyyy hh:mm a"
									slotProps={{
										textField: {
											fullWidth: true,
											// error: dateError,
											// helperText: dateError && 'Cutoff date must be later than start date',
										},
									}}
									/>
								)}
							/>
							<RHFSwitch name="extendedProps.allowSponsor" label="Allow Sponsors" />
							<RHFSwitch name="extendedProps.allowVeteran" label="Allow Veterans" />
							<RHFSwitch name="extendedProps.allowCommunity" label="Allow Community" />
						</Stack>
					</Grid>
					<Grid item xs={12} md={6}>
						<Stack spacing={2}>
							<RHFSwitch name="extendedProps.active" label="Active" />

							<RHFTextField name="extendedProps.totalAttendees" label="Total Attendees allowed" />
							{/* <RHFTextField name="extendedProps.cutoffAttendees" label="Cut off Attendees" /> */}
							<RHFTextField 
								name="extendedProps.cost" 
								label="Cost per person"
								InputProps={{
									startAdornment: (
									<InputAdornment position="start">
										<Box component="span" sx={{ color: 'text.disabled' }}>
										$
										</Box>
									</InputAdornment>
									),
								}}
							/>
							<RHFSwitch name="extendedProps.veteranFree" label="Veterans are free" />

							<RHFTextField name="extendedProps.comment" label="Comment" />

						</Stack>
					</Grid>
				</Grid>


				<Controller
					name="color"
					control={control}
					render={({ field }) => (
						<ColorPicker
							selected={field.value}
							onSelectColor={(color) => field.onChange(color)}
							colors={colorOptions}
						/>
					)}
				/>


			</Stack>

		<DialogActions>
			{!!currentEvent?.id && (
			<Tooltip title="Delete Event">
				<IconButton onClick={onDelete}>
				<Iconify icon="solar:trash-bin-trash-bold" />
				</IconButton>
			</Tooltip>
			)}

			<Box sx={{ flexGrow: 1 }} />

			<Button variant="outlined" color="inherit" onClick={onClose}>
				Cancel
			</Button>

			<LoadingButton
				type="submit"
				variant="contained"
				loading={isSubmitting}
				disabled={dateError}
			>
				Save Changes
			</LoadingButton>
		</DialogActions>
		</FormProvider>
	);
}

CalendarForm.propTypes = {
  colorOptions: PropTypes.arrayOf(PropTypes.string),
  currentEvent: PropTypes.object,
  onClose: PropTypes.func,
};
