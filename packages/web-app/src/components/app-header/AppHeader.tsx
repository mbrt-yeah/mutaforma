import { Title } from "@mantine/core";

import classes from "./AppHeader.module.css";

export function AppHeader() {
    return (
        <header className={classes.appHeader}>
            <img
                className={classes.appHeaderImg}
                height="80"
                width="80"
                src="/logo.svg"
            />
            <Title order={1} size="h1">Mutaforma</Title>
        </header>
    )
};