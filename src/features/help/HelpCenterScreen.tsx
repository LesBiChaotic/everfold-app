import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  FileText,
  LifeBuoy,
  ArrowRight,
  Shield,
  Users,
  CheckCircle,
} from 'lucide-react';
import { useSupportStore } from '../../store/supportStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { renderMarkdownText } from '../../utils/markdownUtils';

export const HelpCenterScreen: React.FC = () => {
  const { helpArticles, tickets } = useSupportStore();
  const { mode, unlockAllStoryPages } = useStoryAccessStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = helpArticles.filter((art) => {
    if (art.storyTier > 0 && !unlockAllStoryPages) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchLate = art.lateSearchKeywords?.some((kw) => kw.toLowerCase().includes(q));
      return (
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        matchLate
      );
    }
    return true;
  });

  return (
    <div className="help-center-screen" style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header & Ticket Shortcut */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: 0 }}>Help & Knowledge Base</h1>
            {unlockAllStoryPages && <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>Story Access: Full</span>}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '4px', marginBottom: 0 }}>
            Searchable support articles, account policies, and active ticket dispatch.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <NavLink to="/team" className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <Users size={14} /> Meet the Team
          </NavLink>
          <NavLink to="/help/tickets" className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <LifeBuoy size={15} /> Support Tickets ({tickets.length})
          </NavLink>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          className="input"
          placeholder="Search support documentation (e.g. data export, memorial accounts, matching)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: '40px', width: '100%', minHeight: '44px', fontSize: 'var(--font-size-xs)' }}
        />
      </div>

      {/* Knowledge Base Articles List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Support Guides & Protocols</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
          {filteredArticles.map((art) => (
            <NavLink
              key={art.id}
              to={`/help/articles/${art.id}`}
              className="card"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span className="badge badge-subtle" style={{ fontSize: '9px' }}>{art.categoryId}</span>
                <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: '4px 0 2px', color: 'var(--text-primary)' }}>
                  {art.title}
                </h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  {renderMarkdownText(art.summary)}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-3)', fontSize: '10px', color: 'var(--text-muted)' }}>
                <span>{art.helpfulYesCount} found helpful</span>
                <ArrowRight size={13} color="var(--accent-primary)" />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
