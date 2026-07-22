import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export const FadeUp = ({ children, delay = 0, y = 40, className = "", once = true }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

export const MaskLine = ({ children, delay = 0, className = "" }) => (
  <span className="mask-line">
    <motion.span
      initial={{ y: "110%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, delay, ease }}
      className={className}
    >
      {children}
    </motion.span>
  </span>
);
