'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  GitBranch, 
  Calendar,
  BarChart3,
  Settings,
  Building2,
  Sun,
  Moon,
  Search,
  Bell,
  ChevronRight,
  Command,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { useState } from 'react';

type NavItem = {
  icon: any;
  label: string;
  href: string;
  badge?: number;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Briefcase, label: 'Roles', href: '/roles', badge: 6 },
  { icon: Users, label: 'Applicants', href: '/applicants', badge: 89 },
  { icon: Sparkles, label: 'SkillProof', href: '/skillproof' },
  { icon: GitBranch, label: 'Pipeline', href: '/pipeline' },
  { icon: Calendar, label: 'Interviews', href: '/interviews', badge: 3 },
  { icon: BarChart3, label: 'Insights', href: '/insights' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

type MainLayoutProps = {
  children: React.ReactNode;
  currentOrg?: string;
};

export function MainLayout({ children, currentOrg = 'Qatar Foundation' }: MainLayoutProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative z-10">
      {/* Sidebar */}
      <motion.aside
        className="w-64 bg-secondary border-r border-default flex flex-col"
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-default">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/snoonu_logo.png" alt="Snoonu" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-base font-bold text-primary">S Talent</h1>
              <p className="text-xs text-muted">Org Console</p>
            </div>
          </div>
        </div>

        {/* Org Selector */}
        <div className="p-4 border-b border-default">
          <button className="w-full flex items-center justify-between p-3 rounded-lg bg-tertiary hover:bg-card border border-default transition-all group">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted" />
              <span className="text-sm font-medium text-primary truncate">{currentOrg}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <motion.div
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-snoonu-red text-white' 
                          : 'text-secondary hover:bg-tertiary hover:text-primary'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-snoonu-red text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-default">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-tertiary transition-colors text-secondary hover:text-primary"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5" />
                <span className="text-sm font-medium">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span className="text-sm font-medium">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.header
          className="h-16 bg-card border-b border-default flex items-center justify-between px-6"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search or press ⌘K"
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-default rounded-lg text-sm text-primary placeholder:text-muted focus:outline-none focus:border-snoonu-red focus:ring-2 focus:ring-snoonu-red/20"
                onFocus={() => setShowCommandPalette(true)}
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs bg-tertiary border border-default rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-snoonu-red rounded-full"></span>
            </button>

            {/* User */}
            <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-secondary rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-snoonu-red rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">HR</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-primary">HR Admin</p>
                <p className="text-xs text-muted">Recruiter</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-primary">
          {children}
        </main>
      </div>

      {/* Command Palette (fake for demo) */}
      {showCommandPalette && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowCommandPalette(false)}
        >
          <motion.div
            className="w-full max-w-2xl bg-card rounded-xl border border-default shadow-xl"
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-default flex items-center gap-3">
              <Command className="w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-primary placeholder:text-muted focus:outline-none"
                autoFocus
              />
            </div>
            <div className="p-2">
              <div className="text-xs text-muted px-3 py-2">Quick Actions</div>
              <div className="space-y-0.5">
                {['View Dashboard', 'Open Roles', 'Search Applicants', 'Schedule Interview'].map(item => (
                  <div
                    key={item}
                    className="px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer text-sm text-primary"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Demo Mode Badge */}
      <div className="fixed bottom-4 right-4 px-3 py-1.5 bg-snoonu-red text-white text-xs font-semibold rounded-lg shadow-lg backdrop-blur-sm z-40">
        🎭 DEMO MODE
      </div>
    </div>
  );
}
