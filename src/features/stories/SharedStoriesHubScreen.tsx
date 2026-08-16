import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Heart,
  PlusCircle,
  Calendar,
  ArrowRight,
  Sparkles,
  Users,
  Repeat,
} from 'lucide-react';
import { useStoriesStore } from '../../store/storiesStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { renderMarkdownText } from '../../utils/markdownUtils';

export const SharedStoriesHubScreen: React.FC = () => {
  const { stories } = useStoriesStore();
  const { unlockAllStoryPages } = useStoryAccessStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const storyTypes = [
    'All',
    'Dating After Grief',
    'How We Met',
    'Long Distance',
    'Kind Breakups',
    'Second Chances',
    'Moving In',
  ];

  const filteredStories = stories.filter((s) => {
    if (selectedFilter !== 'All' && s.storyType !== selectedFilter) return false;
    return true;
  });

  return (
    <div className="shared-stories-hub" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header & Submit Story Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: 0 }}>Shared Relationship Stories</h1>
            {unlockAllStoryPages && <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>Story Access: Full</span>}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '4px', marginBottom: 0 }}>
            Longitudinal narratives written by member pairs—chronicling beginnings, quiet milestones, and kind endings.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <NavLink to="/stories/where-are-they-now" className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <Repeat size={14} /> Where Are They Now?
          </NavLink>
          <NavLink to="/stories/submit" className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <PlusCircle size={15} /> Submit Our Story
          </NavLink>
        </div>
      </div>

      {/* Story Type Filters */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          overflowX: 'auto',
          paddingBottom: 'var(--space-2)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border-subtle) transparent',
        }}
        role="tablist"
      >
        {storyTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedFilter(type)}
            className={`btn btn-sm ${selectedFilter === type ? 'btn-primary' : 'btn-secondary'}`}
            style={{ whiteSpace: 'nowrap', borderRadius: 'var(--radius-full)', flexShrink: 0 }}
            role="tab"
            aria-selected={selectedFilter === type}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)', alignItems: 'stretch' }}>
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="ef-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: story.featured ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-plum" style={{ fontSize: '0.62rem' }}>{story.storyType}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {story.chapters.length} Chapters
                </span>
              </div>

              <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, margin: 0, color: 'var(--text-primary)', lineHeight: 1.3 }}>{story.title}</h2>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                {story.participantNames.join(' & ')}
              </div>

              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                {renderMarkdownText(story.summary)}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {story.updates ? `${story.updates.length} multi-year updates` : 'Published'}
              </div>

              <NavLink to={`/stories/${story.id}`} className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                Read Story <ArrowRight size={13} />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
