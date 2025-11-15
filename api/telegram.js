import axios from 'axios';

/**
 * Vercel Serverless Function 入口
 * 接收 Telegram Webhook 消息并回复
 */
export default async function handler(req, res) {
  // 只处理 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const body = req.body;

  // 需要在 Vercel 环境变量里配置 TELEGRAM_BOT_TOKEN
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ message: 'Missing TELEGRAM_BOT_TOKEN' });
  }

  try {
    // 获取 Telegram 发来的消息
    const chatId = body.message?.chat?.id;
    const text = body.message?.text;

    if (chatId && text) {
      // 回复相同的消息
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

    response.status(500).json({ error: e.message });
  }
}
