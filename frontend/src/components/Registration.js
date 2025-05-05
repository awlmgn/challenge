import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Анимация запускается только один раз

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Имя обязательно";
    if (!formData.email.trim()) newErrors.email = "Email обязателен";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Некорректный email";
    if (!formData.password) newErrors.password = "Пароль обязателен";
    else if (formData.password.length < 6) newErrors.password = "Пароль должен быть не менее 6 символов";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Пароли не совпадают";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Ошибка при регистрации");

      alert("Регистрация успешна!");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      alert("Ошибка регистрации: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="form-container"
    >
      <motion.div
        className="form-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2>Регистрация</h2>
        <form className="form" onSubmit={handleSubmit}>
          <motion.input
            name="name"
            placeholder="Имя"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <motion.input
            name="email"
            placeholder="Адрес почты"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <motion.input
            name="password"
            placeholder="Создать пароль"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <motion.input
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
            required
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <motion.button
            type="submit"
            className="button"
            disabled={isSubmitting}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
          </motion.button>
        </form>

        <motion.div
          className="link"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Registration;
