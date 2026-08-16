import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Archive,
  Lock,
  Unlock,
  Search,
  Sliders,
  Sparkles,
  Layers,
  FileText,
  Clock,
  Eye,
  Bookmark,
  CheckCircle,
  AlertCircle,
  X,
} from 'lucide-react';
import { SEEDED_ARCHIVE_ITEMS } from '../../data/archiveItems';
import { useARGStore } from '../../store/argStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { ArchiveItem } from '../../types';

export const ArchiveScreen: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [gateCodeInput, setGateCodeInput] = useState('');
  const [gateError, setGateError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);

  // Light table tools
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [contrast, setContrast] = useState(100);

  const { stage, solvePuzzle, solvedPuzzleIds, addEvidenceBookmark, recordVisit } = useARGStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  useEffect(() => {
    recordVisit('archive');
  }, [recordVisit]);

  const isLegacyUnlocked = stage >= 3 || solvedPuzzleIds.includes('gate_0814_legacy') || unlockAllStoryPages;

  const handleUnlockLegacy = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateCodeInput.trim() === '0814') {
      soundEngine.playCue('ui.success');
      solvePuzzle('gate_0814_legacy');
      setGateError('');
    } else {
      soundEngine.playCue('ui.failure');
      setGateError('Access Denied: Invalid legacy partition code. (Hint: August 14 -> 0814)');
    }
  };

  const filteredItems = SEEDED_ARCHIVE_ITEMS.filter((item) => {
    if (item.puzzleGateId && !isLegacyUnlocked) return false;
    if (selectedPlatform !== 'All' && item.platform !== selectedPlatform) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleBookmarkEvidence = (item: ArchiveItem) => {
    soundEngine.playCue('ui.save');
    addEvidenceBookmark({
      category: 'Archive',
      sourceType: 'ArchiveItem',
      sourceId: item.id,
      title: item.title,
      summary: item.summary,
      date: `${item.year}-01-01`,
      linkedIds: item.linkedUserIds,
      confidence: 'Strongly Supported',
      playerNote: `Preserved record from ${item.platform} (${item.year}).`
    });
  };

  return (
    <div
      className="archive-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Historical Registry & Document Archive
            </h1>
            {unlockAllStoryPages && (
              <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>
                Full Story Access
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
            Inspect historical platform snapshots, decommissioned system schemas, and longitudinal records.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '0 var(--space-3)',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              height: '36px',
            }}
          >
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', width: '180px', fontSize: 'var(--font-size-xs)', outline: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Platform Filter Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)', overflowX: 'auto' }}>
        {['All', 'Affinity Room', 'Fold / Pairwise', 'Early Everfold', 'System Internal'].map((plat) => (
          <button
            key={plat}
            onClick={() => {
              soundEngine.playCue('ui.navigation');
              setSelectedPlatform(plat);
            }}
            className="badge"
            style={{
              backgroundColor: selectedPlatform === plat ? 'var(--accent-plum)' : 'var(--bg-surface)',
              color: selectedPlatform === plat ? 'var(--text-inverse)' : 'var(--text-secondary)',
              padding: '0.4rem 0.85rem',
              fontSize: 'var(--font-size-xs)',
              fontWeight: selectedPlatform === plat ? 700 : 500,
              border: '1px solid',
              borderColor: selectedPlatform === plat ? 'var(--accent-plum)' : 'var(--border-subtle)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {plat}
          </button>
        ))}
      </div>

      {/* Legacy Gate Unlock Prompt */}
      {!isLegacyUnlocked && (
        <div className="ef-card-featured">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <Lock size={18} color="var(--accent-plum)" />
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Restricted Legacy Database Partition (Gate 0814)
            </h3>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
            Certain historical records are encrypted under earlier system schema standards. Enter decryption code to unlock.
          </p>

          <form onSubmit={handleUnlockLegacy} style={{ display: 'flex', gap: 'var(--space-2)', maxWidth: '380px' }}>
            <input
              type="text"
              className="input font-mono"
              placeholder="e.g. 0814"
              value={gateCodeInput}
              onChange={(e) => setGateCodeInput(e.target.value)}
              style={{ flex: 1, minHeight: '36px', fontSize: 'var(--font-size-xs)' }}
            />
            <button type="submit" className="btn btn-secondary btn-sm">
              Decrypt Partition
            </button>
          </form>
          {gateError && <div style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '6px' }}>{gateError}</div>}
        </div>
      )}

      {/* Document Review Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="ef-card-interactive flex flex-col justify-between"
            style={{
              padding: 'var(--space-4)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>
                  {item.platform} • {item.year}
                </span>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {item.id}
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: 'var(--space-3)' }}>
                {item.summary}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
              <button
                className="btn btn-primary btn-sm flex-1"
                onClick={() => {
                  soundEngine.playCue('ui.navigation');
                  setActiveItem(item);
                }}
              >
                <Eye size={14} /> Open Document
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleBookmarkEvidence(item)}
                title="Bookmark for Evidence Casebook"
                style={{ width: 36, padding: 0 }}
              >
                <Bookmark size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Light-Table Modal for Inspecting Active Document */}
      {activeItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--bg-overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: 'var(--space-4)',
          }}
        >
          <div
            className="ef-card-featured"
            style={{
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
              <div>
                <span className="badge badge-plum" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                  {activeItem.platform} ({activeItem.year})
                </span>
                <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {activeItem.title}
                </h2>
              </div>
              <button className="btn-ghost" onClick={() => setActiveItem(null)} style={{ width: 32, height: 32, padding: 0 }}>
                <X size={18} />
              </button>
            </div>

            {/* Light-table Control Tools (Zoom, Rotation, Contrast) */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Zoom:</span>
                <input
                  type="range"
                  min="0.8"
                  max="1.6"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Contrast:</span>
                <input
                  type="range"
                  min="60"
                  max="140"
                  step="10"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Document Text Body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 'var(--space-4) 0',
                fontSize: 'var(--font-size-sm)',
                lineHeight: 1.6,
                transform: `scale(${zoom})`,
                filter: `contrast(${contrast}%)`,
                transformOrigin: 'top left',
              }}
            >
              <div
                className="font-mono"
                style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'break-word',
                  fontSize: '0.8rem',
                }}
              >
                {activeItem.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  handleBookmarkEvidence(activeItem);
                  setActiveItem(null);
                }}
              >
                <Bookmark size={14} /> Bookmark as Evidence
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveItem(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
