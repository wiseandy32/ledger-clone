/* eslint-disable react/prop-types */
import { useAnimation, motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";

function Slide({
  children,
  delay,
  className,
  xAxis,
  yAxis,
  duration,
  xVisible,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
    // margin: !xAxis ? "0px" : "100% 0px 0px -50%",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {
          opacity: 0,
          translateY: !yAxis ? null : yAxis,
          translateX: !xAxis ? null : xAxis,
        },
        visible: {
          opacity: 1,
          translateY: !yAxis ? null : 0,
          translateX: !xAxis ? null : xVisible || 0,
        },
      }}
      transition={{
        // type: "spring",
        duration: duration || 0.3,
        damping: 8,
        delay: delay,
        stiffness: 100,
      }}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Slide;
