/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Compass, Lightbulb, Library, PlayCircle } from 'lucide-react';
import { COMPETENCES, INITIAL_ACTIVITIES, THEORY_TOPICS } from './constants';
import { CompetenceSection } from './components/CompetenceSection';
import { ActivityList } from './components/ActivityList';
import { AIGenerator } from './components/AIGenerator';
import { TheorySection } from './components/TheorySection';
import { cn } from './lib/utils';

export default function App() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'practice' | 'theory'>('practice');
  const [showAuthor, setShowAuthor] = useState(false);

  const filteredActivities = selectedArea 
    ? INITIAL_ACTIVITIES.filter(a => a.area === selectedArea)
    : INITIAL_ACTIVITIES;

  return (
    <div className="min-h-screen pb-20">
      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-24 h-24 bg-brand-accent/20 rounded-full blur-2xl" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[15%] w-32 h-32 bg-brand-secondary/20 rounded-[40px] blur-2xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[20%] w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Hero Section */}
      <header className="px-6 pt-16 pb-20 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-brand-accent rounded-3xl rotate-12 flex items-center justify-center shadow-xl mb-4"
          >
            <Compass className="w-12 h-12 text-brand-primary" />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 max-w-5xl leading-[0.9]">
              <span className="text-brand-primary underline decoration-brand-accent decoration-8 underline-offset-8">Мир</span> друзей и <span className="text-brand-secondary">общения!</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed bg-white/50 backdrop-blur-sm p-4 rounded-3xl border-2 border-dashed border-slate-200">
              Привет! Давай вместе научимся дружить, помогать и понимать друг друга!
            </p>
          </div>


          <div className="flex bg-white p-1.5 rounded-full border border-slate-100 shadow-sm mt-8">
            <button
              onClick={() => setActiveTab('practice')}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all",
                activeTab === 'practice' 
                  ? "bg-brand-primary text-white shadow-lg" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <PlayCircle className="w-5 h-5" />
              Практика
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all",
                activeTab === 'theory' 
                  ? "bg-brand-primary text-white shadow-lg" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Library className="w-5 h-5" />
              База знаний
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 max-w-7xl mx-auto space-y-20">
        {activeTab === 'practice' ? (
          <>
            {/* Stats/Quick Info */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Направления', value: '5+', icon: Compass },
                  { label: 'Сценарии', value: '50+', icon: BookOpen },
                  { label: 'Методики', value: '15+', icon: Lightbulb },
                  { label: 'Пользователей', value: '1.2k', icon: Sparkles },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                      <p className="text-3xl font-serif font-bold text-slate-900">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary">
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Competences Navigation */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold tracking-tight">Направления развития</h2>
                  <p className="text-slate-500 font-medium">Выберите область для просмотра готовых сценариев занятий</p>
                </div>
                {selectedArea && (
                  <button 
                    onClick={() => setSelectedArea(null)}
                    className="text-sm font-bold text-brand-primary hover:underline underline-offset-4 w-fit"
                  >
                    Сбросить фильтр
                  </button>
                )}
              </div>
              
              <CompetenceSection 
                competences={COMPETENCES} 
                selectedArea={selectedArea}
                onSelect={setSelectedArea}
              />
            </section>

            {/* Activities Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-slate-200" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                  {selectedArea ? 'Результаты поиска' : 'Популярные занятия'}
                </h3>
                <div className="h-[1px] flex-1 bg-slate-200" />
              </div>

              <ActivityList activities={filteredActivities} />
            </section>
          </>
        ) : (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4 mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Теоретические основы</h2>
              <p className="text-slate-500 font-medium max-w-2xl text-lg">
                Ключевые понятия, методические рекомендации и диагностические инструменты 
                для развития социальной компетентности младших школьников.
              </p>
            </div>
            
            <TheorySection topics={THEORY_TOPICS} />
          </section>
        )}

        {/* CTA Theory Section - Hide if already in theory tab or keep it as generic info */}
        <section className="bg-brand-secondary rounded-[64px] p-12 md:p-24 text-white overflow-hidden relative border-8 border-white shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-block px-6 py-2 bg-white/20 rounded-full text-sm font-black mb-6 uppercase tracking-widest">Для учителей и родителей</div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Станем лучшими <br /> <span className="text-brand-accent">друзьями!</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-bold">
              Внеурочная деятельность — это время играть, творить и находить новых друзей вместе. 
              Загляни в нашу базу знаний, чтобы узнать еще больше секретов!
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setActiveTab('theory')}
                className="px-8 py-4 bg-white text-brand-primary rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl"
              >
                Читать методичку
              </button>
              <button className="px-8 py-4 bg-brand-primary border-2 border-white/20 text-white rounded-2xl font-bold hover:bg-white/10 transition-colors">
                Скачать план сетку
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating AI Assistant */}
      <AIGenerator />

      {/* Author Overlay */}
      <AnimatePresence>
        {showAuthor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthor(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white p-12 rounded-[48px] border-8 border-brand-accent shadow-2xl max-w-lg w-full text-center space-y-6"
            >
              <div className="w-20 h-20 bg-brand-primary rounded-3xl mx-auto flex items-center justify-center text-white mb-4">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Автор проекта</h3>
              <p className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Шадманкулова Камила Шухратовна
              </p>
              <button
                onClick={() => setShowAuthor(false)}
                className="mt-8 px-10 py-4 bg-brand-secondary text-white rounded-2xl font-black text-lg hover:scale-105 transition-transform"
              >
                Закрыть
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simple Footer */}
      <footer className="mt-40 border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-serif italic text-xl">К</div>
            <span className="font-bold text-xl tracking-tight">Социальный Компас</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-brand-primary transition-colors">Программа</a>
            <button 
              onClick={() => setShowAuthor(true)}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              Авторы
            </button>
            <a href="#" className="hover:text-brand-primary transition-colors">Контакты</a>
          </div>
          <p className="text-xs text-slate-400 font-medium">© 2026 Развитие социальной компетентности в нач. классах</p>
        </div>
      </footer>
    </div>
  );
}

