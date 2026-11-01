'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Palette, ArrowLeft, Send, Eye, Smartphone, Monitor, CheckCircle2, XCircle, Lightbulb, Target } from 'lucide-react';
import { Card } from '@/components/ui/common';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { RubricResultCard } from '@/components/ui/RubricResultCard';
import { RubricResult, scoreDesignCritique } from '@/lib/skillproof/rubric';

const designBrief = {
  title: 'E-commerce Checkout Flow Critique',
  context: 'Review this mobile checkout interface and provide actionable UX/UI improvements.',
  focusAreas: [
    'Visual hierarchy and layout',
    'User flow and friction points',
    'Accessibility considerations',
    'Mobile-first design principles',
  ],
  questions: [
    {
      id: 1,
      question: 'What are the top 3 UX issues you notice in this checkout flow?',
      placeholder: 'Identify specific problems and their impact on user experience...',
    },
    {
      id: 2,
      question: 'How would you improve the visual hierarchy and information architecture?',
      placeholder: 'Suggest concrete design changes...',
    },
    {
      id: 3,
      question: 'What accessibility improvements would you recommend?',
      placeholder: 'Consider WCAG guidelines and inclusive design...',
    },
  ],
};

const mockupIssues = [
  { x: 20, y: 15, label: 'Small tap targets', severity: 'high' },
  { x: 50, y: 35, label: 'Low contrast text', severity: 'medium' },
  { x: 75, y: 60, label: 'Unclear CTA', severity: 'high' },
  { x: 30, y: 80, label: 'No error prevention', severity: 'medium' },
];

export default function DesignChallengePage() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<RubricResult | null>(null);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setResult(scoreDesignCritique(answers));
  };

  const allAnswered = designBrief.questions.every(q => answers[q.id]?.trim().length > 50);

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-default bg-secondary/50 px-6 py-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/skillproof">
                <button className="btn btn-ghost btn-sm">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-primary">{designBrief.title}</h1>
                  <span className="badge badge-error text-xs">Design</span>
                </div>
                <p className="text-sm text-muted">Design SkillProof Challenge</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setShowAnnotations(!showAnnotations)}
              >
                <Eye className="w-4 h-4" />
                {showAnnotations ? 'Hide' : 'Show'} Issues
              </button>
              <button 
                className={`btn ${result ? 'btn-success' : 'btn-primary'}`}
                onClick={handleSubmit}
                disabled={!allAnswered || isSubmitted}
              >
                {result ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Rubric: {result.score}/100
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Critique
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Design Preview */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-info" />
                      <h3 className="font-bold text-primary">Mobile Checkout</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-info/10 text-info">375x812</span>
                      <span className="px-2 py-1 rounded bg-secondary text-muted">iOS</span>
                    </div>
                  </div>

                  {/* Mockup Preview */}
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 aspect-[9/16] flex items-center justify-center">
                    {/* Phone Frame */}
                    <div className="relative w-full max-w-[300px] bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-gray-900 dark:border-gray-700">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 dark:bg-gray-700 rounded-b-3xl z-10"></div>
                      
                      {/* Screen Content */}
                      <div className="relative h-full bg-white dark:bg-gray-800 pt-8 pb-4">
                        {/* Header */}
                        <div className="px-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Checkout</h2>
                        </div>

                        {/* Form Content */}
                        <div className="p-4 space-y-3">
                          {/* Shipping - Small text, low contrast */}
                          <div>
                            <label className="text-xs text-gray-400 dark:text-gray-500">Shipping Address</label>
                            <input 
                              className="w-full mt-1 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                              defaultValue="123 Main St..."
                              disabled
                            />
                          </div>

                          {/* Payment - Poor spacing */}
                          <div>
                            <label className="text-xs text-gray-400 dark:text-gray-500">Card Number</label>
                            <input 
                              className="w-full mt-1 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="1234 5678 9012 3456"
                              disabled
                            />
                          </div>

                          {/* Expiry & CVV - Cramped */}
                          <div className="flex gap-2">
                            <input 
                              className="flex-1 px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="MM/YY"
                              disabled
                            />
                            <input 
                              className="w-16 px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="CVV"
                              disabled
                            />
                          </div>

                          {/* Order Summary - Hard to read */}
                          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>Subtotal</span>
                              <span>$89.99</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <span>Shipping</span>
                              <span>$5.99</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                              <span>Total</span>
                              <span>$95.98</span>
                            </div>
                          </div>

                          {/* CTA Button - Unclear, small */}
                          <button 
                            className="w-full mt-3 py-2 text-sm bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
                            disabled
                          >
                            Continue
                          </button>

                          {/* Security badge - Tiny, easy to miss */}
                          <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 mt-2">
                            🔒 Secure checkout
                          </p>
                        </div>

                        {/* Annotations Overlay */}
                        {showAnnotations && (
                          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]">
                            {mockupIssues.map((issue, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="absolute"
                                style={{ left: `${issue.x}%`, top: `${issue.y}%` }}
                              >
                                <div className="relative">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    issue.severity === 'high' ? 'bg-error' : 'bg-warning'
                                  } text-white font-bold text-sm animate-pulse`}>
                                    !
                                  </div>
                                  <div className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
                                    {issue.label}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-info" />
                    <h3 className="font-bold text-primary">Context</h3>
                  </div>
                  <p className="text-secondary mb-4">{designBrief.context}</p>
                  
                  <h4 className="font-semibold text-primary text-sm mb-3">Focus Areas:</h4>
                  <div className="space-y-2">
                    {designBrief.focusAreas.map((area, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-secondary">{area}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-gradient-to-br from-info/5 to-transparent border-info/20">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-info flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-primary mb-2">Evaluation Criteria</h3>
                      <ul className="space-y-1 text-sm text-secondary">
                        <li>• Identification of critical UX issues</li>
                        <li>• Specificity and actionability of suggestions</li>
                        <li>• Understanding of design principles</li>
                        <li>• Consideration of accessibility and inclusive design</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Panel - Critique Questions */}
            <div className="space-y-6">
              {designBrief.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-snoonu-red/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold snoonu-red">{question.id}</span>
                      </div>
                      <h3 className="font-bold text-primary flex-1">{question.question}</h3>
                    </div>
                    
                    <textarea
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder={question.placeholder}
                      className="input min-h-[150px] resize-none"
                    />
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted">Be specific and actionable</span>
                      <span className={`text-xs ${(answers[question.id]?.length || 0) >= 50 ? 'text-success' : 'text-muted'}`}>
                        {answers[question.id]?.length || 0}/50+ characters
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Evaluation feedback */}
              {result && <RubricResultCard result={result} />}

              {/* Progress Indicator */}
              {!isSubmitted && (
                <Card className="p-4 bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">Progress</span>
                    <span className="text-sm text-muted">
                      {Object.values(answers).filter(a => a?.trim().length > 50).length} / {designBrief.questions.length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-tertiary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-snoonu-red transition-all duration-300"
                      style={{ 
                        width: `${(Object.values(answers).filter(a => a?.trim().length > 50).length / designBrief.questions.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
