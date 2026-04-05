// api/assets.js
export default function handler(req, res) {
  // إعدادات CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // يجلب اسم الملف من الرابط (مثلاً ar.json)
  const path = req.url.split('/').pop().split('?')[0];

  const data = {
    "ar.json": { "welcome": "مرحباً بكم في الإنماء", "search": "بحث" },
    "en.json": { "welcome": "Welcome to Alinma", "search": "Search" },
    "categories": { "items": ["cat1", "cat2"] }
  };

  if (data[path]) {
    res.status(200).json(data[path]);
  } else {
    res.status(404).send({ error: "Not Found" });
  }
}