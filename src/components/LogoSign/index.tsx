import {
  Box,
  Tooltip,
  Badge,
  TooltipProps,
  tooltipClasses,
  styled,
  useTheme, Avatar
} from '@mui/material';
import Link from 'src/components/Link';
import { textAlign } from '@mui/system';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
`
);

const LogoSign = styled(Box)(
  () => `
        position: relative;
        width: 100%;
        height: 100%;
`
);

const LogoSignInner = styled(Box)(
  () => `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: black;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`
);

const LogoSignTop = styled(Box)(
  () => `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: brown;
`
);

const LogoSignBottom = styled(Box)(
  () => `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: darkgoldenrod;
`
);

const Logo = () => {
    const theme = useTheme();
    return (
        <Link style={{ textDecoration: 'none' }} href={'/'}>
            <Avatar
                sx={{
                    mx: 'auto',
                    m: 1,
                    width: theme.spacing(10),
                    height: theme.spacing(10),
                    textAlign: 'center'
                }}
                variant="rounded"
                alt="Study-Lounge"
                src="/images/logos/logo.png"
            />
        </Link>
    );
};


export default Logo;
