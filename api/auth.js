export default function handler(req, res) {
  // 1. إعدادات السماح والمفاتيح الوهمية
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Content-State, Verification, X-Alinma-SessionId, X-Alinma-ReqId, x-oneagent-js-injection');
  res.setHeader('Access-Control-Expose-Headers', 'X-Content-State, Authorization, Verification, X-Alinma-SessionId, X-Alinma-ReqId');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // تجاهل طلبات التتبع لمنع تعطل السيرفر
  if (req.url && req.url.includes('/rb_')) {
    return res.status(200).send('ok');
  }

  // إرسال المفاتيح لتجنب خطأ null
  res.setHeader('X-Content-State', 'dummy-state');
  res.setHeader('Authorization', 'Bearer dummy-token');
  res.setHeader('Verification', 'dummy-verification');
  res.setHeader('X-Alinma-SessionId', 'SSDVS0040505499c2846257514478e944b552e30af2ec4');
  res.setHeader('X-Alinma-ReqId', '1f63b99e-c799-4bf6-b873-da41f9c54d85');

  const url = req.url;

  // =========================================================================
  // 2. الرد على طلب "الفئات" (Categories)
  // =========================================================================
  if (url.includes('/certificates/categories') && !url.includes('/types')) {
    return res.status(200).json({
      "status": {
        "code": "I000000",
        "type": "SUCCESS",
        "desc": "success",
        "sessionReference": "SSDVS0040505499c2846257514478e944b552e30af2ec4",
        "requestReference": "00178170341202906036"
      },
      "response": {
        "certificationsCategories": [
          { "code": "626e694b664163786873673d", "desc": "أفراد" },
          { "code": "722f33595a764d694e5a553d", "desc": "الشركات" },
          { "code": "31544f456d776f773333673d", "desc": "تخطيط موارد المؤسسة" },
          { "code": "494b6d5859544f677154453d", "desc": "تأجير السيارات التمويلي" }
        ]
      },
      "successfulResponse": true
    });
  }

  // =========================================================================
  // 3. الرد على طلب "الأنواع" (Types)
  // =========================================================================
  if (url.includes('/types')) {
    return res.status(200).json({
      "status": {
        "code": "I000000",
        "type": "SUCCESS",
        "desc": "success",
        "sessionReference": "SSDVS0040505499c2846257514478e944b552e30af2ec4",
        "requestReference": "00178170341202906037"
      },
      "response": {
        "certificationsTypes": [
          { "code": "655477534a463471346d553d", "desc": "شهادة اقفال الرصيد" },
          { "code": "3961383247436678672b733d", "desc": "كشف حساب موثق" },
          { "code": "362f72364257754d2f5a6b3d", "desc": "شهادة رصيد" },
          { "code": "304d4770384c49652f38733d", "desc": "شهادة رصيد الحساب الجاري" },
          { "code": "79483846573869503861673d", "desc": "شهادة بيانات الشريك" },
          { "code": "4f695371474947756e51513d", "desc": "طلبات التصفية" }
        ]
      },
      "successfulResponse": true
    });
  }

  // =========================================================================
  // 4. الرد الافتراضي: إرسال شهادة الـ PDF عند إتمام عملية البحث بنجاح
  // =========================================================================
  
  // ⚠️ استبدل هذا النص الطويل بكود الـ Base64 الخاص بشهادتك الحقيقية
  const myPdfBase64 = "JVBERi0xLjAKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL1BhcmVudCAyIDAgUj4+CmVuZG9iago0IDAgb2JqCjw8L1R5cGUvWFJlZi9TaXplIDQvV1sxIDIgMV0vUm9vdCAxIDAgUi9JbmRleFswIDRdPj4Kc3RyZWFtCgH//wAAAAMAAgEAAAAEAAIBAgAAAAgAAgEEAAAACgABAAoAAQANZW5kc3RyZWFtCmVuZG9iagpzdGFydHhyZWYKNzAKJSVFT0YK";

  return res.status(200).json({
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
  });
}
