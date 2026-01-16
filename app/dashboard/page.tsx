'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Clock, CheckCircle2, Calendar, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/common';
import { applications, roles, interviews, candidates } from '@/lib/data/mock-data';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FitScoreRing } from '@/components/ui/common';

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return <span>{count}</span>;
}

type KPICardProps = {
  title: string;
  value: number;
  change?: { value: number; positive: boolean };
  icon: any;
  delay: number;
};

function KPICard({ title, value, change, icon: Icon, delay }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-primary">
              <AnimatedCounter value={value} />
            </p>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                {change.positive ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-error" />
                )}
                <span className={`text-sm font-medium ${change.positive ? 'text-success' : 'text-error'}`}>
                  {change.value}%
                </span>
                <span className="text-xs text-muted">vs last week</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 bg-snoonu-red/10 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-snoonu-red/20 to-transparent"></div>
            <Icon className="w-6 h-6 snoonu-red relative z-10" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Dashboard() {
  // Calculate stats
  const openRoles = roles.filter(r => r.status === 'open').length;
  const newAppsToday = 25; // Base number for demo
  const shortlistedCount = applications.filter(a => a.stage === 'shortlisted').length;
  const upcomingInterviews = interviews.filter(i => i.status === 'scheduled').length;

  // Top candidates by fit score
  const topCandidateApps = applications
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 5)
    .map(app => ({
      ...app,
      candidate: candidates.find(c => c.id === app.candidateId)!,
      role: roles.find(r => r.id === app.roleId)!,
    }));

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-primary mb-2">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-secondary">Welcome back! Here's what's happening today.</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Open Roles"
            value={openRoles}
            change={{ value: 12, positive: true }}
            icon={Users}
            delay={0}
          />
          <KPICard
            title="New Applications Today"
            value={newAppsToday}
            change={{ value: 8, positive: true }}
            icon={CheckCircle2}
            delay={0.1}
          />
          <KPICard
            title="Shortlisted"
            value={shortlistedCount}
            change={{ value: 15, positive: true }}
            icon={CheckCircle2}
            delay={0.2}
          />
          <KPICard
            title="Interviews This Week"
            value={upcomingInterviews}
            icon={Calendar}
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Triage Queue */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 accent-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-snoonu-red/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 snoonu-red" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-primary">AI Triage Queue</h2>
                    <p className="text-sm text-muted">Top candidates across all roles</p>
                  </div>
                </div>
                <Link href="/applicants">
                  <button className="btn btn-ghost text-sm">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              <div className="space-y-4">
                {topCandidateApps.map((app, index) => (
                  <motion.div
                    key={app.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-tertiary transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <FitScoreRing score={app.fitScore} size="sm" showLabel={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-primary">{app.candidate.name}</h3>
                      </div>
                      <p className="text-sm text-muted truncate">{app.role.title}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {app.aiReasons.slice(0, 3).map((reason, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-tertiary text-secondary">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming Interviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-info" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">Upcoming Interviews</h2>
                  <p className="text-sm text-muted">This week</p>
                </div>
              </div>

              <div className="space-y-4">
                {interviews.map((interview, index) => {
                  const app = applications.find(a => a.id === interview.applicationId)!;
                  const candidate = candidates.find(c => c.id === app?.candidateId);
                  const date = new Date(interview.scheduledAt);
                  
                  return (
                    <motion.div
                      key={interview.id}
                      className="p-3 rounded-lg bg-secondary"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-info rounded-lg flex items-center justify-center text-invert text-xs font-bold flex-shrink-0">
                          {date.getDate()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary text-sm truncate">
                            {candidate?.name}
                          </p>
                          <p className="text-xs text-muted">
                            {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-xs text-muted mt-1">
                            with {interview.interviewer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <Link href="/interviews">
                <button className="w-full mt-4 btn btn-ghost text-sm">
                  View All Interviews
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </Card>
          </motion.div>
        </div>

        {/* Roles Needing Attention */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">Roles Needing Attention</h2>
                  <p className="text-sm text-muted">High volume or approaching deadline</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.slice(0, 3).map((role, index) => {
                const roleApps = applications.filter(a => a.roleId === role.id);
                const unreviewedCount = roleApps.filter(a => a.stage === 'new').length;
                
                return (
                  <motion.div
                    key={role.id}
                    className="p-4 rounded-lg bg-secondary hover:bg-tertiary transition-colors cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <h3 className="font-semibold text-primary text-sm mb-2">{role.title}</h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted">{role.applicantsCount} applicants</span>
                      {unreviewedCount > 0 && (
                        <span className="badge badge-warning">{unreviewedCount} new</span>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted" />
                      <span className="text-xs text-muted">
                        Deadline: {new Date(role.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
