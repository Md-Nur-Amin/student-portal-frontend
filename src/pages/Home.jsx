import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { io } from "socket.io-client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import pic1 from "../assets/castle.jpg";
import pic2 from "../assets/library.jpg";
import pic3 from "../assets/un.jpg";
import pic4 from "../assets/uni.jpg";

export default function Home({ token }) {
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.me();
        setMe(data);
      } catch (e) { }
    }
    load();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const socket = io("http://localhost:5000", { auth: { token } });
    socket.on("connect", () => console.log("socket connected"));
    socket.on("update", (d) => {
      console.log("update", d);
      api.getRoutine().then(() => { }).catch(() => { });
    });
    return () => socket.disconnect();
  }, [token]);

  // Show fullscreen carousel if not logged in
  if (!token)
    return (
      <div className="relative min-h-screen w-full">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          loop={true}
          className="w-full h-screen"
        >
          {[pic1, pic2, pic3, pic4].map((pic, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-screen">
                <img
                  src={pic}
                  alt={`Slide ${i + 1}`}
                  className="object-cover w-full h-full"
                />
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                  <h1 className="text-5xl font-bold drop-shadow-lg mb-4">
                    Welcome to EduPortal
                  </h1>
                  <p className="text-lg md:text-xl max-w-2xl backdrop-blur-sm bg-white/10 p-4 rounded-xl leading-relaxed">
                    A modern digital platform connecting students and faculty.
                    Access resources, view routines, and stay updated — all in one place.
                  </p>


                  <p className="mt-4 text-base italic text-gray-200">
                    Please{" "}
                    <Link
                      to="/login"
                      className="relative hover:text-blue-300  underline-offset-4 transition-colors duration-300
               after:content-[''] after:absolute after:-inset-1 after:rounded-full after:blur after:bg-blue-400/30 after:opacity-0 hover:after:opacity-100 
               animate-pulse"
                    >
                      log in
                    </Link>{" "}
                    to access your personalized dashboard.
                  </p>




                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );

  // Logged-in user view
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Welcome Back!</h2>
      {me && (
        <div className="card w-full max-w-md bg-white shadow-xl p-6 rounded-2xl border border-blue-100">
          <p className="text-lg font-medium mb-2">
            <strong>Name:</strong> {me.name}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>Student No:</strong> {me.studentNo}
          </p>
          <p className="text-lg font-medium">
            <strong>Role:</strong> {me.role}
          </p>
        </div>
      )}
    </div>
  );
}
