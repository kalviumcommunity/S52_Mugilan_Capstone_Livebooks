import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import BrowesCollection from '../Components/BrowesCollection'
import Hero2 from '../Components/Hero2'
function Home() {
  const [open, setOpen] =useState( false)
  const [activeItem, setactiveItem] =useState(0)
  return (
    <div className='font-Unbounded'>
      <Heading 
      title='Hogwarts'
      description="this is the e learning program"
      keywords="program, programming, mern stack , mern , full stack, stack"
      />
      <Header 
      open= {open}
      setOpen= {setOpen}
      activeItem= {activeItem}
      />

      <Hero />
      <BrowesCollection />
      <Hero2 />
    <div className="mt-10 p-5">
    <div className=' flex items-center justify-center'>
      <div className=' text-[20px] text-center font-medium '>
        LEARN THE BEST FROM THE ALUMNI OF
      </div>

    </div>



    </div>



      
    </div>
  )
}

export default Home
