'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Code, Megaphone, Calculator, Palette, Sparkles, ArrowRight, Target, Award, Zap } from 'lucide-react';
import { Card } from '@/components/ui/common';
import Link from 'next/link';

const skillProofCategories = [
  {
    id: 'engineering',
    title: 'Engineering Challenge',
    description: 'Solve a real-world coding problem with instant feedback',
    icon: Code,
    color: 'info',
    bgGradient: 'from-blue-500/10 to-purple-500/10',
    features: ['Live code editor', 'Test cases', 'Performance metrics'],
    href: '/skillproof/engineering',
  },
  {
    id: 'marketing',
    title: 'Marketing Brief',
    description: 'Craft compelling copy and strategic campaign plans',
    icon: Megaphone,
    color: 'success',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    features: ['Social media copy', 'Campaign strategy', 'Creative brief'],
    href: '/skillproof/marketing',
  },
  {
    id: 'finance',
    title: 'Finance Scenario',
    description: 'Analyze data and solve practical business problems',
    icon: Calculator,
    color: 'warning',
    bgGradient: 'from-yellow-500/10 to-orange-500/10',
    features: ['Data analysis', 'Budget planning', 'ROI calculation'],
    href: '/skillproof/finance',
  },
  {
    id: 'design',
    title: 'Design Critique',
    description: 'Evaluate UI/UX and provide actionable improvements',
    icon: Palette,
    color: 'error',
    bgGradient: 'from-pink-500/10 to-rose-500/10',
    features: ['UI evaluation', 'UX feedback', 'Design thinking'],
    href: '/skillproof/design',
  },
];

export default function SkillProofPage() {
  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-snoonu-red/10 border border-snoonu-red/20 mb-6">
            <Sparkles className="w-4 h-4 snoonu-red" />
            <span className="text-sm font-semibold snoonu-red">AI-Powered Skill Validation</span>
          </div>
          
          <h1 className="text-5xl font-bold text-primary mb-4">
            <span className="gradient-text">SkillProof</span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-8">
            Prove your abilities with practical tasks. Go beyond CVs and showcase real skills.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-info" />
              </div>
              <div className="text-left">
                <p className="font-bold text-primary">5-15 Minutes</p>
                <p className="text-muted">Quick tasks</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-success" />
              </div>
              <div className="text-left">
                <p className="font-bold text-primary">Instant Feedback</p>
                <p className="text-muted">AI evaluation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-warning" />
              </div>
              <div className="text-left">
                <p className="font-bold text-primary">Stand Out</p>
                <p className="text-muted">Prove ability</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {skillProofCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={category.href}>
                  <Card hover className={`p-8 relative overflow-hidden bg-gradient-to-br ${category.bgGradient}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16"></div>
                    
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-${category.color}/10 border border-${category.color}/20`}>
                        <Icon className={`w-8 h-8 text-${category.color}`} />
                      </div>

                      <h2 className="text-2xl font-bold text-primary mb-2">{category.title}</h2>
                      <p className="text-secondary mb-6">{category.description}</p>

                      <div className="space-y-2 mb-6">
                        {category.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${category.color}`}></div>
                            <span className="text-sm text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-snoonu-red font-semibold">
                        Try Demo Challenge
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8 bg-gradient-to-br from-snoonu-red/5 to-transparent border-snoonu-red/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">For Candidates</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-success">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Prove ability even without experience</p>
                      <p className="text-sm text-muted">Show what you can do, not just what you've done</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-success">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Stand out from the crowd</p>
                      <p className="text-sm text-muted">Go beyond traditional CVs and cover letters</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-success">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Get instant feedback</p>
                      <p className="text-sm text-muted">AI-powered evaluation helps you improve</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-4">For Organizations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-info">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Filter better than CVs</p>
                      <p className="text-sm text-muted">See real skills in action before interviews</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-info">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Save time screening</p>
                      <p className="text-sm text-muted">AI evaluates submissions automatically</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-info">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Find hidden talent</p>
                      <p className="text-sm text-muted">Discover candidates with potential, not just experience</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
