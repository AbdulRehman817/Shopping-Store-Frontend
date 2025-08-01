"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const teams = [
  {
    name: "Pakistan",
    Image: "/images/Pakistan-Cricket/pakistan-jersey.png",
  },
  {
    name: "India",
    Image: "/images/india-jersey.jpg",
  },
  {
    name: "Australia",
    Image: "/images/Australia-Cricket/australia_jersey.jpg",
  },
  {
    name: "England",
    Image: "/images/england-jersey.png",
  },
  {
    name: "PSL",
    Image: "/images/Pakistan-Cricket/Islamabad-United-Home-Jersey.png",
  },
  {
    name: "IPL",
    Image: "/images/CSK-jersey.png",
  },
  {
    name: "BBL",
    Image: "/images/Australia-Cricket/Melbourne-Stars-jersey.png",
  },
];

const Teams = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate loading time

    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <div className="flex justify-center mb-4">
      <Loader />
    </div>
  ) : (
    <>
      <section className="min-h-screen bg-[#1E293B] px-4 py-20 text-white">
        <motion.h2
          className="text-5xl font-extrabold text-center text-[#FACC15] mb-20 mt-[35px] tracking-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Team
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/teams/${team.name}`}>
                <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all relative group">
                  <div className="relative h-56 bg-[#0F172A] flex items-center justify-center p-6">
                    <Image
                      src={team.Image}
                      width={500}
                      height={500}
                      alt={team.name}
                      className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#FACC15] text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Official
                    </div>
                  </div>
                  <div className="p-5 text-center bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-[#FACC15] transition">
                      {team.name}
                    </h3>
                    <p className="text-gray-400 text-sm">View all jerseys</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/"
            className="bg-[#FACC15] text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 shadow-lg transition"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </>
  );
};

export default Teams;
