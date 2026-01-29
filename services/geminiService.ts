
// خدمة آمنة للتواصل مع Backend API
// تم نقل API Key إلى Backend لحماية أمنية كاملة

export const getAiResponse = async (userMessage: string): Promise<string> => {
  // تطهير المدخلات: فحص الطول والمحتوى
  if (!userMessage || userMessage.trim().length > 500) {
    return "عذراً، النص المدخل طويل جداً أو غير صالح.";
  }

  if (userMessage.trim().length === 0) {
    return "يرجى كتابة رسالة.";
  }

  try {
    // استدعاء Backend API الآمن
    const response = await fetch("/.netlify/functions/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage.trim(),
      }),
    });

    // معالجة Rate Limiting
    if (response.status === 429) {
      const data = await response.json();
      return `عذراً، لقد تجاوزت الحد المسموح من الطلبات. يرجى المحاولة بعد ${data.retryAfter || 60} ثانية.`;
    }

    // معالجة الأخطاء الأخرى
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return data.error || "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً.";
    }

    const data = await response.json();
    return data.response || "لم أتمكن من استيعاب طلبك، هل يمكنك إعادة صياغته؟";
  } catch (error: any) {
    // معالجة أخطاء الشبكة
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return "تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.";
    }
    
    return "حدث خطأ غير متوقع. يرجى استخدام نموذج الاتصال المباشر.";
  }
};
