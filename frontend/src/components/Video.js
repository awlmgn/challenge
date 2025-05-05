import React from 'react';

const Video = () => {
  return (
    <div className="home-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/videos/background.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <div className="overlay"></div>
      <div className="welcome-text">
        <h1>Добро пожаловать!</h1>
        <p>Начните свои челленджи прямо сейчас!</p>
      </div>
    </div>
  );
};

export default Video;