'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useMemo } from 'react';
import { applications, candidates, roles } from '@/lib/data/mock-data';
import type { ApplicationStage } from '@/lib/data/types';
import { FitScoreRing } from '@/components/ui/common';
import { useToast } from '@/components/ui/Toast';
import { TrendingUp } from 'lucide-react';

const stages: { id: ApplicationStage; label: string; color: string }[] = [
  { id: 'new', label: 'New', color: 'bg-secondary' },
  { id: 'reviewed', label: 'Reviewed', color: 'bg-info/10' },
  { id: 'shortlisted', label: 'Shortlisted', color: 'bg-warning/10' },
  { id: 'interview', label: 'Interview', color: 'bg-success/10' },
  { id: 'offer', label: 'Offer', color: 'bg-success/20' },
  { id: 'hired', label: 'Hired', color: 'bg-success/30' },
];

type EnrichedApp = {
  id: string;
  stage: ApplicationStage;
  candidate: any;
  role: any;
  fitScore: number;
};

function CandidateCard({ app }: { app: EnrichedApp }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 rounded-lg bg-card border border-default hover:border-hover cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-snoonu-red rounded-full flex items-center justify-center text-white text-sm font-bold">
            {app.fitScore}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-primary text-sm truncate">{app.candidate.name}</h4>
          </div>
          <p className="text-xs text-muted truncate">{app.role.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PipelineColumn({ stage, apps }: { stage: typeof stages[0]; apps: EnrichedApp[] }) {
  const conversionRate = stage.id !== 'new' ? 
    Math.floor(Math.random() * 30 + 50) : 100;

  return (
    <div className="flex-1 min-w-[280px]">
      <div className={`rounded-xl ${stage.color} p-4 h-full flex flex-col`}>
        {/* Column Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-primary">{stage.label}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary">{apps.length}</span>
              {stage.id !== 'new' && (
                <span className="text-xs text-muted">({conversionRate}%)</span>
              )}
            </div>
          </div>
          {stage.id !== 'new' && (
            <div className="flex items-center gap-1 text-xs text-success">
              <TrendingUp className="w-3 h-3" />
              <span>+{Math.floor(Math.random() * 20 + 5)}% vs last week</span>
            </div>
          )}
        </div>

        {/* Droppable Area */}
        <SortableContext items={apps.map(a => a.id)} strategy={verticalListSortingStrategy}>
          <div className="flex-1 space-y-2 overflow-y-auto max-h-[calc(100vh-400px)] pr-2">
            {apps.length === 0 ? (
              <div className="h-32 rounded-lg border-2 border-dashed border-default flex items-center justify-center">
                <p className="text-xs text-muted">Drop candidates here</p>
              </div>
            ) : (
              apps.map(app => (
                <CandidateCard key={app.id} app={app} />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const { addToast } = useToast();
  
  // Initialize state with applications
  const [appStages, setAppStages] = useState<Record<string, ApplicationStage>>(() => {
    const initial: Record<string, ApplicationStage> = {};
    applications.forEach(app => {
      initial[app.id] = app.stage;
    });
    return initial;
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Enrich applications with candidate and role data
  const enrichedApps = useMemo(() => 
    applications.map(app => ({
      id: app.id,
      stage: appStages[app.id],
      candidate: candidates.find(c => c.id === app.candidateId)!,
      role: roles.find(r => r.id === app.roleId)!,
      fitScore: app.fitScore,
    })),
    [appStages]
  );

  // Group by stage
  const appsByStage = useMemo(() => {
    const grouped: Record<ApplicationStage, EnrichedApp[]> = {
      'new': [],
      'reviewed': [],
      'shortlisted': [],
      'interview': [],
      'offer': [],
      'hired': [],
      'rejected': [],
    };
    
    enrichedApps.forEach(app => {
      if (grouped[app.stage]) {
        grouped[app.stage].push(app);
      }
    });
    
    return grouped;
  }, [enrichedApps]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    // Find the stage of the target
    let targetStage: ApplicationStage | null = null;
    
    // Check if dropped over a candidate (get that candidate's stage)
    for (const [stage, apps] of Object.entries(appsByStage)) {
      if (apps.some(app => app.id === over.id)) {
        targetStage = stage as ApplicationStage;
        break;
      }
    }

    // If not dropped on a candidate, check if dropped in a column area
    // For simplicity, we'll use the over.id if it's a stage name
    if (!targetStage) {
      const stageMatch = stages.find(s => over.id === s.id);
      if (stageMatch) {
        targetStage = stageMatch.id;
      }
    }

    if (targetStage && active.id !== over.id) {
      const movedApp = enrichedApps.find(app => app.id === active.id);
      if (movedApp && movedApp.stage !== targetStage) {
        setAppStages(prev => ({
          ...prev,
          [active.id]: targetStage!,
        }));
        
        addToast(
          `${movedApp.candidate.name} moved to ${stages.find(s => s.id === targetStage)?.label}`,
          'success'
        );
      }
    }

    setActiveId(null);
  }

  const activeApp = activeId ? enrichedApps.find(app => app.id === activeId) : null;

  return (
    <MainLayout>
      <div className="p-6 max-w-full overflow-x-auto">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-primary mb-2">Pipeline</h1>
          <p className="text-secondary">Drag candidates between stages to update their status</p>
        </motion.div>

        {/* Pipeline Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <motion.div
            className="flex gap-4 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {stages.filter(s => s.id !== 'rejected').map(stage => (
              <PipelineColumn
                key={stage.id}
                stage={stage}
                apps={appsByStage[stage.id] || []}
              />
            ))}
          </motion.div>

          <DragOverlay>
            {activeApp ? (
              <div className="p-3 rounded-lg bg-card border-2 border-snoonu-red shadow-xl rotate-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-snoonu-red rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {activeApp.fitScore}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">{activeApp.candidate.name}</h4>
                    <p className="text-xs text-muted">{activeApp.role.title}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Stage Analytics */}
        <motion.div
          className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {stages.filter(s => s.id !== 'rejected' && s.id !== 'hired').map(stage => {
            const stageApps = appsByStage[stage.id] || [];
            const avgFitScore = stageApps.length > 0
              ? Math.floor(stageApps.reduce((sum, app) => sum + app.fitScore, 0) / stageApps.length)
              : 0;
            
            return (
              <div key={stage.id} className="card p-4">
                <p className="text-xs text-muted mb-1">{stage.label} Avg. Score</p>
                <p className="text-2xl font-bold text-primary">{avgFitScore || '—'}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </MainLayout>
  );
}
