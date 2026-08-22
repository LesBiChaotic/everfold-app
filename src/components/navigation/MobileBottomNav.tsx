import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Compass, Users, MessageSquare, User } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { soundEngine } from '../../audio/soundEngine';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { threads = [], matches = [] } = useAppStore();

  const totalUnreadMessages = (threads || []).reduce((acc, t) => acc + (t.unreadCount || 0), 0);
  const newMatchesCount = (matches || []).filter((m) => m.status === 'New').length;

  const handleNavClick = () => {
    soundEngine.playCue('ui.navigation');
  };

  const navItems = [
    { to: '/home', label: 'Home', icon: Sparkles },
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/matches', label: 'Matches', icon: Users, badge: newMatchesCount > 0 ? newMatchesCount : undefined },
    { to: '/messages', label: 'Messages', icon: MessageSquare, badge: totalUnreadMessages > 0 ? totalUnreadMessages : undefined },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        height: 'var(--bottom-nav-height)',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 -2px 10px rgba(35, 23, 34, 0.04)',
      }}
      aria-label="Mobile primary navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname.startsWith(item.to);

        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={handleNavClick}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flex: 1,
              minWidth: '56px',
              color: isActive ? 'var(--accent-plum)' : 'var(--text-muted)',
              fontSize: '0.72rem',
              fontWeight: isActive ? 700 : 500,
              position: 'relative',
              textDecoration: 'none',
              padding: '4px 0',
              transition: 'color var(--transition-fast)',
            }}
          >
            <Icon size={21} strokeWidth={isActive ? 2.6 : 1.9} color={isActive ? 'var(--accent-plum)' : 'var(--text-muted)'} />
            <span style={{ marginTop: '2px', lineHeight: 1.1 }}>{item.label}</span>

            {item.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 10,
                  backgroundColor: 'var(--accent-plum)',
                  color: 'var(--text-inverse)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  padding: '0.05rem 0.35rem',
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
  );
};
