import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../navigation/Sidebar';
import { MobileHeader } from '../navigation/MobileHeader';
import { MobileBottomNav } from '../navigation/MobileBottomNav';
import { MobileDrawer } from '../navigation/MobileDrawer';
import { CommandPalette } from '../search/CommandPalette';
import { NotificationDrawer } from '../notifications/NotificationDrawer';
import { DebugDrawer } from '../common/DebugDrawer';
import { useProfileStore } from '../../store/profileStore';
import { CosmeticEffectsSync } from '../rewards/CosmeticEffectsSync';
import { useLiveStore } from '../../store/liveStore';
import { useARGStore } from '../../store/argStore';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const { isOnboardingCompleted } = useProfileStore();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const triggerEligibleEvents = useLiveStore((state) => state.triggerEligibleEvents);
  const visitCounts = useARGStore((state) => state.visitCounts);

  useEffect(() => {
    const totalVisits = Object.values(visitCounts).reduce((sum, count) => sum + count, 0);
    triggerEligibleEvents(totalVisits);
  }, [location.pathname, visitCounts, triggerEligibleEvents]);

  if (!isOnboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div
      className="app-layout"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <CosmeticEffectsSync />
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Desktop Sidebar (hidden on mobile via CSS) */}
      <Sidebar />

      {/* Main Column — this is the only thing that scrolls */}
      <div
        className="main-viewport"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: 'var(--bg-app)',
        }}
      >
        {/* Mobile Header (hidden on desktop via CSS) */}
        <MobileHeader
          onOpenDrawer={() => setIsMobileDrawerOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main
          id="main-content"
          style={{
            flex: 1,
            padding: 'var(--space-6)',
            paddingBottom: 'calc(var(--bottom-nav-height) + var(--space-6))',
            maxWidth: '1400px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>

      {/* Modals and Overlays */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
      />

      {/* Hidden/Secret Developer Controller (Ctrl+Shift+D) */}
      <DebugDrawer />
    </div>
  );
};
