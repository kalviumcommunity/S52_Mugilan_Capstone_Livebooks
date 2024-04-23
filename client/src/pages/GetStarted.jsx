import GetStarted1 from '@/Components/GetStarted/GetStarted1';
import Header from '@/Components/HomepageComponents/Header';
import Heading from '@/utils/Heading';
import { useState } from 'react'

function GetStarted() {
    const [open, setOpen] = useState(false);
    const [activeItem, setactiveItem] = useState(0);
  
    return (
      <>
        <Heading
          title="Get Started with Hogwarts"
          description="Contact Hogworts team"
          keywords="connect, contact, email, phone , number , phone no, gmail, contact us"
        />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} />
        <GetStarted1 />
    </>
  )
}

export default GetStarted
