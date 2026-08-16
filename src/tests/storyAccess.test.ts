import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { useStoryAccessStore } from '../store/storyAccessStore';
import { useARGStore } from '../store/argStore';
import { canAccessStoryRoute, shouldShowHiddenNavItem, canPreviewRoute } from '../app/routeMetadata';

class MemoryStorage {
  private store: Record<string, string> = {};
  getItem(key: string) { return this.store[key] || null; }
  setItem(key: string, value: string) { this.store[key] = value; }
  removeItem(key: string) { delete this.store[key]; }
  clear() { this.store = {}; }
}

describe('Story Access & Spoiler Controls (Addendum v0.2)', () => {
  beforeAll(() => {
    if (typeof window === 'undefined') {
      (global as any).window = {
        localStorage: new MemoryStorage(),
        sessionStorage: new MemoryStorage(),
      };
    }
  });

  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    useStoryAccessStore.getState().resetStoryAccess();
    useARGStore.getState().resetARGStore();
  });

  it('initializes with SPOILER_FREE as the default mode', () => {
    const state = useStoryAccessStore.getState();
    expect(state.mode).toBe('SPOILER_FREE');
    expect(state.revealHiddenLabels).toBe(false);
    expect(state.showLockedPagePreviews).toBe(false);
    expect(state.revealHiddenRoutes).toBe(false);
    expect(state.unlockAllStoryPages).toBe(false);
    expect(state.revealPuzzleAnswers).toBe(false);
  });

  it('applies preset flags correctly when switching to LORE_PREVIEW', () => {
    const { setMode } = useStoryAccessStore.getState();
    setMode('LORE_PREVIEW');

    const state = useStoryAccessStore.getState();
    expect(state.mode).toBe('LORE_PREVIEW');
    expect(state.revealHiddenLabels).toBe(true);
    expect(state.showLockedPagePreviews).toBe(true);
    expect(state.revealHiddenRoutes).toBe(false);
    expect(state.unlockAllStoryPages).toBe(false);
    expect(state.revealPuzzleAnswers).toBe(false); // Puzzle answers remain explicit toggle
  });

  it('applies preset flags correctly when switching to FULL_ACCESS', () => {
    const { setMode } = useStoryAccessStore.getState();
    setMode('FULL_ACCESS');

    const state = useStoryAccessStore.getState();
    expect(state.mode).toBe('FULL_ACCESS');
    expect(state.revealHiddenLabels).toBe(true);
    expect(state.showLockedPagePreviews).toBe(true);
    expect(state.revealHiddenRoutes).toBe(true);
    expect(state.unlockAllStoryPages).toBe(true);
    expect(state.revealPuzzleAnswers).toBe(false); // Explicit toggle required even in Full Access
  });

  it('bypasses story route guards under FULL_ACCESS without mutating real progression', () => {
    const argState = useARGStore.getState();
    const storyAccess = useStoryAccessStore.getState();

    // In SPOILER_FREE at stage 0, /archive/pattern-integrity should be locked
    const canAccessBefore = canAccessStoryRoute(
      '/archive/pattern-integrity',
      argState.stage,
      argState.solvedPuzzleIds,
      argState.storyFlags,
      storyAccess
    );
    expect(canAccessBefore).toBe(false);

    // Enable FULL_ACCESS
    useStoryAccessStore.getState().setMode('FULL_ACCESS');
    const fullAccessState = useStoryAccessStore.getState();

    const canAccessAfter = canAccessStoryRoute(
      '/archive/pattern-integrity',
      argState.stage,
      argState.solvedPuzzleIds,
      argState.storyFlags,
      fullAccessState
    );
    expect(canAccessAfter).toBe(true);

    // Verify true ARG progression is NOT mutated
    expect(useARGStore.getState().stage).toBe(0);
    expect(useARGStore.getState().solvedPuzzleIds).toHaveLength(0);
  });

  it('does not unlock locked routes in LORE_PREVIEW', () => {
    useStoryAccessStore.getState().setMode('LORE_PREVIEW');
    const argState = useARGStore.getState();
    const storyAccess = useStoryAccessStore.getState();

    const canAccess = canAccessStoryRoute(
      '/archive/pattern-integrity',
      argState.stage,
      argState.solvedPuzzleIds,
      argState.storyFlags,
      storyAccess
    );
    expect(canAccess).toBe(false);

    // But preview should be allowed
    const canPreview = canPreviewRoute('/archive/pattern-integrity', storyAccess);
    expect(canPreview).toBe(true);
  });

  it('shows hidden navigation items only when revealHiddenRoutes is enabled', () => {
    const argState = useARGStore.getState();
    const defaultAccess = useStoryAccessStore.getState();

    const showDefault = shouldShowHiddenNavItem(
      '/archive/pattern-integrity',
      argState.stage,
      argState.solvedPuzzleIds,
      argState.storyFlags,
      defaultAccess
    );
    expect(showDefault).toBe(false);

    useStoryAccessStore.getState().setMode('FULL_ACCESS');
    const fullAccess = useStoryAccessStore.getState();

    const showFull = shouldShowHiddenNavItem(
      '/archive/pattern-integrity',
      argState.stage,
      argState.solvedPuzzleIds,
      argState.storyFlags,
      fullAccess
    );
    expect(showFull).toBe(true);
  });

  it('preserves genuine puzzle solves when resetting Story Access', () => {
    // Player genuinely solves Gate 1
    useARGStore.getState().solvePuzzle('puz_gate_1_archive');
    expect(useARGStore.getState().solvedPuzzleIds).toContain('puz_gate_1_archive');

    // Player toggles Full Access
    useStoryAccessStore.getState().setMode('FULL_ACCESS');
    expect(useStoryAccessStore.getState().mode).toBe('FULL_ACCESS');

    // Player resets Story Access
    useStoryAccessStore.getState().resetStoryAccess();
    expect(useStoryAccessStore.getState().mode).toBe('SPOILER_FREE');

    // Genuine puzzle solves remain intact
    expect(useARGStore.getState().solvedPuzzleIds).toContain('puz_gate_1_archive');
  });

  it('persists in localStorage when rememberOnDevice is true and sessionStorage when false', () => {
    // Non-remembered mode
    useStoryAccessStore.getState().setMode('LORE_PREVIEW', false);
    expect(window.sessionStorage.getItem('everfold.storyAccess.session.v1')).not.toBeNull();
    expect(window.localStorage.getItem('everfold.storyAccess.v1')).toBeNull();

    // Remembered mode
    useStoryAccessStore.getState().setMode('FULL_ACCESS', true);
    expect(window.localStorage.getItem('everfold.storyAccess.v1')).not.toBeNull();
    expect(window.sessionStorage.getItem('everfold.storyAccess.session.v1')).toBeNull();
  });
});
