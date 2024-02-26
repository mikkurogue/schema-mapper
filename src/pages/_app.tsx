import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import "@mantine/notifications/styles.css";

import "@/styles/globals.css";
import { MantineProvider, Notification } from "@mantine/core";
import type { AppProps } from "next/app";
import { Notifications } from "@mantine/notifications";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications position="top-right" />

      <Component {...pageProps} />
    </MantineProvider>
  );
}
