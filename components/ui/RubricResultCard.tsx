'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { Card } from '@/components/ui/common';
import { RubricResult, verdictFor } from '@/lib/skillproof/rubric';

// Full class names so Tailwind can see them
const toneClasses = {
  success: { card: 'from-success/10 border-success/30', badge: 'bg-success/20', text: 'text-success' },
  warning: { card: 'from-warning/10 border-warning/30', badge: 'bg-warning/20', text: 'text-warning' },
  error: { card: 'from-error/10 border-error/30', badge: 'bg-error/20', text: 'text-error' },
};

// Shows a SkillProof rubric result: the total and every check behind it
export function RubricResultCard({ result }: { result: RubricResult }) {
  const tone = toneClasses[result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className={`p-6 bg-gradient-to-br to-transparent ${tone.card}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tone.badge}`}>
            <CheckCircle2 className={`w-6 h-6 ${tone.text}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${tone.text}`}>{verdictFor(result.score)}</h3>
            <p className="text-sm text-muted">Rubric score: {result.score}/100 · scored in your browser by fixed rules</p>
          </div>
        </div>

        <div className="space-y-2">
          {result.checks.map(item => {
            const full = item.points === item.max;
            return (
              <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                {full ? (
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                ) : (
                  <CircleDashed className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary">{item.label}</p>
                  <p className="text-xs text-muted">{item.detail}</p>
                </div>
                <span className={`text-sm font-semibold ${full ? 'text-success' : 'text-secondary'}`}>
                  +{item.points}/{item.max}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
