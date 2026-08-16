import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Heart, ThumbsUp, Sparkles } from 'lucide-react';
import { CommunityComment } from '../../types/socialEcosystem';
import { useSocialSimulationStore } from '../../store/socialSimulationStore';
import { ScrollToNewRepliesChip } from './ScrollToNewRepliesChip';

interface LiveCommentFeedProps {
  sourceId: string;
  comments: CommunityComment[];
  onAddDeliveredComment: (comment: CommunityComment) => void;
}

export const LiveCommentFeed: React.FC<LiveCommentFeedProps> = ({
  sourceId,
  comments,
  onAddDeliveredComment,
}) => {
  const { tickSimulation, activeTypingUsers } = useSocialSimulationStore();
  const [unreadNewCount, setUnreadNewCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Poll social simulation director every 1s
  useEffect(() => {
    const interval = setInterval(() => {
      const deliveredEvents = tickSimulation();
      deliveredEvents.forEach((ev) => {
        const newComm: CommunityComment = {
          id: ev.id,
          postId: sourceId,
          authorId: ev.authorId,
          authorName: ev.authorName,
          authorHandle: ev.authorHandle,
          body: ev.body,
          publishedAt: new Date().toISOString(),
          reactions: { helpful: 0, relatable: 0, laugh: 0, thoughtful: 0 },
        };
        onAddDeliveredComment(newComm);
        setUnreadNewCount((prev) => prev + 1);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tickSimulation, sourceId, onAddDeliveredComment]);

  const activeTyping = activeTypingUsers.find((u) => u.sourceId === sourceId);

  const handleScrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUnreadNewCount(0);
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', position: 'relative' }}>
      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {comments.map((comm) => (
          <div
            key={comm.id}
            style={{
              padding: 'var(--space-3)',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderRadius: 'var(--radius-md)',
              border: comm.storyTier && comm.storyTier > 0 ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                {comm.authorName}{' '}
                <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>@{comm.authorHandle}</span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                {new Date(comm.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.5, margin: '2px 0 0' }}>{comm.body}</p>
          </div>
        ))}
      </div>

      {/* Typing Indicator */}
      {activeTyping && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '4px 0' }}>
          <Sparkles size={13} color="var(--accent-primary)" />
          <span>{activeTyping.authorName} is typing...</span>
        </div>
      )}

      {/* Floating Scroll-to-bottom chip */}
      <ScrollToNewRepliesChip newCount={unreadNewCount} onClick={handleScrollToBottom} />

      <div ref={bottomRef} />
    </div>
  );
};
