import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useColorScheme } from "@mui/joy/styles";
import throttle from 'lodash/throttle';
const dash = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const IntroSvg = styled.svg`
  max-width: 800px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .text {
    display: none;
  }

  &.go {
    .text {
      font-family: Arial, sans-serif;
      font-size: 20px;
      text-transform: uppercase;
      display: block;
    }
    .text-stroke {
      fill: none;
      stroke: #51256f;
      stroke-width: 2.8px;
      stroke-dashoffset: -115;
      stroke-dasharray: 120;
      stroke-linecap: butt;
      stroke-linejoin: round;
      animation: ${dash} 1.2s ease-in-out forwards;
    }
    .text-stroke:nth-child(2) {
      animation-delay: 0.3s;
    }
    .text-stroke:nth-child(3) {
      animation-delay: 0.9s;
    }
    .text-stroke-2 {
      stroke: #f6bdfa;
      animation-delay: 1.2s;
    }
    .text-stroke-2:nth-child(0) {
      stroke: #fff;
    }
    .text-stroke:nth-child(5) {
      animation-delay: 1.5s;
    }
    .text-stroke:nth-child(6) {
      animation-delay: 1.8s;
    }
  }
`;

const IntroWrapper = styled.div`
  will-change: transform;
  transition: transform 0.3s ease-out;
`;

const HomeStyle = () => {
  const [isIntroAnimated, setIsIntroAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY || window.pageYOffset;
      const translateY = scrollY * 0.5;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--translateY", `${translateY}px`);
      });
    }, 16); // 60 frames per second
  
    setIsIntroAnimated(true);
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
    

  const { mode } = useColorScheme();

  return (
    <IntroWrapper>
      <IntroSvg
        className={`intro ${isIntroAnimated ? "go" : ""}`}
        viewBox="0 0 200 86"
        style={{
          borderRadius: "30px",
          ...(mode === "dark"
            ? {
                background: "linear-gradient(135deg, #582a7e, #0F172A)",
                boxShadow: "0 20px 60px 0px rgb(46, 6, 100)",
              }
            : {
                background: "linear-gradient(135deg, #8F43EE,#BFDCE5",
                boxShadow: "0 20px 60px 10px rgb(110, 80, 190)",
              }),
          width: "calc(100% - 2rem)",
        }}
      >
        <text
          text-anchor="start"
          x="10"
          y="30"
          className="text text-stroke"
          clip-path="url(#text1)"
        >
          Room
        </text>
        <text
          text-anchor="start"
          x="10"
          y="50"
          className="text text-stroke"
          clip-path="url(#text2)"
        >
          Reservation
        </text>
        <text
          text-anchor="start"
          x="10"
          y="70"
          className="text text-stroke"
          clip-path="url(#text3)"
        >
          Rmutp
        </text>
        <text
          text-anchor="start"
          x="10"
          y="30"
          className="text text-stroke text-stroke-2"
          clip-path="url(#text1)"
        >
          Room
        </text>
        <text
          text-anchor="start"
          x="10"
          y="50"
          className="text text-stroke text-stroke-2"
          clip-path="url(#text2)"
        >
          Reservation
        </text>
        <text
          text-anchor="start"
          x="10"
          y="70"
          className="text text-stroke text-stroke-2 text-rmutp"
          clip-path="url(#text3)"
        >
          Rmutp
        </text>

        <defs>
          <clipPath id="text1">
            <text textAnchor="start" x="10" y="30" className="text">
              Room
            </text>
          </clipPath>
          <clipPath id="text2">
            <text textAnchor="start" x="10" y="50" className="text">
              Reservation
            </text>
          </clipPath>
          <clipPath id="text3">
            <text textAnchor="start" x="10" y="70" className="text">
              Rmutp
            </text>
          </clipPath>
        </defs>
      </IntroSvg>
      <div></div>
    </IntroWrapper>
  );
};

export default HomeStyle;
