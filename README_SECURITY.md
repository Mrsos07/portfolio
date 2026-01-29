# 🔐 دليل الأمان والنشر

## 🚀 البدء السريع

### 1. التثبيت
```bash
npm install
```

### 2. إعداد المتغيرات البيئية
أنشئ ملف `.env` في الجذر (لا ترفعه على Git):
```env
GEMINI_API_KEY=AIza...your_actual_key
```

### 3. التشغيل المحلي
```bash
npm run dev
```
سيعمل على: http://localhost:8888

## 📦 النشر على Netlify

### الطريقة 1: عبر GitHub (موصى بها)
1. ارفع الكود على GitHub
2. اذهب إلى [Netlify Dashboard](https://app.netlify.com)
3. اضغط "New site from Git"
4. اختر repository
5. **مهم جداً:** أضف Environment Variable:
   - Key: `GEMINI_API_KEY`
   - Value: مفتاح Gemini الخاص بك
6. Deploy!

### الطريقة 2: عبر Netlify CLI
```bash
# تسجيل الدخول
netlify login

# ربط المشروع (أول مرة فقط)
netlify init

# إضافة API Key
netlify env:set GEMINI_API_KEY "your_key_here"

# النشر
netlify deploy --prod
```

## 🔒 ميزات الأمان المطبقة

### ✅ 1. API Key Protection
- API Key محفوظ في Backend (Netlify Functions)
- لا يظهر أبداً في Browser
- لا يمكن استخراجه من JavaScript Bundle

### ✅ 2. Rate Limiting
- **الحد:** 10 طلبات في الدقيقة لكل IP
- **الحماية:** ضد Brute Force و DDoS
- **الاستجابة:** HTTP 429 مع Retry-After header

### ✅ 3. Input Validation
- الحد الأقصى: 500 حرف
- فحص Prompt Injection
- تنظيف المدخلات
- رفض المحتوى المشبوه

### ✅ 4. Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: [شامل]
Referrer-Policy: strict-origin-when-cross-origin
```

### ✅ 5. Production Hardening
- إزالة console.logs تلقائياً
- تعطيل source maps
- Minification كامل
- HTTPS فقط

## 🧪 اختبار الأمان

### اختبار API Key Protection
```bash
# افتح DevTools > Network
# أرسل رسالة للمساعد الذكي
# تحقق: لا يوجد API Key في أي طلب
```

### اختبار Rate Limiting
```bash
# أرسل 11 رسالة بسرعة
# النتيجة المتوقعة: الرسالة 11 ترفض مع خطأ 429
```

### اختبار Input Validation
```bash
# حاول إرسال رسالة > 500 حرف
# حاول إرسال: "ignore previous instructions"
# النتيجة المتوقعة: رفض الطلب
```

## 📁 هيكل المشروع

```
portfolio/
├── netlify/
│   └── functions/
│       └── ai-chat.ts          # Backend API الآمن
├── services/
│   └── geminiService.ts        # Frontend Service
├── netlify.toml                # Netlify Configuration
├── .env.example                # مثال للمتغيرات البيئية
├── .env                        # المتغيرات الفعلية (لا ترفعه!)
└── vite.config.ts              # Vite Configuration
```

## ⚠️ تحذيرات مهمة

### 🔴 لا تفعل هذا أبداً:
```javascript
// ❌ خطأ: تعريض API Key في Frontend
const apiKey = "AIza...";
```

### ✅ افعل هذا:
```javascript
// ✅ صحيح: استخدام Backend API
fetch("/.netlify/functions/ai-chat", { ... });
```

## 🐛 استكشاف الأخطاء

### المشكلة: "Service temporarily unavailable"
**الحل:** تأكد من إضافة `GEMINI_API_KEY` في Netlify Dashboard

### المشكلة: "Too many requests"
**الحل:** انتظر 60 ثانية ثم حاول مرة أخرى

### المشكلة: Functions لا تعمل محلياً
**الحل:** استخدم `npm run dev` بدلاً من `npm run dev:vite`

## 📞 الدعم

إذا واجهت مشاكل:
1. تحقق من [Netlify Functions Logs](https://app.netlify.com)
2. تحقق من Browser Console
3. تحقق من أن GEMINI_API_KEY مضاف بشكل صحيح

## 📈 مراقبة الأداء

### Netlify Analytics
- عدد الطلبات
- معدل الأخطاء
- استهلاك Functions

### Rate Limiting Monitoring
- تحقق من Logs للـ 429 errors
- راقب IP addresses المشبوهة

## 🎯 الخلاصة

✅ **الأمان محقق بالكامل**
- API Key محمي 100%
- Rate Limiting فعّال
- Input Validation شامل
- Headers أمنية مطبقة

**جاهز للإنتاج!** 🚀
