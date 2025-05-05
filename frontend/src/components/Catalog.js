import React, { useState, useEffect } from "react";
import sportBg from "../icons/sport-bg.jpg";
import nutritionBg from "../icons/nutrition-bg.jpg";
import mentalBg from "../icons/mental-bg.jpg";
import productivityBg from "../icons/productivity-bg.jpg";
import creativityBg from "../icons/creativity-bg.jpg";
import habitsBg from "../icons/habits-bg.jpg";

const Catalog = () => {
  const [challenges, setChallenges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fade, setFade] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const categories = [
    { key: 'all', label: 'Все' },
    { key: 'Спорт', label: 'Спорт' },
    { key: 'Питание', label: 'Питание' },
    { key: 'Психология', label: 'Психология' },
    { key: 'Продуктивность', label: 'Продуктивность' },
    { key: 'Творчество', label: 'Творчество' },
    { key: 'Привычки', label: 'Привычки' },
  ];
  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/catalog');
        const data = await response.json();
        setChallenges(data.challenges);
        setSelected(data.challenges[0]);
      } catch (error) {
        console.error('Ошибка при загрузке челленджей:', error);
      }
    };

    fetchChallenges();
  }, []);

  const handleSelect = (item) => {
    if (item.title === selected.title) return;
    setFade(false);
    setTimeout(() => {
      setSelected(item);
      setFade(true);
    }, 300);
  };

  const handleTypeChange = (type) => setSelectedType(type);

  const filteredChallenges = challenges.filter((c) => selectedType === 'all' || c.category=== selectedType);

  const getBackgroundImage = () => {
    switch (selectedType) {
      case 'Спорт':
        return `url(${sportBg})`;
      case 'Питание':
        return `url(${nutritionBg})`;
      case 'Психология':
        return `url(${mentalBg})`;
      case 'Продуктивность':
        return `url(${productivityBg})`;
      case 'Творчество':
        return `url(${creativityBg})`;
      case 'Привычки':
        return `url(${habitsBg})`;
      default:
        return 'none';
    }
  };
  
  const openModal = async (challenge) => {
    setSelected(challenge);
    setIsModalOpen(true);
    try {
      const response = await fetch(`http://localhost:8080/api/challenges/${challenge.id}/comments`);
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Ошибка при загрузке комментариев:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setComments([]);
    setNewComment('');
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch(`http://localhost:8080/api/challenges/${selected.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment }),
      });
      const data = await response.json();
      setComments([...comments, data.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  return (
    <div
      className="challenge-hub"
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {selected && (
        <>
          <div className={`content-area fade-switch ${fade ? 'show' : ''}`}>
            <div className="challenge-info">
              <h1>{selected.title}</h1>
              <p>{selected.description}</p>
              <button className="join-button" onClick={() => openModal(selected)}>Подробнее</button>
            </div>
          </div>

          <div className="sort-options">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`filter-button ${selectedType === cat.key ? 'active' : ''}`}
                onClick={() => handleTypeChange(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>


          <div className="challenge-gallery rotating-gallery">
            {filteredChallenges.map((item, index) => (
              <div
                key={index}
                className={`gallery-card ${selected.title === item.title ? "active" : ""}`}
                onClick={() => handleSelect(item)}
              >
                <div className="gallery-card-img" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="gallery-card-title">{item.title}</div>
              </div>
            ))}
          </div>

          {isModalOpen && selected && (
            <div className="modal-catalog" onClick={closeModal}>
              <div className="catalog-content" onClick={(e) => e.stopPropagation()}>
                <button className="catalog-close" onClick={closeModal}>&times;</button>
                <h2>{selected.title}</h2>
                <img src={selected.image} alt={selected.title} className="modal-image" />
                <p>{selected.description}</p>
                <p>Даты: {selected.start_date} - {selected.end_date}</p>
                <div className="comments-section">
                  <h3>Комментарии</h3>
                  <div className="comments-list">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                          <img
                          src={
                            comment.avatar && comment.avatar.startsWith('http')
                              ? comment.avatar
                              : 'https://www.meme-arsenal.com/memes/8d50457410a1b491e3183d500ad11e0a.jpg'
                          }
                          alt="Avatar"
                        />

                          <div>
                            <p><strong>{comment.username || 'Аноним'}</strong></p>
                            <p>{comment.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Комментариев пока нет.</p>
                    )}
                  </div>
                  <div className="add-comment">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Напишите комментарий..."
                    />
                    <button onClick={handleAddComment} className="btn">Добавить комментарий</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;