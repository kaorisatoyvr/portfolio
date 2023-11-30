import brush from '../assets/images/blush.svg';
import brush2 from '../assets/images/blush2.svg';
import { motion } from "framer-motion";
import { useRef } from "react";
import { useFollowPointer } from "./use-follow-pointer";

const Brush = () => {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);
    
    return (
        <>

        {/* brush pink small cursor following */} 
        <motion.img
        ref={ref}
        whileHover={{ scale: 1.5 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        drag whileTap={{opacity: 1, scale: 1.05}}
        whileDrag={{ scale: 1.1 }}
        animate={{ x, y, rotate: -180 }}
        transition={{ type: "spring", duration: 5, bounce: 0.6, stiffness: 100, restDelta: 0.001}}
        className="w-[30px] sm:w-[50px] md:w-[80px] absolute top-[20%] left-[15%] z-0"
        src={brush}
        alt="brush" />

        {/* brush pink left-top */} 
        <motion.img
        ref={ref}
        whileHover={{ scale: 1.5 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        drag whileTap={{opacity: 1, scale: 1.05}}
        whileDrag={{ scale: 1.1 }}
        animate={{ rotate: -180 }}
        transition={{ type: "spring", duration: 10, bounce: 0.5 }}
        className="w-[100px] sm:w-[160px] md:w-[200px] absolute top-[10%] left-[5%] sm:top-[20%] sm:left-[15%] z-0"
        src={brush}
        alt="brush" />

        {/* brush pink right-bottom */} 
        <motion.img
        whileHover={{ scale: 1.5 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        drag whileTap={{opacity: 1, scale: 1.05,}}
        whileDrag={{ scale: 1.1 }}
        animate={{ rotate: 90 }}
        transition={{ type: "spring", duration: 10, bounce: 0.5}}
        className="w-[60px] sm:w-[80px] md:w-[100px] absolute right-[10%] top-[20%] sm:right-[30%] z-0"
        src={brush}
        alt="brush" />

        {/* brush pink right-bottom */} 
        <motion.img
        whileHover={{ scale: 1.5 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        drag whileTap={{opacity: 1, scale: 1.05,}}
        whileDrag={{ scale: 1.1 }}
        animate={{ rotate: -90 }}
        transition={{ type: "spring", duration: 10, bounce: 0.5}}
        className="w-[80px] sm:w-[120px] md:w-[180px] absolute top-[80%] right-[20%] z-0"
        src={brush}
        alt="brush" />


        {/* brush pink right-bottom */} 
        <motion.img
        whileHover={{ scale: 1.5 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        drag whileTap={{opacity: 1, scale: 1.05}}
        whileDrag={{ scale: 1.1 }}
        animate={{ rotate: -180 }}
        transition={{ type: "spring", duration: 10, bounce: 0.5 }}
        className="w-[50px] sm:w-[72px] md:w-[90px] absolute top-[50%] sm:top-[70%] left-[8%] sm:left-[30%] z-0"
        src={brush}
        alt="brush" />

        {/* brush2 blue left-top */} 
        <motion.img
        whileHover={{ scale: 1.5 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        drag
        whileTap={{opacity: 1, scale: 1.05}}
        whileDrag={{ scale: 1.1 }}
        animate={{ rotate: -90 }}
        transition={{ type: "spring", duration: 10, bounce: 0.5}}
        className="w-[70px] sm:w-[96px] md:w-[120px] absolute top-[8%] left-[60%] sm:left-[30%] z-0"
        src={brush2}
        alt="brush2" />

        {/* brush2 blue right-bottom */} 
        <motion.img
        whileHover={{ scale: 1.5 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        drag
        whileTap={{opacity: 1, scale: 1.05}}
        whileDrag={{ scale: 1.1 }}
        animate={{ rotate: -180 }}
        transition={{ type: "spring", duration: 10, bounce: 0.5}}
        className="w-[120px] sm:w-[180px] md:w-[250px] absolute top-[35%] right-[3%] sm:right-[10%] z-0"
        src={brush2}
        alt="brush2" />

        {/* brush2 blue left-bottom */} 
        <motion.img
        whileHover={{ scale: 1.5 }}
        onHoverStart={e => {}}
        onHoverEnd={e => {}}
        drag
        whileTap={{opacity: 1, scale: 1.05}}
        whileDrag={{ scale: 1.1 }}
        animate={{ rotate: -90 }}
        transition={{ type: "spring", duration: 10, bounce: 0.5}}
        className="w-[100px] sm:160px] md:w-[250px] absolute top-[65%] left-[5%] z-0"
        src={brush2}
        alt="brush2" />

        </>
    )

}

export default Brush