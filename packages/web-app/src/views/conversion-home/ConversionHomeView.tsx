import { redirect } from "react-router";

import { AppShell } from "../../components/app-shell/AppShell";

export function ConversionHomeView() {
    redirect("conversion/docx-to-html");
    return (
        <AppShell>
            
        </AppShell>
    )
};