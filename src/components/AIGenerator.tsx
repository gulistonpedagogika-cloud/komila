import React, { useState } from 'react';
import { Wand2, Loader2, Send, X } from 'lucide-react';
import { CompetenceArea } from '../types';
import { generateActivitySuggestion } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

export const AIGenerator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [area, setArea] = useState<CompetenceArea>(CompetenceArea.COMMUNICATION);
  const [context, setContext] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const text = await generateActivitySuggestion(area, context);
      setResult(text || "Не удалось получить ответ");
    } catch (err) {
      setResult("Произошла ошибка при генерации. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 flex items-center gap-4 px-10 py-6 bg-brand-primary text-white rounded-[40px] shadow-[0_20px_50px_rgba(255,107,107,0.3)] hover:scale-110 active:scale-90 transition-all z-40 group border-4 border-white"
      >
        <div className="relative">
          <Wand2 className="w-6 h-6 text-brand-accent group-hover:rotate-45 transition-transform" />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white rounded-full blur-md"
          />
        </div>
        <span className="font-black text-lg tracking-tight">Магия ИИ</span>
      </button>


      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-paper rounded-[40px] shadow-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 pb-4 flex justify-between items-center bg-white border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold leading-none">Генератор занятий</h2>
                    <p className="text-xs text-slate-400 mt-1 uppercase font-black tracking-widest">на базе ИИ</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
                {!result ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 block ml-1">
                        Направление
                      </label>
                      <select 
                        value={area}
                        onChange={(e) => setArea(e.target.value as CompetenceArea)}
                        className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-brand-primary transition-colors appearance-none"
                      >
                        {Object.values(CompetenceArea).map(a => (
                          <option key={a} value={a}>{a.toUpperCase().replace('_', ' ')}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 block ml-1">
                        Опишите запрос (опционально)
                      </label>
                      <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Например: 'Группа детей часто ссорится на переменах' или 'Занятие на тему космоса'"
                        className="w-full p-6 bg-white border-2 border-slate-100 rounded-3xl min-h-[120px] outline-none focus:border-brand-primary transition-colors resize-none text-slate-600 leading-relaxed font-medium"
                      />
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-lg disabled:opacity-50 transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Генерируем идеи...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Создать план занятия
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-[32px] border-2 border-slate-100 prose prose-slate max-w-none">
                    <ReactMarkdown className="markdown-content">
                      {result}
                    </ReactMarkdown>
                    <button
                      onClick={() => setResult(null)}
                      className="mt-8 text-sm font-bold text-brand-primary hover:underline"
                    >
                      ← Начать заново
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
