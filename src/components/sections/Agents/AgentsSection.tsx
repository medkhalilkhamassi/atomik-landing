import { TestimonialSlider, type Review } from '@/components/sections/Agents/TestimonialSlider';

export default function Agents() {
    const agents: Review[] = [
        {
            id: 1,
            name: "Mary",
            affiliation: "Analyst Agent",
            quote: "I scan thousands of market signals in seconds so you don't have to guess what features to build.",
            imageSrc: "/images/mary-v3.png",
            thumbnailSrc: "/images/mary-v3.png",
        },
        {
            id: 2,
            name: "John",
            affiliation: "Product Manager Agent",
            quote: "I turn your messy brain dumps into pristine, developer-ready application specs.",
            imageSrc: "/images/john-v3.png",
            thumbnailSrc: "/images/john-v3.png",
        },
        {
            id: 3,
            name: "Sally",
            affiliation: "Designer Agent",
            quote: "I ensure your UI isn't just functional, but pixel-perfect and accessible by default.",
            imageSrc: "/images/sally-v3.png",
            thumbnailSrc: "/images/sally-v3.png",
        },
        {
            id: 4,
            name: "Winston",
            affiliation: "DevOps Agent",
            quote: "I handle the plumbing. CI/CD, infrastructure, and deployment are my playground.",
            imageSrc: "/images/winston-v3.png",
            thumbnailSrc: "/images/winston-v3.png",
        },
        {
            id: 5,
            name: "Murat",
            affiliation: "QA Agent",
            quote: "I break things before your users do. If there's a bug, I'll find it.",
            imageSrc: "/images/murat-v3.png",
            thumbnailSrc: "/images/murat-v3.png",
        },
        {
            id: 6,
            name: "Amelia",
            affiliation: "Security Agent",
            quote: "I keep the gates locked. Vulnerabilities don't stand a chance on my watch.",
            imageSrc: "/images/amelia-v3.png",
            thumbnailSrc: "/images/amelia-v3.png",
        }
    ];

    return (
        <section id="agents" className="min-h-screen flex items-center justify-center bg-background py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Meet Your New Workforce
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                        A specialized team of AI agents working in concert to ship your vision.
                    </p>
                </div>

                <TestimonialSlider reviews={agents} autoplay={true} />
            </div>
        </section>
    );
}
