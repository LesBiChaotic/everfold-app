import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { soundEngine } from '../audio/soundEngine';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  font: 'everfold' | 'device';
  contrast: 'normal' | 'high';
  reducedMotion: boolean;
  density: 'comfortable' | 'compact';
  homeLayout: 'balanced' | 'social' | 'insights' | 'minimal';
  sidebarCollapsed: boolean;
  soundMuted: boolean;
  uiVolume: number;
  ambientVolume: number;
  ambientSoundEnabled: boolean;

  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setFont: (font: 'everfold' | 'device') => void;
  setContrast: (contrast: 'normal' | 'high') => void;
  setReducedMotion: (reduced: boolean) => void;
  setDensity: (density: 'comfortable' | 'compact') => void;
  setHomeLayout: (layout: 'balanced' | 'social' | 'insights' | 'minimal') => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setSoundMuted: (muted: boolean) => void;
  setUiVolume: (vol: number) => void;
  setAmbientVolume: (vol: number) => void;
  setAmbientSoundEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      font: 'everfold',
      contrast: 'normal',
      reducedMotion: false,
      density: 'comfortable',
      homeLayout: 'balanced',
      sidebarCollapsed: false,
      soundMuted: true, // sound OFF by default as per spec
      uiVolume: 0.7,
      ambientVolume: 0.3,
      ambientSoundEnabled: true,

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute(
          'data-theme',
          theme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : theme
        );
      },

      setFont: (font) => {
        set({ font });
        document.documentElement.setAttribute('data-font', font);
      },

      setContrast: (contrast) => {
        set({ contrast });
        document.documentElement.setAttribute('data-contrast', contrast);
      },

      setReducedMotion: (reducedMotion) => {
        set({ reducedMotion });
        document.documentElement.setAttribute('data-reduced-motion', String(reducedMotion));
      },

      setDensity: (density) => set({ density }),
      setHomeLayout: (homeLayout) => set({ homeLayout }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSoundMuted: (soundMuted) => {
        set({ soundMuted });
        soundEngine.setMuted(soundMuted);
      },

      setUiVolume: (uiVolume) => {
        set({ uiVolume });
        soundEngine.setVolumes(uiVolume, get().ambientVolume);
      },

      setAmbientVolume: (ambientVolume) => {
        set({ ambientVolume });
        soundEngine.setVolumes(get().uiVolume, ambientVolume);
      },

      setAmbientSoundEnabled: (ambientSoundEnabled) => set({ ambientSoundEnabled })
    }),
    {
      name: 'everfold_settings_v1'
    }
  )
);
