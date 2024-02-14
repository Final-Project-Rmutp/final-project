import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import { Typography, Sheet } from "@mui/joy";
import "./index.scss";

interface CommonStyles {
    color: string;
    backgroundClip: string;
    backgroundRepeat: string;
    backgroundSize: string;
    backgroundImage: string;
    animation?: string;
    animationTimeline?: string;
    animationRange?: string;
}

const commonStyles: CommonStyles = {
    color: "transparent",
    backgroundClip: "text",
    backgroundRepeat: "no-repeat",
    backgroundSize: "0% 100%",
    backgroundImage: `linear-gradient(to right, #ff008c 0%, #43008c 50%, #009688 100%)`,
};

if (window.innerWidth > 768) {
    commonStyles.animation = "scroll-reveal linear forwards";
    commonStyles.animationTimeline = "view(y)";
    commonStyles.animationRange = "contain";
}

const HomeUser: React.FC = () => {
    const { mode } = useColorScheme();

    return (
        <div>
            <div
                className="py-24 sm:py-32 md:py-40 relative"
                style={{
                width: "100%",
                height: "100vh",
                position: "relative",
                ...(mode === "dark"
                    ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
                    : { background: "linear-gradient(to bottom, #AA96DA, #fff" , }),
                padding: 5,
                }}
            >
                                    <section className="hero is-dark is-fullheight">
                <div className='pixelbackground'>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                    <div className='pixel'></div>
                </div>
                <div className="hero-body">
                    <div className="container has-text-centered">
                    
                </div>
                </div>
                </section>
                <Typography
                sx={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute',
                    fontSize: '4rem',
                }}
                >
                Reservation Room
                </Typography>
            </div>
            <Sheet
                sx={{
                ...(mode === "dark"
                    ? { background: " #080D1A" }
                    : { background: "#080D1A" }),
                padding: 5,
                marginTop: "0",
                zIndex: "1",
                height: "800px",
                }}
            >
                <section
                className="d-flex flex-column justify-center align-items-center text-center m-0"
                style={{ paddingBlock: "clamp(5rem, 25vh, 0.5rem)" }}
                >
                <Typography
                    level="h1"
                    sx={{
                    ...commonStyles,
                    animationRangeStart: "cover5vh",
                    animationRangeEnd: "cover 50vh",
                    }}
                >
                    Reservation Room
                </Typography>
                <Typography
                    level="title-md"
                    sx={{
                    maxWidth: "100ch",
                    ...commonStyles,
                    animationRangeStart: "cover 55vh",
                    animationRangeEnd: "cover 65vh",
                    }}
                >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia nam sit fugiat quis. Ullam non id necessitatibus, tempore sint dolore.
                </Typography>
                <Typography
                    level="title-md"
                    sx={{
                    maxWidth: "90ch",
                    ...commonStyles,
                    animationRangeStart: "cover 60vh",
                    animationRangeEnd: "cover 70vh",
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perspiciatis?
                </Typography>
                </section>
            </Sheet>
            <Sheet
                sx={{
                ...(mode === "dark"
                    ? { background: "linear-gradient(to bottom, #080D1A, #101726)" }
                    : { background: "#fff" }),
                padding: 5,
                height: "800px",

                }}
            >
            
            </Sheet>
        </div>
    );
};

export default HomeUser;
