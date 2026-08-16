import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { Foldmark } from '../brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

interface MobileHeaderProps {
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onOpenDrawer,
  onOpenSearch,
  onOpenNotifications,
}) => {
  const { notifications = [] } = useAppStore();
  const unreadCount = (notifications || []).filter((n) => !n.isRead).length;

  return (
    <header
      className="mobile-header"
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-3)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <button
          className="btn-ghost"
          onClick={() => {
            soundEngine.playCue('ui.navigation');
            onOpenDrawer();
          }}
          aria-label="Open navigation drawer"
          style={{ width: 44, height: 44, padding: 0, borderRadius: 'var(--radius-md)' }}
        >
          <Menu size={22} color="var(--text-primary)" />
        </button>

        <NavLink to="/home" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Foldmark size={24} color="var(--accent-plum)" />
          <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Everfold
          </span>
        </NavLink>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
        <button
          className="btn-ghost"
          onClick={() => {
            soundEngine.playCue('ui.navigation');
            onOpenSearch();
          }}
          aria-label="Open search"
          style={{ width: 44, height: 44, padding: 0, borderRadius: 'var(--radius-md)' }}
        >
          <Search size={20} color="var(--text-secondary)" />
        </button>

        <button
          className="btn-ghost"
          onClick={() => {
            soundEngine.playCue('ui.navigation');
            onOpenNotifications();
          }}
          aria-label="Open notifications"
          style={{ width: 44, height: 44, padding: 0, position: 'relative', borderRadius: 'var(--radius-md)' }}
        >
          <Bell size={20} color="var(--text-secondary)" />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                backgroundColor: 'var(--accent-plum)',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--bg-surface)',
              }}
            />
          )}
        </button>
      </div>
    </header>
  );
};
