'use client'
import { inter } from "@/langs";
import { Typewriter } from "nextjs-simple-typewriter";
import { motion } from "framer-motion";
import { TypingInterface } from "./interface";

/**
 * The component that is used for the typing speed effect components
 * 
 * @param words - The List of words
 * @param loop - The number of loop time default is 0 means infinite
 * @param langClass - The class Name used for the Display
 * @returns The typing effect
 */
export function TypingComp({ words, loop = 0, langClass = inter.className }: TypingInterface) {
    return (
        <div className={langClass}>
            <Typewriter
                words={words}
                loop={loop}
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={3000}
            />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, repeatDelay: 0.5 }}>|</motion.span>
        </div>
    );
}
