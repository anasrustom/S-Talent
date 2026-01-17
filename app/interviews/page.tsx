'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, User, Sparkles, Plus, CheckCircle2 } from 'lucide-react';
import { Card, Button } from '@/components/ui/common';
import { interviews, applications, candidates } from '@/lib/data/mock-data';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function InterviewsPage() {
  const { addToast } = useToast();
  const [showAutoSchedule, setShowAutoSchedule] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  const enrichedInterviews = interviews.map(interview => {
    const app = applications.find(a => a.id === interview.applicationId)!;
    return {
      ...interview,
      candidate: candidates.find(c => c.id === app?.candidateId)!,
    };
  });

  const upcomingInterviews = enrichedInterviews.filter(i => i.status === 'scheduled');

  const handleAutoSchedule = () => {
    setIsScheduling(true);
    
    setTimeout(() => {
      setIsScheduling(false);
      setShowAutoSchedule(false);
      addToast('3 interviews auto-scheduled with optimal time slots', 'success');
    }, 2000);
  };

  const recommendedSlots = [
    { time: 'Tomorrow, 2:00 PM', reason: 'Both available • Preferred time', confidence: 95 },
    { time: 'Jan 22, 10:00 AM', reason: 'Interviewer available • Morning slot', confidence: 88 },
    { time: 'Jan 22, 3:00 PM', reason: 'Alternative time • Flexible', confidence: 82 },
  ];

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
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Interviews</h1>
              <p className="text-secondary">{upcomingInterviews.length} scheduled this week</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="secondary" onClick={() => setShowAutoSchedule(true)}>
                <Sparkles className="w-5 h-5" />
                <span className="hidden sm:inline">Auto-Schedule</span>
                <span className="sm:hidden">Auto</span>
              </Button>
              <Button variant="primary">
                <Plus className="w-5 h-5" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Calendar View (simplified) */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Upcoming Interviews */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => {
                  const date = new Date(interview.scheduledAt);
                  const isToday = date.toDateString() === new Date().toDateString();
                  
                  return (
                    <motion.div
                      key={interview.id}
                      className="p-4 rounded-lg bg-secondary hover:bg-tertiary transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Date Badge */}
                        <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center ${
                          isToday ? 'bg-snoonu-red text-invert' : 'bg-info text-invert'
                        }`}>
                          <span className="text-xs font-medium">
                            {date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                          </span>
                          <span className="text-2xl font-bold">{date.getDate()}</span>
                        </div>

                        {/* Interview Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-primary">{interview.candidate.name}</h3>
                            {isToday && (
                              <span className="badge badge-primary">Today</span>
                            )}
                          </div>
                          
                          <div className="space-y-1 text-sm text-secondary mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>
                                {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                {' '}({interview.duration} min)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{interview.interviewer}</span>
                            </div>
                            {interview.meetingLink && (
                              <div className="flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                <a href={interview.meetingLink} className="text-info hover:underline">
                                  Join Meeting
                                </a>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button variant="primary" size="sm">
                              <Video className="w-4 h-4" />
                              Join
                            </Button>
                            <Button variant="ghost" size="sm">Reschedule</Button>
                            <Button variant="ghost" size="sm">Cancel</Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="p-6">
              <h3 className="font-bold text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn btn-secondary justify-start">
                  <Calendar className="w-5 h-5" />
                  View Full Calendar
                </button>
                <button className="w-full btn btn-secondary justify-start">
                  <User className="w-5 h-5" />
                  Interviewer Availability
                </button>
                <button className="w-full btn btn-secondary justify-start">
                  <CheckCircle2 className="w-5 h-5" />
                  Completed Interviews
                </button>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6 mt-4">
              <h3 className="font-bold text-primary mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Scheduled</span>
                  <span className="text-lg font-bold text-primary">{upcomingInterviews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Completed</span>
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Pending</span>
                  <span className="text-lg font-bold text-primary">5</span>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Auto-Schedule Modal */}
        {showAutoSchedule && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => !isScheduling && setShowAutoSchedule(false)}
          >
            <motion.div
              className="w-full max-w-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-snoonu-red/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 snoonu-red" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">AI Auto-Scheduler</h2>
                    <p className="text-sm text-muted">Finding optimal interview slots...</p>
                  </div>
                </div>

                {isScheduling ? (
                  <div className="py-12 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 bg-snoonu-red/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Sparkles className="w-8 h-8 snoonu-red" />
                    </motion.div>
                    <p className="text-lg font-semibold text-primary">Scheduling interviews...</p>
                    <p className="text-sm text-muted mt-2">Analyzing availability and preferences</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {recommendedSlots.map((slot, index) => (
                        <motion.div
                          key={index}
                          className="p-4 rounded-lg bg-secondary hover:bg-tertiary transition-colors cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-primary">{slot.time}</p>
                              <p className="text-sm text-muted">{slot.reason}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-success">{slot.confidence}%</span>
                              <div className="w-16 h-2 bg-tertiary rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-success"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${slot.confidence}%` }}
                                  transition={{ delay: 0.5 + index * 0.1 }}
                                />
                              </div>
                            </div>
                          </div>
                          {index === 0 && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium snoonu-red">
                              <CheckCircle2 className="w-3 h-3" />
                              Recommended
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="primary" 
                        className="flex-1"
                        onClick={handleAutoSchedule}
                      >
                        Schedule Best Slots
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={() => setShowAutoSchedule(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
