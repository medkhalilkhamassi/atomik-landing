import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const formName = formData.get('form-name') as string;

        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            console.error('Missing Google Sheets credentials');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Initialize Auth
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        // Determine which sheet (tab) to use
        let sheet;
        let rowData: Record<string, string> = {};

        // Common fields
        const date = new Date().toISOString();
        const email = formData.get('email') as string || '';

        if (formName === 'waitlist') {
            sheet = doc.sheetsByTitle['Waitlist'];
            // Fallback if sheet doesn't exist? (Ideally create it, but for now assume it exists)
            rowData = {
                Email: email,
                Date: date,
                Source: (formData.get('cta_source') as string) || 'unknown',
            };
        } else if (formName === 'investor-contact') {
            sheet = doc.sheetsByTitle['Investors'];
            rowData = {
                Name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                Email: email,
                Company: (formData.get('company') as string) || '',
                Position: (formData.get('position') as string) || '',
                Date: date,
            };
        } else {
            return NextResponse.json({ error: 'Unknown form name' }, { status: 400 });
        }

        if (!sheet) {
            console.error(`Sheet "${formName === 'waitlist' ? 'Waitlist' : 'Investors'}" not found`);
            return NextResponse.json({ error: 'Sheet not found' }, { status: 500 });
        }

        await sheet.addRow(rowData);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Google Sheets API Error:', error);

        // Detailed error logging
        if (error instanceof Error) {
            console.error('Error Name:', error.name);
            console.error('Error Message:', error.message);
            console.error('Error Stack:', error.stack);
        }

        return NextResponse.json({
            error: 'Failed to submit',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
