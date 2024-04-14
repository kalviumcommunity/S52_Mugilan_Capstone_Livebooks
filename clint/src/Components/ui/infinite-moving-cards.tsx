"use client";
import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "right") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  let previousNumber;

  function getRandomNumber() {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * 5) + 1;
    } while (randomNumber === previousNumber);

    previousNumber = randomNumber;
    return randomNumber;
  }
  const colors = [ "#FE90E7", "#89EC87", "#87A1EC","#FEC901","#FE90E7"];

  return (
    
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-8xl overflow-hidden ",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-20 py-6 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          
          <li
          className={`w-[350px] min-h-[240px] shadow-lg drop-shadow-sm max-w-full relative rounded-2xl border border-b-0 bg-[${colors[getRandomNumber()]}] flex-shrink-0 border-s px-8 py-6 pb-8 800px:w-[500px]`}
          key={item.name}
        >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className=" relative z-20 text-[12px] 1000px:text-[16px] leading-[1.6] text-black font-Unbounded font-light">
                {item.quote}
              </span>
              <div className=" py-2 pr-3 absolute bottom-0 flex items-center">
                <div className=" flex items-center justify-center w-[50px] h-[50px] mr-5">
                  <img className=" w-[100px] h-[50px] content-center rounded-full" src={item.image} alt="" />
                </div>

                <div className=" z-20 my-4 flex flex-row items-center  w-[4/5]">
                  <div className="flex flex-col justify-center gap-1">
                    <span className=" text-[15px] leading-[1.6] text-black font-Unbounded  font-medium ">
                      {item.name}
                    </span>
                    <span className=" text-[12px] leading-[1.6] text-black font-Unbounded  font-light">
                      {item.title}
                    </span>
                  </div>
                </div>


              </div>
              
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
