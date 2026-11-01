'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, MapPin, Calendar, Users, TrendingUp, Briefcase, Heart, GraduationCap, Sparkles, Code, Megaphone, Calculator, Palette, ArrowRight } from 'lucide-react';
import { Card, StatusPill } from '@/components/ui/common';
import { roles, applications, roleStats } from '@/lib/data/mock-data';
import { useState } from 'react';
import Link from 'next/link';
import { deadlineLabel } from '@/lib/format';

export default function RolesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || role.type === filterType;
    return matchesSearch && matchesType;
  });

  const getRoleIcon = (type: string) => {
    switch (type) {
      case 'internship': return Briefcase;
      case 'volunteer': return Heart;
      case 'graduate': return GraduationCap;
      default: return Briefcase;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Roles</h1>
              <p className="text-secondary">{roles.length} active opportunities</p>
            </div>
            <button className="btn btn-primary w-full sm:w-auto">
              <Plus className="w-5 h-5" />
              Post New Role
            </button>
          </div>
        </motion.div>

        {/* SkillProof Feature Banner */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/skillproof">
            <Card hover className="p-4 sm:p-6 bg-gradient-to-r from-snoonu-red/10 via-pink-500/10 to-purple-500/10 border-snoonu-red/30 accent-border cursor-pointer">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-snoonu-red to-pink-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg sm:text-xl font-bold text-primary">SkillProof Challenges</h2>
                      <span className="badge badge-primary text-xs">NEW</span>
                    </div>
                    <p className="text-secondary mb-2 text-sm sm:text-base">
                      Filter candidates with practical skill assessments — beyond resumes
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5">
                        <Code className="w-4 h-4 text-info" />
                        <span className="text-muted">Engineering</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Megaphone className="w-4 h-4 text-success" />
                        <span className="text-muted">Marketing</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calculator className="w-4 h-4 text-warning" />
                        <span className="text-muted">Finance</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Palette className="w-4 h-4 text-error" />
                        <span className="text-muted">Design</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full lg:w-auto">
                  <button className="btn btn-primary w-full lg:w-auto">
                    Explore SkillProof
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-6 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { value: 'all', label: 'All' },
              { value: 'internship', label: 'Internships' },
              { value: 'volunteer', label: 'Volunteers' },
              { value: 'graduate', label: 'Graduates' },
            ].map(filter => (
              <button
                key={filter.value}
                className={`btn ${filterType === filter.value ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterType(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <button className="btn btn-ghost">
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </motion.div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role, index) => {
            const roleApps = applications.filter(a => a.roleId === role.id);
            const newApps = roleApps.filter(a => a.stage === 'new').length;
            const Icon = getRoleIcon(role.type);
            
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Link href={`/roles/${role.id}`}>
                  <Card hover className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        role.type === 'internship' ? 'bg-info/10' :
                        role.type === 'volunteer' ? 'bg-success/10' :
                        'bg-warning/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          role.type === 'internship' ? 'text-info' :
                          role.type === 'volunteer' ? 'text-success' :
                          'text-warning'
                        }`} />
                      </div>
                      <StatusPill 
                        status={role.status} 
                        variant={role.status === 'open' ? 'success' : 'default'} 
                      />
                    </div>

                    {/* Title & Type */}
                    <h3 className="font-bold text-primary text-lg mb-2 line-clamp-2 flex-grow">
                      {role.title}
                    </h3>
                    <p className="text-xs font-medium text-muted uppercase tracking-wide mb-4">
                      {role.type}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-secondary mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{role.location}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-secondary">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-muted" />
                          <span className="text-xs text-muted">Applicants</span>
                        </div>
                        <p className="text-lg font-bold text-primary">{roleApps.length}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-muted" />
                          <span className="text-xs text-muted">Avg. fit</span>
                        </div>
                        <p className="text-lg font-bold text-primary">{roleStats(role.id).avgFitScore}</p>
                      </div>
                    </div>

                    {/* SkillProof Badge */}
                    {role.challengeTemplateId && (
                      <div className="mb-4 p-2 rounded-lg bg-gradient-to-r from-snoonu-red/10 to-pink-500/10 border border-snoonu-red/20">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 snoonu-red" />
                          <span className="text-xs font-semibold snoonu-red">SkillProof Enabled</span>
                        </div>
                      </div>
                    )}

                    {/* Deadline & New Badge */}
                    <div className="flex items-center justify-between pt-4 border-t border-default">
                      <div className="flex items-center gap-2 text-xs text-secondary">
                        <Calendar className="w-4 h-4" />
                        <span suppressHydrationWarning>{deadlineLabel(role.deadline)}</span>
                      </div>
                      {newApps > 0 && (
                        <span className="badge badge-primary">
                          {newApps} new
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredRoles.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted">No roles found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
