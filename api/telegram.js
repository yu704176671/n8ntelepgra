export default async function handler(request, response) {
  const BOT_TOKEN = process.env.BOT_TOKEN;

  if (!BOT_TOKEN) {
    return response.status(500).json({ error: "BOT_TOKEN not set" });
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const telegramPath = url.pathname.replace("/api/telegram", "") + url.search;

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}${telegramPath}`;

  try {
    const tgResponse = await fetch(telegramUrl, {
      method: request.method,
      headers: {
        "Content-Type": request.headers["content-type"] || "application/json",
      },
      body:
        request.method !== "GET" ? await request.text() : undefined,
    });

    const data = await tgResponse.text();
    response.status(tgResponse.status).send(data);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
}
