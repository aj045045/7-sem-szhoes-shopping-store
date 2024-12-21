'use client'
import { motion, useScroll, useSpring } from "framer-motion"

/**
 * The scroll line to denote the scrolling
 * 
 * @returns The Link
 */
export function ScrollComp() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    return <>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="fixed left-0 right-0 z-30 h-1.5 [transform-origin:0%] bg-green-500" style={{ scaleX }} />
    </>
}
