import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import "./style/global.css";
import Footer from './components/Footer';
import Main from './components/Main';
import What from './components/What';
import For from './components/For';
import Mechanism from './components/Mechanism';
import Reviews from "./components/Reviews"; 
import Types from "./components/Types";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import Login from "./components/Login";
import InteractiveCalendar from "./components/InteractiveCalendar";
import Catalog from "./components/Catalog"; // Импорт страницы всех челленджей
import AnimatedPage from "./components/AnimatedPage"; // Импорт компонента для анимаций
import ChatPopup from './components/ChatPopup';
import ChatButton from "./components/ChatButton"; // Импорт кнопки чата
import Video from "./components/Video"; // Импорт видео на главной странице
import "./style/catalog.css";

function Home() {
  return (
    <>
      <Video />
      <Main />
      <What />
      <Types />
      <Mechanism />
      <For />
      <Reviews />
      <ChatPopup />
    </>
  );
}

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <AnimatedPage>
                <Profile />
              </AnimatedPage>
            } 
          />
          <Route 
            path="/reviews" 
            element={
              <AnimatedPage>
                <Reviews />
              </AnimatedPage>
            } 
          />
          <Route 
            path="/what" 
            element={
              <AnimatedPage>
                <What />
              </AnimatedPage>
            } 
          />
          <Route 
            path="/registration" 
            element={
              <AnimatedPage>
                <Registration />
              </AnimatedPage>
            } 
          />
          <Route 
            path="/login" 
            element={
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <AnimatedPage>
                <InteractiveCalendar />
              </AnimatedPage>
            } 
          />
          <Route 
            path="/challenges" 
            element={
              <AnimatedPage>
                <Catalog/>
              </AnimatedPage>
            } 
          /> {/* Новый маршрут */}
        </Routes>
        <Footer />
        <ChatButton />
      </Router>
  );
}

export default App;