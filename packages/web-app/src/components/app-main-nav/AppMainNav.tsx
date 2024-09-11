import { Button, ComboboxItem, NativeSelect, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";

import classes from "./AppMainNav.module.css";

import { AllowedConversions } from "../../allowed-conversions";

const fromData: ComboboxItem[] = []
const toData: ComboboxItem[] = [];

for (const entry of AllowedConversions.getDistinctSources()) {
    fromData.push({
        label: entry.from.fileExtension,
        value: entry.from.fileExtension,
    });
}

for (const entry of AllowedConversions.getDistinctTargets()) {
    toData.push({
        label: entry.to.fileExtension,
        value: entry.to.fileExtension,
    });
}

export function AppMainNav() {
    const [from, setFrom] = useState<string>("docx");
    const [to, setTo] = useState<string>("html");
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        return navigate(`/conversion/${from}-to-${to}`, {
            state: { from, to, }
        });
    }

    return (
        <>
        <nav className={classes.mainNav}>
            <form className={classes.mainNavForm} onSubmit={handleSubmit}>
                <Text size="sm">Convert</Text>
                <NativeSelect 
                    classNames={{
                        root: classes.nativeSelectRoot,
                        input: classes.nativeSelectInput
                    }}
                    data={fromData}
                    name="from"
                    size="xs" 
                    onChange={(event) => setFrom(event.currentTarget.value)}
                />
                <Text size="sm">to</Text>
                <NativeSelect
                    classNames={{
                        root: classes.nativeSelectRoot,
                        input: classes.nativeSelectInput
                    }}
                    data={toData}
                    name="to"
                    size="xs"
                    onChange={(event) => setTo(event.currentTarget.value)}
                />
                <Button className={classes.mainNavFormGoBtn} color="teal" size="xs" type="submit" variant="filled">Go</Button>
            </form>
        </nav>

        </>
    )
};