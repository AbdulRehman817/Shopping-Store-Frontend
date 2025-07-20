"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative w-full h-[90vh] bg-black text-white overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img
          src="/images/england-jersey.png"
          alt="Jersey Background"
          className="w-full h-full object-cover brightness-50"
        />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.div
          className="bg-white/10 backdrop-blur-lg p-10 rounded-xl max-w-3xl text-center border border-white/20"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FACC15]">
            Unleash Your Cricket Spirit
          </h2>
          <p className="text-gray-200 text-base md:text-lg mb-4">
            At <strong>Jersey Bazar</strong>, every stitch tells a story. From
            the thrill of PSL to the roar of the World Cup — wear what you
            believe in.
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Our curated selection of premium, official jerseys makes you look
            like a pro — even if you're cheering from home.
          </p>

          <Link
            href="/teams"
            className="inline-block bg-[#FACC15] text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition"
          >
            Shop All Teams
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
