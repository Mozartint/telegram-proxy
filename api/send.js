export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  const { name, phone, service, date, time } = req.body;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const message =
    "Yeni Randevu\n\n" +
    "Müşteri: " + name + "\n" +
    "Telefon: " + phone + "\n" +
    "Hizmet: " + service + "\n" +
    "Tarih: " + date + "\n" +
    "Saat: " + time;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  return res.status(200).json({ ok: true });
}
