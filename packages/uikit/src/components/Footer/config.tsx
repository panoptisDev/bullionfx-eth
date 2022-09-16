import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, MediumIcon, FacebookIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "Navigation",
    items: [
      {
        label: "About Us",
        href: "https://bullionfx.com/about/",
      },
      {
        label: "Contact",
        href: "https://bullionfx.com/contact/",
      },
      {
        label: "News",
        href: "https://bullionfx.com/news/",
      },
      {
        label: "Terms & Conditions",
        href: "https://bullionfx.com/whitepaper/",
      },
    ],
  },
  {
    label: "Ecosystem",
    items: [
      {
        label: "GOLD",
        href: "https://bullionfx.com/gold/",
      },
      {
        label: "BULL",
        href: "https://bullionfx.com/bull/",
      },
      {
        label: "Exchange Trading",
        href: "https://bullionfx.com/exchange-trading/",
      },
      {
        label: "Payments",
        href: "https://bullionfx.com/payments/",
      },
    ],
  },
  {
    label: "",
    items: [
      {
        label: "Yield",
        href: "https://bullionfx.com/yield/",
      },
      {
        label: "DeFi",
        href: "https://bullionfx.com/defi/",
      },
      {
        label: "Synthetics",
        href: "https://bullionfx.com/vault/",
      },
      {
        label: "DeMi",
        href: "https://bullionfx.com/demi/",
      },
    ],
  },
];

export const socials = [
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "#"
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "#",
  },
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "#",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "#",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
