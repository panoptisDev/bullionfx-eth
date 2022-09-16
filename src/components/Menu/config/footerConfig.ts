import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('Navigation'),
    items: [
      {
        label: t('About Us'),
        href: 'https://bullionfx.com/about/',
        isHighlighted: true,
      },
      {
        label: t('Contact'),
        href: 'https://bullionfx.com/contact/',
      },
      {
        label: t('News'),
        href: 'https://bullionfx.com/news/',
      },
      {
        label: t('Terms & Conditions'),
        href: 'https://bullionfx.com/whitepaper/',
      },
    ],
  },
  {
    label: t('Ecosystem'),
    items: [
      {
        label: t('GOLD'),
        href: 'https://bullionfx.com/gold/',
      },
      {
        label: t('BULL'),
        href: 'https://bullionfx.com/bull/',
      },
      {
        label: t('Exchange Trading'),
        href: 'https://bullionfx.com/exchange-trading/',
      },
      {
        label: t('Payments'),
        href: 'https://bullionfx.com/payments/',
      },
    ],
  },
  {
    label: t(''),
    items: [
      {
        label: 'Yield',
        href: 'https://bullionfx.com/yield/',
      },
      {
        label: t('DeFi'),
        href: 'https://bullionfx.com/defi/',
      },
      {
        label: t('Synthetics'),
        href: 'https://bullionfx.com/vault/',
      },
      {
        label: t('DeMi'),
        href: 'https://bullionfx.com/demi/',
      },
    ],
  },
]
