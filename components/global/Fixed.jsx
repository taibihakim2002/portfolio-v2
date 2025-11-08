"use client";

import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialFacebook } from "react-icons/ti";

export default function Fixed({ id }) {
  return (
    <>
      <div className="flex flex-col gap-3 fixed top-1/2 -translate-y-1/2 left-4 md:left-6 z-50">
        {[
          { href: "https://github.com/taibihakim2002", icon: <FaGithub size={20}/> },
          { href: "https://www.facebook.com/hakimtaibi2002/", icon: <TiSocialFacebook size={20}/> },
          { href: "https://www.instagram.com/taibihaakim", icon: <IoLogoInstagram size={20}/> },
          { href: "https://www.linkedin.com/in/taibi-hakim-54432b16b/", icon: <FaLinkedinIn size={20}/> }
        ].map((item, index) => (
          <motion.a 
            key={index}
            href={item.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white/10 backdrop-blur-sm text-white rounded-full cursor-pointer transition-all duration-300 hover:bg-main hover:text-black hover:scale-110"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            {item.icon}
          </motion.a>
        ))}
      </div>
      {id && (
        <span className="bottom-6 end-6 lg:bottom-10 lg:end-10 absolute text-[70px] md:text-[100px] font-black text-white/5 select-none">
          0{id}
        </span>
      )}
    </>
  );
}
