import Link from "next/link";
import Image from "next/image";

const footerNav = [
  {
    heading: "Organisation",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about#team", label: "Leadership" },
      { href: "/about#methodology", label: "Methodology" },
      { href: "/about#values", label: "Values" },
    ],
  },
  {
    heading: "Work",
    links: [
      { href: "/research", label: "Research & Publications" },
      { href: "/projects", label: "Projects" },
      { href: "/about#services", label: "Services" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/contact#inquiries", label: "Partnerships" },
      { href: "mailto:llabafrica009@gmail.com", label: "Email Us" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-forest)] text-[var(--color-mist)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Livelihood Lab Africa"
                width={180}
                height={58}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-[var(--color-sage-light)] leading-relaxed max-w-xs mt-6">
              A Kenyan consultancy firm providing evidence-based research,
              strategic advisory and capacity development across Africa.
            </p>

            <div className="mt-8 space-y-1.5">
              <p className="text-xs tracking-widest uppercase text-[var(--color-sage)] mb-3">
                Contact
              </p>
              <a
                href="mailto:llabafrica009@gmail.com"
                className="block text-sm text-[var(--color-mist-dark)] hover:text-[var(--color-amber)] transition-colors duration-200"
              >
                llabafrica009@gmail.com
              </a>
              <p className="text-sm text-[var(--color-sage-light)]">
                P.O. Box 21461-00505
                <br />
                Nairobi, Kenya
              </p>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-4 lg:pl-8">
            {footerNav.map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-sage)] mb-5">
                  {heading}
                </p>
                <ul className="space-y-3">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-[var(--color-mist-dark)] hover:text-[var(--color-amber)] transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-earth)] py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-sage)] tracking-wide">
            © {new Date().getFullYear()} Livelihood Lab Africa Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-[var(--color-sage)]">
              Reg: PVT-6Y1Y65Y6 &nbsp;·&nbsp; KRA PIN: P052468475W
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
