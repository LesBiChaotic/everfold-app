import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useMagazinePodcastStore } from '../../store/magazinePodcastStore';
import { renderMarkdownText } from '../../utils/markdownUtils';

export const MagazineIssueScreen: React.FC = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const { issues } = useMagazinePodcastStore();

  const issue = issues.find((i) => i.id === issueId) || issues[0];

  return (
    <div className="magazine-issue-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/magazine" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Issues
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <span className="badge badge-subtle" style={{ fontSize: '10px' }}>ISSUE NO. {issue.number}</span>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: '6px 0 2px' }}>{issue.title}</h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
          {issue.theme} • Published {issue.publishedMonth}
        </p>
      </div>

      {/* Articles Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {issue.articles.map((art) => (
          <div key={art.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
            <div>
              <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{art.category}</span>
              <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, margin: '4px 0 2px' }}>{art.title}</h2>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                By <strong>{art.author}</strong> • {art.readTimeMinutes} min read
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {renderMarkdownText(art.dek)}
              </p>
            </div>

            <article style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.7, color: 'var(--text-primary)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
              {art.contentMarkdown.split('\n\n').map((p, idx) => {
                if (p.startsWith('### ')) {
                  return <h3 key={idx} style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: 'var(--space-2) 0 4px' }}>{renderMarkdownText(p.replace('### ', ''))}</h3>;
                }
                return <p key={idx} style={{ margin: '0 0 8px' }}>{renderMarkdownText(p)}</p>;
              })}
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};
