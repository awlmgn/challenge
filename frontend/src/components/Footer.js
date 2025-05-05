import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaTwitter, FaFacebook, FaInstagram, FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../icons/logo.png";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Анимация запускается только один раз

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="footer"
    >
      <div className="footer-container">
        {/* Логотип и описание */}
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>
            Challenge — Мы предлагаем удобные инструменты для создания собственных челленджей и участия в уже созданных. Ставьте цели, отслеживайте прогресс, и делитесь достижениями с сообществом!
          </p>
        </motion.div>

        {/* Быстрые ссылки */}
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h4>Быстрые ссылки</h4>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/what">О нас</a></li>
            <li><a href="/reviews">Отзывы</a></li>
            <li><a href="/profile">Профиль</a></li>
            <li><a href="/challenges">Каталог челленджей</a></li>
          </ul>
        </motion.div>

        {/* Контактная информация */}
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h4>Контакты</h4>
          <ul>
            <li><FaMapMarkerAlt /> Астана, Казахстан</li>
            <li><FaPhone /> +7 (777) 199-11-07</li>
            <li><FaEnvelope /> support@challenge.com</li>
          </ul>
        </motion.div>

        {/* Социальные сети */}
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h4>Мы в соцсетях</h4>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </motion.div>
      </div>

      {/* Нижняя часть футера */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p>© 2025 Challenge. Все права защищены.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;