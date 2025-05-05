import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token); // Сохраняем токен
        alert("Вход успешен!");
        navigate("/profile"); // Перенаправляем на страницу профиля
        window.dispatchEvent(new Event("storage")); // Обновляем состояние в Header
      } else {
        alert(result.error || "Ошибка входа");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Ошибка сервера");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="form-container"
    >
      <motion.div
        className="form-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1>Добро пожаловать обратно!</h1>
        <p>Войдите, чтобы продолжить пользоваться платформой.</p>
      </motion.div>
      <motion.div
        className="form-right"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Вход</h2>
        <form className="form" onSubmit={handleSubmit}>
          <motion.input
            type="email"
            name="email"
            className="input-login"
            placeholder="Адрес почты"
            value={formData.email}
            onChange={handleChange}
            required
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.input
            type="password"
            name="password"
            className="input-password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.div
            className="checkbox-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <label>
              <input type="checkbox" name="remember" />
              Запомнить меня
            </label>
            <a href="/forgot-password" className="forgot-password">
              Забыли пароль?
            </a>
          </motion.div>
          <motion.button
            type="submit"
            className="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Войти
          </motion.button>
        </form>
        <motion.div
          className="link"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Еще нет аккаунта? <a href="/registration">Создайте аккаунт</a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;