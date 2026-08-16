import { StoryAccessState } from '../types';

export interface RouteMetadata {
  path: string;
  title: string;
  navLabel: string;
  requiredStage: number;
  requiredFlags: string[];
  requiredPuzzles: string[];
  hiddenUntilUnlocked: boolean;
  previewAllowed: boolean;
  previewTitle: string;
  previewSummary: string;
  spoilerTier: number; // 0 to 8
}

export const STORY_ROUTES_METADATA: RouteMetadata[] = [
  {
    path: '/archive/pattern-integrity',
    title: 'Pattern Integrity Charter',
    navLabel: 'Pattern Integrity',
    requiredStage: 3,
    requiredFlags: ['gate_0814_solved', 'meredith_partner_history'],
    requiredPuzzles: ['puz_gate_1_archive'],
    hiddenUntilUnlocked: true,
    previewAllowed: true,
    previewTitle: 'Pattern Integrity Research Division',
    previewSummary: 'Confidential research group founded in 2008 to investigate why relationship structures persist across platform migrations.',
    spoilerTier: 4,
  },
  {
    path: '/internal/role-resolver',
    title: 'ROLE_RESOLVER Service Spec',
    navLabel: 'Role Resolver',
    requiredStage: 4,
    requiredFlags: ['gate_role_resolver_solved'],
    requiredPuzzles: ['puz_gate_5_resolver'],
    hiddenUntilUnlocked: true,
    previewAllowed: true,
    previewTitle: 'ROLE_RESOLVER System Daemon',
    previewSummary: 'Backend daemon that pre-allocates placeholder participant slots before candidate members register.',
    spoilerTier: 5,
  },
  {
    path: '/archive/returns',
    title: 'The Invariant Milestone: RETURN Memo',
    navLabel: 'Persistent Returns',
    requiredStage: 5,
    requiredFlags: ['gate_return_solved'],
    requiredPuzzles: ['puz_gate_9_return'],
    hiddenUntilUnlocked: true,
    previewAllowed: true,
    previewTitle: 'Persistent Event Invariant: RETURN',
    previewSummary: 'Memorandum documenting the 99.8% invariant convergence event observed across four platform generations.',
    spoilerTier: 6,
  },
  {
    path: '/internal/ethics/2017',
    title: 'Ethics Board Meeting Minutes (2017)',
    navLabel: 'Ethics 2017 Dispute',
    requiredStage: 4,
    requiredFlags: ['gate_ts19_ethics_notes'],
    requiredPuzzles: ['puz_gate_7_ethics'],
    hiddenUntilUnlocked: true,
    previewAllowed: true,
    previewTitle: 'Session 19: The Determinism Controversy',
    previewSummary: 'Dissenting memorandum by Dr. Nia Banerjee regarding platform-induced recurrence and lack of user informed consent.',
    spoilerTier: 5,
  },
  {
    path: '/archive/collisions',
    title: 'Database Migration & Collision Logs',
    navLabel: 'Cross-Version Collisions',
    requiredStage: 3,
    requiredFlags: ['gate_pairwise_lineage'],
    requiredPuzzles: ['puz_gate_6_lineage'],
    hiddenUntilUnlocked: true,
    previewAllowed: true,
    previewTitle: 'Historical Collision & Lineage Audit',
    previewSummary: 'Four generations of schema migrations proving relationship containers survived account deletion.',
    spoilerTier: 4,
  },
  {
    path: '/connections/recurrence',
    title: 'Recurrence Alignment Topology',
    navLabel: 'Recurrence Graph',
    requiredStage: 5,
    requiredFlags: ['gate_recurrence_aligned'],
    requiredPuzzles: ['puz_gate_7_alignment'],
    hiddenUntilUnlocked: true,
    previewAllowed: true,
    previewTitle: 'Recurrence Topology Alignment',
    previewSummary: 'Topological overlay mapping persistent pairs across 1999–2026.',
    spoilerTier: 5,
  },
  {
    path: '/forecast/raw/rel_2347_previouslymatched',
    title: 'Raw Markov Diagnostics',
    navLabel: 'Raw Markov Diagnostics',
    requiredStage: 6,
    requiredFlags: ['gate_markov_97_2'],
    requiredPuzzles: ['puz_gate_8_markov'],
    hiddenUntilUnlocked: true,
    previewAllowed: true,
    previewTitle: 'Raw Markov Telemetry',
    previewSummary: 'Direct mathematical diagnostics displaying invariant convergence probability \(R \ge 0.972\).',
    spoilerTier: 6,
  },
  {
    path: '/member/previouslymatched',
    title: '@previouslymatched Convergence',
    navLabel: '@previouslymatched',
    requiredStage: 7,
    requiredFlags: ['gate_10_previouslymatched', 'stage_7_unlocked'],
    requiredPuzzles: ['puz_gate_10_convergence'],
    hiddenUntilUnlocked: true,
    previewAllowed: true,
    previewTitle: '@previouslymatched Resolution Dossier',
    previewSummary: 'Reconciliation screen: Participant assignment confidence 63%, Relationship continuity confidence 99.8%.',
    spoilerTier: 7,
  },
  {
    path: '/case-notes/interpretation',
    title: 'Final Interpretation Framework',
    navLabel: 'Theory Interpretation',
    requiredStage: 6,
    requiredFlags: ['clue_major_cluster'],
    requiredPuzzles: [],
    hiddenUntilUnlocked: false,
    previewAllowed: true,
    previewTitle: '6 Theories of Relational Persistence',
    previewSummary: 'Synthesize your collected evidence across the 6 candidate interpretations.',
    spoilerTier: 8,
  },
];

export function getRouteMetadata(path: string): RouteMetadata | undefined {
  return STORY_ROUTES_METADATA.find((m) => m.path === path || path.startsWith(m.path));
}

export function canAccessStoryRoute(
  path: string,
  argStage: number,
  solvedPuzzles: string[],
  storyFlags: string[],
  storyAccess: StoryAccessState
): boolean {
  // FULL_ACCESS bypasses narrative route guards
  if (storyAccess.unlockAllStoryPages) {
    return true;
  }

  const meta = getRouteMetadata(path);
  if (!meta) return true; // Standard non-story routes are freely accessible

  // Check stage prerequisite
  if (argStage < meta.requiredStage) return false;

  // Check puzzle prerequisites
  if (meta.requiredPuzzles.length > 0) {
    const allPuzzlesSolved = meta.requiredPuzzles.every((puzId) => solvedPuzzles.includes(puzId));
    if (!allPuzzlesSolved) return false;
  }

  // Check flag prerequisites
  if (meta.requiredFlags.length > 0) {
    const allFlagsMet = meta.requiredFlags.some((flag) => storyFlags.includes(flag));
    if (!allFlagsMet) return false;
  }

  return true;
}

export function shouldShowHiddenNavItem(
  path: string,
  argStage: number,
  solvedPuzzles: string[],
  storyFlags: string[],
  storyAccess: StoryAccessState
): boolean {
  // FULL_ACCESS reveals all hidden navigation items
  if (storyAccess.revealHiddenRoutes) {
    return true;
  }

  const meta = getRouteMetadata(path);
  if (!meta || !meta.hiddenUntilUnlocked) {
    return true; // Not a hidden item
  }

  // Otherwise, only show if genuine progression allows it
  return canAccessStoryRoute(path, argStage, solvedPuzzles, storyFlags, storyAccess);
}

export function canPreviewRoute(path: string, storyAccess: StoryAccessState): boolean {
  if (storyAccess.showLockedPagePreviews) return true;
  const meta = getRouteMetadata(path);
  return !!meta?.previewAllowed;
}
