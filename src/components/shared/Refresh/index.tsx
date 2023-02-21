import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Refresh = ({setIsLoaded}: {setIsLoaded: any}) => {
    const [scale, setScale] = useState(1);

    setTimeout(() => {
        setScale(0)
    }, 1000);

    if(scale === 0) {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    } 

    return (
        <motion.div
            className="motion-box"
            animate={{
                x: 0,
                y: 0,
                scale: scale,
                rotate: 0,
            }}
        />
    )
}