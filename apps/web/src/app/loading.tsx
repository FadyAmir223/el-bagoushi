'use client'

import { BounceLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='grid h-screen place-items-center'>
      <BounceLoader size={50} color='#c6984e' />
    </div>
  )
}
