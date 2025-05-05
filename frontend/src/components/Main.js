import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

function Main() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Анимация запускается только один раз

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="main"
    >
      <div className="main_container">
        <motion.div
          className="main_block"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="main_content"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1>Командные челленджи</h1>
            <p>
              Вовлекайте сотрудников в спортивные челленджи, укрепляйте командный дух 
              и создавайте культуру активного образа жизни.
            </p>

            {/* Блок с зелёной палкой */}
            <motion.div
              style={{ display: "flex", alignItems: "flex-start", margin: "20px 0 30px" }}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
            
              
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Link to="/registration" className="main_btn">
                <span>Зарегистрироваться</span>
                <span className="arrow_circle">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Main;
