'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type StatusPillProps = {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  className?: string;
};

export function StatusPill({ status, variant = 'default', className = '' }: StatusPillProps) {
  const variantClass = variant !== 'default' ? `badge-${variant}` : 'badge-info';
  
  return (
    <motion.span 
      className={`badge ${variantClass} ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {status}
    </motion.span>
  );
}

type SkillChipProps = {
  skill: string;
  className?: string;
  onClick?: () => void;
};

export function SkillChip({ skill, className = '', onClick }: SkillChipProps) {
  return (
    <motion.span 
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-secondary text-secondary border border-default cursor-default ${className}`}
      whileHover={{ scale: onClick ? 1.05 : 1, borderColor: 'var(--border-hover)' }}
      onClick={onClick}
    >
      {skill}
    </motion.span>
  );
}

type FitScoreRingProps = {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
};

export function FitScoreRing({ score, size = 'md', showLabel = true }: FitScoreRingProps) {
  const sizes = {
    sm: { width: 48, strokeWidth: 4, fontSize: '0.75rem' },
    md: { width: 64, strokeWidth: 5, fontSize: '1rem' },
    lg: { width: 96, strokeWidth: 6, fontSize: '1.5rem' },
  };
  
  const { width, strokeWidth, fontSize } = sizes[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  // Same thresholds as the accept / hold / reject recommendation
  const color = score > 75 ? '#10B981' : score > 60 ? '#F59E0B' : '#EF4444';
  
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={width} height={width} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        {/* Score text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="transform rotate-90"
          style={{ 
            fontSize, 
            fontWeight: 700,
            fill: 'var(--foreground)',
            transformOrigin: 'center',
          }}
        >
          {score}
        </text>
      </svg>
      {showLabel && (
        <span className="text-xs text-muted font-medium">Fit Score</span>
      )}
    </div>
  );
}

type ConfidenceMeterProps = {
  confidence: number;
  className?: string;
};

export function ConfidenceMeter({ confidence, className = '' }: ConfidenceMeterProps) {
  const color = confidence >= 80 ? '#10B981' : confidence >= 60 ? '#F59E0B' : '#EF4444';
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs text-muted font-medium min-w-[70px]">Confidence</span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs font-semibold text-primary min-w-[32px]">{confidence}%</span>
    </div>
  );
}

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
};

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <motion.div
      className={`card ${hover ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <motion.button
      type={type}
      className={`btn btn-${variant} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
}

type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  className?: string;
};

export function Input({ placeholder, value, onChange, type = 'text', className = '' }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`input ${className}`}
    />
  );
}

export function Skeleton({ className = '', width, height }: { className?: string; width?: string; height?: string }) {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{ width, height }}
    />
  );
}
