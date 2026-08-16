import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { useSupportStore } from '../../store/supportStore';
import { renderMarkdownText } from '../../utils/markdownUtils';

export const HelpArticleScreen: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { helpArticles, voteArticleHelpful, helpfulArticleVotes } = useSupportStore();

  const article = helpArticles.find((a) => a.id === articleId) || helpArticles[0];
  const userVote = helpfulArticleVotes[article.id];

  return (
    <div className="help-article-screen" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/help" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Support Articles
      </NavLink>

      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span className="badge badge-subtle" style={{ fontSize: '10px', alignSelf: 'flex-start' }}>{article.categoryId}</span>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: '4px 0' }}>{article.title}</h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>{renderMarkdownText(article.summary)}</p>
      </div>

      {/* Markdown Content */}
      <article style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {article.contentMarkdown.split('\n\n').map((para, i) => {
          if (para.startsWith('### ')) {
            return (
              <h2 key={i} style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 'var(--space-2) 0 0' }}>
                {renderMarkdownText(para.replace('### ', ''))}
              </h2>
            );
          }
          return <p key={i} style={{ margin: 0 }}>{renderMarkdownText(para)}</p>;
        })}
      </article>

      {/* Helpful Feedback Box */}
      <div className="card" style={{ backgroundColor: 'var(--bg-surface-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>Was this article helpful?</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{article.helpfulYesCount} people found this useful</div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            className={`btn ${userVote === 'yes' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => voteArticleHelpful(article.id, 'yes')}
            style={{ fontSize: 'var(--font-size-xs)' }}
          >
            <ThumbsUp size={13} /> Yes
          </button>
          <button
            className={`btn ${userVote === 'no' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => voteArticleHelpful(article.id, 'no')}
            style={{ fontSize: 'var(--font-size-xs)' }}
          >
            <ThumbsDown size={13} /> No
          </button>
        </div>
      </div>
    </div>
  );
};
