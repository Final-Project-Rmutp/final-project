import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import { Typography, Card } from "@mui/joy";

const HomeUser: React.FC = () => {
    const { mode } = useColorScheme();

    return (
        <div className="xl:container mx-auto">
      <div
        className={`bg-cover bg-center bg-fixed overflow-y-scroll py-24 sm:py-32 md:py-40 relative ${
          mode === "dark"
            ? "dark:bg-gradient-to-b from-gray-950 to-gray-900"
            : "light:bg-white"
        }`}
        style={{
          width: "100%",
          height: "600px",
          position: "relative",
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
        <Card style={{ marginTop: "0", zIndex: "1" }}>
            <div className=" p-4 sm:p-8 z-1">
            <div className="font-inter font-extrabold text-2xl text-black tracking-tight">
                My trip to the summit
            </div>
            <div className="mt-1 font-medium text-sm text-slate-500">
                November 16, 2021 · 4 min read
            </div>
            <p className="mt-4 leading-7 text-slate-500">
                Maybe we can live without libraries, people like you and me...
            </p>
            <p className="mt-4 leading-7 text-slate-500">
                Look. If you think this is about overdue fines and missing books,
                you'd better think again...
            </p>
            </div>
            <div className=" p-4 sm:p-8">
            <div className="font-inter font-extrabold text-2xl text-black tracking-tight">
                My trip to the summit
            </div>
            <div className="mt-1 font-medium text-sm text-slate-500">
                November 16, 2021 · 4 min read
            </div>
            <p className="mt-4 leading-7 text-slate-500">
                Maybe we can live without libraries, people like you and me...
            </p>
            <p className="mt-4 leading-7 text-slate-500">
                Look. If you think this is about overdue fines and missing books,
                you'd better think again...
            </p>
            </div>
            <div className=" p-4 sm:p-8">
            <div className="font-inter font-extrabold text-2xl text-black tracking-tight">
                My trip to the summit
            </div>
            <div className="mt-1 font-medium text-sm text-slate-500">
                November 16, 2021 · 4 min read
            </div>
            <p className="mt-4 leading-7 text-slate-500">
                Maybe we can live without libraries, people like you and me...
            </p>
            <p className="mt-4 leading-7 text-slate-500">
                Look. If you think this is about overdue fines and missing books,
                you'd better think again...
            </p>
            </div>
            <div className=" p-4 sm:p-8">
            <div className="font-inter font-extrabold text-2xl text-black tracking-tight">
                My trip to the summit
            </div>
            <div className="mt-1 font-medium text-sm text-slate-500">
                November 16, 2021 · 4 min read
            </div>
            <p className="mt-4 leading-7 text-slate-500">
                Maybe we can live without libraries, people like you and me...
            </p>
            <p className="mt-4 leading-7 text-slate-500">
                Look. If you think this is about overdue fines and missing books,
                you'd better think again...
            </p>
            </div>
            <div className=" p-4 sm:p-8">
            <div className="font-inter font-extrabold text-2xl text-black tracking-tight">
                My trip to the summit
            </div>
            <div className="mt-1 font-medium text-sm text-slate-500">
                November 16, 2021 · 4 min read
            </div>
            <p className="mt-4 leading-7 text-slate-500">
                Maybe we can live without libraries, people like you and me...
            </p>
            <p className="mt-4 leading-7 text-slate-500">
                Look. If you think this is about overdue fines and missing books,
                you'd better think again...
            </p>
            </div>
            <div className=" p-4 sm:p-8">
            <div className="font-inter font-extrabold text-2xl text-black tracking-tight">
                My trip to the summit
            </div>
            <div className="mt-1 font-medium text-sm text-slate-500">
                November 16, 2021 · 4 min read
            </div>
            <p className="mt-4 leading-7 text-slate-500">
                Maybe we can live without libraries, people like you and me...
            </p>
            <p className="mt-4 leading-7 text-slate-500">
                Look. If you think this is about overdue fines and missing books,
                you'd better think again...
            </p>
            </div>
        </Card>
        </div>
    );
};

export default HomeUser;
