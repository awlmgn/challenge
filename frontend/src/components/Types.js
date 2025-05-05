import React from "react";
import { motion } from "framer-motion";
import velo from "../icons/velo.jpg";
import swim from "../icons/swim.jpg";
import yoga from "../icons/yoga.jpg";

function Types() {
  const types = [
    {
      label: "Глобальная цель",
      title: "Общая цель для всех участников",
      list: [
        "Объединения всех участников проекта",
        "Благотворительных сборов",
        "Виртуальных путешествий и рекордов"
      ],
      image: velo
    },
    {
      label: "Глобальная гонка",
      title: "Соревнования между командами",
      list: [
        "Проведения спортивных командных соревнований",
        "Отбора и выявления самых активных и спортивных коллективов",
        "Повышения спортивного духа и эмоционального фона"
      ],
      image: swim
    },
    {
      label: "Комбинированный вариант",
      title: "Соревнования с общей целью",
      list: [
        "Проведения спортивных соревнований с общей конечной целью",
        "Объединения двух аудиторий, в рамках такого челленджа одна часть участников соревнуется, а другая участвует для себя"
      ],
      image: yoga
    }
  ];

  return (
    <motion.section
      className="types-section"
      id="types"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="types-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Виды командных челленджей
      </motion.h2>
      <motion.div
        className="types-carousel"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="carousel-wrapper">
          {types.concat(types).map((item, i) => (
            <motion.div
              key={i}
              className="type-card"
              style={{ backgroundImage: `url(${item.image})` }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.2 }}
            >
              <span className="type-label green">{item.label}</span>
              <h3 className="type-heading">{item.title}</h3>
              <ul className="type-list">
                {item.list.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 + idx * 0.2 }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Types;
