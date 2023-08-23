'use client'

import Image from 'next/image'

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className='relative w-full min-h-[10rem]'>
      <Image alt='image' className='object-cover' fill src={src} />
    </div>
  )
}

export default CustomImageRenderer