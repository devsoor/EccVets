// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


// ----------------------------------------------------------------------

export default function App() {
    return (
        <MotionLazyContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider>
                    <ThemeSettings>
                        <NotistackProvider>
                            <ProgressBarStyle />
                            <ChartStyle />
                            <ScrollToTop />
                            <Router />
                        </NotistackProvider>
                    </ThemeSettings>
                </ThemeProvider>
            </LocalizationProvider>
        </MotionLazyContainer>
    );
}
