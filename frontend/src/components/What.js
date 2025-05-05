import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import what from "../icons/what.jpg";

function What() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const imgRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      img.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="what"
    >
      <div className="what_container">
        <motion.div
          className="what_block"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="what_content"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1>Что такое челлендж?</h1>
            <p>
              Слово челлендж (от англ. challenge) — это вызов, испытание или задание, которое нужно выполнить, обычно в ограниченный срок или по определённым условиям.
            </p>
            <p>xdvcsd</p>
            <ul className="custom-list">
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="icon">✔️</span>
                Участвуй в командных челленджах
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="icon">🚀</span>
                Прокачивай навыки через игру
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <span className="icon">🏆</span>
                Получай награды и рейтинг
              </motion.li>
            </ul>
          </motion.div>

          {/* Обёртка для 3D-эффекта */}
          <div className="img_wrapper" ref={wrapperRef}>
            <motion.img
              ref={imgRef}
              src={what}
              alt="фон"
              className="what_img"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default What;
