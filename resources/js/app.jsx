/* eslint-disable react/react-in-jsx-scope */
import "./bootstrap";
import "../css/app.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import "@mantine/carousel/styles.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  primaryColor: "blue",
  colors: {
    blue: [
      "#eaf3ff",
      "#d9e2f8",
      "#b2c3e9",
      "#89a1db",
      "#6685cf",
      "#4f73c8",
      "#436ac5",
      "#3459af",
      "#2b4f9d",
      "#1e448d",
    ],
  },
  black: "#334155",
});

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <MantineProvider theme={theme}>
        <Notifications />
        <App {...props} />
      </MantineProvider>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
