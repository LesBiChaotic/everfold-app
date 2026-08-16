import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, BookOpen, Shield, Radio, CheckCircle } from 'lucide-react';
import { useSupportStore } from '../../store/supportStore';
import { useAdviceStore } from '../../store/adviceStore';

export const StaffProfileScreen: React.FC = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const { staffProfiles } = useSupportStore();
  const { articles } = useAdviceStore();

  const staff = staffProfiles.find((s) => s.id === staffId) || staffProfiles[0];
  const staffArticles = articles.filter((a) => a.authorName.includes(staff.name.split(' ')[1] || staff.name));

  return (
    <div className="staff-profile-screen" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/team" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Team Members
      </NavLink>

      {/* Staff Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{staff.department}</span>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: '6px 0 2px' }}>{staff.name}</h1>
        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: 'var(--space-2)' }}>
          {staff.role}
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {staff.bio}
        </p>

        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--text-muted)' }}>
          <strong>Specialty:</strong> {staff.specialty}
        </div>
      </div>

      {/* Published Articles by Staff */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>
          Editorial Articles & Briefings ({staffArticles.length})
        </h2>

        {staffArticles.map((art) => (
          <NavLink
            key={art.id}
            to={`/advice/${art.id}`}
            className="card"
            style={{
              textDecoration: 'none',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: '0 0 2px', color: 'var(--text-primary)' }}>
              {art.title}
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>{art.dek}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
