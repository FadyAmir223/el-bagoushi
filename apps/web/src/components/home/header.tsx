import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'

import logoIcon from '@/../public/assets/images/logo.svg'
import { cn } from '@/utils/cn'

const social = [
  {
    label: 'زور صفحة الفيسبوك',
    url: 'https://www.facebook.com/',
    icon: FaFacebookF,
  },
  {
    label: 'زور صفحة الانستجرام',
    url: 'https://www.instagram.com/',
    icon: FaInstagram,
  },
  {
    label: 'تواصل معنا عبر واتساب',
    url: 'https://wa.me/201040567008',
    icon: FaWhatsapp,
  },
  {
    label: 'تواصل معنا عبر تيليجرام',
    url: 'https://t.me/romanyelbagoushi',
    icon: FaTelegram,
  },
  {
    label: 'تواصل معنا عبر الايميل',
    url: 'mailto:elbagoushi@gmail.com',
    icon: IoMdMail,
  },
]

export default function Header() {
  return (
    <header className='bg-primary-foreground py-3'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <Image src={logoIcon} alt='logo' className='w-20' priority />
        </Link>

        <ul className='flex items-center gap-x-1.5 sm:gap-x-3'>
          {social.map(({ label, url, icon: Icon }) => (
            <li key={url}>
              <a
                href={url}
                target='_blank'
                aria-label={label}
                className={cn(
                  'group block rounded-full border-2 border-primary-foreground p-1 transition-opacity hover:border-primary/80 hover:text-primary/80',
                )}
              >
                <Icon
                  className={cn('size-5 text-primary group-hover:text-primary/80')}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
