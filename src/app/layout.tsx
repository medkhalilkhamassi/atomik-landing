import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atomik.dev'),
  title: "Atomik | Specs In → Code Out",
  description: "Atomik turns vague ideas into testable micro-tasks, gets them built by vetted developers, and releases payment only when automated tests pass.",
  openGraph: {
    title: "Atomik | Specs In → Code Out",
    description: "Atomik turns vague ideas into testable micro-tasks and delivers production-ready code through vetted developers — faster, safer, and fully auditable.",
    url: "https://atomik.dev",
    siteName: "Atomik",
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: "Atomik - Specs In, Code Out",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atomik | Specs In → Code Out",
    description: "Atomik turns vague ideas into testable micro-tasks and delivers production-ready code through vetted developers — faster, safer, and fully auditable.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "https://atomik.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Atomik",
        "url": "https://atomik.dev",
        "logo": "https://atomik.dev/og.png",
        "description": "Atomik turns vague ideas into testable micro-tasks and delivers production-ready code through vetted developers."
      },
      {
        "@type": "WebSite",
        "name": "Atomik",
        "url": "https://atomik.dev",
        "description": "Platform for converting specs into verified code.",
        "publisher": {
          "@type": "Organization",
          "name": "Atomik"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What exactly do I get?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You get production-ready code that passes your specifications and automated tests. It's not a prototype; it's a merged pull request."
            }
          },
          {
            "@type": "Question",
            "name": "How do you prevent bad work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We don't rely on reviews. We rely on tests. If the code doesn't pass the provided test suite, the developer doesn't get paid. The system is binary."
            }
          },
          {
            "@type": "Question",
            "name": "What stacks do you support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Currently we are optimized for modern web stacks: React, Next.js, Node.js, Python, and TypeScript. More specific constraints can be defined in your specs."
            }
          },
          {
            "@type": "Question",
            "name": "How fast is it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most micro-tasks are claimed within minutes and completed within 12 hours. You can parallelize dozens of tasks to build features overnight."
            }
          },
          {
            "@type": "Question",
            "name": "Who owns the code?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You do. 100%. Code is work-for-hire and ownership transfers upon payment release from escrow."
            }
          },
          {
            "@type": "Question",
            "name": "How do developer payouts work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Payouts are instant upon verified test completion. We handle the escrow and transfer, developers get paid in USD or USDC."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}


