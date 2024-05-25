import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';

import Link from 'src/components/Link';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import {signOut} from "@firebase/auth";
import AppUtil from "@/AppUtil";
import LoginButton from "@/components/Buttons/LoginButton";
import RegisterButton from "@/components/Buttons/RegisterButton";

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

// const MuiAvatar = styled(Box)(
//   ({ theme }) => `
//     width: ${theme.spacing(8)};
//     height: ${theme.spacing(8)};
//     border-radius: ${theme.general.borderRadius};
//     background-color: #e5f7ff;
//     flex-shrink: 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto ${theme.spacing(2)};
//
//     img {
//       width: 60%;
//       height: 60%;
//       display: block;
//     }
// `
// );
//
// const TsAvatar = styled(Box)(
//   ({ theme }) => `
//     width: ${theme.spacing(8)};
//     height: ${theme.spacing(8)};
//     border-radius: ${theme.general.borderRadius};
//     background-color: #dfebf6;
//     flex-shrink: 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto ${theme.spacing(2)};
//
//     img {
//       width: 60%;
//       height: 60%;
//       display: block;
//     }
// `
// );
//
// const NextJsAvatar = styled(Box)(
//   ({ theme }) => `
//   width: ${theme.spacing(8)};
//   height: ${theme.spacing(8)};
//   border-radius: ${theme.general.borderRadius};
//   background-color: #dfebf6;
//   flex-shrink: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto ${theme.spacing(2)};
//
//     img {
//       width: 60%;
//       height: 60%;
//       display: block;
//     }
// `
// );

function Hero() {
  const [currUser, authLoading, userError] = useAuthState(auth);

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version {AppUtil.APP_VERSION}</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            StudyLounge
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
          </TypographyH2>
          {
            currUser ? (
                <Button
                    component={Link}
                    href="/profile"
                    size="large"
                    variant="contained"
                >
                  Go To App
                </Button>
            ) : (
                <>
                  <LoginButton />
                  <RegisterButton />
                </>
            )
          }
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
