import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AvatarConfig, UserAccount } from '../types';
import { defaultAvatarConfig } from '../components/avatar/AvatarRenderer';

export interface AvatarPreset {
  id: string;
  name: string;
  config: AvatarConfig;
}

interface ProfileState {
  profileSchemaVersion: number;
  isOnboardingCompleted: boolean;
  visitorProfile: UserAccount;
  savedUserIds: string[];
  skippedUserIds: string[];
  interestedUserIds: string[];
  reportedUserIds: string[];
  avatarPresets: AvatarPreset[];
  lastEditSnapshot: Partial<UserAccount> | null;
  isFirstRevisitNoticeDismissed: boolean;

  setOnboardingCompleted: (completed: boolean) => void;
  updateVisitorProfile: (updates: Partial<UserAccount>) => void;
  patchVisitorProfile: (updates: Partial<UserAccount>) => void;
  undoProfileEdit: () => boolean;
  updateVisitorAvatar: (avatarUpdates: Partial<AvatarConfig>) => void;
  saveUserProfile: (userId: string) => void;
  unsaveUserProfile: (userId: string) => void;
  skipUserProfile: (userId: string) => void;
  expressInterest: (userId: string) => void;
  reportUserProfile: (userId: string) => void;
  saveAvatarPreset: (name: string, config: AvatarConfig) => void;
  deleteAvatarPreset: (id: string) => void;
  applyAvatarPreset: (id: string) => void;
  dismissFirstRevisitNotice: () => void;
  resetProfileStore: () => void;
}

export const defaultAvatarPresets: AvatarPreset[] = [
  { id: 'preset_everyday', name: 'Everyday', config: { ...defaultAvatarConfig } },
  { id: 'preset_night_out', name: 'Night Out', config: { ...defaultAvatarConfig, backgroundColor: '#252028', top: 'collared_shirt', glasses: 'wire_round' } },
  { id: 'preset_rainy_day', name: 'Rainy Day', config: { ...defaultAvatarConfig, backgroundColor: '#e4e9f5', top: 'hoodie', outerwear: 'denim_jacket' } },
  { id: 'preset_museum', name: 'Museum', config: { ...defaultAvatarConfig, backgroundColor: '#f3ebd4', top: 'turtleneck', glasses: 'thick_square' } },
  { id: 'preset_workday', name: 'Workday', config: { ...defaultAvatarConfig, backgroundColor: '#e2eee6', top: 'collared_shirt' } },
];

export const initialVisitorProfile: UserAccount = {
  id: 'visitor_user',
  displayName: 'Alex Rivers',
  handle: 'alexrivers',
  age: 32,
  pronouns: 'they/them',
  orientation: 'Open-minded / Queer',
  genderIdentity: null, // Additive field as per Addendum v1.0
  city: 'Portland',
  country: 'USA',
  occupation: 'Architectural Conservator',
  languages: ['English', 'French'],
  relationshipGoals: 'Intentional, grounded partnership',
  interests: ['Architecture', 'Film Photography', 'Ceramics', 'Tea Ceremony', 'Old Libraries'],
  lifestyle: { drinking: 'Socially', smoking: 'No', pets: 'Cats', children: 'Open' },
  communicationStyle: 'Direct and reflective',
  socialEnergy: 'Ambivert',
  schedule: 'Evenings and weekends',
  boundaries: ['Emotional honesty', 'Respecting creative quiet'],
  dealBreakers: ['Inauthenticity', 'Disrespect'],
  profilePromptAnswers: [
    { id: 'vp1', question: 'My ideal Sunday evening looks like', answer: 'Low warm lighting, boiling a pot of tea, and listening to rain on the window.' },
    { id: 'vp2', question: 'A boundary I hold firmly', answer: 'I value clear, calm conversations over passive-aggressive guessing games.' },
    { id: 'vp3', question: 'Something I am quietly proud of', answer: 'Restoring a 1910 timber frame porch using traditional joinery.' }
  ],
  avatarConfig: { ...defaultAvatarConfig },
  status: 'Active now',
  createdAt: '2026-08-16T12:00:00Z',
  lastActive: '2026-08-16T12:13:37Z',
  isArchived: false,
  legacyAliases: [],
  visibility: 'public',
  storyFlags: ['visitor_occupant']
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profileSchemaVersion: 2,
      isOnboardingCompleted: true, // Defaults to completed so app is immediately testable/explorable
      visitorProfile: { ...initialVisitorProfile },
      savedUserIds: ['usr_naomi_serrano', 'usr_hana_prasetyo'],
      skippedUserIds: [],
      interestedUserIds: ['usr_mina_okafor', 'usr_dev_malik'],
      reportedUserIds: [],
      avatarPresets: [...defaultAvatarPresets],
      lastEditSnapshot: null,
      isFirstRevisitNoticeDismissed: false,

      setOnboardingCompleted: (completed) => set({ isOnboardingCompleted: completed }),

      updateVisitorProfile: (updates) =>
        set((state) => ({
          visitorProfile: { ...state.visitorProfile, ...updates }
        })),

      patchVisitorProfile: (updates) =>
        set((state) => {
          // Take snapshot of changed fields for safe undo
          const snapshot: Partial<UserAccount> = {};
          (Object.keys(updates) as (keyof UserAccount)[]).forEach((key) => {
            snapshot[key] = state.visitorProfile[key] as any;
          });

          return {
            lastEditSnapshot: snapshot,
            visitorProfile: { ...state.visitorProfile, ...updates }
          };
        }),

      undoProfileEdit: () => {
        const { lastEditSnapshot, visitorProfile } = get();
        if (!lastEditSnapshot) return false;
        set({
          visitorProfile: { ...visitorProfile, ...lastEditSnapshot },
          lastEditSnapshot: null
        });
        return true;
      },

      updateVisitorAvatar: (avatarUpdates) =>
        set((state) => ({
          visitorProfile: {
            ...state.visitorProfile,
            avatarConfig: { ...state.visitorProfile.avatarConfig, ...avatarUpdates }
          }
        })),

      saveUserProfile: (userId) =>
        set((state) => ({
          savedUserIds: state.savedUserIds.includes(userId)
            ? state.savedUserIds
            : [...state.savedUserIds, userId]
        })),

      unsaveUserProfile: (userId) =>
        set((state) => ({
          savedUserIds: state.savedUserIds.filter((id) => id !== userId)
        })),

      skipUserProfile: (userId) =>
        set((state) => ({
          skippedUserIds: state.skippedUserIds.includes(userId)
            ? state.skippedUserIds
            : [...state.skippedUserIds, userId]
        })),

      expressInterest: (userId) =>
        set((state) => ({
          interestedUserIds: state.interestedUserIds.includes(userId)
            ? state.interestedUserIds
            : [...state.interestedUserIds, userId]
        })),

      reportUserProfile: (userId) =>
        set((state) => ({
          reportedUserIds: state.reportedUserIds.includes(userId)
            ? state.reportedUserIds
            : [...state.reportedUserIds, userId]
        })),

      saveAvatarPreset: (name, config) =>
        set((state) => ({
          avatarPresets: [
            ...state.avatarPresets,
            { id: `preset_${Date.now()}`, name, config }
          ]
        })),

      deleteAvatarPreset: (id) =>
        set((state) => ({
          avatarPresets: state.avatarPresets.filter((p) => p.id !== id)
        })),

      applyAvatarPreset: (id) => {
        const preset = get().avatarPresets.find((p) => p.id === id);
        if (preset) {
          get().updateVisitorAvatar(preset.config);
        }
      },

      dismissFirstRevisitNotice: () => set({ isFirstRevisitNoticeDismissed: true }),

      resetProfileStore: () =>
        set({
          isOnboardingCompleted: false,
          visitorProfile: { ...initialVisitorProfile },
          savedUserIds: [],
          skippedUserIds: [],
          interestedUserIds: [],
          reportedUserIds: [],
          avatarPresets: [...defaultAvatarPresets],
          lastEditSnapshot: null,
          isFirstRevisitNoticeDismissed: false
        })
    }),
    {
      name: 'everfold_profile_v1',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (!persistedState) return persistedState;
        if (version < 2) {
          return {
            ...persistedState,
            profileSchemaVersion: 2,
            visitorProfile: {
              ...initialVisitorProfile,
              ...(persistedState.visitorProfile || {}),
              genderIdentity: persistedState?.visitorProfile?.genderIdentity ?? null,
            },
            avatarPresets: persistedState.avatarPresets?.length ? persistedState.avatarPresets : defaultAvatarPresets,
            lastEditSnapshot: null,
            isFirstRevisitNoticeDismissed: persistedState.isFirstRevisitNoticeDismissed ?? false,
          };
        }
        return persistedState;
      }
    }
  )
);
