import { useColorScheme } from "@mui/joy/styles";
import { Button, Sheet, Typography, Grid } from "@mui/joy";
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import HomeStyle from "./Homestyle";
import React from "react";
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
    return (
      <div className="h-[20rem] rounded-md flex flex-col items-center justify-center relative ">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    );
  }
   
  const testimonials = [
    {
        img: "https://avatars.githubusercontent.com/Wisitt",
        name: "Wisit Moondet",
        title: "FrontEnd",
        githubLink: "https://github.com/Wisitt",
    },
    {
        img: "https:/avatars.githubusercontent.com/heroclik",
        name: "Theeraporn Promsorn",
        title: "Backend",
        githubLink: "https://github.com/heroclik",
    },
    {
        img: "https:/avatars.githubusercontent.com/Jatuchok",
        name: "Jatuchok Chuma",
        title: "Backend",
        githubLink: "https://github.com/Jatuchok",
    },
    {
        img: "https:/avatars.githubusercontent.com/suchadatammajong",
        name: "Suchada Tammajong",
        title: "Lead Team",
        githubLink: "https://github.com/suchadatammajong",
    },
  ];
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
    transform: translate(-50%, -50%) scale(0.9);
    background-color: rgba(255, 255, 255, 0.15);
  }
};
`
const BackgroundIndex = () => {
  return (
    <div className="area">
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
    </div>
  );
};

const HomeUser: React.FC = () => {
  const { mode } = useColorScheme();
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/user/room-user');
  };

  return (
    <div style={{ height: "100vh", overflowX: "auto" }}>
      <div
        className="py-24 sm:py-32 md:py-40 relative"
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          paddingTop: "80px",
          ...(mode === "dark"
            ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
            : { background: "linear-gradient(to bottom, #AA96DA,#6962AD)" }),
          padding: 5,
          zIndex: 1
        }}
      >
        {BackgroundIndex()}
        <HomeStyle></HomeStyle>
        <GlassButton variant="outlined" onClick={handleReserveClick}>
          Reserve
        </GlassButton>

      </div>
      <Sheet
sx={{
    ...(mode === "dark"
      ? { background: " #080D1A" }
      : { background: "#fff" }),
    padding: 40,
    marginTop: "0",
    zIndex: "1",
    height: "700px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      height: 'auto',
    },
  }}
      >
        <Typography level="h2" style={{ marginBottom: '1rem', fontWeight: 'bold',}}>Welcome to Room Reservation System</Typography>
        <Typography level="body-lg" style={{ marginBottom: '1rem' }}>
            Our room reservation system provides a seamless and efficient way for students and faculty to reserve classrooms at RMUTP.
            Experience the convenience of booking rooms for various activities, ensuring a smooth and organized process for academic and extracurricular events.
        </Typography>
        <Typography level="h3" style={{ marginBottom: '1rem', marginTop: '5rem'}}>
            Benefits
        </Typography>
        <ul style={{ paddingLeft: '20px' }}>
            <Typography level="body-lg" >Efficient room allocation for classes and events</Typography>
            <Typography level="body-lg" >Easy access to real-time availability of classrooms</Typography>
            <Typography level="body-lg" >Streamlined process for both students and faculty</Typography>
            <Typography level="body-lg" >Enhanced organization and scheduling of academic and extracurricular activities</Typography>
        </ul>
      </Sheet>
      <Sheet
        sx={{
            ...(mode === "dark"
            ? { background: " #0F172A" }
            : { background: "linear-gradient(to bottom, #AA96DA,#6962AD)" }),
            padding: 5,
            marginTop: "0",
            zIndex: "1",
            height: "400px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (max-width: 768px)': {
            height: 'auto',
            },
        }}
      >
        <div className="d-flex justify-content-center align-items-center flex-column">
        <Typography level="h4" style={{marginTop: '1rem', fontWeight: 'bold'}}>Developer Team</Typography>
        <div >
            {InfiniteMovingCardsDemo()}
        </div>
        </div>
      </Sheet>

<Sheet
  sx={{
    ...(mode === "dark"
      ? { background: "linear-gradient(to bottom, #080D1A, #080D1A)" }
      : { background: "linear-gradient(to bottom, #fff, #fff,)" }),
    padding: 5,
    height: "800px",
    '@media (max-width: 768px)': {
      height: 'auto',
    },
  }}
>
  <section
    className="d-flex flex-column justify-center align-items-center text-center m-0"
    style={{ paddingBlock: "clamp(5rem, 25vh, 0.5rem)" }}
  >
    <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
      <Typography level="h4" style={{ marginBottom: '1rem', marginTop: '8rem', fontWeight: 'bold' }}>Contact Us</Typography>
      <Typography level="body-lg" style={{ marginBottom: '1rem' }}>Email: admin@rmutp.ac.th</Typography>
      <Typography level="body-lg" style={{ marginBottom: '1rem' }}>Phone: +123 456 7890</Typography>
    </div>
    <iframe
      title="Google Map"
      width="80%"
      height="450"
      loading="lazy"
      allowFullScreen
      style={{ marginTop: '100px', borderRadius: '20px',padding:10 }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.602010843573!2d100.5120833!3d13.8182742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x73d2b2a69752fd89!2sFaculty%20of%20Science%20and%20Technology%2C%20Rajamangala%20University%20of%20Technology%20Phra%20Nakhon!5e0!3m2!1sen!2sus!4vYOUR_MAP_API_KEY"
    ></iframe>
  </section>
</Sheet>


<Sheet
  sx={{
    background: mode === "dark" ? "#080D1A" : "#080D1A",
    padding: 5,
    color: 'white'
  }}
>
  <Grid
    container
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    style={{ height: "100%" }}
  >
    <Typography level="body-lg" color="neutral">
      © 2024 Room Reservation Rmutp. All rights reserved.
    </Typography>
    {/* <div>
      <Typography level="body-lg" color="neutral">
        Follow Us:
      </Typography>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="/images/facebook-icon.png" alt="Facebook" style={{ marginRight: '0.5rem' }} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="/images/twitter-icon.png" alt="Twitter" style={{ marginRight: '0.5rem' }} />
      </a>
    </div> */}
  </Grid>
</Sheet>

    </div>
  );
};

export default HomeUser;
