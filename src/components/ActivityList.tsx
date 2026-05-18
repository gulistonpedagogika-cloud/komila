import React, { useState } from 'react';
import { Activity } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  if (activities.length === 0) {
    return (
      <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200 mt-8">
        <p className="text-slate-500 font-medium">Нет занятий по выбранному направлению</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <AnimatePresence mode="popLayout">
          {activities.map((activity) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={activity.id}
              className="group bg-white rounded-[40px] p-8 border-4 border-slate-100 hover:border-brand-secondary/30 hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0 opacity-50" />
              
              <div className="relative z-10 flex justify-between items-start mb-6">
                <span className="px-5 py-2 bg-brand-primary/10 text-brand-primary text-sm font-black uppercase tracking-wider rounded-2xl">
                  {activity.ageRange}
                </span>
                <div className="flex gap-4 text-slate-400 text-sm font-bold bg-slate-50 px-4 py-2 rounded-2xl">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-secondary" /> {activity.duration}
                  </span>
                </div>
              </div>
              
              <h3 className="relative z-10 text-3xl font-black mb-4 group-hover:text-brand-secondary transition-colors leading-tight">
                {activity.title}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed line-clamp-2">
                {activity.description}
              </p>
              
              <div className="space-y-3 flex-1">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Этапы выполнения</h4>
                <ul className="space-y-2">
                  {activity.steps.slice(0, 3).map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-200">
                        {i + 1}
                      </span>
                      <span className="truncate">{step}</span>
                    </li>
                  ))}
                  {activity.steps.length > 3 && (
                    <li className="text-sm text-brand-primary font-medium italic opacity-70">
                      + еще {activity.steps.length - 3} этапа...
                    </li>
                  )}
                </ul>
              </div>
              
              <button 
                onClick={() => setSelectedActivity(activity)}
                className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-brand-primary hover:text-white rounded-2xl font-bold transition-all duration-300 group/btn"
              >
                Подробнее 
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-brand-paper rounded-[48px] shadow-3xl overflow-hidden flex flex-col max-h-[90vh] border-8 border-white"
            >
              <div className="p-10 pb-6 flex justify-between items-start bg-white relative">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-widest rounded-full">
                      {selectedActivity.ageRange}
                    </span>
                    <span className="px-4 py-1.5 bg-brand-secondary/10 text-brand-secondary text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> {selectedActivity.duration}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight pr-12">
                    {selectedActivity.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedActivity(null)}
                  className="p-3 bg-slate-100 hover:bg-brand-primary hover:text-white rounded-2xl transition-all absolute top-10 right-10 group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 pt-4 space-y-10 scroll-smooth">
                <div className="bg-white/50 p-8 rounded-[32px] border-4 border-dashed border-slate-200">
                  <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-accent fill-brand-accent" />
                    Описание занятия
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed font-bold">
                    {selectedActivity.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-secondary" />
                    Пошаговая инструкция
                  </h3>
                  <div className="grid gap-4">
                    {selectedActivity.steps.map((step, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex gap-6 p-6 bg-white rounded-[32px] border-2 border-slate-100 hover:border-brand-secondary/20 transition-all group"
                      >
                        <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-paper flex items-center justify-center text-xl font-black text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                          {i + 1}
                        </span>
                        <p className="text-lg text-slate-700 font-bold self-center leading-snug">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-accent/20 p-8 rounded-[32px] border-2 border-brand-accent/50 text-brand-primary">
                  <p className="text-sm font-black uppercase tracking-widest mb-2 italic">Маленький секрет:</p>
                  <p className="text-lg font-bold italic">
                    Не забывайте хвалить каждого ребенка в конце занятия. Поддержка — это лучший способ научить социальной компетентности!
                  </p>
                </div>
              </div>

              <div className="p-10 bg-white border-t-4 border-brand-paper">
                <button 
                  onClick={() => setSelectedActivity(null)}
                  className="w-full py-5 bg-brand-secondary text-white rounded-[24px] font-black text-xl hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Здорово, всё понятно!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

