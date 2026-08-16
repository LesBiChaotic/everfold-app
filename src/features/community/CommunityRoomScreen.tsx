import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, Users, PlusCircle, MessageSquare } from 'lucide-react';
import { useCommunityStore } from '../../store/communityStore';
import { LiveCommentComposer } from '../../components/community/LiveCommentComposer';
import { LiveCommentFeed } from '../../components/community/LiveCommentFeed';
import { useProfileStore } from '../../store/profileStore';
import { renderMarkdownText } from '../../utils/markdownUtils';

export const CommunityRoomScreen: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms, posts, comments, addComment } = useCommunityStore();
  const { visitorProfile } = useProfileStore();

  const room = rooms.find((r) => r.id === roomId || r.slug === roomId) || rooms[0];
  const roomPosts = posts.filter((p) => p.roomId === room.id);

  return (
    <div className="community-room-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/community" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Community Rooms
      </NavLink>

      {/* Room Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{room.category}</span>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: '6px 0 2px' }}>{room.name}</h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
          {renderMarkdownText(room.description)}
        </p>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
          {room.memberCount.toLocaleString()} members • Moderated by {room.moderators.join(', ')}
        </div>
      </div>

      {/* Posts in Room */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {roomPosts.map((post) => {
          const postComments = comments[post.id] || [];

          return (
            <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                  {post.authorName} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>@{post.authorHandle}</span>
                </div>
                <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '2px 0 6px' }}>{renderMarkdownText(post.title)}</h3>
                <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  {renderMarkdownText(post.body)}
                </p>
              </div>

              {/* Live Comments for Room Post */}
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
    </div>
  );
};
