import Link from 'next/link'
import React from 'react'

const navitems = [
    {
        name:'Home',
        href:'/'
    },
    {
        name:'How to Use',
        href:'/how-to-use'
    },
    {
        name:'Privacy Policy',
        href:'/privacy-policy'
    }
]

const Nav = () => {
  return (
  <div className="fixed flex justify-center w-screen h-16 z-40">
      <div className='flex justify-center gap-4 rounded-full items-center mt-6 px-6 py-2.5 mx-auto bg-black/10 backdrop-blur-lg  border border-white z-50 top-4' >
       {navitems.map((item)=>(
        <Link href={item.href} key={item.name} className='text-white hover:text-orange-400 transition-colors flex'>
            {item.name}
        </Link>
       ))}
    </div>
  </div>
  )
}

export default Nav