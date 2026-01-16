'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Target, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const applicationTrendData = [
  { name: 'Week 1', applications: 12 },
  { name: 'Week 2', applications: 19 },
  { name: 'Week 3', applications: 15 },
  { name: 'Week 4', applications: 28 },
];

const roleTypeData = [
  { name: 'Internship', value: 120 },
  { name: 'Volunteer', value: 85 },
  { name: 'Graduate', value: 67 },
];

export default function InsightsPage() {
  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-primary mb-2">Insights</h1>
          <p className="text-secondary">Analytics and performance metrics</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total Applications', value: '272', change: '+18%', icon: Users, color: 'info' },
            { label: 'Avg. Time to Hire', value: '12 days', change: '-3 days', icon: Clock, color: 'success' },
            { label: 'Acceptance Rate', value: '73%', change: '+5%', icon: Target, color: 'warning' },
            { label: 'Active Roles', value: '6', change: '+2', icon: Calendar, color: 'error' },
          ].map((metric, index) => {
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
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${metric.color}/10`}>
                      <Icon className={`w-6 h-6 text-${metric.color}`} />
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-primary mb-2">{metric.value}</p>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span>{metric.change}</span>
                  </div>
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
              <h3 className="text-lg font-bold text-primary mb-4">Application Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={applicationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--foreground-muted)" />
                  <YAxis stroke="var(--foreground-muted)" />
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
              <h3 className="text-lg font-bold text-primary mb-4">Applications by Type</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={roleTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--foreground-muted)" />
                  <YAxis stroke="var(--foreground-muted)" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Qatar University', count: 87, percentage: 32 },
                { name: 'Carnegie Mellon Qatar', count: 65, percentage: 24 },
                { name: 'Georgetown Qatar', count: 48, percentage: 18 },
              ].map((uni, index) => (
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
                      animate={{ width: `${uni.percentage * 3}%` }}
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
