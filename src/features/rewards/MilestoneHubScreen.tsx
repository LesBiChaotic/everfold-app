import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowLeft,
  Filter,
  Eye,
  Gift,
  Info,
  Layers,
  Search,
} from 'lucide-react';
import { useRewardStore } from '../../store/rewardStore';
import { MILESTONES_CATALOG } from '../../data/milestonesCatalog';
import { COSMETICS_CATALOG } from '../../data/cosmeticsCatalog';
import { MilestoneCategory } from '../../types/rewards';
import { Foldmark } from '../../components/brand/Foldmark';

const CATEGORIES: ('All' | MilestoneCategory)[] = [
  'All',
  'Profile',
  'Messages',
  'Community',
  'Journal',
  'Relationships',
  'Quizzes',
  'Stories',
  'Memories',
  'Date Planner',
  'Exploration',
  'Secret',
];

export const MilestoneHubScreen: React.FC = () => {
  const {
    foldScore,
    currentTier,
    milestoneIdsUnlocked,
    cosmeticItemIdsOwned,
    unlockMilestone,
  } = useRewardStore();

  const [selectedCategory, setSelectedCategory] = useState<'All' | MilestoneCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMilestones = MILESTONES_CATALOG.filter((m) => {
    if (selectedCategory !== 'All' && m.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const unlockedCount = MILESTONES_CATALOG.filter((m) => milestoneIdsUnlocked.includes(m.id)).length;
  const totalCount = MILESTONES_CATALOG.length;

  return (
    <div
      className="milestones-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '840px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Top Header & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <NavLink to="/profile" className="btn btn-secondary btn-sm" aria-label="Back to Profile">
            <ArrowLeft size={16} /> Back
          </NavLink>
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
              Milestone Hub
            </h1>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 0 }}>
              Celebrate little reflections across Everfold. Purely cosmetic & non-competitive.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <NavLink to="/profile/cosmetics" className="btn btn-secondary btn-sm">
            <Sparkles size={14} /> View Cosmetics
          </NavLink>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div
        className="ef-card-featured"
        style={{
          padding: 'clamp(var(--space-5), 4vw, var(--space-7))',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginLeft: 'var(--space-2)' }}>
            <div
              style={{
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Foldmark size={36} color="var(--accent-plum)" />
            </div>

            <div>
              <span className="badge badge-plum" style={{ marginBottom: '4px' }}>
                {currentTier} Progression Tier
              </span>
              <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.35rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {foldScore} <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--text-muted)' }}>Fold Score</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginRight: 'var(--space-2)' }}>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>
              {unlockedCount} of {totalCount}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Milestones Discovered
            </div>
          </div>
        </div>

        {/* Informational Copy as per Spec */}
        <div
          className="ef-card-subtle"
          style={{
            padding: 'var(--space-3) var(--space-4)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          <Info size={14} color="var(--accent-plum)" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          <strong>About Fold Score:</strong> Fold Score tracks little things you've done around Everfold. It only unlocks cosmetic extras. It does not affect matching, Forecast, compatibility, or how other people see you.
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search milestones by title, description, or keyword..."
              style={{ width: '100%', paddingLeft: '34px', minHeight: '40px' }}
            />
          </div>
        </div>

        {/* Category Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            paddingBottom: 'var(--space-1)',
          }}
          role="tablist"
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = category === 'All'
              ? MILESTONES_CATALOG.length
              : MILESTONES_CATALOG.filter((m) => m.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className="badge"
                style={{
                  backgroundColor: isActive ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                  color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  border: `1px solid ${isActive ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                  padding: '6px 14px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-full)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{category}</span>
                <span style={{ opacity: 0.75, fontSize: '10px' }}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Milestones Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filteredMilestones.map((milestone) => {
          const isUnlocked = milestoneIdsUnlocked.includes(milestone.id);
          const reward = milestone.cosmeticRewardId
            ? COSMETICS_CATALOG.find((c) => c.id === milestone.cosmeticRewardId)
            : null;

          return (
            <div
              key={milestone.id}
              className="ef-card"
              style={{
                padding: 'var(--space-4) var(--space-5)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: isUnlocked ? '4px solid var(--accent-plum)' : '4px solid var(--border-default)',
                opacity: isUnlocked ? 1 : 0.88,
              }}
            >
              {/* Icon & Details */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isUnlocked ? 'rgba(107, 50, 72, 0.1)' : 'var(--bg-surface-subtle)',
                    color: isUnlocked ? 'var(--accent-plum)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {isUnlocked ? <CheckCircle2 size={18} /> : <Lock size={18} />}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    <span className="badge badge-secondary" style={{ fontSize: '10px' }}>
                      {milestone.category}
                    </span>
                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {milestone.isSecret && !isUnlocked ? 'Unknown Secret Milestone' : milestone.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    {milestone.isSecret && !isUnlocked ? (milestone.hint || 'Discovered through quiet archive exploration.') : milestone.description}
                  </p>

                  {/* Cosmetic Reward Tag */}
                  {reward && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <Gift size={12} color="var(--accent-plum)" />
                      <span>Reward: <strong>{reward.name}</strong> ({reward.category.replace(/([A-Z])/g, ' $1')})</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Points Badge & Claim Action */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)', flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: isUnlocked ? 'var(--accent-plum)' : 'var(--text-muted)',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isUnlocked ? 'rgba(107, 50, 72, 0.08)' : 'var(--bg-surface-subtle)',
                  }}
                >
                  +{milestone.foldScore} pts
                </span>

                {!isUnlocked && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={() => unlockMilestone(milestone.id)}
                    style={{ fontSize: '10px', color: 'var(--text-muted)' }}
                    title="Simulate / Claim milestone"
                  >
                    Simulate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
