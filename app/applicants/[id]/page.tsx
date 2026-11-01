'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, GraduationCap, Calendar, Globe, Award, Briefcase, CheckCircle2, Link as LinkIcon, Trophy, Sparkles, Target, Brain, ListChecks } from 'lucide-react';
import { Card } from '@/components/ui/common';
import { applications, roles, candidates } from '@/lib/data/mock-data';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FitScoreRing } from '@/components/ui/common';

export default function ApplicantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  // Find the application
  const application = applications.find(app => app.id === applicationId);
  
  if (!application) {
    return (
      <MainLayout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Application Not Found</h1>
          <Link href="/applicants">
            <button className="btn btn-primary">Back to Applicants</button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const candidate = candidates.find(c => c.id === application.candidateId)!;
  const role = roles.find(r => r.id === application.roleId)!;

  // Rank in pool by fit score
  const roleApplications = applications.filter(app => app.roleId === role.id);
  const sortedByFitScore = [...roleApplications].sort((a, b) => b.fitScore - a.fitScore);
  const rank = sortedByFitScore.findIndex(app => app.id === applicationId) + 1;
  const totalApplicants = roleApplications.length;

  const gpa = candidate.gpa.toFixed(2);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className="btn btn-ghost"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-snoonu-red/20 via-snoonu-red/10 to-transparent flex items-center justify-center border-2 border-snoonu-red/20">
                  <span className="text-5xl font-bold snoonu-red">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {candidate.snoonuPlus && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Snoonu Plus</span>
                  </div>
                )}
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-primary mb-2">{candidate.name}</h1>
                    <p className="text-lg text-secondary mb-3">Applied for: <span className="font-semibold text-primary">{role.title}</span></p>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <Mail className="w-4 h-4 text-muted" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <GraduationCap className="w-4 h-4 text-muted" />
                        {candidate.university}
                      </div>
                    </div>
                  </div>

                  {/* Fit Score */}
                  <div className="flex flex-col items-center lg:items-end">
                    <FitScoreRing score={application.fitScore} size="lg" showLabel={true} />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="px-4 py-3 rounded-lg bg-secondary border border-border/20">
                    <p className="text-xs text-muted mb-1">GPA</p>
                    <p className="text-lg font-bold text-primary">{gpa}</p>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-secondary border border-border/20">
                    <p className="text-xs text-muted mb-1">Graduation</p>
                    <p className="text-sm font-semibold text-primary">
                      {new Date(candidate.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-secondary border border-border/20">
                    <p className="text-xs text-muted mb-1">Major</p>
                    <p className="text-sm font-semibold text-primary">{candidate.major}</p>
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-secondary border border-border/20">
                    <p className="text-xs text-muted mb-1">Availability</p>
                    <p className="text-sm font-semibold text-primary capitalize">{candidate.availability}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Fit Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-6 accent-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-snoonu-red/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 snoonu-red" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Fit analysis</h2>
                <p className="text-sm text-muted">Explainable fit score: every point has a reason</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rank */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-snoonu-red/5 to-transparent border border-snoonu-red/10">
                <Target className="w-8 h-8 snoonu-red mx-auto mb-3" />
                <p className="text-sm text-muted mb-2">Rank in pool</p>
                <p className="text-4xl font-bold gradient-text mb-1">#{rank}</p>
                <p className="text-xs text-muted">out of {totalApplicants} applicants</p>
              </div>

              {/* Recommendation */}
              <div className="text-center p-6 rounded-xl bg-secondary border border-border/20">
                <Brain className="w-8 h-8 text-info mx-auto mb-3" />
                <p className="text-sm text-muted mb-2">Recommendation</p>
                <p className={`text-2xl font-bold mb-1 ${
                  application.recommendation === 'accept' ? 'text-success' :
                  application.recommendation === 'hold' ? 'text-warning' : 'text-error'
                }`}>
                  {application.recommendation.toUpperCase()}
                </p>
                <p className="text-xs text-muted">{application.confidence}% confidence</p>
              </div>

              {/* Stage */}
              <div className="text-center p-6 rounded-xl bg-secondary border border-border/20">
                <CheckCircle2 className="w-8 h-8 text-info mx-auto mb-3" />
                <p className="text-sm text-muted mb-2">Current Stage</p>
                <p className="text-xl font-bold text-primary mb-1 capitalize">{application.stage}</p>
                <p className="text-xs text-muted">
                  Applied {new Date(application.appliedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Fit Reasons */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-muted mb-3">Why This Candidate Stands Out</h3>
              <div className="flex flex-wrap gap-2">
                {application.fitReasons.map((reason, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="px-4 py-2 rounded-full bg-snoonu-red/10 border border-snoonu-red/20"
                  >
                    <span className="text-sm font-medium snoonu-red">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-snoonu-red/10 rounded-lg flex items-center justify-center">
                <ListChecks className="w-5 h-5 snoonu-red" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Score breakdown</h2>
                <p className="text-sm text-muted">How {application.fitScore} points were earned for {role.title}</p>
              </div>
            </div>

            <div className="rounded-xl border border-default bg-secondary overflow-hidden">
              {application.scoreBreakdown.map((line, i) => (
                <div key={i} className={`flex items-center justify-between gap-4 px-4 py-3 ${i > 0 ? 'border-t border-default' : ''}`}>
                  <span className={`text-sm ${line.points === 0 ? 'text-muted' : 'text-primary'}`}>{line.label}</span>
                  <span
                    className="text-sm font-semibold tabular-nums"
                    style={{ color: line.points > 0 ? 'var(--success)' : line.points < 0 ? 'var(--error)' : 'var(--foreground-muted)' }}
                  >
                    {line.points > 0 ? `+${line.points}` : line.points}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-default">
                <span className="text-sm font-bold text-primary">Fit score</span>
                <span className="text-lg font-bold gradient-text tabular-nums">{application.fitScore}</span>
              </div>
            </div>
            {candidate.snoonuPlus && (
              <p className="text-xs text-muted mt-3">Snoonu Plus membership is shown as a badge only and adds no points.</p>
            )}
          </Card>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills & Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-info" />
                <h2 className="text-lg font-bold text-primary">Skills & Languages</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium text-primary border border-border/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-info/10 text-sm font-medium text-info border border-info/20"
                      >
                        <Globe className="w-3 h-3 inline mr-1" />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Work Permit</span>
                    <span className={`font-semibold ${candidate.workPermit ? 'text-success' : 'text-error'}`}>
                      {candidate.workPermit ? '✓ Available' : '✗ Not Available'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Projects & Portfolio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-info" />
                <h2 className="text-lg font-bold text-primary">Projects & Experience</h2>
              </div>

              {candidate.portfolio && candidate.portfolio.projects.length > 0 ? (
                <div className="space-y-4">
                  {candidate.portfolio.projects.map((project, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-secondary border border-border/20 hover:border-border/40 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-primary">{project.title}</h3>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-info hover:text-info/80 transition-colors"
                          >
                            <LinkIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-secondary">{project.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted italic">No projects listed</p>
              )}
            </Card>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-warning" />
                <h2 className="text-lg font-bold text-primary">Certifications & Awards</h2>
              </div>

              {candidate.portfolio && candidate.portfolio.certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.portfolio.certificates.map((cert, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-gradient-to-br from-warning/5 to-transparent border border-warning/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-warning" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-primary mb-1">{cert.title}</h3>
                          <p className="text-sm text-muted">{cert.issuer}</p>
                          <p className="text-xs text-muted mt-1">
                            {new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted italic">No certifications listed</p>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex gap-4"
        >
          <button className="btn btn-primary flex-1">
            <CheckCircle2 className="w-4 h-4" />
            Shortlist Candidate
          </button>
          <button className="btn btn-secondary flex-1">
            <Calendar className="w-4 h-4" />
            Schedule Interview
          </button>
        </motion.div>
      </div>
    </MainLayout>
  );
}
