import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mic, Clock, ArrowRight, Play, ArrowLeft } from 'lucide-react';
import { useMagazinePodcastStore } from '../../store/magazinePodcastStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';

export const PodcastHubScreen: React.FC = () => {
  const { podcastEpisodes } = useMagazinePodcastStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  const visibleEpisodes = podcastEpisodes.filter((ep) => {
    if (ep.storyTier > 0 && !unlockAllStoryPages) return false;
    return true;
  });

  return (
    <div className="podcast-hub-screen" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/magazine" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> Everfold Magazine
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Mic size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>The Space Between — Podcast & Transcripts</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Conversations on unhurried attachment, somatic recognition, grief, and the philosophical implications of algorithmic memory.
        </p>
      </div>

      {/* Episodes Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {visibleEpisodes.map((ep) => (
          <div key={ep.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <div>
                <span className="badge" style={{ fontSize: '10px' }}>EPISODE {ep.number}</span>
                <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, margin: '4px 0 2px' }}>{ep.title}</h2>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Guest: <strong>{ep.guest}</strong> • {ep.publishedDate}
                </div>
              </div>

              <NavLink to={`/magazine/podcast/${ep.id}`} className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)' }}>
                <Play size={13} /> Full Transcript & Chat <ArrowRight size={13} />
              </NavLink>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {ep.summary}
            </p>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> Duration: {ep.durationText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
