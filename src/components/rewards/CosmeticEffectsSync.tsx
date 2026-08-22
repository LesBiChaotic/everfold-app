import { useEffect } from 'react';
import { useRewardStore } from '../../store/rewardStore';
import { useSettingsStore } from '../../store/settingsStore';

const SOUND_THEME_MAP = {
  snd_soft_wood: 'soft',
  snd_paper_tactile: 'paper',
  snd_glass_resonant: 'glass',
} as const;

const AMBIENT_THEME_MAP = {
  amb_rain_window: 'rain_window',
  amb_quiet_room: 'quiet_office',
  amb_evening_lounge: 'evening_lounge',
  amb_archive_room: 'archive_room',
} as const;

/** Keeps persisted wardrobe choices connected to the rendered app experience. */
export const CosmeticEffectsSync = () => {
  const equipped = useRewardStore((state) => state.equippedCosmetics);
  const setSoundTheme = useSettingsStore((state) => state.setSoundTheme);
  const setAmbientTheme = useSettingsStore((state) => state.setAmbientTheme);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(equipped).forEach(([slot, value]) => {
      const attribute = `data-cosmetic-${slot.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
      root.setAttribute(attribute, value || 'none');
    });

    const soundTheme = SOUND_THEME_MAP[equipped.uiSoundThemeId as keyof typeof SOUND_THEME_MAP];
    const ambientTheme = AMBIENT_THEME_MAP[equipped.ambientThemeId as keyof typeof AMBIENT_THEME_MAP];
    if (soundTheme) setSoundTheme(soundTheme);
    if (ambientTheme) setAmbientTheme(ambientTheme);
  }, [equipped, setAmbientTheme, setSoundTheme]);

  return null;
};
