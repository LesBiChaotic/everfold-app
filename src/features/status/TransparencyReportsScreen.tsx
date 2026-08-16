import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, CheckCircle } from 'lucide-react';
import { useSystemStatusStore } from '../../store/systemStatusStore';

export const TransparencyReportsScreen: React.FC = () => {
  const { transparencyReports } = useSystemStatusStore();

  return (
    <div className="transparency-reports-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/status" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> System Status
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Shield size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Quarterly Transparency Reports</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Quarterly disclosures on content moderation, spam mitigation, community safety check-ins, and account appeals.
        </p>
      </div>

      {/* Reports Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {transparencyReports.map((rpt) => (
          <div key={rpt.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge" style={{ fontSize: '11px', fontWeight: 700 }}>{rpt.period}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Published {rpt.publishedDate}</span>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              {rpt.summary}
            </p>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Spam Dispatches Removed</div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{rpt.spamRemoved.toLocaleString()}</div>
              </div>
              <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Safety Reports Processed</div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{rpt.harassmentReports}</div>
              </div>
              <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Appeals Handled</div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{rpt.appealsProcessed} ({rpt.appealGrantRate} granted)</div>
              </div>
              {rpt.continuityInquiries !== undefined && (
                <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-primary)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--accent-primary)', fontWeight: 600 }}>Continuity Inquiries</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{rpt.continuityInquiries}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
