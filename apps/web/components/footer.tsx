import { BookOpen, Github, Mail, MapPinned, Presentation, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../CitePay.png";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Home", icon: Presentation },
      { href: "/query", label: "Query Console", icon: BookOpen },
      { href: "/dashboard", label: "Dashboard", icon: Wallet },
      { href: "/publishers", label: "Publishers", icon: MapPinned }
    ]
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Docs", icon: BookOpen },
      { href: "https://lepton.thecanteenapp.com/", label: "Lepton Hackathon", icon: MapPinned }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "https://github.com/thetruesammyjay", label: "GitHub", icon: Github },
      { href: "mailto:hello@citepay.app", label: "Contact", icon: Mail }
    ]
  }
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto w-[min(1180px,calc(100%-2rem))] py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl border border-sky-100 bg-sky-50">
                <Image alt="CitePay" className="h-8 w-8 object-contain" priority src={logo} />
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-slate-950">CitePay</p>
                <p className="text-sm text-slate-500">AI answers that pay their sources</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              CitePay is a citation economy for research assistants. Sources are discovered, ranked, paid, and cited with transparent USDC micropayments.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-900">{group.title}</h3>
                <ul className="space-y-3">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <Link
                          className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-sky-700"
                          href={link.href}
                          target={link.href.startsWith("http") || link.href.startsWith("mailto:") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          <Icon className="size-4" />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 CitePay. Built for the Lepton Hackathon.</p>
          <p>Blue, white, and black with verified source payments.</p>
        </div>
      </div>
    </footer>
  );
}
