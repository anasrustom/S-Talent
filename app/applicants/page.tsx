'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, ArrowDownWideNarrow, Users, Grid, List, Send, CheckCircle2, X, Calendar } from 'lucide-react';
import { Card, StatusPill, Button, FitScoreRing, SkillChip } from '@/components/ui/common';
import { applications, candidates, roles } from '@/lib/data/mock-data';
import { useState, useMemo } from 'react';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

type ViewMode = 'table' | 'card';

export default function ApplicantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [rankByFit, setRankByFit] = useState(false);
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set());
  const [universityFilter, setUniversityFilter] = useState<string>('all');
  const { addToast } = useToast();

  // Enhanced data
  const enrichedApps = useMemo(() => 
    applications.map(app => ({
      ...app,
      candidate: candidates.find(c => c.id === app.candidateId)!,
      role: roles.find(r => r.id === app.roleId)!,
    })),
    []
  );

  // Filters
  const filteredApps = enrichedApps.filter(app => {
    const matchesSearch = 
      app.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUniversity = universityFilter === 'all' || app.candidate.university === universityFilter;
    return matchesSearch && matchesUniversity;
  });

  // Rank by fit score (copy first, never sort shared data in place)
  const sortedApps = useMemo(() => {
    if (!rankByFit) return filteredApps;
    return [...filteredApps].sort((a, b) => b.fitScore - a.fitScore);
  }, [filteredApps, rankByFit]);

  // Get unique universities
  const universities = Array.from(new Set(candidates.map(c => c.university)));

  // Scores are already computed, so ranking is just a sort
  const handleRankToggle = () => {
    setRankByFit(!rankByFit);
    addToast(
      rankByFit
        ? 'Ranking by fit turned off'
        : 'Ranked by fit score: highest fit first',
      'success'
    );
  };

  const toggleSelection = (appId: string) => {
    const newSelection = new Set(selectedApps);
    if (newSelection.has(appId)) {
      newSelection.delete(appId);
    } else {
      newSelection.add(appId);
    }
    setSelectedApps(newSelection);
  };

  const handleBulkAction = (action: string) => {
    addToast(`${action} applied to ${selectedApps.size} candidate(s)`, 'success');
    setSelectedApps(new Set());
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Applicants</h1>
              <p className="text-secondary">{applications.length} total applications</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('card')}
                className={`btn ${viewMode === 'card' ? 'btn-primary' : 'btn-ghost'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-ghost'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search and Rank by fit */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search candidates or roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Rank by fit toggle: signature feature */}
            <motion.button
              className={`btn flex items-center gap-2 ${
                rankByFit 
                  ? 'btn-primary shadow-lg' 
                  : 'btn-secondary'
              }`}
              onClick={handleRankToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowDownWideNarrow className="w-5 h-5" />
              {rankByFit ? 'Ranked by fit score' : 'Rank by fit'}
            </motion.button>

            <button className="btn btn-ghost">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* University Filter */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setUniversityFilter('all')}
              className={`btn btn-sm whitespace-nowrap ${universityFilter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            >
              All Universities
            </button>
            {universities.map(uni => (
              <button
                key={uni}
                onClick={() => setUniversityFilter(uni)}
                className={`btn btn-sm whitespace-nowrap ${universityFilter === uni ? 'btn-primary' : 'btn-ghost'}`}
              >
                {uni}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Rank by fit info banner */}
        <AnimatePresence>
          {rankByFit && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="p-4 bg-snoonu-red/5 border-snoonu-red">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 snoonu-red flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">Ranked by fit score</p>
                    <p className="text-xs text-secondary">
                      Highest fit first. The score adds up required skills matched, availability and required languages; open any candidate to see every point.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {selectedApps.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card className="p-4 bg-info/5 border-info">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-primary">
                    {selectedApps.size} candidate(s) selected
                  </p>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => handleBulkAction('Shortlist')}>
                      <CheckCircle2 className="w-4 h-4" />
                      Shortlist
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleBulkAction('Reject')}>
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleBulkAction('Send Message')}>
                      <Send className="w-4 h-4" />
                      Message
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleBulkAction('Schedule Interview')}>
                      <Calendar className="w-4 h-4" />
                      Interview
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedApps(new Set())}>
                      Clear
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Applicants List */}
        <div className={`grid ${viewMode === 'card' ? 'grid-cols-1 lg:grid-cols-2 gap-4' : 'gap-2'}`}>
          {sortedApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              layout
            >
              {viewMode === 'card' ? (
                <Card 
                  className={`p-5 cursor-pointer ${selectedApps.has(app.id) ? 'ring-2 ring-snoonu-red' : ''}`}
                  hover
                >
                  <Link href={`/applicants/${app.id}`}>
                    <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div 
                      className="flex-shrink-0 pt-1"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSelection(app.id);
                      }}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedApps.has(app.id) 
                          ? 'bg-snoonu-red border-snoonu-red' 
                          : 'border-default'
                      }`}>
                        {selectedApps.has(app.id) && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Fit Score */}
                    <div className="flex-shrink-0">
                      <FitScoreRing score={app.fitScore} size="sm" showLabel={false} />
                    </div>

                    {/* Candidate Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-primary truncate">{app.candidate.name}</h3>
                      </div>
                      <p className="text-sm text-muted mb-1 truncate">{app.role.title}</p>
                      <p className="text-sm text-secondary mb-2">
                        {app.candidate.university} • {app.candidate.major}
                      </p>
                      
                      {/* Fit reasons */}
                      {rankByFit && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {app.fitReasons.map((reason, i) => (
                            <span key={i} className="text-sm px-2 py-0.5 rounded-full bg-snoonu-red/10 snoonu-red font-medium">
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {app.candidate.skills.slice(0, 4).map((skill, i) => (
                          <SkillChip key={i} skill={skill} />
                        ))}
                        {app.candidate.skills.length > 4 && (
                          <span className="text-xs text-muted">+{app.candidate.skills.length - 4} more</span>
                        )}
                      </div>

                      {/* Status & Availability */}
                      <div className="flex items-center gap-2">
                        <StatusPill 
                          status={app.stage}
                          variant={
                            app.stage === 'shortlisted' || app.stage === 'interview' ? 'info' :
                            app.stage === 'offer' || app.stage === 'hired' ? 'success' :
                            app.stage === 'rejected' ? 'error' :
                            'default'
                          }
                        />
                        <span className="text-sm text-muted capitalize">
                          {app.candidate.availability} availability
                        </span>
                      </div>
                    </div>
                  </div>
                  </Link>
                </Card>
              ) : (
                // Table view (compact)
                <div 
                  className={`p-3 rounded-lg bg-card border border-default hover:border-hover transition-all cursor-pointer ${
                    selectedApps.has(app.id) ? 'ring-2 ring-snoonu-red' : ''
                  }`}
                >
                  <Link href={`/applicants/${app.id}`}>
                    <div className="flex items-center gap-3">
                    <div 
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        selectedApps.has(app.id) 
                          ? 'bg-snoonu-red border-snoonu-red' 
                          : 'border-default'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSelection(app.id);
                      }}
                    >
                      {selectedApps.has(app.id) && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="w-12 text-center">
                      <span className="text-lg font-bold text-primary">{app.fitScore}</span>
                    </div>
                    <div className="flex-1 min-w-0 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary truncate">{app.candidate.name}</span>
                        </div>
                      </div>
                      <div className="w-48 text-sm text-muted truncate hidden lg:block">
                        {app.candidate.university}
                      </div>
                      <div className="w-32 hidden md:block">
                        <StatusPill status={app.stage} variant="info" />
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {sortedApps.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Users className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-lg font-semibold text-primary mb-2">No applicants found</p>
            <p className="text-muted">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
