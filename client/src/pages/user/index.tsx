import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import { Typography, Sheet } from "@mui/joy";
import "./index.scss";

const commonStyles = {
    color: "hsl(0 0% 100% / 0.2)",
    backgroundClip: "text",
    backgroundRepeat: "no-repeat",
    backgroundSize: "0% 100%",
    backgroundImage: "linear-gradient(135deg, #8A2BE2, #4B0082);",
    animation: "scroll-reveal linear forwards",
    animationTimeline: "view(y)",
    animationRange: "contain",
};
const HomeUser: React.FC = () => {
    const { mode } = useColorScheme();

    return (
        <div className="">
        <div
            className="py-24 sm:py-32 md:py-40 relative"
            style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            ...(mode === "dark"
                ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
                : { background: "#AA96DA" }),
            padding: 5,
            }}
        >
            <Typography
            sx={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                fontSize: "4rem",
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
                animationRangeStart: "cover 45vh",
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
            }}
        >
            <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ratione
            odit maxime natus dolor deleniti! Aperiam quos eaque consequatur
            maiores corrupti sequi architecto illo recusandae dolorem. Aliquam
            tempore blanditiis dicta esse autem quasi labore debitis ipsam quas
            dolorem assumenda accusantium ab, inventore velit illo quos veritatis
            voluptatum. Culpa ipsa soluta nobis officia voluptatem odit itaque
            obcaecati unde tempora laborum eveniet repellendus, sapiente facere
            atque suscipit illum nostrum quibusdam, corporis harum vero ipsam
            reprehenderit consectetur. Consequatur modi, numquam consectetur fuga
            architecto neque nam illo est aliquam perspiciatis nobis facere?
            Provident maiores saepe dolorum soluta id dolores molestias nemo illo
            iste accusamus libero, harum ea ducimus laboriosam sapiente natus
            incidunt architecto quae, totam labore unde cupiditate sint deserunt
            commodi? Atque architecto at voluptates? Pariatur, alias. Nemo eum
            dicta praesentium magnam ut, quis facere maxime nihil eos. Totam, ex
            unde! Fugit, a. Nobis, debitis rerum! Atque vel hic soluta laborum
            laboriosam necessitatibus, perspiciatis sapiente minima, non dolores
            ad ratione deleniti dolor, repudiandae error facere. Tempora ipsam
            cupiditate ex facilis veniam quibusdam placeat recusandae. Saepe
            ratione modi consequatur voluptatem eos, neque officia sequi
            doloremque nobis unde quaerat libero, est non tempore quam
            perspiciatis alias repellendus aliquam obcaecati velit accusamus
            dignissimos esse. Dolore hic ullam quisquam at praesentium porro
            molestiae obcaecati beatae quidem, eligendi vero asperiores. Modi
            blanditiis ratione esse facere ea deleniti odit aliquam libero rerum,
            illum explicabo molestias laboriosam inventore quia pariatur enim quis
            aspernatur ducimus. Maiores, suscipit. Deserunt nemo aspernatur,
            impedit, autem, nostrum accusantium magni quasi expedita perspiciatis
            officia repudiandae. Atque consequatur incidunt magni error, voluptate
            corrupti nam sequi. Alias nisi vitae architecto esse nam! Totam veniam
            laboriosam quibusdam dolore consequuntur! Iste deleniti soluta
            aspernatur molestias ab quos maxime atque eaque fugit. Culpa sapiente
            libero aliquam voluptas, in officiis quas dolores eos. Nobis fugiat
            fugit maiores consequuntur nam facilis corporis distinctio, maxime
            modi a impedit rem facere. Ab facilis magnam tempora adipisci sint
            praesentium, aperiam veniam molestias nisi nam quibusdam porro iste
            placeat saepe quaerat aliquam! Aspernatur voluptates vitae cumque quod
            assumenda nulla atque eius voluptate, iure accusamus veniam dolores
            maiores temporibus excepturi. Aut sed atque, odit a quibusdam suscipit
            accusamus animi ea asperiores recusandae, modi provident vero sapiente
            cum? Atque explicabo quod accusamus illum nemo, nostrum,
            necessitatibus mollitia similique ducimus aut corporis, molestiae
            natus in sapiente magnam nesciunt? Beatae suscipit magni, ad quod
            eligendi unde et aut esse nam minima iure molestias eaque deserunt
            dolor pariatur adipisci voluptatum optio exercitationem culpa
            doloremque veritatis. Maxime quo eos debitis eveniet aut sed
            perspiciatis. Quam, a veniam et harum vero iste deserunt illum
            excepturi similique sapiente impedit sunt quae tenetur aspernatur?
            Voluptatem, fuga repellendus doloremque adipisci laboriosam sed?
            Doloribus eos tempore pariatur facilis officiis excepturi minus ullam
            ratione, cupiditate architecto, recusandae fugiat at fuga temporibus
            nesciunt molestias ducimus sequi veniam quidem optio porro non? Non
            sequi, deleniti sit nam debitis nulla ducimus in molestiae tempora.
            Nihil molestiae dolores perferendis possimus consequatur. Dolor
            obcaecati ipsum ipsa reprehenderit adipisci ut officia, quos maxime
            eos voluptatibus pariatur magni fugit corporis architecto inventore
            laborum rerum, necessitatibus, minima voluptatum.
            </Typography>
        </Sheet>
        </div>
    );
};

export default HomeUser;
