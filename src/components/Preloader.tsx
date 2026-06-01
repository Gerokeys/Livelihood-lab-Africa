"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const MIN_MS = 2000; // always show for at least 2s
    const start = Date.now();

    const dismiss = () => {
      const remaining = Math.max(0, MIN_MS - (Date.now() - start));
      setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Hard cap at 5 s in case the load event never fires
      const cap = setTimeout(() => setVisible(false), 5000);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(cap);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#122a1e" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo.png"
              alt="Livelihood Lab Africa"
              width={200}
              height={65}
              priority
              className="w-36 lg:w-44 h-auto brightness-0 invert"
            />
          </motion.div>

          {/* Progress track + amber fill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-10 w-28 lg:w-36 h-px overflow-hidden"
            style={{ backgroundColor: "#2d5a3d" }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: "#c4763a" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Firm tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 text-[9px] tracking-[0.28em] uppercase"
            style={{ color: "#4a7c59" }}
          >
            Nairobi, Kenya
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
