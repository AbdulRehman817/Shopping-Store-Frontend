"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TopLeagues from "../topleagues/page";
import About from "../about/page";

const slides = [
  {
    title: "PSL 2024 Jerseys",
    desc: "Support your team in official PSL kits. Limited edition drops!",
    img: "/images/Pakistan-Cricket/PSL-hero.png",
    link: "/teams",
    tag: "🔥 Trending Now",
  },
  {
    title: "IPL 2024 Jerseys",
    desc: "Cheer for your squad in exclusive IPL designs.",
    img: "/images/IPL-hero.png",
    link: "/teams",
    tag: "🏏 Hot Drop",
  },
  {
    title: "BBL 2024 Jerseys",
    desc: "Rep your Big Bash League favorites in style.",
    img: "/images/Australia-Cricket/BBL-hero.png",
    link: "/teams",
    tag: "🚨 New Arrival",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const autoSlide = setInterval(next, 6000);
    return () => clearInterval(autoSlide);
  }, [index]);

  const slide = slides[index];

  return (
    <>
      <section className="relative w-full h-[100vh] overflow-hidden text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl"
          >
            <h1 className="text-[50px] md:text-5xl font-[800] text-[#facc15] mt-2 mb-4">
              {slide.title}
            </h1>
            <p className="text-gray-300 text-sm md:text-lg mb-6">
              {slide.desc}
            </p>
            <Link
              href={slide.link}
              className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full"
        >
          <ArrowLeft className="text-white" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full"
        >
          <ArrowRight className="text-white" />
        </button>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10" />
      </section>

      {/* Sections Below */}
      <TopLeagues />
      <About />
    </>
  );
};

export default Hero;
