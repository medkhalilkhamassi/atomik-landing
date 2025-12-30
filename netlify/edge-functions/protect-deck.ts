import type { Context, Config } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("key");
    const validToken = "atomik-investor";

    // If valid token, serve the content
    if (token === validToken) {
        // Rewrite to the actual static file
        return context.rewrite("/deck-assets/index.html");
    }

    // Otherwise, redirect to home
    return Response.redirect(new URL("/", request.url), 307);
};

export const config: Config = {
    path: "/deck",
};
