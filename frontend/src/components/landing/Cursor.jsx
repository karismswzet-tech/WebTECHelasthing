import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Custom cursor: small dot + trailing ring that expands on hover
 * over interactive elements. Uses mix-blend-mode: difference.
 */
export const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };
    const onOver = (e) => {
      const t = e.target;
      if (
        t?.closest("a, button, input, textarea, [data-cursor-hover]")
      ) setHovering(true);
      else setHovering(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          scale: hovering ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.3 }}
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "#fff",
        }}
      />
      <motion.div
        className="custom-cursor"
        animate={{
          x: pos.x - (hovering ? 24 : 16),
          y: pos.y - (hovering ? 24 : 16),
          scale: hovering ? 1.4 : 1,
          borderColor: hovering ? "#00F0FF" : "rgba(255,255,255,0.6)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.6 }}
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.6)",
        }}
      />
    </>
  );
};

export default Cursor;
