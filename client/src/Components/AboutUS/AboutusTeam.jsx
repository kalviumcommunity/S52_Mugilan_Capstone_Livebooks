import { Header } from '@radix-ui/react-accordion'
import { Heading } from 'lucide-react'
import React from 'react'
import AboutUsCards from './AboutUsCards'
import Sabari from "../../assets/teamImages/Sabari.jpeg";
import Shnekithaa from "../../assets/teamImages/Shnekithaa.jpeg";
import Kavin from "../../assets/teamImages/Kavin.jpeg";
import Vedhu from "../../assets/teamImages/Vedhu.jpeg";
import Jaiabhisshek from "../../assets/teamImages/Jaiabhisshek.jpeg";
import Mugilan from "../../assets/teamImages/Mugilan.jpeg";
import Footer from '../Footer';

function AboutusTeam() {

  return (
    <>
      <div className='p-4'>
        <div className='text-[24px] text-center'>
        Out Team
        </div>
        <div>
        <div className="flex  justify-center mt-10 items-center w-full p-10">
        <div className=" w-full">
          <div className="grid grid-cols-1 px-2 800px:grid-cols-2 1000px:grid-cols-3 gap-10 flex-wrap">
            <AboutUsCards
              name={"Mugilan"}
              posting={"Co-Founder"}
              subHeading={"MERN Stack at"}
              image={Mugilan}
              linkedin={
                "https://www.linkedin.com/in/mugilansakthivel/"
              }
            />
            <AboutUsCards
              name={"Sabari"}
              posting={"Co-Founder"}
              subHeading={"MERN Stack at"}
              image={Sabari}
              linkedin={
                "https://www.linkedin.com/in/sabari-narayana-71621623b/"
              }
            />
            <AboutUsCards
              name={"Shnekithaa"}
              posting={"Developer"}
              subHeading={"MERN Stack "}
              image={Shnekithaa}
              linkedin={
                "https://www.linkedin.com/in/balashnekithaa-satheesh-kumar-1886242b3/"
              }
            />
            <AboutUsCards
              name={"Kavin"}
              posting={"Developer"}
              subHeading={"MERN Stack"}
              image={Kavin}
              linkedin={
                "https://www.linkedin.com/in/sabari-narayana-71621623b/"
              }
            />
            <AboutUsCards
              name={"Vedhu"}
              posting={"Developer"}
              subHeading={"MERN Stack"}
              image={Vedhu}
              linkedin={
                "https://www.linkedin.com/in/sabari-narayana-71621623b/"
              }
            />
            <AboutUsCards
              name={"Jaiabhisshek"}
              posting={"Digital marketer"}
              subHeading={"MERN Stack"}
              image={Jaiabhisshek}
              linkedin={
                "https://www.linkedin.com/in/jai-abhisshek-b2a656292/"
              }
            />
          </div>
        </div>
      </div>
        </div>

      </div>
      <Footer />
      
    </>
  )
}

export default AboutusTeam
