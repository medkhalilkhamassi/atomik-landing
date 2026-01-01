import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method not allowed" }),
        };
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
        console.error("[n8n] Missing N8N_WEBHOOK_URL environment variable");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server configuration error" }),
        };
    }

    try {
        // Parse form data from body
        const body = event.body || "";
        const isBase64 = event.isBase64Encoded;
        const decodedBody = isBase64 ? Buffer.from(body, "base64").toString("utf-8") : body;

        // Parse URL-encoded form data
        const params = new URLSearchParams(decodedBody);
        const formName = params.get("form-name") || "";

        // Build the payload based on form type
        const payload: Record<string, string | null> = {
            formType: formName === "waitlist" ? "waitlist" : formName === "investor-contact" ? "investor" : "unknown",
            submittedAt: new Date().toISOString(),
        };

        // Common fields
        payload.email = params.get("email") || "";
        payload.ctaSource = params.get("cta_source") || "unknown";

        // UTM & Attribution fields
        payload.utmSource = params.get("utm_source") || "";
        payload.utmMedium = params.get("utm_medium") || "";
        payload.utmCampaign = params.get("utm_campaign") || "";
        payload.utmTerm = params.get("utm_term") || "";
        payload.utmContent = params.get("utm_content") || "";
        payload.referrer = params.get("referrer") || "";
        payload.landingPath = params.get("landing_path") || "";

        // Waitlist-specific fields
        if (formName === "waitlist") {
            payload.name = params.get("name") || "";
        }

        // Investor-specific fields
        if (formName === "investor-contact") {
            payload.firstName = params.get("firstName") || "";
            payload.lastName = params.get("lastName") || "";
            payload.company = params.get("company") || "";
            payload.position = params.get("position") || "";
        }

        console.log(`[n8n] Submitting ${formName} form to webhook`);

        // Forward to n8n webhook
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error("[n8n] Webhook response not ok:", response.status, response.statusText);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: "Failed to submit to webhook" }),
            };
        }

        console.log("[n8n] Webhook submission successful");
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error("[n8n] Webhook submission error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to submit",
                details: error instanceof Error ? error.message : String(error),
            }),
        };
    }
};

export { handler };
