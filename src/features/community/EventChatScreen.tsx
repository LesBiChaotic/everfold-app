import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Send, Users } from 'lucide-react';
import { useCommunityStore } from '../../store/communityStore';
import { useProfileStore } from '../../store/profileStore';
import { LiveCommentFeed } from '../../components/community/LiveCommentFeed';
import { LiveCommentComposer } from '../../components/community/LiveCommentComposer';

export const EventChatScreen: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events, comments, addComment } = useCommunityStore();
  const { visitorProfile } = useProfileStore();

  const event = events.find((e) => e.id === eventId) || events[0];
  const chatMessages = comments[event.id] || [];

  return (
    <div className="event-chat-screen" style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <NavLink to="/community/events" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> Back to Events
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-subtle" style={{ fontSize: '10px' }}>LIVE EVENT CHAT</span>
            <h1 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, margin: '2px 0' }}>{event.title}</h1>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Hosted by {event.hostName}</div>
          </div>
          <div className="badge badge-subtle" style={{ fontSize: '10px' }}>
            <Users size={12} /> {event.rsvpCount} Attending
          </div>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minHeight: '380px' }}>
        <LiveCommentFeed
          sourceId={event.id}
          comments={chatMessages}
          onAddDeliveredComment={(comm) => {
            useCommunityStore.setState((state) => ({
              comments: {
                ...state.comments,
                [event.id]: [...(state.comments[event.id] || []), comm],
              },
            }));
          }}
        />

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
          <LiveCommentComposer
            placeholder="Say hello or share your book title..."
            onPost={(text) => {
              addComment(
                event.id,
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
};
