import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, Mic, Clock, MessageSquare, Send } from 'lucide-react';
import { useMagazinePodcastStore } from '../../store/magazinePodcastStore';
import { useProfileStore } from '../../store/profileStore';
import { LiveCommentFeed } from '../../components/community/LiveCommentFeed';
import { LiveCommentComposer } from '../../components/community/LiveCommentComposer';

export const PodcastEpisodeScreen: React.FC = () => {
  const { episodeId } = useParams<{ episodeId: string }>();
  const { podcastEpisodes, podcastComments, addPodcastComment } = useMagazinePodcastStore();
  const { visitorProfile } = useProfileStore();

  const episode = podcastEpisodes.find((ep) => ep.id === episodeId) || podcastEpisodes[0];
  const comments = podcastComments[episode.id] || [];

  return (
    <div className="podcast-episode-screen" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/magazine/podcast" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Episodes
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <span className="badge badge-subtle" style={{ fontSize: '10px' }}>EPISODE {episode.number}</span>
        <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: '4px 0 2px' }}>{episode.title}</h1>
        <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: 'var(--space-2)' }}>
          Guest: {episode.guest}
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          {episode.summary}
        </p>
      </div>

      {/* Transcript Section */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Searchable Audio Transcript</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {episode.transcript.map((seg, idx) => (
            <div key={idx} style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--accent-primary)' }}>{seg.speaker}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-family-mono)' }}>[{seg.timestamp}]</span>
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                {seg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Discussion Stream */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <MessageSquare size={18} color="var(--accent-primary)" />
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Episode Discussion & Q&A</h2>
        </div>

        <LiveCommentFeed
          sourceId={episode.id}
          comments={comments}
          onAddDeliveredComment={(comm) => {
            useMagazinePodcastStore.setState((state) => ({
              podcastComments: {
                ...state.podcastComments,
                [episode.id]: [...(state.podcastComments[episode.id] || []), comm],
              },
            }));
          }}
        />

        <div style={{ marginTop: 'var(--space-2)' }}>
          <LiveCommentComposer
            onPost={(text) => {
              addPodcastComment(
                episode.id,
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
