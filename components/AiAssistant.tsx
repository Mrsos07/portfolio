
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getAiResponse } from '../services/geminiService';
import { Message, Language } from '../types';

interface AiAssistantProps {
  language: Language;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const welcomeMessage = useMemo(() => {
    return language === 'ar' 
      ? 'مرحباً! أنا المساعد الذكي الخاص بسعود. اسألني أي شيء عن أعماله، مهاراته، أو خبراته!'
      : "Hi! I'm Saud's AI assistant. Ask me anything about his work, skills, or experience!";
  }, [language]);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: welcomeMessage }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
       setMessages([{ role: 'assistant', content: welcomeMessage }]);
    }
  }, [language, welcomeMessage, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    // التحقق الأمني من طول النص وصحة المدخلات
    if (!inputValue.trim() || inputValue.length > 500 || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const aiMsg = await getAiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: aiMsg }]);
    setIsLoading(false);
  };

  const isAr = language === 'ar';

  return (
    <div className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-[100]`}>
      {isOpen && (
        <div className={`glass w-[350px] md:w-[400px] h-[500px] mb-4 rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300 ${isAr ? 'text-right' : 'text-left'}`}>
          <div className={`p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`flex items-center gap-3 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <i className="fa-solid fa-robot text-xs"></i>
              </div>
              <span className="font-bold text-sm">{isAr ? 'مساعد المعرض' : 'Portfolio Assistant'}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? `bg-blue-600 text-white ${isAr ? 'rounded-tl-none' : 'rounded-tr-none'}` 
                    : `bg-slate-800 text-slate-200 ${isAr ? 'rounded-tr-none' : 'rounded-tl-none'} border border-slate-700`
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`flex ${isAr ? 'justify-end' : 'justify-start'}`}>
                <div className={`bg-slate-800 p-3 rounded-2xl ${isAr ? 'rounded-tr-none' : 'rounded-tl-none'} border border-slate-700`}>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-slate-800/50">
            <div className={`flex gap-2 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
              <input 
                type="text" 
                value={inputValue}
                maxLength={500} // حماية ضد النصوص الطويلة جداً
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isAr ? "اسأل عن سعود..." : "Ask about Saud..."}
                className={`flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500 transition-colors ${isAr ? 'text-right' : 'text-left'}`}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors disabled:opacity-50"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-xl shadow-blue-900/40 flex items-center justify-center text-white text-xl hover:scale-110 transition-transform active:scale-95"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-robot'}`}></i>
      </button>
    </div>
  );
};

export default AiAssistant;
