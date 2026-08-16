import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  Calendar,
  Sparkles,
  Heart,
  PlusCircle,
  TrendingUp,
  Radio,
  ArrowRight,
} from 'lucide-react';
import { useCommunityStore } from '../../store/communityStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { renderMarkdownText } from '../../utils/markdownUtils';
import { LiveCommentComposer } from '../../components/community/LiveCommentComposer';
import { LiveCommentFeed } from '../../components/community/LiveCommentFeed';
import { useProfileStore } from '../../store/profileStore';

export const CommunityHubScreen: React.FC = () => {
  const { rooms, posts, comments, addPost, addComment, reactToPost, votePoll } = useCommunityStore();
  const { visitorProfile } = useProfileStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('all');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [targetRoom, setTargetRoom] = useState<string>(rooms[0]?.id || '');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postBody.trim()) return;

    addPost(
      targetRoom,
      visitorProfile.id,
      visitorProfile.displayName,
      visitorProfile.handle,
      postTitle.trim(),
      postBody.trim()
    );

    setPostTitle('');
    setPostBody('');
    setNewPostModalOpen(false);
  };

  const filteredPosts = posts.filter((p) => {
    if (selectedRoomId !== 'all' && p.roomId !== selectedRoomId) return false;
    return true;
  });

  return (
    <div className="community-hub-screen" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header & Quick Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: 0 }}>Community Hub & Topic Rooms</h1>
            {unlockAllStoryPages && <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>Story Access: Full</span>}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '4px', marginBottom: 0 }}>
            Specialized discussion rooms, anonymous confessions, hybrid community events, and staff AMAs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
          <NavLink to="/community/unsent" className="btn btn-secondary btn-sm">
            <Heart size={14} /> Unsent Confessions
          </NavLink>
          <NavLink to="/community/events" className="btn btn-secondary btn-sm">
            <Calendar size={14} /> Events &amp; Meetups
          </NavLink>
          <NavLink to="/community/amas" className="btn btn-secondary btn-sm">
            <Radio size={14} /> Staff AMAs
          </NavLink>
          <button className="btn btn-primary btn-sm" onClick={() => setNewPostModalOpen(true)}>
            <PlusCircle size={15} /> Create Post
          </button>
        </div>
      </div>

      {/* Featured Rooms Carousel / Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Explore Topic Rooms</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
          {rooms.slice(0, 6).map((room) => (
            <NavLink
              key={room.id}
              to={`/community/rooms/${room.id}`}
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
                <span className="badge badge-subtle" style={{ fontSize: '9px' }}>{room.category}</span>
                <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: '4px 0 2px', color: 'var(--text-primary)' }}>
                  {room.name}
                </h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  {renderMarkdownText(room.description)}
                </p>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
                {room.memberCount.toLocaleString()} members
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Feed with Live Comment Feed integration */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Latest Community Discussions</h2>
        </div>

        {filteredPosts.map((post) => {
          const postComments = comments[post.id] || [];

          return (
            <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                    {post.authorName} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>@{post.authorHandle}</span>
                  </div>
                  {post.moderationLabel && (
                    <span className="badge badge-anomaly" style={{ fontSize: '9px' }}>
                      {post.moderationLabel}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '2px 0 6px' }}>{post.title}</h3>
                <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  {renderMarkdownText(post.body)}
                </p>
              </div>

              {/* Poll if attached */}
              {post.poll && (
                <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>{post.poll.question}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    {post.poll.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => votePoll(post.id, opt.id)}
                        className="btn btn-secondary btn-xs"
                        style={{
                          justifyContent: 'space-between',
                          border: post.poll?.userVotedOptionId === opt.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        }}
                      >
                        <span>{opt.text}</span>
                        <span style={{ fontWeight: 700 }}>{opt.votes} votes</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reactions Bar */}
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <button className="btn btn-ghost btn-xs" onClick={() => reactToPost(post.id, 'helpful')} style={{ fontSize: '11px' }}>
                  👍 Helpful ({post.reactions.helpful})
                </button>
                <button className="btn btn-ghost btn-xs" onClick={() => reactToPost(post.id, 'relatable')} style={{ fontSize: '11px' }}>
                  🤍 Relatable ({post.reactions.relatable})
                </button>
                <button className="btn btn-ghost btn-xs" onClick={() => reactToPost(post.id, 'thoughtful')} style={{ fontSize: '11px' }}>
                  💡 Thoughtful ({post.reactions.thoughtful})
                </button>
                {post.reactions.seenThisToo !== undefined && (
                  <button className="btn btn-ghost btn-xs" onClick={() => reactToPost(post.id, 'seenThisToo')} style={{ fontSize: '11px', color: 'var(--accent-primary)' }}>
                    🔍 Seen This Too ({post.reactions.seenThisToo})
                  </button>
                )}
              </div>

              {/* Live Comment Stream for this Post */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
                <LiveCommentFeed
                  sourceId={post.id}
                  comments={postComments}
                  onAddDeliveredComment={(comm) => {
                    useCommunityStore.setState((state) => ({
                      comments: {
                        ...state.comments,
                        [post.id]: [...(state.comments[post.id] || []), comm],
                      },
                    }));
                  }}
                />

                <div style={{ marginTop: 'var(--space-3)' }}>
                  <LiveCommentComposer
                    onPost={(text) => {
                      addComment(
                        post.id,
                        visitorProfile.id,
                        visitorProfile.displayName,
                        visitorProfile.handle,
                        text
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Post Modal */}
      {newPostModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-post-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-4)',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '540px',
              width: '100%',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <h2 id="new-post-modal-title" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '0 0 var(--space-3)' }}>
              Create Community Discussion
            </h2>

            <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Target Room:</label>
                <select
                  className="input"
                  value={targetRoom}
                  onChange={(e) => setTargetRoom(e.target.value)}
                  style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Title:</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Post title..."
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Content:</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Share your perspective, question, or date idea..."
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setNewPostModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
