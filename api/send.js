export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { name, phone, service, date, time, staff } = req.body || {};

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message =
      `Yeni Randevu\n\n` +
      `Müşteri: ${name || "-"}\n` +
      `Telefon: ${phone || "-"}\n` +
      `Hizmet: ${service || "-"}\n` +
      `Personel: ${staff || "-"}\n` +
      `Tarih: ${date || "-"}\n` +
      `Saat: ${time || "-"}`;

    const tg = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await tg.json();
    return res.status(200).json({ ok: true, telegram: data });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
