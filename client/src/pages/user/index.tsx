import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import {  Sheet ,Typography ,Button} from "@mui/joy";
import "./index.scss";
import HomeStyle from "./Homestyle";
import { styled  } from '@mui/system';

const GlassButton = styled(Button)`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.375rem;
  border-radius: 50px;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid white;
  transition: transform 0.3s ease;

  &:hover {
    background: rgba(176, 37, 237, 0.19);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.7);
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

    const BackgroundIndex = () => {
        return (
        <div className="area" >
                <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                </ul>
        </div >
        );
    };
  
const HomeUser: React.FC = () => {
    const { mode } = useColorScheme();
    return (
        <div style={{ height: "100vh", overflowX: "auto" }}>
            <div
                className="py-24 sm:py-32 md:py-40 relative"
                style={{
                width: "100%",
                height: "100vh",
                position: "relative",
                paddingTop:"80px",
                ...(mode === "dark"
                    ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
                    : { background: "linear-gradient(to bottom, #AA96DA,#6962AD" }),
                padding: 5,
                zIndex:1
                }}
            >
                    {BackgroundIndex()}
                    <HomeStyle></HomeStyle>
                    <GlassButton variant="outlined">Reserve</GlassButton>
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
                
                </section>
            </Sheet>
            <Sheet
                sx={{
                ...(mode === "dark"
                    ? { background: "linear-gradient(to bottom, #080D1A, #101726)" }
                    : { background: "linear-gradient(to bottom, #AA96DA,#6962AD)" }),
                padding: 5,
                height: "800px",

                }}
            >
                <Typography >sdfdsfsd</Typography>
            </Sheet>
        </div>
    );
};

export default HomeUser;
