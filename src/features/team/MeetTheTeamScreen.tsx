import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, ArrowLeft, Shield, BookOpen, ArrowRight } from 'lucide-react';
import { useSupportStore } from '../../store/supportStore';

export const MeetTheTeamScreen: React.FC = () => {
  const { staffProfiles } = useSupportStore();

  return (
    <div className="meet-the-team-screen" style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/help" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> Help Center
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Users size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Meet the Everfold Team & Faculty</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0, lineHeight: 1.6 }}>
          Everfold is developed by behavioral psychologists, accessibility engineers, and restorative moderation specialists committed to human-paced relational continuity.
        </p>
      </div>

      {/* Staff Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
        {staffProfiles.map((staff) => (
          <div
            key={staff.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{staff.department}</span>
              <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '6px 0 2px' }}>{staff.name}</h2>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: 'var(--space-2)' }}>
                {staff.role}
              </div>

              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {staff.bio}
              </p>
            </div>

            <div style={{ marginTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Joined {staff.joinedYear}</div>
              <NavLink to={`/team/${staff.id}`} className="btn btn-secondary btn-xs" style={{ fontSize: '11px' }}>
                Profile <ArrowRight size={12} />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
