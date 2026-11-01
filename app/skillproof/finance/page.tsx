'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Calculator, ArrowLeft, TrendingUp, DollarSign, PieChart, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/common';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const financeScenario = {
  title: 'Marketing Budget Optimization',
  company: 'Tech Startup',
  scenario: 'You have a $50,000 quarterly marketing budget. Allocate funds across channels and calculate expected ROI based on historical performance data.',
  givens: [
    'Total Budget: $50,000',
    'Time Period: Q1 2026',
    'Goal: Acquire 500 new customers',
    'Target CAC: $100 or less',
  ],
  channels: [
    { name: 'Social Media Ads', historicalROI: 2.5, minBudget: 5000, recommendedPercent: 25 },
    { name: 'Google Ads', historicalROI: 3.2, minBudget: 8000, recommendedPercent: 30 },
    { name: 'Content Marketing', historicalROI: 1.8, minBudget: 3000, recommendedPercent: 15 },
    { name: 'Email Marketing', historicalROI: 4.5, minBudget: 2000, recommendedPercent: 10 },
    { name: 'Events & Partnerships', historicalROI: 2.0, minBudget: 5000, recommendedPercent: 20 },
  ],
};

export default function FinanceChallengePage() {
  const totalBudget = 50000;
  const [allocations, setAllocations] = useState<{ [key: string]: number }>({});
  const [reasoning, setReasoning] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Initialize allocations
  useEffect(() => {
    const initial: { [key: string]: number } = {};
    financeScenario.channels.forEach(channel => {
      initial[channel.name] = 0;
    });
    setAllocations(initial);
  }, []);

  const allocatedTotal = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const remaining = totalBudget - allocatedTotal;
  const isOverBudget = allocatedTotal > totalBudget;

  // Calculate projections
  const projections = financeScenario.channels.map(channel => {
    const allocated = allocations[channel.name] || 0;
    const expectedReturn = allocated * channel.historicalROI;
    const roi = allocated > 0 ? ((expectedReturn - allocated) / allocated) * 100 : 0;
    return {
      channel: channel.name,
      allocated,
      expectedReturn,
      roi,
    };
  });

  const totalExpectedReturn = projections.reduce((sum, p) => sum + p.expectedReturn, 0);
  const totalROI = allocatedTotal > 0 ? ((totalExpectedReturn - allocatedTotal) / allocatedTotal) * 100 : 0;
  const estimatedCustomers = Math.floor(totalExpectedReturn / 100); // Assume $100 per customer
  const actualCAC = estimatedCustomers > 0 ? allocatedTotal / estimatedCustomers : 0;

  const meetsGoals = estimatedCustomers >= 500 && actualCAC <= 100;

  const handleAllocationChange = (channel: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setAllocations(prev => ({ ...prev, [channel]: numValue }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setScore(meetsGoals ? 92 : 78);
    }, 1500);
  };

  const canSubmit = allocatedTotal === totalBudget && reasoning.trim().length > 50;

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
                  <h1 className="text-xl font-bold text-primary">{financeScenario.title}</h1>
                  <span className="badge badge-warning text-xs">Finance</span>
                </div>
                <p className="text-sm text-muted">Finance SkillProof Challenge</p>
              </div>
            </div>
            
            <button 
              className={`btn ${isSubmitted && score ? 'btn-success' : 'btn-primary'}`}
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitted}
            >
              {isSubmitted && score ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Score: {score}/100
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5" />
                  Submit Analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Scenario & Instructions */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 accent-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-primary">Scenario</h2>
                      <p className="text-sm text-muted">{financeScenario.company}</p>
                    </div>
                  </div>
                  
                  <p className="text-secondary leading-relaxed mb-4">{financeScenario.scenario}</p>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary text-sm mb-2">Given Information</h3>
                    {financeScenario.givens.map((given, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-secondary">{given}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="font-bold text-primary mb-3">Channel Performance</h3>
                  <div className="space-y-3">
                    {financeScenario.channels.map((channel, i) => (
                      <div key={i} className="p-3 rounded-lg bg-secondary">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-primary text-sm">{channel.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                            {channel.historicalROI}x ROI
                          </span>
                        </div>
                        <p className="text-xs text-muted">Min: ${channel.minBudget.toLocaleString()}</p>
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
                    <TrendingUp className="w-5 h-5 text-info flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-primary mb-2">Tips</h3>
                      <ul className="space-y-1 text-sm text-secondary">
                        <li>• Balance high ROI with budget constraints</li>
                        <li>• Consider minimum budgets for each channel</li>
                        <li>• Aim to meet customer acquisition goals</li>
                        <li>• Justify your allocation strategy</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Middle Panel - Budget Allocation */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="font-bold text-primary mb-4">Budget Allocation</h3>
                  
                  <div className="space-y-4">
                    {financeScenario.channels.map((channel, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-primary">{channel.name}</label>
                          <span className="text-xs text-muted">{channel.historicalROI}x ROI</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted">$</span>
                          <input
                            type="number"
                            value={allocations[channel.name] || ''}
                            onChange={(e) => handleAllocationChange(channel.name, e.target.value)}
                            className="input flex-1"
                            placeholder="0"
                            min="0"
                            step="1000"
                          />
                        </div>
                        {allocations[channel.name] > 0 && allocations[channel.name] < channel.minBudget && (
                          <p className="text-xs text-warning mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Below minimum (${channel.minBudget.toLocaleString()})
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-default">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted">Allocated</span>
                        <span className="font-bold text-primary">${allocatedTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted">Remaining</span>
                        <span className={`font-bold ${isOverBudget ? 'text-error' : remaining === 0 ? 'text-success' : 'text-warning'}`}>
                          ${remaining.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${isOverBudget ? 'bg-error' : allocatedTotal === totalBudget ? 'bg-success' : 'bg-info'}`}
                          style={{ width: `${Math.min((allocatedTotal / totalBudget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <h3 className="font-bold text-primary mb-4">Your Reasoning</h3>
                  <textarea
                    value={reasoning}
                    onChange={(e) => setReasoning(e.target.value)}
                    placeholder="Explain your allocation strategy and why you chose this distribution..."
                    className="input min-h-[150px] resize-none"
                  />
                  <p className="text-xs text-muted mt-2">
                    {reasoning.length}/50+ characters (currently: {reasoning.length})
                  </p>
                </Card>
              </motion.div>
            </div>

            {/* Right Panel - Projections & Results */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 bg-gradient-to-br from-info/5 to-transparent">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-5 h-5 text-info" />
                    <h3 className="font-bold text-primary">Projections</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg bg-secondary">
                      <p className="text-xs text-muted mb-1">Expected Revenue</p>
                      <p className="text-2xl font-bold text-primary">${Math.round(totalExpectedReturn).toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                      <p className="text-xs text-muted mb-1">Overall ROI</p>
                      <p className="text-2xl font-bold text-primary">{totalROI.toFixed(0)}%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-secondary">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-muted">Est. Customers</p>
                        <p className="text-lg font-bold text-primary">{estimatedCustomers}</p>
                      </div>
                      <div className={`text-xs ${estimatedCustomers >= 500 ? 'text-success' : 'text-warning'} flex items-center gap-1`}>
                        {estimatedCustomers >= 500 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        Goal: 500 customers
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-muted">Actual CAC</p>
                        <p className="text-lg font-bold text-primary">${actualCAC.toFixed(2)}</p>
                      </div>
                      <div className={`text-xs ${actualCAC <= 100 ? 'text-success' : 'text-warning'} flex items-center gap-1`}>
                        {actualCAC <= 100 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        Target: $100 or less
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6">
                  <h3 className="font-bold text-primary mb-4">Channel Breakdown</h3>
                  <div className="space-y-3">
                    {projections.filter(p => p.allocated > 0).map((proj, i) => (
                      <div key={i} className="p-3 rounded-lg bg-secondary">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-primary text-sm">{proj.channel}</span>
                          <span className="text-xs text-muted">${proj.allocated.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted">Expected Return</span>
                          <span className="font-semibold text-success">${Math.round(proj.expectedReturn).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {isSubmitted && score && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <h3 className="font-bold text-success">Analysis Complete</h3>
                        <p className="text-sm text-muted">Score: {score}/100</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-secondary">
                        <strong className="text-primary">Evaluation:</strong> {meetsGoals ? 'Strong allocation strategy that meets all targets.' : 'Good effort, but consider adjusting allocation to meet all goals.'}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
