import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import "@/styles/globals.css";
import { MantineProvider, Notification } from "@mantine/core";
import type { AppProps } from "next/app";
import { Notifications } from "@mantine/notifications";
import { MapperContextProvider } from "@/components/SchemaMapper/Context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications position="top-right" />
      <MapperContextProvider>
        <Component {...pageProps} />
      </MapperContextProvider>
    </MantineProvider>
  );
}
