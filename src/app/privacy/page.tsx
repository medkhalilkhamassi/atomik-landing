import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/20 flex flex-col">
            <SiteHeader />

            <div className="flex-1 container mx-auto px-4 py-24 max-w-3xl">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-light tracking-tight mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground">Last updated: December 29, 2025</p>
                </div>

                <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p className="mb-4">
                        At Atomik ("we", "our", or "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or join our waitlist.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
                    <p className="mb-4">
                        We primarily collect information you provide directly to us, such as:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Contact Information:</strong> When you join our waitlist or contact us, we collect your email address, name, and any other details you choose to provide.</li>
                        <li><strong>Usage Data:</strong> We may collect anonymous data about how you interact with our website to improve user experience.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">
                        We use your information for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>To manage our waitlist and notify you when Atomik launches.</li>
                        <li>To communicate with you regarding updates, news, or inquiries.</li>
                        <li>To improve our website and services.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Data Sharing and Security</h2>
                    <p className="mb-4">
                        We do not sell your personal data to third parties. We may share data with trusted service providers (e.g., hosting, email services) solely to operate our business. We implement reasonable security measures to protect your data, though no method of transmission over the Internet is 100% secure.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Your Rights</h2>
                    <p className="mb-4">
                        You may request to be removed from our waitlist or update your information at any time by contacting us at hello@atomik.dev.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@atomik.dev" className="text-primary hover:underline">hello@atomik.dev</a>.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
