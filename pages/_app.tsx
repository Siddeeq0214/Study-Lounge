import type { ReactElement, ReactNode } from 'react';
import ReactDOM from "react-dom";
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {RecoilRoot} from "recoil";
import FullScreenSpinner from '@/components/Spinners/FullScreenSpinner';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function TokyoApp(props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  // Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    document.body.classList.add("body-page-transition");
    ReactDOM.render(
      <FullScreenSpinner path={url} />,
      document.getElementById("page-transition")
    );
  });
  Router.events.on("routeChangeComplete", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
  });
  Router.events.on("routeChangeError", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
  });
  // Router.events.on('routeChangeError', nProgress.done);
  // Router.events.on('routeChangeComplete', nProgress.done);

  return (
      <CacheProvider value={emotionCache}>
        <RecoilRoot>
          <Head>

            <link rel="manifest" href="/manifest.json"/>

            <title>Study-Lounge</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <SidebarProvider>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </LocalizationProvider>
            </ThemeProvider>
          </SidebarProvider>
        </RecoilRoot>
      </CacheProvider>
  );
}

export default TokyoApp;
