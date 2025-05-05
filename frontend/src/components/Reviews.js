// import React, { useRef } from "react";
// import { motion } from "framer-motion";

// const reviews = [
//   {
//     text: "Курс оказался невероятно полезным. Сначала я изучала различные бесплатные уроки и вебинары, но информации не хватало. После прохождения курса я получила четкое понимание, как грамотно управлять своими финансами и инвестировать средства.",
//     author: "Алексей Иванов",
//     avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     text: "Хочу выразить огромную благодарность за консультацию. Информация об инвестировании была подана доступно и понятно. Теперь я знаю, как без риска инвестировать деньги для улучшения качества жизни моей семьи.",
//     author: "Марина Смирнова",
//     avatar: "https://images.pexels.com/photos/12102214/pexels-photo-12102214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     text: "Курс легкий в восприятии, можно начинать практиковаться уже во время обучения. Постоянное сопровождение и помощь кураторов сделали процесс обучения комфортным.",
//     author: "Дмитрий Петров",
//     avatar: "https://images.pexels.com/photos/9980214/pexels-photo-9980214.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     text: "Преподаватель за один день занятий сумел структурно вложить информацию о годовом курсе экономики, объяснил графики и термины на понятных примерах.",
//     author: "Екатерина Орлова",
//     avatar: "https://images.pexels.com/photos/11045311/pexels-photo-11045311.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     text: "Отличная организация и компетентные консультации организаторов Олимпиады, высокий уровень лекций и мероприятий, профессионализм приглашённых гостей.",
//     author: "Сергей Волков",
//     avatar: "https://images.pexels.com/photos/15406458/pexels-photo-15406458.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
// ];

// function Reviews() {
//   const carouselRef = useRef(null);

//   const scrollLeft = () => {
//     carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   return (
//     <section className="testimonials">
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="testimonials-title"
//       >
//         Что говорят наши клиенты
//       </motion.h2>
//       <div className="carousel-container">
//         <button className="carousel-button left" onClick={scrollLeft}>
//           ←
//         </button>
//         <div className="carousel" ref={carouselRef}>
//           {reviews.map((review, index) => (
//             <motion.div
//               key={index}
//               className="review-card"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//             >
//               <img src={review.avatar} alt={review.author} className="review-avatar" />
//               <p className="review-text">«{review.text}»</p>
//               <h4 className="review-author">{review.author}</h4>
//             </motion.div>
//           ))}
//         </div>
//         <button className="carousel-button right" onClick={scrollRight}>
//           →
//         </button>
//       </div>
//     </section>
//   );
// }

// export default Reviews;
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function Reviews() {
  const carouselRef = useRef(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/reviews');
      const data = await response.json();
      setReviews(data.reviews); // сервер должен отдавать массив reviews
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
    }
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="testimonials">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="testimonials-title"
      >
        Что говорят наши клиенты
      </motion.h2>

      <div className="carousel-container">
        <button className="carousel-button left" onClick={scrollLeft}>
          ←
        </button>
        <div className="carousel" ref={carouselRef}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={index}
                className="review-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Предположим, что у отзыва есть text, author и avatar */}
                {review.avatar && (
                  <img src={review.avatar} alt={review.author || "Аватар"} className="review-avatar" />
                )}
                <p className="review-text">«{review.text}»</p>
                {review.author && <h4 className="review-author">{review.author}</h4>}
              </motion.div>
            ))
          ) : (
            <p>Нет отзывов</p>
          )}
        </div>
        <button className="carousel-button right" onClick={scrollRight}>
          →
        </button>
      </div>
    </section>
  );
}

export default Reviews;
