import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import forImage from "../icons/for.jpg"; 

function For() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Анимация запускается только один раз

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="for"
    >
      <div className="for_container">
        <div className="for_block">
          <motion.img
            src={forImage}
            alt="фон"
            className="for_img"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="for_content"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1> Почему стоит попробовать</h1>
            <p>
            Забудь про сложные и запутанные методы отслеживания. Наша система позволяет легко видеть, как ты движешься к своей цели. Каждый челлендж разбит на этапы с чёткими критериями и сроками. Ты можешь отслеживать каждый свой шаг, а прогресс будет мотивировать идти дальше, пока не достигнешь своей цели!
            </p>

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default For;
