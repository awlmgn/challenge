// import axios from 'axios';

// const API_KEY = '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'; // Замените на новый ключ

// export const getChatGPTResponse = async (prompt) => {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo', // Или 'gpt-3.5-turbo', если у вас нет доступа к GPT-4
//         messages: [{ role: 'user', content: prompt }],
//         max_tokens: 150,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${API_KEY}`,
//         },
//       }
//     );
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     // Логируем полную ошибку для отладки
//     console.error('Ошибка при запросе к ChatGPT:', error.response || error.message);

//     // Формируем точное описание ошибки
//     if (error.response) {
//       // Ошибка от сервера OpenAI
//       const status = error.response.status;
//       const statusText = error.response.statusText;
//       const errorMessage = error.response.data?.error?.message || 'Неизвестная ошибка от сервера.';
//       throw new Error(`Ошибка ${status} (${statusText}): ${errorMessage}`);
//     } else if (error.request) {
//       // Ошибка при отправке запроса
//       throw new Error('Ошибка сети: запрос не был выполнен. Проверьте подключение к интернету.');
//     } else {
//       // Другая ошибка
//       throw new Error(`Неизвестная ошибка: ${error.message}`);
//     }
//   }
// };
// import axios from 'axios';

// const HUGGING_FACE_API_KEY = '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'; // Ваш токен Hugging Face
// const MODEL_NAME = 'kingabzpro/Llama-4-Scout-17B-16E-Instruct-Medical-ChatBot'; // Имя новой модели

// export const getHuggingFaceResponse = async (messages) => {
//   try {
//     console.log('Отправка запроса к Hugging Face...');
//     console.log('Модель:', MODEL_NAME);
//     console.log('Сообщения:', messages);

//     const response = await axios.post(
//       `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
//       { inputs: messages },
//       {
//         headers: {
//           Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
//         },
//       }
//     );

//     console.log('Ответ от Hugging Face:', response.data);
//     return response.data.generated_text || 'Ответ не получен.';
//   } catch (error) {
//     console.error('Ошибка при запросе к Hugging Face:', error);

//     if (error.response) {
//       // Ошибка от сервера Hugging Face
//       const status = error.response.status;
//       const statusText = error.response.statusText;
//       const errorMessage = error.response.data?.error || 'Неизвестная ошибка от сервера.';
//       console.error(`Ошибка ${status} (${statusText}): ${errorMessage}`);
//       throw new Error(`Ошибка ${status} (${statusText}): ${errorMessage}`);
//     } else if (error.request) {
//       // Ошибка при отправке запроса
//       console.error('Ошибка сети: запрос не был выполнен. Проверьте подключение к интернету.');
//       throw new Error('Ошибка сети: запрос не был выполнен. Проверьте подключение к интернету.');
//     } else {
//       // Другая ошибка
//       console.error('Неизвестная ошибка:', error.message);
//       throw new Error(`Неизвестная ошибка: ${error.message}`);
//     }
//   }
// };
