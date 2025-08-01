"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
const leagues = [
  {
    name: "Pakistan Super League",
    short: "PSL",
    image: "/images/Pakistan-Cricket/Islamabad-United-Home-Jersey.png",
    link: "/teams/PSL",
    desc: "Official jerseys of all PSL teams — Islamabad, Karachi, Lahore, and more.",
  },
  {
    name: "Indian Premier League",
    short: "IPL",
    image: "/images/CSK-jersey.png",
    link: "/teams/IPL",
    desc: "Support your IPL team with authentic jerseys from the 2024 season.",
  },
  {
    name: "Big Bash League",
    short: "BBL",
    image: "/images/Australia-Cricket/Melbourne-Stars-jersey.png",
    link: "/teams/BBL",
    desc: "From Sydney to Melbourne — get your favorite BBL kits now.",
  },
];

const TopLeagues = () => {
  return (
    <section className="bg-[#0F172A] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#FACC15]">
          Explore Cricket Leagues
        </h2>
        <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
          Shop official jerseys and exclusive team kits from the most iconic
          leagues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {leagues.map((league, index) => (
          <motion.div
            key={league.short}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative h-[420px] group overflow-hidden rounded-2xl shadow-xl"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={league.image}
                alt={league.name}
                width={500}
                height={500}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Foreground content stays on top */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#FACC15] mb-3">
                {league.name}
              </h3>
              <p className="text-gray-200 text-sm mb-5">{league.desc}</p>
              <Link
                href={league.link}
                className="inline-block bg-[#FACC15] text-black font-semibold px-5 py-2 rounded-full hover:bg-yellow-300 transition"
              >
                Explore {league.short}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopLeagues;
