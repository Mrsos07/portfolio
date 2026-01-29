
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { Language } from '../types';
import { translations } from '../translations';

const Contact: React.FC<{ language: Language }> = ({ language }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const t = translations[language].contactForm;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // تقييد الطول برمجياً كخط دفاع أول
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'message' && value.length > 1000) return;
    if (name !== 'message' && value.length > 100) return;

    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق الأمني من المدخلات (Client-side validation)
    if (!validateEmail(formData.email)) {
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/mojwqkwa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _replyto: formData.email.trim(),
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      // نظام احتياطي آمن
      const mailtoLink = `mailto:saudallosh@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
      window.location.href = mailtoLink;
      setFormStatus('success');
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto glass rounded-[40px] p-8 md:p-20 flex flex-col lg:flex-row gap-16 border border-white/5">
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{t.title}</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-purple-400">
                <i className="fa-solid fa-location-dot text-xl"></i>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-black uppercase mb-1">{t.location}</p>
                <p className="text-xl font-medium">{PERSONAL_INFO.location[language]}</p>
              </div>
            </div>
            <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10">
              <p className="text-sm text-slate-400 leading-relaxed">
                {language === 'ar' 
                  ? 'تم تأمين هذا النموذج لحماية خصوصيتك. يمكنك إرسال استفساراتك وسأقوم بالرد عبر بريدك الرسمي.' 
                  : 'This form is secured to protect your privacy. Send your inquiries and I will reply via your official email.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input 
                required 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.nameLabel} 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-inherit transition-all" 
              />
              <input 
                required 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.emailLabel} 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-inherit transition-all" 
              />
            </div>
            <input 
              required 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t.subjectLabel} 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-inherit transition-all" 
            />
            <textarea 
              required 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4} 
              placeholder={t.messageLabel} 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-inherit resize-none transition-all" 
            />
            <button 
              type="submit"
              disabled={formStatus === 'sending' || formStatus === 'success'} 
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 shadow-xl ${
                formStatus === 'success' ? 'bg-green-600 shadow-green-900/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {formStatus === 'sending' && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                {formStatus === 'success' && <i className="fa-solid fa-check"></i>}
                <span>{formStatus === 'idle' ? t.send : formStatus === 'sending' ? t.sending : t.success}</span>
              </div>
            </button>
            {formStatus === 'error' && (
              <p className="text-red-400 text-sm text-center mt-2">يرجى التأكد من صحة البيانات المدخلة.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
