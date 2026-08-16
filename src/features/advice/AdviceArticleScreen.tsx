import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  Bookmark,
  Share2,
  ThumbsUp,
  Heart,
  Send,
} from 'lucide-react';
import { useAdviceStore } from '../../store/adviceStore';
import { useProfileStore } from '../../store/profileStore';
import { useSocialSimulationStore } from '../../store/socialSimulationStore';
import { renderMarkdownText, MarkdownRenderer } from '../../utils/markdownUtils';

export const AdviceArticleScreen: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { articles, comments, addComment, savedArticleIds, toggleSaveArticle } = useAdviceStore();
  const { visitorProfile } = useProfileStore();

  const article = articles.find((a) => a.id === articleId) || articles[0];
  const articleComments = comments[article.id] || [];

  const [commentInput, setCommentInput] = useState('');
  const isSaved = savedArticleIds.includes(article.id);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    addComment(
      article.id,
      visitorProfile.id,
      visitorProfile.displayName,
      visitorProfile.handle,
      visitorProfile.avatarConfig?.skinTone || 'visitor',
      commentInput.trim()
    );

    setCommentInput('');
  };

  return (
    <div className="advice-article-screen" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to="/advice" className="btn btn-ghost" style={{ gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
          <ArrowLeft size={15} /> All Advice
        </NavLink>

        <button
          className={`btn ${isSaved ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => toggleSaveArticle(article.id)}
          style={{ fontSize: 'var(--font-size-xs)' }}
        >
          <Bookmark size={14} /> {isSaved ? 'Saved' : 'Save Article'}
        </button>
      </div>

      {/* Article Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span className="badge badge-subtle" style={{ fontSize: '10px', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
          {article.authorType}
        </span>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, lineHeight: 1.25, margin: '4px 0' }}>
          {article.title}
        </h1>
        <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
          {renderMarkdownText(article.dek)}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-3)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 'var(--font-size-xs)' }}>
            <strong>{article.authorName}</strong> • {article.authorRole}
          </div>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
            <Clock size={12} /> {article.readingTimeMinutes} min read
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article
        style={{
          fontSize: 'var(--font-size-sm)',
          lineHeight: 1.8,
          color: 'var(--text-primary)',
        }}
      >
        <MarkdownRenderer content={article.contentMarkdown} />
      </article>

      {/* Comments Section */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <MessageSquare size={18} color="var(--accent-primary)" />
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>
            Community Reflections ({articleComments.length})
          </h2>
        </div>

        {/* Comment Composer */}
        <form onSubmit={handlePostComment} style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <input
            type="text"
            className="input"
            placeholder="Share your reflection or experience..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            style={{ flex: 1, minHeight: '40px', fontSize: 'var(--font-size-xs)' }}
          />
          <button type="submit" className="btn btn-primary" style={{ minHeight: '40px', fontSize: 'var(--font-size-xs)' }}>
            <Send size={14} /> Post
          </button>
        </form>

        {/* Comments Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {articleComments.map((comm) => (
            <div
              key={comm.id}
              style={{
                padding: 'var(--space-3)',
                backgroundColor: 'var(--bg-surface-subtle)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                  {comm.authorName} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>@{comm.authorHandle}</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  {new Date(comm.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.5, margin: '4px 0 0' }}>{comm.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
