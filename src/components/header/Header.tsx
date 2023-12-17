import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='mb-10'>
    <div className="logo_wrapper rounded-full inline-block">
      <Image
      src={'/assets/images/logo.png'}
      width={70}
      height={70}
      alt='logo'
      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 xl:w-24 xl:h-24"
      priority={true}
      style={{ borderRadius: '50%' }}
      ></Image>
    </div>
    </header>
  )
}
