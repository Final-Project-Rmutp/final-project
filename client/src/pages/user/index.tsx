import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import { Typography, Sheet } from "@mui/joy";

const HomeUser: React.FC = () => {
    const { mode } = useColorScheme();

    return (
        <div className="">
        <div
            className="py-24 sm:py-32 md:py-40 relative"
            style={{
            width: "100%",
            height: "800px",
            position: "relative",
            ...(mode === "dark"
                    ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
                    : { background: "#fff" }),
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
            height:"800px",
            }}
        >
            <div className=" p-4 sm:p-8 z-1">
            <div className="font-inter font-extrabold text-2xl text-black tracking-tight">
                <Typography sx={{color:"white"}}>My trip to the summit</Typography>
            </div>
            <div className="mt-1 font-medium text-sm text-slate-500">
                <Typography sx={{color:"white"}}>November 16, 2021 · 4 min read</Typography>
            </div>
            <p className="mt-4 leading-7 text-slate-500">
                <Typography sx={{color:"white"}}>
                Maybe we can live without libraries, people like you and me...
                </Typography>
            </p>
            <p className="mt-4 leading-7 text-slate-500">
                <Typography sx={{color:"white"}}>
                Look. If you think this is about overdue fines and missing books,
                you'd better think again...
                </Typography>
            </p>
            </div>
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
