import { Link, usePage } from "@inertiajs/react"

const services = {
    "custom-links": {
        heading: "Start with a link people remember.",
        connections: [
            {
                service: "edit-destination",
                title: "Keep the name. Change the page.",
                description:
                    "Point /spring to a new campaign whenever plans change, without changing the address you already shared."
            },
            {
                service: "qr-code-logo",
                title: "Make it easy to scan.",
                description:
                    "Turn that same custom link into a logo-branded QR code for posters, packaging, and presentations."
            },
            {
                service: "link-analytics",
                title: "See what gets attention.",
                description:
                    "Measure visits to your custom links and keep their click history together as campaigns evolve."
            }
        ]
    },
    "edit-destination": {
        heading: "Keep every shared version working.",
        connections: [
            {
                service: "custom-links",
                title: "Give the link a lasting name.",
                description:
                    "Create a readable address like /spring, then refresh its destination as the campaign changes."
            },
            {
                service: "qr-code-logo",
                title: "Update a QR without reprinting.",
                description:
                    "A QR code points to your short link, so you can change the destination and keep the printed code."
            },
            {
                service: "broken-destinations",
                title: "Find problems, then fix them.",
                description:
                    "Monitoring helps surface unavailable destinations; update the link to send visitors somewhere that works."
            }
        ]
    },
    "broken-destinations": {
        heading: "Turn a warning into a better path.",
        connections: [
            {
                service: "edit-destination",
                title: "Fix the link in place.",
                description:
                    "Send visitors to a working page while keeping the short URL already in your posts and materials."
            },
            {
                service: "link-analytics",
                title: "See the impact.",
                description:
                    "Review visits on the link to understand how many people rely on it and where they came from."
            },
            {
                service: "link-tags",
                title: "Keep campaigns organized.",
                description:
                    "Tag links by launch, channel, or client so it is easier to find the ones that need attention."
            }
        ]
    },
    "link-analytics": {
        heading: "Make every click part of the picture.",
        connections: [
            {
                service: "link-tags",
                title: "Compare campaigns clearly.",
                description:
                    "Group links with tags, then use those labels to keep campaign activity easy to find."
            },
            {
                service: "qr-code-logo",
                title: "Measure offline sharing too.",
                description:
                    "Share a branded QR code that points to your short link and brings its visits into the same view."
            },
            {
                service: "edit-destination",
                title: "Keep history as plans change.",
                description:
                    "Update a destination without replacing the short link, so its ongoing activity stays connected."
            }
        ]
    },
    "link-tags": {
        heading: "Give every link a place in your workflow.",
        connections: [
            {
                service: "link-analytics",
                title: "Understand what is working.",
                description:
                    "Use tags to keep campaign links organized while you review their visits and performance."
            },
            {
                service: "custom-links",
                title: "Pair clear names with context.",
                description:
                    "Use a memorable short address and a campaign tag to make links easy to recognize and manage."
            },
            {
                service: "broken-destinations",
                title: "Find the links that need care.",
                description:
                    "Organize important links by project or client so you can quickly find them when a destination needs attention."
            }
        ]
    },
    "qr-code-logo": {
        heading: "One short link, ready for every surface.",
        connections: [
            {
                service: "edit-destination",
                title: "Change the destination, not the code.",
                description:
                    "Your QR code points to a short link, so updating its destination does not mean reprinting the code."
            },
            {
                service: "custom-links",
                title: "Make the address memorable too.",
                description:
                    "Pair a branded QR with a readable short URL for people who would rather type than scan."
            },
            {
                service: "link-analytics",
                title: "Keep an eye on visits.",
                description:
                    "Bring scans and other visits to the same short link into one continuous activity history."
            }
        ]
    }
}

const serviceDetails = {
    "custom-links": {
        label: "Custom links",
        route: "services.custom-links",
        workspaceRoute: "links",
        workspaceAction: "Customize a link"
    },
    "edit-destination": {
        label: "Edit destinations",
        route: "services.edit-destination",
        workspaceRoute: "links",
        workspaceAction: "Update a destination"
    },
    "broken-destinations": {
        label: "Broken destination monitoring",
        route: "services.broken-destinations",
        workspaceRoute: "links",
        workspaceAction: "Review your links"
    },
    "link-analytics": {
        label: "Link analytics",
        route: "services.link-analytics",
        workspaceRoute: "links",
        workspaceAction: "Check link activity"
    },
    "link-tags": {
        label: "Link tags",
        route: "services.link-tags",
        workspaceRoute: "tags",
        workspaceAction: "Manage your tags"
    },
    "qr-code-logo": {
        label: "Branded QR codes",
        route: "services.qr-code-logo",
        workspaceRoute: "links",
        workspaceAction: "Choose a link"
    }
}

export default function ConnectedTools({ service }) {
    const currentService = services[service]
    const { auth } = usePage().props
    const isAuthenticated = Boolean(auth?.user)
    const actionHref = isAuthenticated ? route("links") : route("register")

    if (!currentService) return null

    return (
        <section className="border-b border-line bg-white/40" aria-labelledby="connected-tools-heading">
            <div className="mx-auto max-w-grid px-6 py-16 md:px-10 md:py-20 lg:px-16">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-dark">
                            One link. More ways to make it work.
                        </p>
                        <h2
                            id="connected-tools-heading"
                            className="mt-4 font-editorial text-4xl font-normal leading-tight text-ink sm:text-5xl"
                        >
                            {currentService.heading}
                        </h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted lg:col-span-7 lg:justify-self-end">
                        Create a link once, then customize its address, update its destination, share it as a
                        branded QR code, organize it with tags, and follow its activity. Each tool works on the
                        same link, so the things you have already shared keep working.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 border-l border-t border-line md:grid-cols-3">
                    {currentService.connections.map((connection) => {
                        const relatedService = serviceDetails[connection.service]

                        return (
                            <Link
                                key={connection.service}
                                href={route(
                                    isAuthenticated ? relatedService.workspaceRoute : relatedService.route
                                )}
                                className="group flex min-h-56 flex-col border-b border-r border-line bg-paper p-6 transition-colors hover:bg-white"
                            >
                                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-dark">
                                    Works with {relatedService.label}
                                </span>
                                <h3 className="mt-6 font-grotesk text-lg font-bold text-ink">
                                    {connection.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                                    {connection.description}
                                </p>
                                <span className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink">
                                    {isAuthenticated
                                        ? relatedService.workspaceAction
                                        : `Explore ${relatedService.label}`}
                                    <span
                                        className="transition-transform group-hover:translate-x-1"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                </span>
                            </Link>
                        )
                    })}
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted">See how these tools work together on your own links.</p>
                    <Link
                        href={actionHref}
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-dark transition-colors hover:text-ink"
                    >
                        {auth?.user ? "Manage your links" : "Create your first link"}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
