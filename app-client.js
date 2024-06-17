const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Массив для хранения ключевых слов
let keywords = ['btc', 'eth', 'usdc', 'usdt'];

app.use(bodyParser.json());

// Эндпоинт для добавления ключевого слова и URL
app.post('/add', (req, res) => {
  const { keyword, url } = req.body;
  keywords.push({ keyword, url });
  res.send('Keyword and URL added successfully');
});

// Эндпоинт для получения списка URL по ключевому слову
app.get('/urls/:keyword', (req, res) => {
  const { keyword } = req.params;
  const urls = keywords.filter(obj => obj.keyword === keyword).map(obj => obj.url);
  res.json(urls);
});

// Эндпоинт для передачи статуса загрузки контента
app.put('/status/:url', (req, res) => {
  const { url } = req.params;
  const { status } = req.body;
  // Найдем соответствующий URL и обновим статус
  const index = keywords.findIndex(obj => obj.url === url);
  if (index !== -1) {
    keywords[index].status = status;
    res.send('Status updated successfully');
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});