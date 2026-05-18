import React, { useState } from 'react';
import { TheoryTopic } from '../types';
import * as Icons from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface TheorySectionProps {
  topics: TheoryTopic[];
}

export const TheorySection: React.FC<TheorySectionProps> = ({ topics }) => {
  const [selectedTopic, setSelectedTopic] = useState<TheoryTopic | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => {
          const IconComponent = (Icons as any)[topic.icon] || Icons.Book;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="group bg-white p-10 rounded-[48px] border-4 border-slate-100 hover:border-brand-accent/40 hover:shadow-2xl transition-all text-left flex flex-col items-start gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-16 h-16 rounded-[28px] bg-brand-paper flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all">
                <IconComponent className="w-8 h-8" />
              </div>
              <div className="relative z-10">
                <span className="px-4 py-1 bg-brand-accent/20 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                  {topic.category}
                </span>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {topic.title}
                </h3>
              </div>
            </button>

          );
        })}
      </div>

      <AnimatePresence>
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="bg-white rounded-[64px] p-10 md:p-16 border-8 border-brand-paper shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute top-10 right-10 p-3 bg-slate-100 hover:bg-brand-primary hover:text-white rounded-full transition-all group z-20"
            >
              <Icons.X className="w-8 h-8 group-hover:rotate-90 transition-transform" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-20 h-20 rounded-[32px] bg-brand-paper border-4 border-white flex items-center justify-center text-brand-primary shadow-lg">
                  {(Icons as any)[selectedTopic.icon] && React.createElement((Icons as any)[selectedTopic.icon], { className: "w-10 h-10" })}
                </div>
                <div>
                  <span className="inline-block px-5 py-1.5 bg-brand-secondary/20 text-brand-secondary text-xs font-black uppercase tracking-[0.2em] rounded-full mb-2">
                    {selectedTopic.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{selectedTopic.title}</h2>
                </div>
              </div>

              <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:text-xl prose-p:leading-relaxed bg-brand-paper/30 p-10 rounded-[48px] border-4 border-dashed border-slate-200">
                <ReactMarkdown className="markdown-content">
                  {selectedTopic.content}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};
