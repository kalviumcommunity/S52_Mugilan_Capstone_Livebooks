import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Amazon from "../../assets/University /Amazon-logo.png";
import Google from "../../assets/University /Googole image.jpg";
import Bomb from "../../assets/University /IIT Bomb ay.jpg";
import Dehli from "../../assets/University /IIT Dehli.png";
import icrosoft from "../../assets/University /Microsoft_logo_(2012).svg.png";
import Standford from "../../assets/University /Stanford-University-Logo.jpg";
export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container w-[300px] h-[100px] border border-black">
        <div className="embla__slide  flex justify-center items-center">
          <img src={Amazon} className="w-[100px] h-[100px]" alt="Amazon" />
          <img src={Amazon} className="w-[100px] h-[100px]" alt="Amazon" />
        </div>

        <div className="embla__slide flex justify-center items-center">
          <img src={Google} className="w-[100px] h-[100px]" alt="Google" />
        </div>
        <div className="embla__slide flex justify-center items-center">
          <img src={Google} className="w-[100px] h-[100px]" alt="Google" />

        </div>
      </div>
    </div>
  );
}
