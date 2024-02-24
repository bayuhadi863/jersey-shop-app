import "./bootstrap";
import "../css/app.css";
import "@mantine/core/styles.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
    primaryColor: "bright-orange",
    colors: {
        "bright-orange": [
            "#fff0e4",
            "#ffe0cf",
            "#fac0a1",
            "#f69e6e",
            "#f28043",
            "#f06d27",
            "#f06418",
            "#d6530c",
            "#bf4906",
            "#a73c00",
        ],
    },
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
            <MantineProvider theme={theme}>
                <App {...props} />
            </MantineProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
