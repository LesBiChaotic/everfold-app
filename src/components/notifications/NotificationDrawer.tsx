import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCheck, Bell, MessageSquare, Heart, TrendingUp, Calendar, Shield, Archive, AlertTriangle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { soundEngine } from '../../audio/soundEngine';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Messages', 'Matches', 'Pulse', 'Forecast', 'Dates', 'Safety', 'System'];

  const filteredNotifications = notifications.filter((n) => {
    if (selectedCategory === 'All') return true;
    return n.category === selectedCategory;
  });

  const getCategoryIcon = (category: string, isAnomaly?: boolean) => {
    if (isAnomaly) return <AlertTriangle size={16} color="var(--color-warning)" />;
    switch (category) {
      case 'Messages': return <MessageSquare size={16} color="var(--color-info)" />;
      case 'Matches': return <Heart size={16} color="var(--color-danger)" />;
      case 'Forecast': return <TrendingUp size={16} color="var(--color-success)" />;
      case 'Dates': return <Calendar size={16} color="var(--text-secondary)" />;
      case 'Safety': return <Shield size={16} color="var(--color-danger)" />;
      case 'Archive': return <Archive size={16} color="var(--text-muted)" />;
      default: return <Bell size={16} color="var(--text-muted)" />;
    }
  };

  const handleNotificationClick = (id: string, linkUrl?: string) => {
    markNotificationRead(id);
    soundEngine.playCue('ui.navigation');
    onClose();
    if (linkUrl) {
      navigate(linkUrl);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(2px)',
        zIndex: 60,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Notification center"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            height: 'var(--header-height)',
            padding: '0 var(--space-4)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Bell size={18} />
            <span style={{ fontWeight: 700, fontSize: 'var(--font-size-md)' }}>Notifications</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            <button
              className="btn-ghost"
              onClick={markAllNotificationsRead}
              title="Mark all as read"
              aria-label="Mark all notifications as read"
              style={{ width: 34, height: 34, padding: 0 }}
            >
              <CheckCheck size={18} />
            </button>
            <button
              className="btn-ghost"
              onClick={onClose}
              aria-label="Close notifications"
              style={{ width: 34, height: 34, padding: 0 }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div
          style={{
            padding: 'var(--space-2) var(--space-3)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: 'var(--space-1)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="badge"
              style={{
                backgroundColor: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-surface-subtle)',
                color: selectedCategory === cat ? 'var(--text-inverse)' : 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.25rem 0.65rem',
                fontWeight: selectedCategory === cat ? 600 : 500,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notification Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-muted)' }}>
              No notifications in this category.
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item.id, item.linkUrl)}
                style={{
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: item.isRead ? 'var(--bg-surface)' : 'var(--bg-surface-subtle)',
                  border: item.isAnomaly ? '1px dashed var(--arg-anomaly-border)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-fast)',
                }}
                className="btn-ghost"
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', width: '100%' }}>
                  <div style={{ marginTop: '2px' }}>{getCategoryIcon(item.category, item.isAnomaly)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: item.isRead ? 500 : 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                        {item.timestamp}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px', marginBottom: 0 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
