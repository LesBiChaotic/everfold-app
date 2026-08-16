import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, Users, MessageSquare, Send, Heart, Calendar } from 'lucide-react';
import { useStoriesStore } from '../../store/storiesStore';
import { useProfileStore } from '../../store/profileStore';
import { renderMarkdownText, MarkdownRenderer } from '../../utils/markdownUtils';

export const SharedStoryDetailScreen: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const { stories, storyComments, addStoryComment } = useStoriesStore();
  const { visitorProfile } = useProfileStore();

  const story = stories.find((s) => s.id === storyId) || stories[0];
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [commentInput, setCommentInput] = useState('');

  const comments = storyComments[story.id] || [];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    addStoryComment(
      story.id,
      visitorProfile.id,
      visitorProfile.displayName,
      visitorProfile.handle,
      commentInput.trim()
    );

    setCommentInput('');
  };

  const activeChapter = story.chapters[activeChapterIndex] || story.chapters[0];

  return (
    <div className="shared-story-detail-screen" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/stories" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Stories
      </NavLink>

      {/* Story Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span className="badge badge-subtle" style={{ fontSize: '10px', alignSelf: 'flex-start' }}>{story.storyType}</span>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: '4px 0' }}>{story.title}</h1>
        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
          By <strong>{story.participantNames.join(' & ')}</strong>
        </div>
      </div>

      {/* Chapter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          overflowX: 'auto',
          paddingBottom: 'var(--space-2)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border-subtle) transparent',
          WebkitOverflowScrolling: 'touch',
        }}
        role="tablist"
      >
        {story.chapters.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => setActiveChapterIndex(idx)}
            className={`btn ${activeChapterIndex === idx ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              fontSize: 'var(--font-size-xs)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              height: '38px',
              minHeight: '38px',
              padding: '0 var(--space-4)',
              borderRadius: 'var(--radius-full)',
            }}
            role="tab"
            aria-selected={activeChapterIndex === idx}
          >
            {ch.title}
          </button>
        ))}
      </div>

      {/* Chapter Body */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-2)' }}>
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>{activeChapter.title}</h2>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} /> {activeChapter.date}
          </div>
        </div>

        <div style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.8, color: 'var(--text-primary)' }}>
          <MarkdownRenderer content={activeChapter.body} />
        </div>
      </div>

      {/* Where Are They Now Section if updates exist */}
      {story.updates && story.updates.length > 0 && (
        <div className="card" style={{ backgroundColor: 'var(--bg-surface-subtle)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Where Are They Now (Chronological Updates)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {story.updates.map((upd) => (
              <div key={upd.id} style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className="badge" style={{ fontSize: '10px' }}>{upd.year}</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>{upd.status}</span>
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                  <MarkdownRenderer content={upd.body} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Story Comments */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <MessageSquare size={16} color="var(--accent-primary)" />
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>
            Comments & Well Wishes ({comments.length})
          </h2>
        </div>

        <form onSubmit={handlePostComment} style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <input
            type="text"
            className="input"
            placeholder="Leave a warm note for this pair..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            style={{ flex: 1, minHeight: '38px', fontSize: 'var(--font-size-xs)' }}
          />
          <button type="submit" className="btn btn-primary" style={{ minHeight: '38px', fontSize: 'var(--font-size-xs)' }}>
            <Send size={14} /> Send
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {comments.map((comm) => (
            <div key={comm.id} style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                {comm.authorName} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>@{comm.authorHandle}</span>
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', margin: '2px 0 0' }}>{comm.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
