'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, Users, Grid, List, Download, Send, CheckCircle2, X, Calendar } from 'lucide-react';
import { Card, StatusPill, Button, FitScoreRing, SkillChip } from '@/components/ui/common';
import { applications, candidates, roles } from '@/lib/data/mock-data';
import { useState, useMemo } from 'react';
import { useToast } from '@/components/ui/Toast';

type ViewMode = 'table' | 'card';

export default function ApplicantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [aiTriageEnabled, setAiTriageEnabled] = useState(false);
  const [showAiThinking, setShowAiThinking] = useState(false);
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

  // AI Triage sorting
  const sortedApps = useMemo(() => {
    if (!aiTriageEnabled) return filteredApps;
    return [...filteredApps].sort((a, b) => b.fitScore - a.fitScore);
  }, [filteredApps, aiTriageEnabled]);

  // Get unique universities
  const universities = Array.from(new Set(candidates.map(c => c.university)));

  const handleAiTriageToggle = () => {
    setShowAiThinking(true);
    setTimeout(() => {
      setAiTriageEnabled(!aiTriageEnabled);
      setShowAiThinking(false);
      addToast(
        aiTriageEnabled 
          ? 'AI Triage disabled' 
          : 'AI Triage enabled - candidates reranked by fit score',
        'success'
      );
    }, 1500);
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
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Applicants</h1>
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

        {/* Search and AI Triage */}
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

            {/* AI Triage Toggle - SIGNATURE FEATURE */}
            <motion.button
              className={`btn flex items-center gap-2 ${
                aiTriageEnabled 
                  ? 'btn-primary shadow-lg' 
                  : 'btn-secondary'
              }`}
              onClick={handleAiTriageToggle}
              disabled={showAiThinking}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className={`w-5 h-5 ${showAiThinking ? 'animate-spin' : ''}`} />
              {showAiThinking ? 'AI Thinking...' : aiTriageEnabled ? 'AI Triage: ON' : 'Enable AI Triage'}
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

        {/* AI Triage Info Banner */}
        <AnimatePresence>
          {aiTriageEnabled && (
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
                    <p className="text-sm font-semibold text-primary">AI Triage Active</p>
                    <p className="text-xs text-secondary">
                      Candidates are ranked by AI fit score. Reasons include skills match, availability, language proficiency, and portfolio strength.
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

        {/* Loading State */}
        <AnimatePresence>
          {showAiThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <Card className="p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 bg-snoonu-red/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Sparkles className="w-8 h-8 snoonu-red" />
                </motion.div>
                <p className="text-lg font-semibold text-primary">AI is analyzing candidates...</p>
                <p className="text-sm text-muted mt-2">Ranking by fit score and relevance</p>
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
              transition={{ delay: showAiThinking ? 0 : index * 0.03 }}
              layout
            >
              {viewMode === 'card' ? (
                <Card 
                  className={`p-5 cursor-pointer ${selectedApps.has(app.id) ? 'ring-2 ring-snoonu-red' : ''}`}
                  hover
                  onClick={() => toggleSelection(app.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-1">
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
                      
                      {/* AI Reasons */}
                      {aiTriageEnabled && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {app.aiReasons.map((reason, i) => (
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
                </Card>
              ) : (
                // Table view (compact)
                <div 
                  className={`p-3 rounded-lg bg-card border border-default hover:border-hover transition-all cursor-pointer ${
                    selectedApps.has(app.id) ? 'ring-2 ring-snoonu-red' : ''
                  }`}
                  onClick={() => toggleSelection(app.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                      selectedApps.has(app.id) 
                        ? 'bg-snoonu-red border-snoonu-red' 
                        : 'border-default'
                    }`}>
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
