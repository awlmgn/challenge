// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db.js');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const axios = require("axios");
const API_TOKEN = "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";

// Настройка хранилища для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для сохранения файлов
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Уникальное имя файла
  },
});

const upload = multer({ storage });

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Проверка подключения к базе
pool.connect((err) => {
  if (err) {
    console.error('❌ Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('✅ Подключение к базе данных установлено');
  }
});

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен отсутствует' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Недействительный токен' });
    }
    req.user = user;
    next();
  });
};

// Регистрация пользователя
app.post('/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Имя, email и пароль обязательны' });
    }

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'Пользователь зарегистрирован', user: result.rows[0] });
  } catch (err) {
    console.error('Ошибка регистрации:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Логин пользователя
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Вход успешен', token, user });
  } catch (err) {
    console.error('Ошибка входа:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Профиль пользователя
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Ошибка получения профиля:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Добавление челленджа
app.post('/api/challenges', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description, start_date, end_date, category } = req.body; // добавляем category
    const userId = req.user.userId;

    if (!title || !description || !start_date || !end_date || !category) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    const imageUrl = req.file
      ? `http://localhost:8080/uploads/${req.file.filename}` // Генерируем URL для изображения
      : null;

    const result = await pool.query(
      'INSERT INTO challenges (title, description, start_date, end_date, image, user_id, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, start_date, end_date, imageUrl, userId, category] // добавляем category в запрос
    );

    res.status(201).json({ challenge: result.rows[0] });
  } catch (err) {
    console.error('Ошибка создания челленджа:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


// Получение челленджей пользователя
app.get('/api/challenges', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query('SELECT * FROM challenges WHERE user_id = $1', [userId]);
    res.json({ challenges: result.rows });
  } catch (err) {
    console.error('Ошибка загрузки челленджей:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение всех челленджей (каталог)
app.get('/api/catalog', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM challenges');
    res.json({ challenges: result.rows });
  } catch (err) {
    console.error('Ошибка загрузки каталога:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


// Получение комментариев для челленджа
app.get('/api/challenges/:challengeId/comments', async (req, res) => {
  try {
    const { challengeId } = req.params;
    const result = await pool.query(
      'SELECT * FROM comments WHERE challenge_id = $1 ORDER BY created_at ASC',
      [challengeId]
    );
    res.json({ comments: result.rows });
  } catch (err) {
    console.error('Ошибка получения комментариев:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Добавление комментария
app.post('/api/challenges/:challengeId/comments', async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { username, avatar, text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Текст комментария не может быть пустым' });
    }

    const result = await pool.query(
      'INSERT INTO comments (challenge_id, username, avatar, text) VALUES ($1, $2, $3, $4) RETURNING *',
      [challengeId, username || 'Аноним', avatar || '/default-avatar.png', text]
    );

    res.status(201).json({ comment: result.rows[0] });
  } catch (err) {
    console.error('Ошибка добавления комментария:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Добавление отзыва
app.post('/api/reviews', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { text, author, avatar } = req.body;
    const userId = req.user.userId;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Текст отзыва обязателен' });
    }

    const fileUrl = req.file
      ? `http://localhost:8080/uploads/${req.file.filename}` // Генерируем URL для файла
      : null;

    const result = await pool.query(
      'INSERT INTO reviews (user_id, text, author, avatar, file_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, text, author, avatar, fileUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка создания отзыва:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение всех отзывов
app.get('/api/reviews', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json({ reviews: result.rows });
  } catch (err) {
    console.error('Ошибка загрузки отзывов:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновление аватара пользователя
app.post('/api/profile/avatar', authenticateToken, upload.single('avatar'), (req, res) => {
  try {
    const userId = req.user.userId;
    const avatarUrl = `http://localhost:8080/uploads/${req.file.filename}`; // Генерируем URL для аватара

    // Сохраняем URL аватара в базе данных
    pool.query(
      'UPDATE users SET avatar = $1 WHERE id = $2 RETURNING avatar',
      [avatarUrl, userId],
      (err, result) => {
        if (err) {
          console.error('Ошибка при обновлении аватара:', err.message);
          return res.status(500).json({ error: 'Ошибка сервера' });
        }

        res.json({ avatarUrl: result.rows[0].avatar }); // Возвращаем URL аватара
      }
    );
  } catch (err) {
    console.error('Ошибка при загрузке аватара:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Статическая папка для загрузок
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/api/chat", async (req, res) => {
  const userMessages = req.body.messages;

  try {
    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      { inputs: userMessages.map((m) => m.content).join("\n") },
      {
        headers: {
          Authorization: `Bearer YOUR_API_TOKEN`,
        },
      }
    );

    const answer =
      hfResponse.data?.[0]?.generated_text || "Ответ не получен от модели";

    res.json({ response: answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});
