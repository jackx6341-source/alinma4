export default function handler(req, res) {
  // 1. السماح بالاتصال وتخطي حماية المتصفح
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Content-State, Verification, X-Alinma-SessionId, X-Alinma-ReqId, x-oneagent-js-injection');
  
  // 2. كشف المفاتيح الوهمية للموقع لكي لا يعطي خطأ null
  res.setHeader('Access-Control-Expose-Headers', 'X-Content-State, Authorization, Verification, X-Alinma-SessionId, X-Alinma-ReqId');

  // فحص المتصفح المبدئي
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. إيقاف أخطاء ملف التتبع المزعجة (ruxitagentjs) التي سببت خطأ 500
  if (req.url && req.url.includes('/rb_')) {
    return res.status(200).send('ok');
  }

  // 4. إرسال المفاتيح الوهمية
  res.setHeader('X-Content-State', 'dummy-state');
  res.setHeader('Authorization', 'Bearer dummy-token');
  res.setHeader('Verification', 'dummy-verification');
  res.setHeader('X-Alinma-SessionId', 'SSDVS0040505499c2846257514478e944b552e30af2ec4');
  res.setHeader('X-Alinma-ReqId', '1f63b99e-c799-4bf6-b873-da41f9c54d85');

  // 5. كود لملف PDF سليم (صفحة بيضاء صغيرة) للتجربة لضمان عدم تعطل السيرفر
  const myPdfBase64 = "JVBERi0xLjAKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL1BhcmVudCAyIDAgUj4+CmVuZG9iago0IDAgb2JqCjw8L1R5cGUvWFJlZi9TaXplIDQvV1sxIDIgMV0vUm9vdCAxIDAgUi9JbmRleFswIDRdPj4Kc3RyZWFtCgH//wAAAAMAAgEAAAAEAAIBAgAAAAgAAgEEAAAACgABAAoAAQANZW5kc3RyZWFtCmVuZG9iagpzdGFydHhyZWYKNzAKJSVFT0YK";

  // 6. الرد المطابق للبنك
  const bankResponse = {
    "status": {
      "code": "I000000",
      "type": "SUCCESS",
      "desc": "DVSServiceImpl.certificateValidation.messege.success",
      "sessionReference": "SSDVS0040505499c2846257514478e944b552e30af2ec4",
      "requestReference": "00178170341202906049"
    },
    "response": {
      "report": myPdfBase64
    },
    "successfulResponse": true
  };

  res.status(200).json(bankResponse);
}
