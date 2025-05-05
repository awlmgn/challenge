import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Добавляем useLocation
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Иконки для переключателя и профиля
import logo from "../icons/logo.png"; // Логотип

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации
  const navigate = useNavigate();
  const location = useLocation(); // Получаем текущий путь


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Проверяем наличие токена
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен
    setIsLoggedIn(false); // Обновляем состояние
    navigate("/"); // Перенаправляем на главную страницу
  };

  // Определяем класс хедера в зависимости от текущего пути
  const isVideoPage = location.pathname === "/"; // Проверяем, находимся ли на главной странице с компонентом <Video />
  const headerClass = `${isVideoPage ? "header-video" : "header-default"} ${
    isScrolled ? "header-scrolled" : ""
  }`;

  return (
    <header className={`header ${headerClass}`}>
      <div className="header-logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul className="header_container">
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/what">О нас</Link></li>
          <li><Link to="/reviews">Отзывы</Link></li>
          <li><Link to="/challenges">Каталог</Link></li>
          {isLoggedIn && <li><Link to="/profile">Профиль</Link></li>}
          
        </ul>
      </nav>
      <div className="header-actions">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="logout-icon">
              <FaSignOutAlt size={20} />
            </button>
            <Link to="/profile" className="profile-icon">
              <FaUserCircle size={24} />
            </Link>
          </>
        ) : (
          <Link to="/registration" className="btn">Зарегистрироваться</Link>
        )}
      </div>
    </header>
  );
}

export default Header;