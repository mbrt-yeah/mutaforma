import classes from "./AppShell.module.css";

import { PropsWithChildren } from "react";

import { AppHeader } from "../app-header/AppHeader";
import { AppMainNav } from "../app-main-nav/AppMainNav";

export function AppShell({ children }: PropsWithChildren ) {
    return (
        <div className={classes.appShell}>
            <AppHeader />
            <AppMainNav />
            <main>
                {children}
            </main>
        </div>
    )
};