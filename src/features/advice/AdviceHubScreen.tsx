import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  Search,
  MessageSquare,
  Clock,
  ArrowRight,
  HelpCircle,
  Bookmark,
  Send,
} from 'lucide-react';
import { useAdviceStore } from '../../store/adviceStore';
import { renderMarkdownText } from '../../utils/markdownUtils';
import { useStoryAccessStore } from '../../store/storyAccessStore';

export const AdviceHubScreen: React.FC = () => {
  const { categories, articles, savedArticleIds } = useAdviceStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = articles[0];

  const filteredArticles = articles.filter((art) => {
    if (selectedCategory !== 'all' && art.categoryId !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        art.title.toLowerCase().includes(q) ||
        art.dek.toLowerCase().includes(q) ||
        art.authorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="advice-hub-screen" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header & Ask Everfold CTA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: 0 }}>Relationship Science & Advice</h1>
            {unlockAllStoryPages && <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>Story Access: Full</span>}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '4px', marginBottom: 0 }}>
            Curated essays, research briefings, and unhurried guidance from psychologists and community members.
          </p>
        </div>

        <NavLink to="/advice/ask" className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)' }}>
          <HelpCircle size={15} /> Ask Everfold
        </NavLink>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative' }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          className="input"
          placeholder="Search advice topics (e.g. low-stimulation dates, texting pace, grief)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: '40px', width: '100%', minHeight: '44px', fontSize: 'var(--font-size-xs)' }}
        />
      </div>

      {/* Featured Editorial Article */}
      {!searchQuery && selectedCategory === 'all' && featuredArticle && (
        <div
          className="card"
          style={{
            borderLeft: '4px solid var(--accent-primary)',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-subtle" style={{ fontSize: '10px' }}>FEATURED EDITORIAL</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Clock size={12} /> {featuredArticle.readingTimeMinutes} min read
            </div>
          </div>

          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>{featuredArticle.title}</h2>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            {renderMarkdownText(featuredArticle.dek)}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              By <strong>{featuredArticle.authorName}</strong> • {featuredArticle.authorRole}
            </div>

            <NavLink to={`/advice/${featuredArticle.id}`} className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)' }}>
              Read Full Article <ArrowRight size={13} />
            </NavLink>
          </div>
        </div>
      )}

      {/* Category Filter Chips */}
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
        <button
          onClick={() => setSelectedCategory('all')}
          className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ whiteSpace: 'nowrap', borderRadius: 'var(--radius-full)', flexShrink: 0 }}
          role="tab"
          aria-selected={selectedCategory === 'all'}
        >
          All Topics
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ whiteSpace: 'nowrap', borderRadius: 'var(--radius-full)', flexShrink: 0 }}
            role="tab"
            aria-selected={selectedCategory === cat.id}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)', alignItems: 'stretch' }}>
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="ef-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge" style={{ fontSize: '0.62rem' }}>{art.authorType}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  <Clock size={12} /> {art.readingTimeMinutes} min
                </div>
              </div>

              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, margin: 0, color: 'var(--text-primary)', lineHeight: 1.3 }}>{art.title}</h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                {renderMarkdownText(art.dek)}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <MessageSquare size={12} /> {art.commentsCount} comments
              </div>

              <NavLink to={`/advice/${art.id}`} className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                Read <ArrowRight size={13} />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
