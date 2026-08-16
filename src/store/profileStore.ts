import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AvatarConfig, UserAccount } from '../types';
import { defaultAvatarConfig } from '../components/avatar/AvatarRenderer';

interface ProfileState {
  isOnboardingCompleted: boolean;
  visitorProfile: UserAccount;
  savedUserIds: string[];
  skippedUserIds: string[];
  interestedUserIds: string[];
  reportedUserIds: string[];
  avatarPresets: { id: string; name: string; config: AvatarConfig }[];

  setOnboardingCompleted: (completed: boolean) => void;
  updateVisitorProfile: (updates: Partial<UserAccount>) => void;
  updateVisitorAvatar: (avatarUpdates: Partial<AvatarConfig>) => void;
  saveUserProfile: (userId: string) => void;
  unsaveUserProfile: (userId: string) => void;
  skipUserProfile: (userId: string) => void;
  expressInterest: (userId: string) => void;
  reportUserProfile: (userId: string) => void;
  saveAvatarPreset: (name: string, config: AvatarConfig) => void;
  deleteAvatarPreset: (id: string) => void;
  resetProfileStore: () => void;
}

export const initialVisitorProfile: UserAccount = {
  id: 'visitor_user',
  displayName: 'Alex Rivers',
  handle: 'alexrivers',
  age: 32,
  pronouns: 'they/them',
  orientation: 'Open-minded / Queer',
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
      isOnboardingCompleted: true, // Defaults to completed so app is immediately testable/explorable
      visitorProfile: { ...initialVisitorProfile },
      savedUserIds: ['usr_naomi_serrano', 'usr_hana_prasetyo'],
      skippedUserIds: [],
      interestedUserIds: ['usr_mina_okafor', 'usr_dev_malik'],
      reportedUserIds: [],
      avatarPresets: [
        { id: 'preset_default', name: 'Original', config: { ...defaultAvatarConfig } },
        { id: 'preset_warm', name: 'Warm Evening', config: { ...defaultAvatarConfig, backgroundColor: '#fed7aa', top: 'hoodie', glasses: 'wire_round' } }
      ],

      setOnboardingCompleted: (completed) => set({ isOnboardingCompleted: completed }),

      updateVisitorProfile: (updates) =>
        set((state) => ({
          visitorProfile: { ...state.visitorProfile, ...updates }
        })),

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

      resetProfileStore: () =>
        set({
          isOnboardingCompleted: false,
          visitorProfile: { ...initialVisitorProfile },
          savedUserIds: [],
          skippedUserIds: [],
          interestedUserIds: [],
          reportedUserIds: []
        })
    }),
    {
      name: 'everfold_profile_v1'
    }
  )
);
