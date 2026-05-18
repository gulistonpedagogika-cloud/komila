import React from 'react';
import * as Icons from 'lucide-react';
import { CompetenceInfo } from '../types';
import { cn } from '../lib/utils';

interface CompetenceSectionProps {
  competences: CompetenceInfo[];
  selectedArea: string | null;
  onSelect: (id: string | null) => void;
}

export const CompetenceSection: React.FC<CompetenceSectionProps> = ({ 
  competences, 
  selectedArea, 
  onSelect 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {competences.map((comp) => {
        const IconComponent = (Icons as any)[comp.icon] || Icons.HelpCircle;
        const isActive = selectedArea === comp.id;

        return (
          <button
            key={comp.id}
            onClick={() => onSelect(isActive ? null : comp.id)}
            className={cn(
              "group relative flex flex-col p-8 rounded-[48px] transition-all duration-300 border-4 text-left",
              isActive 
                ? comp.color + " ring-8 ring-brand-accent/30 scale-105 z-10 shadow-2xl" 
                : "bg-white border-slate-100 hover:border-brand-secondary/20 hover:shadow-2xl hover:-translate-y-2"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-[28px] flex items-center justify-center mb-6 transition-transform group-hover:rotate-12",
              isActive ? "bg-white/40" : "bg-slate-50"
            )}>
              <IconComponent className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-3 leading-tight tracking-tight">{comp.title}</h3>
            <p className="text-sm font-bold opacity-80 leading-relaxed line-clamp-2">
              {comp.description}
            </p>
            {isActive && (
              <div className="absolute top-6 right-6">
                <Icons.Sparkles className="w-6 h-6 text-brand-primary animate-bounce" />
              </div>
            )}
          </button>

        );
      })}
    </div>
  );
};
