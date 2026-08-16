import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Mic, Clock, ArrowRight, Calendar } from 'lucide-react';
import { useMagazinePodcastStore } from '../../store/magazinePodcastStore';
import { renderMarkdownText } from '../../utils/markdownUtils';
import { Foldmark } from '../../components/brand/Foldmark';

export const MagazineHubScreen: React.FC = () => {
  const { issues } = useMagazinePodcastStore();

  return (
    <div
      className="magazine-hub-screen"
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Everfold Editorial & Philosophical Journal
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
            Longform essays on relational architecture, quiet design, and the philosophy of emotional continuity.
          </p>
        </div>

        <NavLink to="/magazine/podcast" className="btn btn-secondary btn-sm" style={{ gap: '4px' }}>
          <Mic size={14} /> The Space Between Podcast
        </NavLink>
      </div>

      {/* Issues Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {issues.map((issue) => (
          <div key={issue.id} className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-2)' }}>
              <div>
                <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>ISSUE NO. {issue.number}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'var(--space-2)' }}>{issue.publishedMonth}</span>
              </div>
              <NavLink to={`/magazine/${issue.id}`} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem', gap: '4px' }}>
                View Issue <ArrowRight size={13} />
              </NavLink>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                {issue.title}
              </h2>
              <p className="ef-prompt-quote" style={{ fontSize: '0.9rem', margin: 0 }}>
                Theme: “{issue.theme}”
              </p>
            </div>

            {/* Articles in Issue */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
              {issue.articles.map((art) => (
                <NavLink
                  key={art.id}
                  to={`/magazine/articles/${art.id}`}
                  className="ef-card-interactive flex flex-col justify-between"
                  style={{
                    textDecoration: 'none',
                    padding: 'var(--space-3) var(--space-4)',
                  }}
                >
                  <div>
                    <span className="badge" style={{ fontSize: '0.62rem' }}>{art.category}</span>
                    <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, margin: '6px 0 2px', color: 'var(--text-primary)' }}>
                      {art.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                      {renderMarkdownText(art.dek)}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-3)', fontSize: '0.68rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)' }}>
                    <span>By {art.author}</span>
                    <span>{art.readTimeMinutes} min</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
