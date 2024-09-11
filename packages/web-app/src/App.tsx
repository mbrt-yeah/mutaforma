import "@mantine/core/styles.css";

import { createBrowserRouter, RouteObject, RouterProvider, } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import { ConversionView } from "./views/conversion/ConversionView";
import { ConversionHomeView } from "./views/conversion-home/ConversionHomeView";
import { AllowedConversions } from "./allowed-conversions";

const routes: RouteObject[] = [];

for (const entry of AllowedConversions.entries) {
    const from = entry.from.fileExtension;
    const to = entry.to.fileExtension;

    if (!from || !to)
        continue;

    const route: RouteObject = {
        path: `/conversion/${from}-to-${to}`,
        element: <ConversionView />
    }
    routes.push(route);
}

const router = createBrowserRouter([
    {
        path: "/conversion",
        element: <ConversionHomeView />,
    },
    ...routes,
]);

export function App() {
    return (
        <MantineProvider>
            <RouterProvider router={router} />
        </MantineProvider>
    )
};
