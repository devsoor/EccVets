import PropTypes from 'prop-types';
import { 
    Box, 
    Stack, 
} from '@mui/material';

export default function StepLabel ({ step, title }) {
    return (
        <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h5' }}>
            {step && <Box
                sx={{
                    mr: 1.5,
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    display: 'flex',
                    typography: 'h6',
                    borderRadius: '50%',
                    alignItems: 'center',
                    bgcolor: 'primary.main',
                    justifyContent: 'center',
                    color: 'primary.contrastText',
                }}
            >
                {step}
            </Box>
            }
            {title}
        </Stack>
    );
}

StepLabel.propTypes = {
    step: PropTypes.string,
    title: PropTypes.string,
};