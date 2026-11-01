'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { type LucideIcon, Users, Clock, CheckCircle2, Calendar, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/common';
import { applications, roles, interviews, candidates } from '@/lib/data/mock-data';
import type { ApplicationStage } from '@/lib/data/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FitScoreRing } from '@/components/ui/common';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate, formatTime } from '@/lib/format';

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  note?: string;
  icon: LucideIcon;
  delay: number;
};

function KPICard({ title, value, note, icon: Icon, delay }: KPICardProps) {
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
            {note && <p className="text-xs text-muted mt-2">{note}</p>}
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
  // Every number below is counted from the demo data in lib/data
  const openRoles = roles.filter(r => r.status === 'open').length;
  const totalApplications = applications.length;
  const newApplications = applications.filter(a => a.stage === 'new').length;
  const shortlistedCount = applications.filter(a => a.stage === 'shortlisted').length;
  const scheduledInterviews = interviews.filter(i => i.status === 'scheduled').length;

  // Funnel: how many applications reached each stage or a later one
  const funnelStages: { stage: ApplicationStage; label: string }[] = [
    { stage: 'new', label: 'Applied' },
    { stage: 'reviewed', label: 'Reviewed' },
    { stage: 'shortlisted', label: 'Shortlisted' },
    { stage: 'interview', label: 'Interview' },
    { stage: 'offer', label: 'Offer' },
    { stage: 'hired', label: 'Hired' },
  ];
  const stageRank = (stage: ApplicationStage) => funnelStages.findIndex(s => s.stage === stage);
  const pipelineData = funnelStages.map((s, index) => ({
    stage: s.label,
    // Rejected applications count as applied only
    count: index === 0 ? totalApplications : applications.filter(a => stageRank(a.stage) >= index).length,
  }));

  // Top candidates by fit score (copy first so the shared array keeps its order)
  const topCandidateApps = [...applications]
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 5)
    .map(app => ({
      ...app,
      candidate: candidates.find(c => c.id === app.candidateId)!,
      role: roles.find(r => r.id === app.roleId)!,
    }));

  // Roles with the most unreviewed applications first
  const rolesNeedingAttention = roles
    .map(role => {
      const roleApps = applications.filter(a => a.roleId === role.id);
      return { role, roleApps, unreviewedCount: roleApps.filter(a => a.stage === 'new').length };
    })
    .sort((a, b) => b.unreviewedCount - a.unreviewedCount)
    .slice(0, 3);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-1">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-sm text-secondary">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <KPICard
            title="Open Roles"
            value={openRoles}
            icon={Users}
            delay={0}
          />
          <KPICard
            title="Applications"
            value={totalApplications}
            note={`${newApplications} not yet reviewed`}
            icon={CheckCircle2}
            delay={0.1}
          />
          <KPICard
            title="Shortlisted"
            value={shortlistedCount}
            icon={CheckCircle2}
            delay={0.2}
          />
          <KPICard
            title="Interviews Scheduled"
            value={scheduledInterviews}
            icon={Calendar}
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Application Pipeline Chart */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-lg font-bold text-primary">Hiring Pipeline Overview</h2>
                  <p className="text-xs text-muted">Applications that reached each stage, all roles</p>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={pipelineData}>
                  <defs>
                    <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D90217" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D90217" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                  <XAxis 
                    dataKey="stage" 
                    stroke="var(--foreground-muted)" 
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis 
                    stroke="var(--foreground-muted)" 
                    style={{ fontSize: '11px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#D90217" 
                    strokeWidth={2}
                    fill="url(#colorPipeline)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Upcoming Interviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-info" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-primary">Upcoming Interviews</h2>
                  <p className="text-xs text-muted">Scheduled</p>
                </div>
              </div>

              <div className="space-y-2">
                {interviews.slice(0, 3).map((interview, index) => {
                  const app = applications.find(a => a.id === interview.applicationId)!;
                  const candidate = candidates.find(c => c.id === app?.candidateId);
                  const date = new Date(interview.scheduledAt);
                  
                  return (
                    <motion.div
                      key={interview.id}
                      className="p-2 rounded-lg bg-secondary shadow-sm hover:shadow-md transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 bg-info rounded-lg flex items-center justify-center text-invert text-xs font-bold flex-shrink-0">
                          {formatDate(date, { day: 'numeric' })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary text-xs truncate">
                            {candidate?.name}
                          </p>
                          <p className="text-xs text-muted">
                            {formatTime(date)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <Link href="/interviews">
                <button className="w-full mt-3 btn btn-ghost text-xs py-1.5">
                  View All Interviews
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Grid: top candidates and roles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {/* Top candidates by fit */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-4 accent-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-snoonu-red/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 snoonu-red" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-primary">Top candidates by fit</h2>
                    <p className="text-xs text-muted">Top candidates across all roles</p>
                  </div>
                </div>
                <Link href="/applicants">
                  <button className="btn btn-ghost text-xs">
                    View All
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>

              <div className="space-y-2">
                {topCandidateApps.slice(0, 4).map((app, index) => (
                  <Link key={app.id} href={`/applicants/${app.id}`}>
                    <motion.div
                      className="flex items-center gap-3 p-2 rounded-lg bg-secondary shadow-sm hover:shadow-md hover:bg-tertiary transition-all cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                    <div className="flex-shrink-0">
                      <FitScoreRing score={app.fitScore} size="sm" showLabel={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-primary text-sm">{app.candidate.name}</h3>
                      </div>
                      <p className="text-xs text-muted truncate">{app.role.title}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {app.fitReasons.slice(0, 2).map((reason, i) => (
                          <span key={i} className="text-xs px-1.5 py-0.5 rounded-full bg-tertiary text-secondary">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted flex-shrink-0" />
                  </motion.div>
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Roles Needing Attention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-primary">Roles Needing Attention</h2>
                </div>
              </div>

              <div className="space-y-2">
                {rolesNeedingAttention.map(({ role, roleApps, unreviewedCount }, index) => {
                  
                  return (
                    <motion.div
                      key={role.id}
                      className="p-2 rounded-lg bg-secondary shadow-sm hover:shadow-md hover:bg-tertiary transition-all cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <h3 className="font-semibold text-primary text-xs mb-1">{role.title}</h3>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">{roleApps.length} applicants</span>
                        {unreviewedCount > 0 && (
                          <span className="badge badge-warning text-xs py-0">{unreviewedCount} new</span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted">
                          {formatDate(role.deadline)}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
