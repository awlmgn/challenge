import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import mechanism from "../icons/mechanism.jpg";

function Mechanism() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Анимация запускается только один раз

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mechanism"
    >
      <div className="mechanism_container">
        {/* Полупрозрачный прямоугольник с блюром */}
        <motion.div
          className="mechanism_blur_background"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>

        <motion.div
          className="mechanism_block"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.img
            src={mechanism}
            alt="фон"
            className="mechanism_img"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.div
            className="mechanism_content"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1>Как это работает?</h1>
            <p>
            На платформе представлены челленджи для разных сфер жизни: спорт, здоровье, личная продуктивность, творчество и многое другое. Просто выбери тот, который тебе интересен и соответствует твоим целям. Ты можешь выбрать челлендж для новичка или более сложный для опытных участников.
            </p>
            <ul className="mechanism-list">
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="icon1">✔️</span>
                Выбери челлендж по интересам
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <span className="icon2">🚀</span>
                Следи за прогрессом
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <span className="icon3">🏆</span>
                Делись результатами и вдохновляй других
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Mechanism;