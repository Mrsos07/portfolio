# 🚀 دليل النشر على Render

## ⚠️ ملاحظة مهمة

هذا المشروع مصمم أساساً لـ **Netlify** وليس Render، لأنه يستخدم:
- ✅ Netlify Functions للـ Backend API
- ✅ Static Site Hosting

**لكن** يمكنك نشره على Render كـ Static Site فقط (بدون Backend Functions).

---

## 📋 إعدادات Render

### 1. إعدادات Build & Deploy

في لوحة تحكم Render، استخدم الإعدادات التالية:

| الحقل | القيمة |
|------|--------|
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Publish Directory** | `dist` |

### 2. Environment Variables

أضف المتغيرات البيئية التالية في Render Dashboard:

```
PORT=10000
NODE_VERSION=18
```

⚠️ **تحذير:** لن يعمل المساعد الذكي (AI Assistant) على Render لأنه يحتاج Netlify Functions.

---

## 🔧 ما تم إضافته في package.json

```json
"scripts": {
  "start": "vite preview --host 0.0.0.0 --port $PORT"
}
```

**الشرح:**
- `vite preview`: يشغل السيرفر للملفات المبنية في `dist/`
- `--host 0.0.0.0`: يسمح بالوصول من الخارج (مطلوب لـ Render)
- `--port $PORT`: يستخدم المنفذ الذي يحدده Render

---

## 📝 خطوات النشر على Render

### الطريقة 1: من GitHub (موصى بها)

1. **اذهب إلى:** https://dashboard.render.com
2. **اضغط:** "New" → "Static Site"
3. **اختر:** Connect GitHub repository
4. **حدد:** repository الخاص بك
5. **املأ الإعدادات:**
   ```
   Name: saud-portfolio
   Branch: master
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```
6. **اضغط:** "Create Static Site"

### الطريقة 2: Web Service (إذا أردت استخدام npm start)

1. **اذهب إلى:** https://dashboard.render.com
2. **اضغط:** "New" → "Web Service"
3. **اختر:** Connect GitHub repository
4. **املأ الإعدادات:**
   ```
   Name: saud-portfolio
   Environment: Node
   Branch: master
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
5. **في Environment Variables أضف:**
   ```
   PORT: 10000
   NODE_VERSION: 18
   ```
6. **اضغط:** "Create Web Service"

---

## ⚠️ القيود على Render

| الميزة | Netlify | Render |
|--------|---------|--------|
| **Static Hosting** | ✅ يعمل | ✅ يعمل |
| **Backend Functions** | ✅ يعمل | ❌ لا يعمل |
| **AI Assistant** | ✅ يعمل | ❌ لا يعمل |
| **Contact Form** | ✅ يعمل | ✅ يعمل (Formspree) |
| **Rate Limiting** | ✅ يعمل | ❌ لا يعمل |

---

## 🎯 التوصية

**استخدم Netlify بدلاً من Render** لأن:
1. ✅ المشروع مصمم خصيصاً لـ Netlify
2. ✅ جميع الميزات ستعمل (بما فيها AI Assistant)
3. ✅ Rate Limiting والأمان الكامل
4. ✅ Netlify Functions مدعومة
5. ✅ Free tier سخي جداً

### نشر على Netlify (3 خطوات):

1. **اذهب إلى:** https://app.netlify.com
2. **اضغط:** "New site from Git"
3. **اختر:** GitHub repository
4. **أضف Environment Variable:**
   - Key: `GEMINI_API_KEY`
   - Value: مفتاحك من Google AI Studio
5. **Deploy!**

---

## 🔍 استكشاف الأخطاء

### المشكلة: "Missing script: start"
**الحل:** تأكد من وجود `"start"` في `package.json` (تم إضافته الآن ✅)

### المشكلة: "Cannot find module 'vite'"
**الحل:** تأكد من Build Command: `npm install && npm run build`

### المشكلة: AI Assistant لا يعمل
**السبب:** Render لا يدعم Netlify Functions
**الحل:** استخدم Netlify بدلاً من Render

---

## 📞 الدعم

إذا واجهت مشاكل:
- راجع Render Logs في Dashboard
- تحقق من Build Logs
- تأكد من Environment Variables

**الخلاصة:** المشروع جاهز للنشر على Render كـ Static Site، لكن Netlify هو الخيار الأفضل! 🚀
