/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Typography,Container } from '@mui/joy';
import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    img: string;
    name: string;
    title: string;
    githubLink:string;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (direction === "left") {
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
        containerRef.current.style.setProperty("--animation-duration", "18s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <Container
        ref={containerRef}
        className={cn(
            "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_left,transparent,white_20%,white_80%,transparent)]",
            className
        )}
        sx={{
        width: 'calc(100vw - 10px)'
        }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[280px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={item.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                <img src={item.img} alt={item.name} style={{ width: '50px', borderRadius: '8px' }} />
                <a href={item.githubLink} target="_blank" rel="noopener noreferrer" >
                    <i className="fa fa-github" style={{ position: 'absolute', top: '0', right: '0', fontSize: '30px',border:'1px solid white',padding:5,borderRadius:'7px' }}></i>
                </a>
              </span>
              <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">

              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <Typography level='h4' className=" text-sm leading-[1.6] text-gray-400 font-normal" sx={{color: '#fff'}}>
                    {item.name}
                  </Typography>
                  <Typography level='title-lg' className=" text-sm leading-[1.6] text-gray-400 font-normal" sx={{color: '#fff'}}>
                    {item.title}
                  </Typography>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </Container>

  );
};
