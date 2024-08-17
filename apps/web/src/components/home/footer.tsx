import { FaFacebookF, FaInstagram } from 'react-icons/fa6'

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
]

export default function Footer() {
  return (
    <footer className='mt-auto bg-primary-foreground/90 py-3'>
      <div className='container text-center'>
        <div className='mb-3 flex items-center justify-center gap-x-5'>
          <p className=''>تابعنا على</p>
          <ul className='flex items-center gap-x-1.5'>
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
        <p className=''>العنوان: مول بانوراما شارع الزيتون - الزيتون - القاهره</p>
        <p className='mt-5 text-xs'>
          &copy; جميع الحقوق محفوظة
          <span className='text-[0.625rem]'> {new Date().getFullYear()} </span> |
          El-Bagoushi
        </p>
      </div>
    </footer>
  )
}
