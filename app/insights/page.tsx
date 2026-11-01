'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Users, Target, Calendar, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { applications, roles, candidates } from '@/lib/data/mock-data';
import type { ApplicationStage, RoleType } from '@/lib/data/types';

// Every figure on this page is counted from the demo data in lib/data

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Applications per day applied, in UTC so server and browser agree
const applicationTrendData = Object.entries(
  applications.reduce<Record<string, number>>((days, app) => {
    const day = app.appliedAt.slice(0, 10);
    days[day] = (days[day] || 0) + 1;
    return days;
  }, {})
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([day, count]) => {
    const date = new Date(`${day}T00:00:00Z`);
    return { name: `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`, applications: count };
  });

const ROLE_TYPE_LABELS: Record<RoleType, string> = {
  internship: 'Internship',
  volunteer: 'Volunteer',
  graduate: 'Graduate',
};

const roleTypeData = (Object.keys(ROLE_TYPE_LABELS) as RoleType[]).map(type => ({
  name: ROLE_TYPE_LABELS[type],
  value: applications.filter(app => roles.find(r => r.id === app.roleId)?.type === type).length,
}));

const PAST_SHORTLIST: ApplicationStage[] = ['shortlisted', 'interview', 'offer', 'hired'];
const shortlistedOrLater = applications.filter(app => PAST_SHORTLIST.includes(app.stage)).length;
const avgFitScore = applications.length > 0
  ? Math.round(applications.reduce((sum, app) => sum + app.fitScore, 0) / applications.length)
  : 0;
const openRoles = roles.filter(r => r.status === 'open').length;
const percentOf = (count: number) => (applications.length > 0 ? Math.round((count / applications.length) * 100) : 0);

// Universities of the candidates behind each application, most applications first
const topSources = Object.entries(
  applications.reduce<Record<string, number>>((sources, app) => {
    const university = candidates.find(c => c.id === app.candidateId)?.university ?? 'Unknown';
    sources[university] = (sources[university] || 0) + 1;
    return sources;
  }, {})
)
  .sort(([nameA, a], [nameB, b]) => b - a || nameA.localeCompare(nameB))
  .slice(0, 3)
  .map(([name, count]) => ({ name, count, percentage: percentOf(count) }));

const metrics = [
  { label: 'Total Applications', value: String(applications.length), note: `Across ${roles.length} roles`, icon: Users, tint: 'bg-info/10', text: 'text-info' },
  { label: 'Avg. Fit Score', value: String(avgFitScore), note: 'Out of 100, all applications', icon: Gauge, tint: 'bg-success/10', text: 'text-success' },
  { label: 'Shortlisted or Later', value: `${percentOf(shortlistedOrLater)}%`, note: `${shortlistedOrLater} of ${applications.length} applications`, icon: Target, tint: 'bg-warning/10', text: 'text-warning' },
  { label: 'Open Roles', value: String(openRoles), note: `${roles.length} roles in total`, icon: Calendar, tint: 'bg-error/10', text: 'text-error' },
];

export default function InsightsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Insights</h1>
          <p className="text-secondary">Counted from the demo applications</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.tint}`}>
                      <Icon className={`w-6 h-6 ${metric.text}`} />
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-primary mb-2">{metric.value}</p>
                  <p className="text-sm text-muted">{metric.note}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-bold text-primary mb-4">Applications by Date Applied</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={applicationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--foreground-muted)" />
                  <YAxis stroke="var(--foreground-muted)" allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="applications" stroke="#D90217" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Applications by Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-bold text-primary mb-4">Applications by Role Type</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={roleTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--foreground-muted)" />
                  <YAxis stroke="var(--foreground-muted)" allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="value" fill="#D90217" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Top Universities */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Top Talent Sources</h3>
            <p className="text-sm text-muted -mt-3 mb-4">Applications by the candidate&apos;s university</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topSources.map((uni, index) => (
                <div key={uni.name} className="p-4 rounded-lg bg-secondary">
                  <p className="font-semibold text-primary mb-2">{uni.name}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-primary">{uni.count}</p>
                    <span className="text-sm text-muted">({uni.percentage}%)</span>
                  </div>
                  <div className="mt-3 h-2 bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-snoonu-red"
                      initial={{ width: 0 }}
                      animate={{ width: `${uni.percentage}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
