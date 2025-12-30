import type { Context } from "@netlify/functions";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export default async (req: Request, context: Context) => {
    // Only allow POST
    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const formData = await req.formData();
        const formName = formData.get("form-name") as string;

        const GOOGLE_SERVICE_ACCOUNT_EMAIL = Netlify.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
        const GOOGLE_PRIVATE_KEY = Netlify.env.get("GOOGLE_PRIVATE_KEY");
        const GOOGLE_SHEET_ID = Netlify.env.get("GOOGLE_SHEET_ID");

        if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
            console.error("Missing Google Sheets credentials");
            return Response.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Initialize Auth
        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        // Determine which sheet to use
        let sheet;
        let rowData: Record<string, string> = {};

        const date = new Date().toISOString();
        const email = (formData.get("email") as string) || "";

        if (formName === "waitlist") {
            sheet = doc.sheetsByTitle["Waitlist"];
            rowData = {
                Email: email,
                Date: date,
                Source: (formData.get("cta_source") as string) || "unknown",
            };
        } else if (formName === "investor-contact") {
            sheet = doc.sheetsByTitle["Investors"];
            rowData = {
                Name: `${formData.get("firstName")} ${formData.get("lastName")}`,
                Email: email,
                Company: (formData.get("company") as string) || "",
                Position: (formData.get("position") as string) || "",
                Date: date,
            };
        } else {
            return Response.json({ error: "Unknown form name" }, { status: 400 });
        }

        if (!sheet) {
            console.error(`Sheet not found for form: ${formName}`);
            return Response.json({ error: "Sheet not found" }, { status: 500 });
        }

        await sheet.addRow(rowData);

        return Response.json({ success: true });

    } catch (error) {
        console.error("Google Sheets API Error:", error);
        return Response.json({
            error: "Failed to submit",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
};

export const config = {
    path: "/api/submit-to-sheet"
};
