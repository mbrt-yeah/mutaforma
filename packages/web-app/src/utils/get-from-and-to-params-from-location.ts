import { Location } from "react-router-dom";
export function getFromAndToParamsFromLocation(location: Location): { from: string, to: string } {
    let from = "";
    let to = "";

    if (location.state) {
        if (location.state.from)
            from = location.state.from;
        if (location.state.to)
            to = location.state.to;
    }

    const fromToParsed = location.pathname.replace("/conversion/", "").split("-to-")

    if (from === "")
        from = fromToParsed[0];

    if (to === "")
        to = fromToParsed[1];

    return { from, to, };
};
