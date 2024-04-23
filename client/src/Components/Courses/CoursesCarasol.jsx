import React from 'react'
import Autoplay from "embla-carousel-autoplay"
import UIUX from "../../../public/UI UX Logo.svg"
import { Card, CardContent } from "@/Components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel"
function CoursesCarasol() {

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <div className='mt-[16px] pb-5 pt-12 py-4 '>
        <div className=' text-[18px] 1000px:text-[24px] text-center font-medium'>
        Learn Tech from Latest Courses
        </div>
        <div className=' text-[13px] 1000px:text-[17px] font-light text-center px-5 mt-5'>
        Explore 17+ Premium Courses with New Course Additions every Month.
        </div>
      <div className=' flex justify-center px-5 py-7 mt-10'>
      <Carousel 
      plugins={[plugin.current]}
      className="w-[80%] 1000px:w-[90%] max-w-[1300px]   flex justify-center items-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
        <CarouselNext />
      <CarouselPrevious />
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
             <CarouselItem key={index} className=" 800px:basis-1/2 1000px:basis-1/3 w-full">
            <div className="">
              <Card>
                <CardContent className="h-full w-full">
                  <div className=' flex flex-col '>
                    <img
                      src={UIUX}
                      className="w-full h-[140px] 800px:h-[160px] 1000px:h-[180px] border-b "
                    />
                    <div className='p-3'>
                      <div>C++ Programing</div>
                      <div  className=' flex gap-5 mt-4 items-center justify-between'>
                        <h3>
                          English
                        </h3>
                        <h3>
                          400 Enrolled
                        </h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>

      </div>
    </div>
  )
}

export default CoursesCarasol
