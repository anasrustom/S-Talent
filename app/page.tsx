'use client';

import { motion } from 'framer-motion';
import { Building2, ChevronRight, Shield, Users, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { organizations } from '@/lib/data/mock-data';
import { useState } from 'react';

const roles = [
  { id: 'admin', name: 'Admin', icon: Shield, description: 'Full access to all features' },
  { id: 'recruiter', name: 'Recruiter', icon: Users, description: 'Manage applications and interviews' },
  { id: 'hiring-manager', name: 'Hiring Manager', icon: Briefcase, description: 'Review and approve candidates' },
];

export default function Home() {
  const router = useRouter();
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedOrg && selectedRole) {
      // Store selections in localStorage for demo
      if (typeof window !== 'undefined') {
        localStorage.setItem('current-org', selectedOrg);
        localStorage.setItem('current-role', selectedRole);
      }
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-snoonu-red/5 via-transparent to-snoonu-red/5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-snoonu-red/10 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-snoonu-red/10 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>
      
      <motion.div
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <div className="w-16 h-16 flex items-center justify-center shadow-lg">
              <img src="/snoonu_logo.png" alt="Snoonu" className="w-16 h-16 object-contain" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            <span className="inline-block mr-2">Welcome to</span>
            <span className="gradient-text inline-block">S-Talent</span>
          </h1>
          <p className="text-lg text-secondary">
            Org Console — Manage Your Talent Pipeline
          </p>
        </div>

        {/* Organization Selection */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-primary mb-3">
            Select Organization
          </label>
          <div className="grid gap-3">
            {organizations.map((org, index) => (
              <motion.button
                key={org.id}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedOrg === org.id
                    ? 'border-snoonu-red bg-accent-light'
                    : 'border-default bg-card hover:border-hover'
                }`}
                onClick={() => setSelectedOrg(org.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedOrg === org.id ? 'bg-snoonu-red' : 'bg-secondary'
                    }`}>
                      <Building2 className={`w-6 h-6 ${
                        selectedOrg === org.id ? 'text-white' : 'text-muted'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{org.name}</h3>
                      <p className="text-sm text-muted capitalize">{org.type}</p>
                    </div>
                  </div>
                  {selectedOrg === org.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-snoonu-red rounded-full flex items-center justify-center"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Role Selection */}
        {selectedOrg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <label className="block text-sm font-semibold text-primary mb-3">
              Select Your Role
            </label>
            <div className="grid gap-3">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <motion.button
                    key={role.id}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedRole === role.id
                        ? 'border-snoonu-red bg-accent-light'
                        : 'border-default bg-card hover:border-hover'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedRole === role.id ? 'bg-snoonu-red' : 'bg-secondary'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          selectedRole === role.id ? 'text-white' : 'text-muted'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary">{role.name}</h3>
                        <p className="text-sm text-muted">{role.description}</p>
                      </div>
                      {selectedRole === role.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-snoonu-red rounded-full flex items-center justify-center"
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Continue Button */}
        {selectedOrg && selectedRole && (
          <motion.button
            className="w-full btn btn-primary py-4 text-lg font-semibold"
            onClick={handleContinue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue as Snoonu Business
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-muted mt-8">
          S-Talent Console • Built at the Snoonu Hackathon • Demo data
        </p>
      </motion.div>
    </div>
  );
}

