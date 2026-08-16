import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, CheckCircle, AlertTriangle, Clock, ArrowRight, Shield } from 'lucide-react';
import { useSystemStatusStore } from '../../store/systemStatusStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';

export const StatusScreen: React.FC = () => {
  const { services, incidents } = useSystemStatusStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  const allOperational = services.every((s) => s.status === 'Operational');

  const visibleIncidents = incidents.filter((inc) => {
    if (inc.storyTier > 0 && !unlockAllStoryPages) return false;
    return true;
  });

  return (
    <div className="status-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: 0 }}>Everfold System & Service Status</h1>
            {unlockAllStoryPages && <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>Story Access: Full</span>}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '4px', marginBottom: 0 }}>
            Live telemetry and historical incident reports across platform subsystems.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <NavLink to="/changelog" className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <Clock size={14} /> Changelog
          </NavLink>
          <NavLink to="/transparency" className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <Shield size={14} /> Transparency
          </NavLink>
        </div>
      </div>

      {/* Global Status Banner */}
      <div
        className="card"
        style={{
          borderLeft: `4px solid ${allOperational ? 'var(--color-success)' : 'var(--color-warning)'}`,
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <CheckCircle size={24} color="var(--color-success)" />
          <div>
            <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>All Systems Fully Operational</h2>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              Core matching, realtime messaging, and Markov forecast models operating within nominal parameters.
            </div>
          </div>
        </div>
        <span className="badge" style={{ fontSize: '11px', backgroundColor: 'var(--color-success)', color: '#fff' }}>
          99.98% Uptime
        </span>
      </div>

      {/* Subsystem Rows */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', backgroundColor: 'var(--bg-surface)' }}>
        <h2 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-1)' }}>
          Subsystem Health
        </h2>

        {services.map((svc) => (
          <div
            key={svc.name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-2) 0',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>{svc.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{svc.uptimePercent}%</span>
              <span style={{ fontSize: '11px', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ● {svc.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Historic Incidents */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Historic Incidents & Lineage Maintenance</h2>

        {visibleIncidents.map((inc) => (
          <div key={inc.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{inc.service}</span>
                <span className="badge" style={{ fontSize: '10px', backgroundColor: 'var(--color-success)', color: '#fff' }}>{inc.status}</span>
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                {new Date(inc.startedAt).toLocaleDateString()}
              </span>
            </div>

            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: '2px 0' }}>{inc.title}</h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {inc.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
