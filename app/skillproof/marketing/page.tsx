'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Megaphone, ArrowLeft, Send, Sparkles, Target, TrendingUp, Users, Calendar, Instagram, Twitter, Facebook, Linkedin, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/common';
import Link from 'next/link';
import { useState } from 'react';

const marketingBrief = {
  title: 'Social Media Campaign Launch',
  brand: 'Snoonu',
  scenario: 'Snoonu is launching a new premium delivery service for restaurants. Create engaging social media content and a brief campaign strategy.',
  deliverables: [
    'Instagram caption (max 150 characters)',
    'Twitter/X post (max 280 characters)',
    'Campaign hashtag',
    'Brief campaign strategy (3-5 sentences)',
  ],
  audience: 'Young professionals (25-35) who value convenience and quality',
  keyMessages: [
    'Premium restaurant partners',
    'Fast delivery (under 30 mins)',
    'Exclusive menu items',
  ],
};

export default function MarketingChallengePage() {
  const [instagramCaption, setInstagramCaption] = useState('');
  const [twitterPost, setTwitterPost] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [strategy, setStrategy] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Simulate AI evaluation
    setTimeout(() => {
      setAiScore(87);
    }, 1500);
  };

  const isComplete = instagramCaption && twitterPost && hashtag && strategy;

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-default bg-secondary/50 px-6 py-4 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/skillproof">
                <button className="btn btn-ghost btn-sm">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-primary">{marketingBrief.title}</h1>
                  <span className="badge badge-success text-xs">Marketing</span>
                </div>
                <p className="text-sm text-muted">Marketing SkillProof Challenge</p>
              </div>
            </div>
            
            <button 
              className={`btn ${isSubmitted && aiScore ? 'btn-success' : 'btn-primary'}`}
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitted}
            >
              {isSubmitted && aiScore ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Score: {aiScore}/100
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Campaign
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Brief */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 accent-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-snoonu-red/10 rounded-xl flex items-center justify-center">
                      <Megaphone className="w-6 h-6 snoonu-red" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-primary">Campaign Brief</h2>
                      <p className="text-sm text-muted">{marketingBrief.brand}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Scenario</h3>
                      <p className="text-secondary leading-relaxed">{marketingBrief.scenario}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-info/5 border border-info/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-info" />
                        <h3 className="font-semibold text-primary">Target Audience</h3>
                      </div>
                      <p className="text-sm text-secondary">{marketingBrief.audience}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-primary mb-3">Key Messages</h3>
                      <div className="space-y-2">
                        {marketingBrief.keyMessages.map((msg, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                            <span className="text-sm text-secondary">{msg}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-primary mb-3">Deliverables</h3>
                      <div className="space-y-2">
                        {marketingBrief.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-secondary">{item}</span>
                          </div>
                        ))}
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
                <Card className="p-6 bg-gradient-to-br from-warning/5 to-transparent border-warning/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-primary mb-2">Tips for Success</h3>
                      <ul className="space-y-2 text-sm text-secondary">
                        <li>• Use action-oriented language and emojis strategically</li>
                        <li>• Create urgency while highlighting benefits</li>
                        <li>• Make hashtags memorable and brand-aligned</li>
                        <li>• Focus on emotional connection with audience</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* AI Feedback */}
              {isSubmitted && aiScore && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-success">AI Evaluation Complete</h3>
                        <p className="text-sm text-muted">Score: {aiScore}/100</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-success/5">
                        <h4 className="font-semibold text-primary text-sm mb-1">Strengths</h4>
                        <p className="text-sm text-secondary">
                          ✓ Engaging tone that resonates with target audience<br />
                          ✓ Clear value proposition in social copy<br />
                          ✓ Strategic use of trending formats
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-warning/5">
                        <h4 className="font-semibold text-primary text-sm mb-1">Areas for Improvement</h4>
                        <p className="text-sm text-secondary">
                          • Consider adding more specific call-to-action<br />
                          • Hashtag could be more unique to campaign
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Right Panel - Content Creation */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Instagram className="w-5 h-5 text-[#E4405F]" />
                    <h3 className="font-bold text-primary">Instagram Post</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-secondary mb-2 block">
                        Caption (max 150 characters)
                      </label>
                      <textarea
                        value={instagramCaption}
                        onChange={(e) => setInstagramCaption(e.target.value.slice(0, 150))}
                        placeholder="Write an engaging Instagram caption..."
                        className="input min-h-[100px] resize-none"
                        maxLength={150}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted">Be creative and authentic</span>
                        <span className={`text-xs ${instagramCaption.length > 140 ? 'text-warning' : 'text-muted'}`}>
                          {instagramCaption.length}/150
                        </span>
                      </div>
                    </div>

                    {/* Preview */}
                    {instagramCaption && (
                      <div className="p-4 rounded-lg bg-secondary border border-default">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-snoonu-red flex items-center justify-center text-white font-bold text-sm">
                            S
                          </div>
                          <span className="font-semibold text-primary text-sm">snoonu</span>
                        </div>
                        <div className="aspect-square bg-gradient-to-br from-snoonu-red to-pink-500 rounded-lg mb-3 flex items-center justify-center text-white">
                          <Sparkles className="w-12 h-12" />
                        </div>
                        <p className="text-sm text-primary whitespace-pre-wrap">{instagramCaption}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                    <h3 className="font-bold text-primary">Twitter/X Post</h3>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary mb-2 block">
                      Tweet (max 280 characters)
                    </label>
                    <textarea
                      value={twitterPost}
                      onChange={(e) => setTwitterPost(e.target.value.slice(0, 280))}
                      placeholder="Craft a compelling tweet..."
                      className="input min-h-[100px] resize-none"
                      maxLength={280}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted">Keep it punchy and shareable</span>
                      <span className={`text-xs ${twitterPost.length > 260 ? 'text-warning' : 'text-muted'}`}>
                        {twitterPost.length}/280
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-info" />
                    <h3 className="font-bold text-primary">Campaign Hashtag</h3>
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      value={hashtag}
                      onChange={(e) => setHashtag(e.target.value.replace(/\s/g, ''))}
                      placeholder="#YourHashtag"
                      className="input"
                    />
                    <p className="text-xs text-muted mt-1">Create a unique, memorable hashtag</p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-warning" />
                    <h3 className="font-bold text-primary">Campaign Strategy</h3>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary mb-2 block">
                      Brief Strategy (3-5 sentences)
                    </label>
                    <textarea
                      value={strategy}
                      onChange={(e) => setStrategy(e.target.value)}
                      placeholder="Describe your overall campaign approach, timing, and key tactics..."
                      className="input min-h-[120px] resize-none"
                    />
                    <p className="text-xs text-muted mt-1">
                      Include launch timing, platforms, and engagement tactics
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
