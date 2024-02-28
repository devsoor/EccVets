import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function SentIcon({ ...other }) {
    const theme = useTheme();

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    return (
        <Box {...other}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 120 140">
                <defs>
                    <linearGradient id="STYLE" x1="49.662%" x2="52.228%" y1="37.111%" y2="76.847%">
                        <stop offset="0%" stopColor={PRIMARY_MAIN} />
                        <stop offset="100%" stopColor={PRIMARY_DARK} />
                    </linearGradient>
                </defs>

                <path
                    fill={PRIMARY_MAIN}
                    opacity="0.48"
                    transform="translate(27 74)"
                    d="M39.259 65.387a.75.75 0 11-.39-1.449l1.93-.519a.75.75 0 01.39 1.449l-1.93.519zm7.726-2.079a.75.75 0 01-.392-1.448c.674-.182 1.312-.355 1.929-.524a.75.75 0 11.394 1.448l-1.93.524zm7.72-2.13a.75.75 0 01-.408-1.442c.653-.185 1.292-.367 1.92-.548a.75.75 0 11.415 1.442c-.63.18-1.272.364-1.926.549zm7.693-2.259a.75.75 0 01-.44-1.434c.643-.197 1.277-.394 1.904-.591a.75.75 0 01.45 1.43c-.63.2-1.268.397-1.914.595zm7.64-2.47a.75.75 0 01-.487-1.42 205.24 205.24 0 001.882-.654.75.75 0 01.5 1.414c-.626.221-1.257.44-1.896.66zm7.543-2.757a.75.75 0 01-.546-1.397c.532-.208 1.059-.417 1.579-.627l.267-.11a.75.75 0 11.572 1.387l-.275.113c-.529.213-1.06.424-1.597.634zm7.38-3.343a.75.75 0 11-.731-1.31c.584-.326 1.141-.66 1.673-1.004a.75.75 0 01.814 1.26 31.41 31.41 0 01-1.757 1.054zm6.488-5.142a.75.75 0 01-1.195-.908c.384-.505.7-1.033.933-1.565a.75.75 0 011.375.6 9.208 9.208 0 01-1.113 1.873zm.387-8.357a.75.75 0 11-1.257.818 9.492 9.492 0 00-1.165-1.443.75.75 0 011.075-1.046c.516.53.966 1.085 1.347 1.671zm-6.48-5.278a.75.75 0 11-.697 1.328 51.745 51.745 0 00-.312-.162c-.477-.232-.958-.45-1.449-.659a.75.75 0 11.584-1.381c.516.218 1.02.447 1.537.698l.338.176zm-7.708-2.764a.75.75 0 11-.348 1.46 44.518 44.518 0 00-1.923-.414.75.75 0 01.283-1.473c.676.13 1.339.272 1.988.427zm-8.01-1.253a.75.75 0 11-.137 1.494 90.41 90.41 0 00-1.977-.159.75.75 0 11.104-1.496c.691.048 1.36.101 2.01.16zm-8.058-.452a.75.75 0 11-.052 1.499l-.988-.034c-.317-.005-.637-.009-.96-.012a.75.75 0 11.015-1.5l.981.013 1.004.034zm-8.004-.025a.75.75 0 01.022 1.5c-.64.009-1.3.02-1.996.034a.75.75 0 01-.029-1.5c.698-.013 1.361-.025 2.003-.034zm-8.006.174a.75.75 0 11.037 1.5l-2 .047a.75.75 0 11-.035-1.5c.597-.013 1.216-.028 1.998-.047zm-7.986.15a.75.75 0 01.013 1.5c-.419.003-.83.006-1.234.007l-.762.008a.75.75 0 11-.02-1.5l.774-.008c.403-.001.813-.004 1.23-.008zm-8.01.17a.75.75 0 11.036 1.5 128.4 128.4 0 01-2.011.036.75.75 0 01-.014-1.5c.617-.006 1.261-.018 1.988-.035zm-7.922-.16a.75.75 0 11-.125 1.495 54.016 54.016 0 01-2.018-.208.75.75 0 01.182-1.489c.657.08 1.31.147 1.961.202zm-7.788-1.23a.75.75 0 01-.334 1.463c-.611-.14-1.233-.29-1.865-.452l-.106-.028a.75.75 0 11.384-1.45l.095.025c.62.159 1.227.306 1.826.443zm-6.988-3.058a.75.75 0 11-.94 1.169 15.781 15.781 0 01-1.545-1.422.75.75 0 111.087-1.033c.435.457.903.888 1.398 1.286zm-4.36-6.177a.75.75 0 11-1.427.461 12.529 12.529 0 01-.481-2.072.75.75 0 011.485-.213c.088.614.23 1.223.424 1.824zm.197-7.336a.75.75 0 11-1.414-.5c.23-.65.507-1.292.83-1.927a.75.75 0 111.337.68 14.554 14.554 0 00-.753 1.747zm4.15-6.461a.75.75 0 01-1.098-1.022c.451-.485.93-.968 1.437-1.453a.75.75 0 111.036 1.084 33.35 33.35 0 00-1.375 1.39z"
                />

                <path
                    fill="url(#STYLE)"
                    fillRule="nonzero"
                    d="M118.861.08c.76.19.938 1.11.744 1.772-.437 1.942-1.194 3.796-1.79 5.693L92.91 85.285c-.184 1.023-1.258 1.783-2.27 1.561-10.558-8.63-21.143-17.238-31.722-25.845-4.793 5.019-9.514 10.127-14.717 14.727-1.33 1.09-2.652 2.242-4.23 2.95-.423.13-1.18.379-1.374-.194-.058-1.036.204-2.054.31-3.077a3636.75 3636.75 0 013.914-29.736 42158.62 42158.62 0 00-40.855-6.024c-.726-.123-1.69-.256-1.953-1.07-.144-1.03.866-1.656 1.711-1.922 5.567-1.591 11.049-3.459 16.578-5.176C50.928 21.117 83.557 10.762 116.182.4c.862-.249 1.776-.545 2.68-.32z"
                />

                <path
                    fill={PRIMARY_DARK}
                    d="M51.552 55.01c2.12 1.735 4.224 3.493 6.382 5.18-4.974 5.704-10.285 11.163-16.03 16.103 3.577-6.924 6.669-14.086 9.648-21.282zm60.086-49.233c-8.523 6.856-17.21 13.517-25.797 20.298-10.817 8.481-21.63 16.965-32.451 25.443-.948.76-2.012 1.39-2.847 2.283-.883.968-1.19 2.276-1.667 3.462-1.292 3.298-2.73 6.542-4.084 9.82-1.302 3.131-2.683 6.25-4.497 9.129.48-3.968.991-7.931 1.512-11.893l1.574-11.883.774-5.944c.085-.463.037-1.056.542-1.295C55.405 39.037 66 32.661 76.66 26.412c11.66-6.876 23.318-13.755 34.978-20.635z"
                />
            </svg>
        </Box>
    );
}

export default memo(SentIcon);
