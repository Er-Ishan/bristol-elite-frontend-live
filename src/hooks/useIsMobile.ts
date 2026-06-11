import { useLayoutEffect, useState } from "react";

function getMatches(query: string): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
}

/** Matches template / Bootstrap mobile breakpoints. */
export function useIsMobile(maxWidth = 767): boolean {
    const query = `(max-width: ${maxWidth}px)`;
    const [isMobile, setIsMobile] = useState(() => getMatches(query));

    useLayoutEffect(() => {
        const media = window.matchMedia(query);
        const onChange = () => setIsMobile(media.matches);
        onChange();
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [query]);

    return isMobile;
}
