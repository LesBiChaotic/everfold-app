import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, MapPin, CheckCircle, MessageSquare } from 'lucide-react';
import { useCommunityStore } from '../../store/communityStore';

export const EventsScreen: React.FC = () => {
  const { events, rsvpEvent } = useCommunityStore();

  return (
    <div className="community-events-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/community" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> Community Hub
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Calendar size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Community Events & Meetups</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Quiet hybrid reading nights, low-sensory museum walks, and casual interest gatherings.
        </p>
      </div>

      {/* Events Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {events.map((evt) => (
          <div key={evt.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <div>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{evt.category}</span>
                <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '4px 0 2px' }}>{evt.title}</h2>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Hosted by <strong>{evt.hostName}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <NavLink to={`/events/${evt.id}/chat`} className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
                  <MessageSquare size={13} /> Live Event Chat
                </NavLink>
                <button
                  onClick={() => rsvpEvent(evt.id)}
                  className={`btn ${evt.isUserRsvp ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: 'var(--font-size-xs)' }}
                >
                  {evt.isUserRsvp ? '✓ Attending' : 'RSVP'}
                </button>
              </div>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
              {evt.description}
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} /> {new Date(evt.scheduledTime).toLocaleDateString()} at {new Date(evt.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} /> {evt.locationOrUrl}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Users size={12} /> {evt.rsvpCount} / {evt.capacity} attending
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
