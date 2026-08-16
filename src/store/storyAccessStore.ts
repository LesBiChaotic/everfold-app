import { create } from 'zustand';
import { StoryAccessMode, StoryAccessState } from '../types';
import { soundEngine } from '../audio/soundEngine';

const LOCAL_STORAGE_KEY = 'everfold.storyAccess.v1';
const SESSION_STORAGE_KEY = 'everfold.storyAccess.session.v1';

const DEFAULT_STATE: StoryAccessState = {
  mode: 'SPOILER_FREE',
  rememberOnDevice: false,
  revealHiddenLabels: false,
  showLockedPagePreviews: false,
  revealHiddenRoutes: false,
  unlockAllStoryPages: false,
  revealPuzzleAnswers: false,
  showPostARGStates: false,
  lastChangedAt: null,
  warningAcknowledged: false,
};

const PRESETS: Record<StoryAccessMode, Partial<StoryAccessState>> = {
  SPOILER_FREE: {
    revealHiddenLabels: false,
    showLockedPagePreviews: false,
    revealHiddenRoutes: false,
    unlockAllStoryPages: false,
    revealPuzzleAnswers: false,
    showPostARGStates: false,
  },
  LORE_PREVIEW: {
    revealHiddenLabels: true,
    showLockedPagePreviews: true,
    revealHiddenRoutes: false,
    unlockAllStoryPages: false,
    revealPuzzleAnswers: false,
    showPostARGStates: true,
  },
  FULL_ACCESS: {
    revealHiddenLabels: true,
    showLockedPagePreviews: true,
    revealHiddenRoutes: true,
    unlockAllStoryPages: true,
    revealPuzzleAnswers: false, // Explicit separate toggle
    showPostARGStates: true,
  },
};

function loadInitialState(): StoryAccessState {
  try {
    if (typeof window === 'undefined') return DEFAULT_STATE;

    // Check localStorage first
    const localRaw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (parsed && typeof parsed.mode === 'string') {
        return {
          ...DEFAULT_STATE,
          ...parsed,
          rememberOnDevice: true,
        };
      }
    }

    // Check sessionStorage
    const sessionRaw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionRaw) {
      const parsed = JSON.parse(sessionRaw);
      if (parsed && typeof parsed.mode === 'string') {
        return {
          ...DEFAULT_STATE,
          ...parsed,
          rememberOnDevice: false,
        };
      }
    }
  } catch (err) {
    console.warn('Failed to load StoryAccessState from storage:', err);
  }

  return DEFAULT_STATE;
}

function persistState(state: StoryAccessState) {
  if (typeof window === 'undefined') return;

  try {
    const payload = JSON.stringify(state);
    if (state.rememberOnDevice) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, payload);
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } else {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, payload);
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Failed to persist StoryAccessState:', err);
  }
}

interface StoryAccessStore extends StoryAccessState {
  // Actions
  setMode: (mode: StoryAccessMode, remember?: boolean) => void;
  setAdvancedToggle: (key: keyof Omit<StoryAccessState, 'mode' | 'rememberOnDevice' | 'lastChangedAt' | 'warningAcknowledged'>, value: boolean) => void;
  setRememberOnDevice: (remember: boolean) => void;
  acknowledgeWarning: () => void;
  resetStoryAccess: () => void;
}

export const useStoryAccessStore = create<StoryAccessStore>((set, get) => {
  const initial = loadInitialState();

  return {
    ...initial,

    setMode: (mode: StoryAccessMode, remember?: boolean) => {
      const currentRemember = remember !== undefined ? remember : get().rememberOnDevice;
      const preset = PRESETS[mode] || PRESETS.SPOILER_FREE;
      const now = new Date().toISOString();

      if (mode === 'LORE_PREVIEW') {
        soundEngine.playCue('storyAccess.previewEnabled');
      } else if (mode === 'FULL_ACCESS') {
        soundEngine.playCue('storyAccess.fullEnabled');
      } else {
        soundEngine.playCue('storyAccess.reset');
      }

      const updated: StoryAccessState = {
        ...get(),
        ...preset,
        mode,
        rememberOnDevice: currentRemember,
        lastChangedAt: now,
        warningAcknowledged: mode !== 'SPOILER_FREE',
      };

      persistState(updated);
      set(updated);
    },

    setAdvancedToggle: (key, value) => {
      soundEngine.playCue('ui.navigation');
      const now = new Date().toISOString();
      const updated: StoryAccessState = {
        ...get(),
        [key]: value,
        lastChangedAt: now,
      };

      persistState(updated);
      set(updated);
    },

    setRememberOnDevice: (remember: boolean) => {
      soundEngine.playCue('ui.navigation');
      const updated: StoryAccessState = {
        ...get(),
        rememberOnDevice: remember,
      };

      persistState(updated);
      set(updated);
    },

    acknowledgeWarning: () => {
      const updated: StoryAccessState = {
        ...get(),
        warningAcknowledged: true,
      };
      persistState(updated);
      set(updated);
    },

    resetStoryAccess: () => {
      soundEngine.playCue('storyAccess.reset');
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem(LOCAL_STORAGE_KEY);
          window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
        } catch (e) {
          // ignore
        }
      }

      const resetState: StoryAccessState = {
        ...DEFAULT_STATE,
        lastChangedAt: new Date().toISOString(),
      };

      set(resetState);
    },
  };
});
