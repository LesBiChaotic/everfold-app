import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  Network,
  TrendingUp,
  Radio,
  Calendar,
  BookOpen,
  Archive,
  Shield,
  Settings,
  HelpCircle,
  Key,
  Heart,
} from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { soundEngine } from '../../audio/soundEngine';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { stage } = useARGStore();
  const { mode, revealHiddenRoutes } = useStoryAccessStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavClick = () => {
    soundEngine.playCue('ui.navigation');
    onClose();
  };

  const drawerItems = [
    { to: '/quizzes', label: 'Quizzes & Alignment', icon: HelpCircle },
    { to: '/community', label: 'Community Hub', icon: Network },
    { to: '/advice', label: 'Advice Library', icon: BookOpen },
    { to: '/stories', label: 'Shared Stories', icon: Heart },
    { to: '/magazine', label: 'Everfold Magazine', icon: BookOpen },
    { to: '/connections', label: 'Connections', icon: Network },
    { to: '/forecast', label: 'Forecast', icon: TrendingUp },
    { to: '/pulse', label: 'Pulse', icon: Radio },
    { to: '/date-planner', label: 'Date Planner', icon: Calendar },
    { to: '/journal', label: 'Journal', icon: BookOpen },
    { to: '/archive', label: 'Archive', icon: Archive },
    { to: '/help', label: 'Help & Knowledge Base', icon: HelpCircle },
    { to: '/status', label: 'System Status', icon: Radio },
    { to: '/safety', label: 'Safety & Trust', icon: Shield },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/settings/story-access', label: 'Story Access Controls', icon: Shield },
  ];

  if (stage >= 3 || revealHiddenRoutes) {
    drawerItems.splice(6, 0, { to: '/case-notes', label: 'Case Notes / Evidence', icon: Key });
  }

  if (revealHiddenRoutes) {
    drawerItems.push(
      { to: '/timeline', label: '27-Year Chronology', icon: Archive },
      { to: '/internal/trust', label: 'Trust & Safety Queue', icon: Shield },
      { to: '/archive/pattern-integrity', label: 'Pattern Integrity', icon: Key },
      { to: '/internal/role-resolver', label: 'Role Resolver', icon: Network },
      { to: '/member/previouslymatched', label: '@previouslymatched', icon: Heart }
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Secondary navigation drawer"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--bg-overlay)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: '280px',
          maxWidth: '85vw',
          height: '100%',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 1,
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--space-4)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 'var(--font-size-md)' }}>Menu</span>
          <button
            className="btn-ghost"
            onClick={onClose}
            aria-label="Close drawer"
            style={{ width: 44, height: 44, padding: 0 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Nav Items */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
          }}
        >
          {drawerItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-surface-subtle)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 'var(--font-size-sm)',
                })}
              >
                <Icon size={18} color="var(--text-muted)" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
