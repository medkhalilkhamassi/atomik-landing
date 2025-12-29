import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "You're on the list | Atomik",
    description: "Thanks for joining the Atomik waitlist.",
}

export default function SuccessLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
