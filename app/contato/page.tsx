import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";

const channels = [
  {
    icon: Mail,
    label: "E-mail",
    value: "thgmgn@gmail.com",
    href: "mailto:thgmgn@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+55 (48) 99180-8906",
    href: "https://api.whatsapp.com/send?phone=5548991808906&text=Opa%21%20Gostei%20do%20seu%20portf%C3%B3lio.%20Podemos%20conversar%3F",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "@thgmagno",
    href: "https://github.com/thgmagno",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "thgmagno",
    href: "https://www.linkedin.com/in/thgmagno",
  },
];

export default function ContatoPage() {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold">Contato</h1>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {channels.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 ring-1 ring-foreground/10 transition-colors bg-card hover:bg-secondary"
            >
              <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
              <span className="flex flex-col">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
