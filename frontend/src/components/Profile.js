import React, { useState, useEffect, useRef } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [, setReviews] = useState([]);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [challengeImage, setChallengeImage] = useState(null);
  // Состояние для файла
  const fileInputRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Преобразуем строку в объект Date
    const day = String(date.getDate()).padStart(2, '0'); // День (с ведущим нулем, если нужно)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц (с ведущим нулем)
    const year = String(date.getFullYear()).slice(-2); // Год (последние 2 цифры)
  
    return `${day}-${month}-${year}`; // Форматируем дату как дд-мм-гг
  };
  
  // Используем форматирование при выводе даты
  // <p className="dates">
  //   Даты: {formatDate(challenges.start_date)} - {formatDate(challenges.end_date)}
  // </p>
  
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:8080/api/profile', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
          setAvatar(data.user.avatar);
        } else {
          console.error('Ответ от сервера не содержит user:', data);
        }
      })
      
      .catch((err) => console.error('Ошибка при загрузке профиля:', err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:8080/api/challenges', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setChallenges(data.challenges); // Устанавливаем челленджи в состояние
      })
      .catch((err) => {
        console.error('Ошибка при загрузке челленджей:', err);
        alert('Не удалось загрузить челленджи.');
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else if (Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          console.error('Некорректный формат данных отзывов:', data);
          setReviews([]);
        }
      })
      .catch((err) => {
        console.error('Ошибка при загрузке отзывов:', err);
        setReviews([]);
      });
  }, []);
  

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:8080/api/profile/avatar', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Ошибка при обновлении аватара');

      const data = await res.json();
      setAvatar(data.avatarUrl); // Устанавливаем новый URL аватара
      alert('Аватар обновлён!');
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Не удалось обновить аватар.');
    }
  };

  const handleAddChallenge = () => {
    setIsChallengeModalOpen(true);
  };

  const handleAddReview = () => {
    setIsReviewModalOpen(true);
  };

  const handleChallengeImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setChallengeImage(imageUrl);
    }
  };

  const handleSubmitChallenge = async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const file = form.image.files[0]; // Получаем файл изображения
  
    // Получаем значения из формы и форматируем даты
    const startDate = formatDate(form.startDate.value); // Применяем форматирование
    const endDate = formatDate(form.endDate.value); // Применяем форматирование
  
    const formData = new FormData();
    formData.append('title', form.title.value);
    formData.append('description', form.description.value);
    formData.append('start_date', startDate); // Сохраняем отформатированную дату
    formData.append('end_date', endDate); // Сохраняем отформатированную дату
    formData.append('category', form.category.value);
  
    if (file) {
      formData.append('image', file); // Добавляем файл изображения
    }
  
    const token = localStorage.getItem('token');
  
    try {
      const res = await fetch('http://localhost:8080/api/challenges', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!res.ok) throw new Error('Ошибка при добавлении челленджа');
  
      const data = await res.json();
      // setChallenges((prev) => [...prev, data.challenge]);
      setChallenges((prev) => Array.isArray(prev) ? [...prev, data.challenge] : [data.challenge]);

      setIsChallengeModalOpen(false);
      alert('Челлендж добавлен!');
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Не удалось добавить челлендж.');
    }
  };
  

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    const form = event.target;
    const newReview = new FormData(); // Используем FormData для отправки файла

    newReview.append('text', form.review.value);
    newReview.append('author', user.name); // Добавляем имя пользователя
    newReview.append('avatar', user.avatar); // Добавляем аватар пользователя
   

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newReview,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Ошибка сервера:', errorData);
        throw new Error(errorData.error || 'Ошибка при отправке отзыва');
      }

      const savedReview = await res.json();
      setReviews((prev) => {
        if (!Array.isArray(prev)) {
          console.error('prev is not an array:', prev);
          return [savedReview]; // создаём массив с новым отзывом
        }
        return [...prev, savedReview];
      });
      
      setIsReviewModalOpen(false);
      alert('Отзыв отправлен!');
    } catch (err) {
      console.error('Ошибка:', err);
      alert(err.message || 'Не удалось отправить отзыв.');
    }
  };


  if (!user) {
    return <p>Загрузка профиля...</p>;
  }

  return (
    <div className="background">
      <div className="profile-overlay">
        <div className="top-bar">
          <h1>Добро пожаловать, {user.name}!</h1>
          <h1>Ваши челленджи</h1>
        </div>
        <div className="content">
          <div className="profile-card">
            <div className="profile-info">
              <img
                src={avatar}
                alt="Avatar"
                className="avatar"
              />
              <div className="info-text">
                <h2>{user.name}</h2>
                <p>Почта: {user.email}</p>
                <p>Роль: {user.role || 'user'}</p>
              </div>
              <button className="edit-btn" onClick={handleEditClick}>Изменить</button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <div className="description">
              <h3>Описание</h3>
              <p>{user.description || 'Описание профиля пока не добавлено.'}</p>
            </div>

            <div className="profile-buttons">
              <button className="green-btn" onClick={handleAddChallenge}>Добавить +</button>
              <button className="green-btn" onClick={handleAddReview}>Написать отзыв</button>
            </div>
          </div>

          <div className="challenges-list">
            {challenges.length > 0 ? (
              challenges.map((challenge) => (
                <div className="challenge-card" key={challenge.id}>
                  <img
                    src={challenge.image || "https://via.placeholder.com/300x100"} // Отображаем изображение или заглушку
                    alt="Challenge"
                    className="challenge-img"
                  />
                  <div className="challenge-content">
                    <h2>{challenge.title}</h2>
                    <p>{challenge.description}</p>
                    <p className="dates">
                      Даты: {challenge.start_date} - {challenge.end_date}
                    </p>
                    <p className="category">
                      Категория: {challenge.category}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Пока нет челленджей.</p>
            )}
          </div>

          

        </div>
      </div>

      {/* Модалка для челленджа */}
      {isChallengeModalOpen && (
        <div className="profile-modal">
          <div className="modal-profile">
            <h2>Добавить новый челлендж</h2>
            <form onSubmit={handleSubmitChallenge}>
              <input type="text" name="title" placeholder="Название" required />
              <textarea name="description" placeholder="Описание" required />
              <input type="date" name="startDate" required />
              <input type="date" name="endDate" required />
              <select name="category" required>
                <option value="">Выберите категорию</option>
                <option value="Спорт">Спорт</option>
                <option value="Питание">Питание</option>
                <option value="Психология">Психология</option>
                <option value="Продуктивность">Продуктивность</option>
                <option value="Творчество">Творчество</option>
                <option value="Привычки">Привычки</option>
              </select>
              <input type="file" name="image" accept="image/*" onChange={handleChallengeImageChange} />
               {challengeImage && (
  <div className="image-preview">
    <img src={challengeImage} alt="Preview" className="challenge-preview" />
  </div>
)}

            <div className="profile-modal-buttons">
              <button className="profile-button" type="submit">Сохранить</button>
              <button className="profile-button cancel-button" onClick={() => setIsChallengeModalOpen(false)}>Отмена</button>
            </div>
            </form>
          </div>
        </div>
      )}

      {/* Модалка для отзыва */}
      {isReviewModalOpen && (
        <div className="modal-review">
          <div className="review-modal-content">
            <div className="review-user-info">
              <img
                src={user.avatar || "/default-avatar.png"} // Используем avatar из объекта user
                alt="Аватар пользователя"
                className="review-avatar"
              />
              <span className="review-username">
                {user.name || "Имя пользователя"}
              </span> {/* Используем name из объекта user */}
            </div>
            <h2>Написать отзыв</h2>
            <form onSubmit={handleSubmitReview}>
              <textarea name="review" placeholder="Ваш отзыв" required />
              <div className="review-modal-buttons">
                <button type="review-submit">Отправить</button>
                <button type="review-button" onClick={() => setIsReviewModalOpen(false)}>Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
