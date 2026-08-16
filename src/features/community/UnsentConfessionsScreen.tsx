import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Heart, Send, Sparkles, Feather } from 'lucide-react';
import { useCommunityStore } from '../../store/communityStore';
import { AnonymousUnsentPost } from '../../types/socialEcosystem';

export const UnsentConfessionsScreen: React.FC = () => {
  const { unsentPosts, postUnsentConfession } = useCommunityStore();
  const [selectedCategory, setSelectedCategory] = useState<AnonymousUnsentPost['category']>('Wish I Said');
  const [confessionText, setConfessionText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories: AnonymousUnsentPost['category'][] = [
    'Wish I Said',
    'First Date Regret',
    'Secret Admiration',
    'Breakup Words',
    'Late Realization',
  ];

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confessionText.trim()) return;

    postUnsentConfession(selectedCategory, confessionText.trim());
    setConfessionText('');
  };

  const filteredPosts = unsentPosts.filter((p) => {
    if (filterCategory !== 'All' && p.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="unsent-confessions-screen" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/community" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> Community Hub
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Feather size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Unsent — Anonymous Confessions</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Words left unsaid on train platforms, quiet regrets, unrequited thoughts, and gentle closures. Completely anonymous.
        </p>
      </div>

      {/* Confession Composer */}
      <form onSubmit={handlePost} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '11px', whiteSpace: 'nowrap', borderRadius: 'var(--radius-full)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <textarea
          className="input"
          rows={3}
          placeholder="Leave an anonymous confession into the quiet vault..."
          value={confessionText}
          onChange={(e) => setConfessionText(e.target.value)}
          style={{ width: '100%', fontSize: 'var(--font-size-xs)', lineHeight: 1.5 }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Posted without profile handle or account link.</span>
          <button type="submit" className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <Send size={14} /> Post Anonymously
          </button>
        </div>
      </form>

      {/* Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Anonymous Letters & Notes</h2>

        {filteredPosts.map((post) => (
          <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{post.category}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                {new Date(post.postedAt).toLocaleDateString()}
              </span>
            </div>

            <p style={{ fontSize: 'var(--font-size-sm)', fontStyle: 'italic', lineHeight: 1.6, margin: '4px 0', color: 'var(--text-primary)' }}>
              “{post.body}”
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                🤍 {post.reactions.feltThis} felt this
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                🌿 {post.reactions.healing} healing
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
