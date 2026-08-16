import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Compass,
  MessageSquare,
  Network,
  TrendingUp,
  Radio,
  Calendar,
  BookOpen,
  Archive,
  Shield,
  User,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Key,
  Users,
  Feather,
  Headphones,
  Sparkles,
} from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { useAppStore } from '../../store/appStore';
import { useARGStore } from '../../store/argStore';
import { useProfileStore } from '../../store/profileStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { Foldmark } from '../brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, soundMuted, setSoundMuted, theme, setTheme } = useSettingsStore();
  const { threads, notifications, matches } = useAppStore();
  const { stage } = useARGStore();
  const { visitorProfile } = useProfileStore();
  const { mode, revealHiddenRoutes } = useStoryAccessStore();

  const totalUnreadMessages = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);
  const newMatchesCount = matches.filter((m) => m.status === 'New').length;

  const handleNavClick = () => {
    soundEngine.playCue('ui.navigation');
  };

  interface NavEntry {
    to: string;
    label: string;
    icon: React.ElementType;
    badge?: number;
    group?: 'core' | 'social' | 'relational' | 'archive' | 'system';
    isHiddenOverlay?: boolean;
  }

  const navItems: NavEntry[] = [
    { to: '/home', label: 'Home', icon: Sparkles, group: 'core' },
    { to: '/discover', label: 'Discover', icon: Compass, group: 'core' },
    { to: '/matches', label: 'Matches', icon: Users, badge: newMatchesCount > 0 ? newMatchesCount : undefined, group: 'core' },
    { to: '/messages', label: 'Messages', icon: MessageSquare, badge: totalUnreadMessages > 0 ? totalUnreadMessages : undefined, group: 'core' },

    { to: '/quizzes', label: 'Quizzes', icon: HelpCircle, group: 'social' },
    { to: '/community', label: 'Community', icon: Radio, group: 'social' },
    { to: '/advice', label: 'Advice', icon: Feather, group: 'social' },
    { to: '/stories', label: 'Stories', icon: BookOpen, group: 'social' },
    { to: '/magazine', label: 'Magazine', icon: BookOpen, group: 'social' },

    { to: '/forecast', label: 'Forecast', icon: TrendingUp, group: 'relational' },
    { to: '/connections', label: 'Connections', icon: Network, group: 'relational' },
    { to: '/date-planner', label: 'Date Planner', icon: Calendar, group: 'relational' },
    { to: '/journal', label: 'Journal', icon: BookOpen, group: 'relational' },

    { to: '/archive', label: 'Archive', icon: Archive, group: 'archive' },
    { to: '/safety', label: 'Safety', icon: Shield, group: 'archive' },
    { to: '/help', label: 'Help Center', icon: HelpCircle, group: 'system' },
    { to: '/status', label: 'Status', icon: Radio, group: 'system' },
    { to: '/profile', label: 'Profile', icon: User, group: 'system' },
    { to: '/settings', label: 'Settings', icon: Settings, group: 'system' },
  ];

  if (stage >= 3 || revealHiddenRoutes) {
    navItems.splice(14, 0, { to: '/case-notes', label: 'Case Notes', icon: Key, group: 'archive' });
  }

  if (revealHiddenRoutes) {
    navItems.push(
      { to: '/timeline', label: '27-Year Chronology', icon: Archive, isHiddenOverlay: true },
      { to: '/internal/trust', label: 'Trust & Safety Queue', icon: Shield, isHiddenOverlay: true },
      { to: '/archive/pattern-integrity', label: 'Pattern Integrity', icon: Key, isHiddenOverlay: true },
      { to: '/internal/role-resolver', label: 'Role Resolver', icon: Network, isHiddenOverlay: true },
      { to: '/member/previouslymatched', label: '@previouslymatched', icon: Users, isHiddenOverlay: true }
    );
  }

  return (
    <aside
      className="sidebar-desktop"
      style={{
        width: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-expanded-width)',
        minWidth: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-expanded-width)',
        flexShrink: 0,
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        transition: 'width var(--transition-normal), min-width var(--transition-normal)',
        zIndex: 40,
        userSelect: 'none',
      }}
      aria-label="Main navigation"
    >
      {/* Brand Header */}
      <div
        style={{
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          minHeight: 'var(--header-height)',
          flexShrink: 0,
        }}
      >
        {!sidebarCollapsed ? (
          <NavLink to="/home" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Foldmark size={26} color="var(--accent-plum)" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                Everfold
              </span>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/home" title="Everfold Home">
            <Foldmark size={24} color="var(--accent-plum)" />
          </NavLink>
        )}

        {/* Story Access Indicator Chip */}
        {!sidebarCollapsed && mode !== 'SPOILER_FREE' && (
          <NavLink
            to="/settings/story-access"
            className="badge badge-plum"
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              textDecoration: 'none',
              padding: '0.15rem 0.45rem',
            }}
            title="Story Access active. Click to configure."
          >
            {mode === 'FULL_ACCESS' ? 'Full Access' : 'Preview'}
          </NavLink>
        )}

        <button
          className="btn-ghost"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{ width: 32, height: 32, padding: 0, borderRadius: 'var(--radius-md)' }}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav
        style={{
          flex: '1 1 0%',
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 'var(--space-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border-subtle) transparent',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              title={sidebarCollapsed ? item.label : undefined}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarCollapsed ? 'center' : 'space-between',
                padding: sidebarCollapsed ? 'var(--space-2)' : '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                minHeight: '38px',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-surface-subtle)' : 'transparent',
                fontWeight: isActive ? 700 : 500,
                fontSize: 'var(--font-size-sm)',
                transition: 'all var(--transition-fast)',
                borderLeft: isActive && !sidebarCollapsed ? '3px solid var(--accent-plum)' : '3px solid transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
                <Icon size={18} color={isActive ? 'var(--accent-plum)' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                {!sidebarCollapsed && <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.label}</span>}
              </div>

              {!sidebarCollapsed && item.badge && (
                <span
                  style={{
                    backgroundColor: 'var(--accent-plum)',
                    color: 'var(--text-inverse)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Utilities */}
      <div
        style={{
          padding: 'var(--space-3)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          backgroundColor: 'var(--bg-surface)',
          flexShrink: 0,
        }}
      >
        {/* Sound toggle & Theme Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}>
          <button
            className="btn-ghost"
            onClick={() => setSoundMuted(!soundMuted)}
            title={soundMuted ? 'Sound muted (click to enable)' : 'Sound enabled'}
            aria-label={soundMuted ? 'Enable sound' : 'Mute sound'}
            style={{ width: 32, height: 32, padding: 0 }}
          >
            {soundMuted ? <VolumeX size={16} color="var(--text-muted)" /> : <Volume2 size={16} color="var(--color-success)" />}
          </button>

          {!sidebarCollapsed && (
            <button
              className="btn-ghost"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 600 }}
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          )}
        </div>

        {/* User Mini Profile */}
        <NavLink
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-subtle)',
            textDecoration: 'none',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <AvatarRenderer config={visitorProfile.avatarConfig} size={sidebarCollapsed ? 28 : 34} />
          {!sidebarCollapsed && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {visitorProfile.displayName}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                @{visitorProfile.handle}
              </div>
            </div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
