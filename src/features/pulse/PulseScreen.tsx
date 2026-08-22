import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Radio,
  Heart,
  MessageSquare,
  Sparkles,
  Share2,
  Filter,
  CheckCircle,
  Plus,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useARGStore } from '../../store/argStore';
import { SEEDED_USERS } from '../../data/users';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

export const PulseScreen: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [newPostText, setNewPostText] = useState('');
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyInputText, setReplyInputText] = useState('');

  const { pulsePosts, reactPulsePost, votePulsePoll, addPulseReply } = useAppStore();
  const { stage, recordVisit } = useARGStore();

  useEffect(() => {
    recordVisit('pulse');
  }, [recordVisit]);

  const tags = ['All', 'Food', 'RelationshipScience', 'Design', 'TinyWin', 'Mindfulness', 'Safety', 'Privacy', 'Memory'];

  const filteredPosts = pulsePosts.filter((post) => {
    if (post.requiresStage && stage < post.requiresStage) return false;
    if (selectedTag === 'All') return true;
    return post.tags.includes(selectedTag);
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    soundEngine.playCue('ui.messageSent');
    useAppStore.setState((state) => ({
      pulsePosts: [
        {
          id: `pulse_user_${Date.now()}`,
          authorId: 'visitor_user',
          authorName: 'Alex Rivers',
          authorHandle: 'alexrivers',
          type: 'text',
          title: 'Thought for today',
          body: newPostText.trim(),
          timestamp: 'Just now',
          tags: ['Community', 'Reflection'],
          reactions: { '❤️': 1 },
          userReactions: ['❤️'],
          replies: []
        },
        ...state.pulsePosts
      ]
    }));
    setNewPostText('');
  };

  const handleSendReply = (postId: string) => {
    if (!replyInputText.trim()) return;
    addPulseReply(postId, replyInputText.trim());
    setReplyInputText('');
    setActiveReplyPostId(null);
  };

  return (
    <div
      className="pulse-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '820px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          Pulse Community Stream
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
          Semi-public reflections, relationship science inquiries, date recaps, and community polls.
        </p>
      </div>

      {/* Tag Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              soundEngine.playCue('ui.navigation');
              setSelectedTag(tag);
            }}
            className="badge"
            style={{
              backgroundColor: selectedTag === tag ? 'var(--accent-plum)' : 'var(--bg-surface)',
              color: selectedTag === tag ? 'var(--text-inverse)' : 'var(--text-secondary)',
              padding: '0.4rem 0.85rem',
              fontSize: 'var(--font-size-xs)',
              fontWeight: selectedTag === tag ? 700 : 500,
              border: '1px solid',
              borderColor: selectedTag === tag ? 'var(--accent-plum)' : 'var(--border-subtle)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Share a Reflection Compose Box */}
      <form onSubmit={handleCreatePost} className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Share an Unhurried Reflection
        </div>
        <textarea
          className="textarea"
          rows={3}
          placeholder="What thought or question has been on your mind lately regarding rhythm, boundaries, or connection?"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          style={{ width: '100%', resize: 'vertical' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary btn-sm" disabled={!newPostText.trim()}>
            <Send size={14} /> Post to Pulse
          </button>
        </div>
      </form>

      {/* Posts Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filteredPosts.map((post) => {
          const author = SEEDED_USERS.find((u) => u.id === post.authorId);

          return (
            <div
              key={post.id}
              className={`ef-card-interactive ${post.authorId === 'visitor_user' ? 'visitor-comment-flair' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                padding: 'var(--space-4)',
              }}
            >
              {/* Post Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                  {author ? (
                    <AvatarRenderer config={author.avatarConfig} size={42} />
                  ) : (
                    <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Foldmark size={20} color="var(--accent-plum)" />
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {post.authorName}
                    </h3>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                      @{post.authorHandle} • {post.timestamp}
                      {post.authorId === 'visitor_user' && <span className="equipped-comment-flair" aria-label="Equipped profile flair" />}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {post.tags.map((t) => (
                    <span key={t} className="badge badge-plum" style={{ fontSize: '0.65rem' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Body */}
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                {post.body}
              </div>

              {/* Poll Rendering if Type is Poll */}
              {post.poll && post.poll.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                  {post.poll.options.map((opt, optIdx) => {
                    const totalVotes = post.poll!.options.reduce((acc, o) => acc + o.votes, 0) || 1;
                    const pct = Math.round((opt.votes / totalVotes) * 100);

                    return (
                      <button
                        key={opt.id || optIdx}
                        onClick={() => {
                          soundEngine.playCue('ui.save');
                          votePulsePoll(post.id, opt.id);
                        }}
                        style={{
                          position: 'relative',
                          overflow: 'hidden',
                          padding: 'var(--space-2) var(--space-3)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)',
                          backgroundColor: 'var(--bg-surface-subtle)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${pct}%`,
                            backgroundColor: 'var(--accent-surface)',
                            opacity: 0.6,
                            zIndex: 1,
                          }}
                        />
                        <span style={{ position: 'relative', zIndex: 2, fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {opt.text}
                        </span>
                        <span style={{ position: 'relative', zIndex: 2, fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--accent-plum)' }}>
                          {pct}% ({opt.votes})
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Post Actions (Heart & Reply) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)', marginTop: 'var(--space-1)' }}>
                <button
                  className="btn-ghost btn-sm"
                  onClick={() => {
                    soundEngine.playCue('ui.save');
                    reactPulsePost(post.id, '❤️');
                  }}
                  style={{ gap: '4px', fontSize: 'var(--font-size-xs)', color: post.userReactions?.includes('❤️') ? 'var(--accent-plum)' : 'var(--text-secondary)' }}
                >
                  <Heart size={15} fill={post.userReactions?.includes('❤️') ? 'currentColor' : 'none'} />
                  <span>{post.reactions?.['❤️'] || 0}</span>
                </button>

                <button
                  className="btn-ghost btn-sm"
                  onClick={() => setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)}
                  style={{ gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}
                >
                  <MessageSquare size={15} />
                  <span>{post.replies?.length || 0} Replies</span>
                </button>
              </div>

              {/* Replies Thread */}
              {activeReplyPostId === post.id && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
                  {post.replies && post.replies.map((rep) => (
                    <div key={rep.id} style={{ padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {rep.authorName} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>• {rep.timestamp}</span>
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {rep.body}
                      </div>
                    </div>
                  ))}

                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Write a thoughtful reply..."
                      value={replyInputText}
                      onChange={(e) => setReplyInputText(e.target.value)}
                      style={{ flex: 1, minHeight: '34px', fontSize: 'var(--font-size-xs)' }}
                    />
                    <button className="btn btn-secondary btn-sm" onClick={() => handleSendReply(post.id)} disabled={!replyInputText.trim()}>
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
