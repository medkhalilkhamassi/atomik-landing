import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const webhookUrl = process.env.N8N_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('[n8n] Missing N8N_WEBHOOK_URL environment variable');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const formData = await req.formData();
        const formName = formData.get('form-name') as string;

        // Build the payload based on form type
        let payload: Record<string, string | null> = {
            formType: formName === 'waitlist' ? 'waitlist' : formName === 'investor-contact' ? 'investor' : 'unknown',
            submittedAt: new Date().toISOString(),
        };

        // Common fields
        payload.email = formData.get('email') as string || '';
        payload.ctaSource = formData.get('cta_source') as string || 'unknown';

        // UTM & Attribution fields
        payload.utmSource = formData.get('utm_source') as string || '';
        payload.utmMedium = formData.get('utm_medium') as string || '';
        payload.utmCampaign = formData.get('utm_campaign') as string || '';
        payload.utmTerm = formData.get('utm_term') as string || '';
        payload.utmContent = formData.get('utm_content') as string || '';
        payload.referrer = formData.get('referrer') as string || '';
        payload.landingPath = formData.get('landing_path') as string || '';

        // Waitlist-specific fields
        if (formName === 'waitlist') {
            payload.name = formData.get('name') as string || '';
        }

        // Investor-specific fields
        if (formName === 'investor-contact') {
            payload.firstName = formData.get('firstName') as string || '';
            payload.lastName = formData.get('lastName') as string || '';
            payload.company = formData.get('company') as string || '';
            payload.position = formData.get('position') as string || '';
        }

        console.log(`[n8n] Submitting ${formName} form to webhook`);

        // Forward to n8n webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('[n8n] Webhook response not ok:', response.status, response.statusText);
            return NextResponse.json(
                { error: 'Failed to submit to webhook' },
                { status: response.status }
            );
        }

        console.log('[n8n] Webhook submission successful');
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('[n8n] Webhook submission error:', error);

        return NextResponse.json({
            error: 'Failed to submit',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
