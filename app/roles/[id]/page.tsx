'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, TrendingUp, ArrowLeft, Briefcase, Heart, GraduationCap, FileText, GitBranch, Target, CalendarDays, BarChart3 } from 'lucide-react';
import { Card, StatusPill, Button, FitScoreRing, SkillChip } from '@/components/ui/common';
import { roles, applications, candidates } from '@/lib/data/mock-data';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const tabs = [
  { id: 'applicants', label: 'Applicants', icon: Users },
  { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { id: 'skill-proof', label: 'Skill Proof', icon: Target },
  { id: 'interviews', label: 'Interviews', icon: CalendarDays },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
];

export default function RoleDetailPage() {
  const params = useParams();
  const roleId = params?.id as string;
  const role = roles.find(r => r.id === roleId);
  const [activeTab, setActiveTab] = useState('applicants');

  if (!role) {
    return (
      <MainLayout>
        <div className="p-6">
          <p className="text-muted">Role not found</p>
        </div>
      </MainLayout>
    );
  }

  const roleApps = applications.filter(a => a.roleId === role.id);
  const roleAppsWithCandidates = roleApps.map(app => ({
    ...app,
    candidate: candidates.find(c => c.id === app.candidateId)!,
  }));

  const getRoleIcon = (type: string) => {
    switch (type) {
      case 'internship': return Briefcase;
      case 'volunteer': return Heart;
      case 'graduate': return GraduationCap;
      default: return Briefcase;
    }
  };

  const Icon = getRoleIcon(role.type);
  const daysUntilDeadline = Math.ceil((new Date(role.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/roles">
          <motion.button
            className="btn btn-ghost mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Roles
          </motion.button>
        </Link>

        {/* Role Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                role.type === 'internship' ? 'bg-info/10' :
                role.type === 'volunteer' ? 'bg-success/10' :
                'bg-warning/10'
              }`}>
                <Icon className={`w-8 h-8 ${
                  role.type === 'internship' ? 'text-info' :
                  role.type === 'volunteer' ? 'text-success' :
                  'text-warning'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-primary">{role.title}</h1>
                  <StatusPill 
                    status={role.status} 
                    variant={role.status === 'open' ? 'success' : 'default'} 
                  />
                  <span className="badge badge-info uppercase text-xs">{role.type}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-secondary mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{role.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {new Date(role.deadline).toLocaleDateString()} ({daysUntilDeadline} days)</span>
                  </div>
                </div>

                <p className="text-secondary mb-4">{role.description}</p>

                <div className="flex flex-wrap gap-2">
                  {role.requirements.map((req, i) => (
                    <SkillChip key={i} skill={req} />
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center mb-2">
                    <div>
                      <p className="text-2xl font-bold text-primary">{role.applicantsCount}</p>
                      <p className="text-xs text-muted">Applicants</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center mb-2">
                    <div>
                      <p className="text-2xl font-bold text-primary">{role.qualityScore}%</p>
                      <p className="text-xs text-muted">Quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-2">
            <div className="flex gap-2">
              {tabs.map(tab => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-snoonu-red text-white shadow-lg'
                        : 'text-secondary hover:bg-secondary'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'applicants' && (
            <motion.div
              key="applicants"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">
                  Applicants ({roleApps.length})
                </h2>
                <div className="space-y-3">
                  {roleAppsWithCandidates
                    .sort((a, b) => b.fitScore - a.fitScore)
                    .map((app, index) => (
                      <motion.div
                        key={app.id}
                        className="p-4 rounded-lg bg-secondary hover:bg-tertiary transition-colors cursor-pointer flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <FitScoreRing score={app.fitScore} size="sm" showLabel={false} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-primary">{app.candidate.name}</h3>
                            <StatusPill 
                              status={app.stage}
                              variant={
                                app.stage === 'shortlisted' || app.stage === 'interview' ? 'info' :
                                app.stage === 'offer' ? 'success' :
                                app.stage === 'rejected' ? 'error' :
                                'default'
                              }
                            />
                          </div>
                          <p className="text-sm text-muted mb-2">
                            {app.candidate.university} • {app.candidate.major}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {app.aiReasons.map((reason, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-tertiary text-secondary">
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="primary" size="sm">Review</Button>
                          <Button variant="ghost" size="sm">Details</Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'pipeline' && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">Pipeline View</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['new', 'reviewed', 'shortlisted', 'interview'].map(stage => {
                    const count = roleApps.filter(a => a.stage === stage).length;
                    return (
                      <div key={stage} className="p-4 rounded-lg bg-secondary">
                        <p className="text-sm text-muted capitalize mb-1">{stage}</p>
                        <p className="text-2xl font-bold text-primary">{count}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm text-muted mt-4">
                  Full drag-and-drop pipeline board available in Pipeline view
                </p>
              </Card>
            </motion.div>
          )}

          {activeTab === 'skill-proof' && (
            <motion.div
              key="skill-proof"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">Skill Proof Challenges</h2>
                <p className="text-secondary mb-4">
                  Assign challenges to candidates to evaluate their skills objectively.
                </p>
                <Button variant="primary">
                  Create Challenge
                </Button>
              </Card>
            </motion.div>
          )}

          {activeTab === 'interviews' && (
            <motion.div
              key="interviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">Scheduled Interviews</h2>
                <p className="text-secondary">
                  Interview scheduling for shortlisted candidates
                </p>
              </Card>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">Role Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-sm text-muted mb-1">Avg. Time to Shortlist</p>
                    <p className="text-2xl font-bold text-primary">2.3 days</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-sm text-muted mb-1">Application Rate</p>
                    <p className="text-2xl font-bold text-primary">+15%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-sm text-muted mb-1">Avg. Fit Score</p>
                    <p className="text-2xl font-bold text-primary">76</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
