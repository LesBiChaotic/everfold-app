import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ARGStage, EvidenceItem, TheoryStatus } from '../types';
import { SEEDED_PUZZLES } from '../data/puzzles';
import { soundEngine } from '../audio/soundEngine';

interface ARGState {
  stage: ARGStage;
  storyFlags: string[];
  solvedPuzzleIds: string[];
  puzzleAttempts: Record<string, number>;
  visitCounts: {
    home: number;
    discover: number;
    archive: number;
    forecast: number;
    connections: number;
    pulse: number;
    messages: number;
  };
  evidenceItems: EvidenceItem[];
  theories: TheoryStatus[];
  debugDrawerOpen: boolean;

  // Actions
  setStage: (stage: ARGStage) => void;
  advanceStageIfEligible: () => void;
  addStoryFlag: (flag: string) => void;
  recordVisit: (page: keyof ARGState['visitCounts']) => void;
  solvePuzzle: (puzzleId: string) => void;
  recordPuzzleAttempt: (puzzleId: string) => void;
  addEvidenceBookmark: (item: Omit<EvidenceItem, 'id'>) => void;
  updateEvidenceNote: (id: string, note: string) => void;
  linkEvidenceItems: (idA: string, idB: string) => void;
  removeEvidence: (id: string) => void;
  setTheoryStance: (theoryId: TheoryStatus['id'], stance: TheoryStatus['stance'], reasoning?: string) => void;
  toggleDebugDrawer: () => void;
  resetARGStore: () => void;
}

const initialTheories: TheoryStatus[] = [
  {
    id: 'Predictive',
    name: 'Purely Predictive Model',
    description: 'Everfold’s algorithms simply calculate natural human personality convergence over decades.',
    stance: 'Unmarked'
  },
  {
    id: 'Causative',
    name: 'Algorithmic Self-Fulfilling Loop',
    description: 'The app’s suggestions and timing subtly shape participant behavior to recreate past relationship dynamics.',
    stance: 'Unmarked'
  },
  {
    id: 'Continuity',
    name: 'Immortal Relational Containers',
    description: 'The platform intentionally preserves vacant relationship coordinates across generations, populating them with replacement participants.',
    stance: 'Unmarked'
  },
  {
    id: 'Replacement',
    name: 'Active Role Replacement',
    description: 'When a participant leaves or dies, the system actively identifies a replacement to sustain the emotional equilibrium of the surviving role.',
    stance: 'Unmarked'
  },
  {
    id: 'Model_Contamination',
    name: 'Legacy Model Contamination',
    description: '30 years of unpurged training data from 1999–2026 has corrupted the modern matching weight vectors.',
    stance: 'Unmarked'
  },
  {
    id: 'External_Phenomenon',
    name: 'Unknown External Phenomenon',
    description: 'Human relationships repeat in closed topological lattices that the platform accidentally detected and indexed.',
    stance: 'Unmarked'
  }
];

export const useARGStore = create<ARGState>()(
  persist(
    (set, get) => ({
      stage: 0,
      storyFlags: [],
      solvedPuzzleIds: [],
      puzzleAttempts: {},
      visitCounts: {
        home: 0,
        discover: 0,
        archive: 0,
        forecast: 0,
        connections: 0,
        pulse: 0,
        messages: 0
      },
      evidenceItems: [
        {
          id: 'ev_init_1',
          category: 'Archive',
          sourceType: 'ArchiveItem',
          sourceId: 'arch_pairwise_0814',
          title: 'Pairwise 1999: Relationship ID Decoupling',
          summary: '1999 system memo confirms RELATIONSHIP_ID is independent of participant account IDs.',
          date: '1999-08-14',
          linkedIds: [],
          confidence: 'Strongly Supported',
          playerNote: 'The relational primary key persists even when dial-up user accounts are destroyed.'
        }
      ],
      theories: [...initialTheories],
      debugDrawerOpen: false,

      setStage: (stage) => set({ stage }),

      advanceStageIfEligible: () => {
        const { flags, solved, stage } = {
          flags: get().storyFlags,
          solved: get().solvedPuzzleIds,
          stage: get().stage
        };

        let nextStage: ARGStage = stage;

        if (stage === 0 && (get().visitCounts.archive >= 2 || flags.includes('foundHanaGlitch'))) {
          nextStage = 1; // MINOR_ODDITIES
        }
        if (stage <= 1 && (flags.includes('gate0814ClueGiven') || solved.includes('gate_0814_legacy'))) {
          nextStage = 2; // PRIOR_CONNECTIONS
        }
        if (stage <= 2 && solved.includes('gate_0814_legacy')) {
          nextStage = 3; // LEGACY_ARCHIVE
        }
        if (stage <= 3 && (solved.includes('gate_4417_meredith') || solved.includes('gate_0712_leah'))) {
          nextStage = 4; // TRUST_SAFETY_INTERNAL
        }
        if (stage <= 4 && (solved.includes('gate_role_resolver') || solved.includes('gate_graph_alignment'))) {
          nextStage = 5; // RECURRENCE
        }
        if (stage <= 5 && (solved.includes('gate_97_2_forecast') || flags.includes('foundReturn'))) {
          nextStage = 6; // POSTHUMOUS
        }
        if (stage <= 6 && (flags.includes('visitorExportAnomaly') || get().evidenceItems.length >= 5)) {
          nextStage = 7; // VISITOR_INVOLVEMENT
        }
        if (stage <= 7 && (solved.includes('gate_10_previouslymatched') || flags.includes('final_sequence_unlocked'))) {
          nextStage = 8; // CONFLICTED_REALITY
        }

        if (nextStage !== stage) {
          set({ stage: nextStage });
          soundEngine.playCue('ui.notification');
        }
      },

      addStoryFlag: (flag) =>
        set((state) => {
          if (state.storyFlags.includes(flag)) return state;
          const updatedFlags = [...state.storyFlags, flag];
          setTimeout(() => get().advanceStageIfEligible(), 100);
          return { storyFlags: updatedFlags };
        }),

      recordVisit: (page) =>
        set((state) => {
          const currentCount = state.visitCounts[page] || 0;
          const updated = { ...state.visitCounts, [page]: currentCount + 1 };
          setTimeout(() => get().advanceStageIfEligible(), 100);
          return { visitCounts: updated };
        }),

      solvePuzzle: (puzzleId) =>
        set((state) => {
          if (state.solvedPuzzleIds.includes(puzzleId)) return state;
          const puzzle = SEEDED_PUZZLES.find((p) => p.id === puzzleId);
          const rewardFlags = puzzle ? puzzle.rewardFlags : [];
          soundEngine.playCue(puzzleId.includes('return') ? 'arg.returnSuccess' : 'ui.success');

          const updatedFlags = Array.from(new Set([...state.storyFlags, ...rewardFlags]));
          setTimeout(() => get().advanceStageIfEligible(), 100);
          return {
            solvedPuzzleIds: [...state.solvedPuzzleIds, puzzleId],
            storyFlags: updatedFlags
          };
        }),

      recordPuzzleAttempt: (puzzleId) =>
        set((state) => ({
          puzzleAttempts: {
            ...state.puzzleAttempts,
            [puzzleId]: (state.puzzleAttempts[puzzleId] || 0) + 1
          }
        })),

      addEvidenceBookmark: (itemData) =>
        set((state) => {
          const newEv: EvidenceItem = {
            ...itemData,
            id: `ev_${Date.now()}`
          };
          soundEngine.playCue('ui.save');
          setTimeout(() => get().advanceStageIfEligible(), 100);
          return { evidenceItems: [newEv, ...state.evidenceItems] };
        }),

      updateEvidenceNote: (id, note) =>
        set((state) => ({
          evidenceItems: state.evidenceItems.map((e) => (e.id === id ? { ...e, playerNote: note } : e))
        })),

      linkEvidenceItems: (idA, idB) =>
        set((state) => ({
          evidenceItems: state.evidenceItems.map((e) => {
            if (e.id === idA && !e.linkedIds.includes(idB)) {
              return { ...e, linkedIds: [...e.linkedIds, idB] };
            }
            if (e.id === idB && !e.linkedIds.includes(idA)) {
              return { ...e, linkedIds: [...e.linkedIds, idA] };
            }
            return e;
          })
        })),

      removeEvidence: (id) =>
        set((state) => ({
          evidenceItems: state.evidenceItems.filter((e) => e.id !== id)
        })),

      setTheoryStance: (theoryId, stance, reasoning) =>
        set((state) => ({
          theories: state.theories.map((t) =>
            t.id === theoryId ? { ...t, stance, playerReasoning: reasoning || t.playerReasoning } : t
          )
        })),

      toggleDebugDrawer: () => set((state) => ({ debugDrawerOpen: !state.debugDrawerOpen })),

      resetARGStore: () =>
        set({
          stage: 0,
          storyFlags: [],
          solvedPuzzleIds: [],
          puzzleAttempts: {},
          visitCounts: {
            home: 0,
            discover: 0,
            archive: 0,
            forecast: 0,
            connections: 0,
            pulse: 0,
            messages: 0
          },
          evidenceItems: [],
          theories: [...initialTheories],
          debugDrawerOpen: false
        })
    }),
    {
      name: 'everfold_arg_state_v1'
    }
  )
);
