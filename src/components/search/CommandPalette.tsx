import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, User, MessageSquare, BookOpen, Archive, Shield, Sparkles, Terminal } from 'lucide-react';
import { SEEDED_USERS } from '../../data/users';
import { SEEDED_ARCHIVE_ITEMS } from '../../data/archiveItems';
import { SEEDED_TRUST_SAFETY_CASES } from '../../data/trustSafety';
import { useAppStore } from '../../store/appStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [acrossAllVersions, setAcrossAllVersions] = useState(false);
  const { recentSearches, addRecentSearch, clearRecentSearches } = useAppStore();
  const { theme, setTheme, font, setFont, toggleSidebar } = useSettingsStore();
  const { stage } = useARGStore();

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedUsers = SEEDED_USERS.filter((u) => {
      if (!acrossAllVersions && u.visibility === 'archived' && stage < 3) return false;
      return (
        u.displayName.toLowerCase().includes(q) ||
        u.handle.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.occupation.toLowerCase().includes(q) ||
        u.interests.some((i) => i.toLowerCase().includes(q)) ||
        u.legacyAliases.some((a) => a.toLowerCase().includes(q))
      );
    });

    const matchedArchive = SEEDED_ARCHIVE_ITEMS.filter((a) => {
      if (a.puzzleGateId && stage < 3) return false;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.platform.toLowerCase().includes(q)
      );
    });

    const matchedCases = stage >= 4
      ? SEEDED_TRUST_SAFETY_CASES.filter((c) =>
          c.caseNumber.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
        )
      : [];

    return { users: matchedUsers, archive: matchedArchive, cases: matchedCases };
  }, [query, acrossAllVersions, stage]);

  if (!isOpen) return null;

  const handleSelect = (url: string, label: string) => {
    addRecentSearch(label);
    soundEngine.playCue('ui.navigation');
    onClose();
    navigate(url);
  };

  const quickCommands = [
    { label: 'Switch Theme', action: () => setTheme(theme === 'dark' ? 'light' : 'dark') },
    { label: 'Toggle Device Font', action: () => setFont(font === 'device' ? 'everfold' : 'device') },
    { label: 'Open Avatar Builder', action: () => { navigate('/avatar'); onClose(); } },
    { label: 'Toggle Sidebar', action: () => toggleSidebar() },
    { label: 'Go to Messages', action: () => { navigate('/messages'); onClose(); } },
    { label: 'Create Date Plan', action: () => { navigate('/date-planner'); onClose(); } },
    { label: 'Open Evidence Board', action: () => { navigate('/case-notes'); onClose(); } },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(3px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '8vh',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global search and command palette"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <Search size={20} color="var(--text-muted)" />
          <input
            type="text"
            className="input"
            autoFocus
            placeholder="Search profiles, archives, relationship IDs, commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              border: 'none',
              padding: 0,
              minHeight: 'auto',
              fontSize: 'var(--font-size-md)',
              backgroundColor: 'transparent',
            }}
          />
          {query && (
            <button className="btn-ghost" onClick={() => setQuery('')} style={{ width: 28, height: 28, padding: 0 }}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters / Version Scoping */}
        {stage >= 2 && (
          <div
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-surface-subtle)',
              fontSize: 'var(--font-size-xs)',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Index scope:</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={acrossAllVersions}
                onChange={(e) => setAcrossAllVersions(e.target.checked)}
              />
              <span>Search across all platform versions (1999–2026)</span>
            </label>
          </div>
        )}

        {/* Results Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-3)' }}>
          {/* Active Search Results */}
          {searchResults ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Users */}
              {searchResults.users.length > 0 && (
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                    IDENTITIES & PROFILES
                  </div>
                  {searchResults.users.map((u) => (
                    <div
                      key={u.id}
                      onClick={() => handleSelect(`/discover/${u.id}`, u.displayName)}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      className="btn-ghost"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <User size={16} color="var(--text-muted)" />
                        <div>
                          <span style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{u.displayName}</span>{' '}
                          <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>@{u.handle}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{u.city}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Archive Items */}
              {searchResults.archive.length > 0 && (
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                    ARCHIVE & HISTORICAL RECORDS
                  </div>
                  {searchResults.archive.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => handleSelect(`/archive/item/${a.id}`, a.title)}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      className="btn-ghost"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <Archive size={16} color="var(--text-muted)" />
                        <span style={{ fontSize: 'var(--font-size-sm)' }}>{a.title}</span>
                      </div>
                      <span className="badge">{a.platform} ({a.year})</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Trust & Safety Cases */}
              {searchResults.cases.length > 0 && (
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                    INTERNAL TRUST & SAFETY CASES
                  </div>
                  {searchResults.cases.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleSelect(`/internal/trust/${c.id}`, c.caseNumber)}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      className="btn-ghost"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <Shield size={16} color="var(--color-danger)" />
                        <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{c.caseNumber}: {c.title}</span>
                      </div>
                      <span className="badge badge-anomaly">{c.severity}</span>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.users.length === 0 && searchResults.archive.length === 0 && searchResults.cases.length === 0 && (
                <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No matching platform records found.
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>RECENT SEARCHES</span>
                    <button className="btn-ghost" onClick={clearRecentSearches} style={{ fontSize: 'var(--font-size-xs)', padding: 0 }}>
                      Clear
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {recentSearches.map((term, i) => (
                      <span
                        key={i}
                        className="badge"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setQuery(term)}
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Commands */}
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  PLATFORM COMMANDS
                </div>
                {quickCommands.map((cmd, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      soundEngine.playCue('ui.navigation');
                      cmd.action();
                    }}
                    style={{
                      padding: 'var(--space-2) var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                    }}
                    className="btn-ghost"
                  >
                    <Terminal size={15} color="var(--text-muted)" />
                    <span style={{ fontSize: 'var(--font-size-sm)' }}>{cmd.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
