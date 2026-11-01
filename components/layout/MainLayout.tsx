'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  GitBranch, 
  Calendar,
  BarChart3,
  Building2,
  Sun,
  Moon,
  Search,
  Bell,
  ChevronRight,
  Command,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { useState, useEffect, useSyncExternalStore } from 'react';
import { organizations, roles, applications, interviews } from '@/lib/data/mock-data';

type NavItem = {
  icon: any;
  label: string;
  href: string;
  badge?: number;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Briefcase, label: 'Roles', href: '/roles', badge: roles.filter(r => r.status === 'open').length },
  { icon: Users, label: 'Applicants', href: '/applicants', badge: applications.length },
  { icon: Sparkles, label: 'SkillProof', href: '/skillproof' },
  { icon: GitBranch, label: 'Pipeline', href: '/pipeline' },
  { icon: Calendar, label: 'Interviews', href: '/interviews', badge: interviews.filter(i => i.status === 'scheduled').length },
  { icon: BarChart3, label: 'Insights', href: '/insights' },
];

// The org picker on the landing page stores the chosen org id as 'current-org'
function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function readStoredOrgId(): string | null {
  try {
    return localStorage.getItem('current-org');
  } catch {
    return null;
  }
}

type MainLayoutProps = {
  children: React.ReactNode;
  currentOrg?: string;
};

export function MainLayout({ children, currentOrg = 'Qatar Foundation' }: MainLayoutProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const storedOrgId = useSyncExternalStore(subscribeToStorage, readStoredOrgId, () => null);
  const orgName = organizations.find(o => o.id === storedOrgId)?.name ?? currentOrg;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-screen overflow-hidden relative z-10">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-secondary border-r border-default flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } transition-transform duration-300 ease-in-out lg:transition-none`}
          initial={false}
        >
        {/* Logo */}
        <div className="p-6 border-b border-default">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/snoonu_logo.png" alt="Snoonu" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-base font-bold text-primary">S Talent</h1>
                <p className="text-xs text-muted">Org Console</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-tertiary rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>

        {/* Org Selector */}
        <div className="p-4 border-b border-default">
          <Link href="/" className="w-full flex items-center justify-between p-3 rounded-lg bg-tertiary hover:bg-card border border-default transition-all group">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted" />
              <span className="text-sm font-medium text-primary truncate">{orgName}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
          </Link>
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
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.header
          className="h-16 bg-card border-b border-default flex items-center justify-between px-4 lg:px-6"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-secondary" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-xl ml-4 lg:ml-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search or press ⌘K"
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-default rounded-lg text-sm text-primary placeholder:text-muted focus:outline-none focus:border-snoonu-red focus:ring-2 focus:ring-snoonu-red/20"
                onFocus={() => setShowCommandPalette(true)}
              />
              <kbd className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs bg-tertiary border border-default rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-snoonu-red rounded-full"></span>
            </button>

            {/* User */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 hover:bg-secondary rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-snoonu-red rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">HR</span>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-primary">HR Admin</p>
                <p className="text-xs text-muted">Recruiter</p>
              </div>
            </div>
            
            {/* Mobile User Icon */}
            <div className="sm:hidden w-8 h-8 bg-snoonu-red rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">HR</span>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-primary p-4 lg:p-6">
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

    </div>
  );
}
