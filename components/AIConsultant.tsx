import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Hammer, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useStore } from '../store';
import { Button } from './Button';

export const AIConsultant: React.FC = () => {
  const { products, t, language } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;

    const userMsg = message.trim();
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const catalogInfo = products.map(p => `${p.name} (${p.brand})`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are a pro consultant at ToolStore Pro. Language: ${language}.
          Our catalog: ${catalogInfo}. Help customers choose tools. Be technical yet helpful. 
          Respond in ${language === 'ru' ? 'Russian' : language === 'en' ? 'English' : 'Uzbek (Latin)'}.`,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Error occurred.";
      setChatHistory(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: "Error connecting to expert." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-500 hover:bg-brand-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group transition-all"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all whitespace-nowrap font-bold">
            {t('ai.btn')}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-slate-900 w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-brand-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Hammer className="w-5 h-5" />
              <div>
                <p className="font-bold leading-none">{t('ai.header')}</p>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-medium">{t('ai.sub')}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full"><X className="w-5 h-5" /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-500 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 shadow-sm border rounded-tl-none'}`}>{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500"><Loader2 className="w-4 h-4 animate-spin" /> {t('ai.thinking')}</div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t">
            <div className="relative">
              <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('ai.placeholder')} className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-4 pr-12 text-sm outline-none" />
              <button type="submit" className="absolute right-2 top-1.5 p-1.5 bg-brand-500 text-white rounded-lg"><Send className="w-4 h-4" /></button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};