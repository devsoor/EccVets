import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Box, Slider, Switch, Typography } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import { ControlPanelStyle } from 'src/components/map';

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
    allDays: PropTypes.bool,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    selectedTime: PropTypes.number,
    onChangeAllDays: PropTypes.func,
    onChangeTime: PropTypes.func,
};

function ControlPanel({ startTime, endTime, allDays, selectedTime, onChangeTime, onChangeAllDays }) {
    const day = 24 * 60 * 60 * 1000;

    const days = Math.round((endTime - startTime) / day);

    const selectedDay = Math.round((selectedTime - startTime) / day);

    const handleChangeDays = value => {
        const daysToAdd = value;

        const newTime = startTime + daysToAdd * day;
        onChangeTime(newTime);
    };

    return (
        <ControlPanelStyle>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
                    All Days
                </Typography>

                <Switch size="small" checked={allDays} onChange={event => onChangeAllDays(event.target.checked)} />
            </Box>

            <br />

            <Typography gutterBottom variant="body2" sx={{ color: allDays ? 'text.disabled' : 'common.white' }}>
                Each Day: {fDate(selectedTime)}
            </Typography>

            <Slider
                min={1}
                step={1}
                max={days}
                disabled={allDays}
                value={selectedDay}
                onChange={(e, value) => {
                    if (typeof value === 'number') handleChangeDays(value);
                }}
            />
        </ControlPanelStyle>
    );
}

export default memo(ControlPanel);
