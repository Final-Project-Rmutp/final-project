import React, { useEffect, useState } from "react";
import "./index.scss";
import { useColorScheme } from "@mui/joy/styles";

const HomeStyle: React.FC = () => {
  const [isIntroAnimated, setIsIntroAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const translateY = scrollY * 0.5; // Adjust the multiplier for the desired parallax effect
      document.documentElement.style.setProperty("--translateY", `${translateY}px`);
    };

    setIsIntroAnimated(true);

    // Add an event listener to handle scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { mode } = useColorScheme();

  return (
    <div >
      <svg
        className={`intro ${isIntroAnimated ? "go" : ""}`}
        viewBox="0 0 200 86"
        style={{
            borderRadius:'30px',
          ...(mode === "dark"
                    ? { background: "linear-gradient(135deg, #582a7e, #0F172A)",
                        boxShadow: "0 20px 60px 0px rgb(46, 6, 100)" }
                    : { background: "linear-gradient(135deg, #8F43EE,#BFDCE5",
                    boxShadow: "0 20px 60px 10px rgb(110, 80, 190)"  }),
        }}
        >


        <text text-anchor="start" x="10" y="30" className="text text-stroke" clip-path="url(#text1)">Reservation</text>
        <text text-anchor="start" x="10" y="50" className="text text-stroke" clip-path="url(#text2)">Room</text>
        <text text-anchor="start" x="10" y="70" className="text text-stroke" clip-path="url(#text3)">Rmutp</text>
        <text text-anchor="start" x="10" y="30" className="text text-stroke text-stroke-2" clip-path="url(#text1)">Reservation</text>
        <text text-anchor="start" x="10" y="50" className="text text-stroke text-stroke-2" clip-path="url(#text2)">Room</text>
        <text text-anchor="start" x="10" y="70" className="text text-stroke text-stroke-2 text-rmutp" clip-path="url(#text3)">Rmutp</text>

        <defs>
          <clipPath id="text1">
            <text textAnchor="start" x="10" y="30" className="text">Reservation</text>
          </clipPath>
          <clipPath id="text2">
            <text textAnchor="start" x="10" y="50" className="text">Room</text>
          </clipPath>
          <clipPath id="text3">
            <text textAnchor="start" x="10" y="70" className="text">Rmutp</text>
          </clipPath>
        </defs>
      </svg>
      <div>
      </div>
    </div>
  );
};

export default HomeStyle;

