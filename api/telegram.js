import axios from 'axios';

/**
 * Telegram Webhook Serverless Function
 * 通过 Vercel 接收消息并回复
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const body = req.body;

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ message: 'Missing TELEGRAM_BOT_TOKEN' });
  }

  try {
    const chatId = body.message?.chat?.id;
    const text = body.message?.text;

    if (chatId && text) {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: `你发送了: ${text}`
      });
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Telegram API error' });
  }
}
