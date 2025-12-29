export interface AttributionData {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    referrer?: string;
    landing_path?: string;
}

export function getAttributionFromLocation(): AttributionData {
    if (typeof window === "undefined") {
        return {};
    }

    const params = new URLSearchParams(window.location.search);

    return {
        utm_source: params.get("utm_source") || undefined,
        utm_medium: params.get("utm_medium") || undefined,
        utm_campaign: params.get("utm_campaign") || undefined,
        utm_term: params.get("utm_term") || undefined,
        utm_content: params.get("utm_content") || undefined,
        referrer: document.referrer || undefined,
        landing_path: window.location.pathname || undefined,
    };
}
