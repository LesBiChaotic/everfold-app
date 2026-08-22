import { useAdviceStore } from '../store/adviceStore';
import { useAppStore } from '../store/appStore';
import { useARGStore } from '../store/argStore';
import { useCommunityStore } from '../store/communityStore';
import { useLiveStore } from '../store/liveStore';
import { useMagazinePodcastStore } from '../store/magazinePodcastStore';
import { useProfileStore } from '../store/profileStore';
import { useQuizStore } from '../store/quizStore';
import { useRelationshipEcosystemStore } from '../store/relationshipEcosystemStore';
import { useRewardStore } from '../store/rewardStore';
import { useSocialSimulationStore } from '../store/socialSimulationStore';
import { useStoriesStore } from '../store/storiesStore';
import { useStoryAccessStore } from '../store/storyAccessStore';
import { useSupportStore } from '../store/supportStore';
import { useSystemStatusStore } from '../store/systemStatusStore';

export type RestartMode = 'keep-profile' | 'restart-onboarding';

export function resetEverfoldExperience(mode: RestartMode) {
  const preservedProfile = mode === 'keep-profile'
    ? {
        visitorProfile: useProfileStore.getState().visitorProfile,
        avatarPresets: useProfileStore.getState().avatarPresets,
      }
    : null;

  useAppStore.getState().resetAppStore();
  useARGStore.getState().resetARGStore();
  useQuizStore.getState().resetQuizStore();
  useRewardStore.getState().resetRewardProgress();
  useAdviceStore.getState().resetAdviceStore();
  useStoriesStore.getState().resetStoriesStore();
  useCommunityStore.getState().resetCommunityStore();
  useSocialSimulationStore.getState().resetSimulationStore();
  useSupportStore.getState().resetSupportStore();
  useSystemStatusStore.getState().resetSystemStatusStore();
  useRelationshipEcosystemStore.getState().resetRelationshipEcosystemStore();
  useMagazinePodcastStore.getState().resetMagazinePodcastStore();
  useLiveStore.getState().resetLiveStore();
  useStoryAccessStore.getState().resetStoryAccess();

  useProfileStore.getState().resetProfileStore();

  if (preservedProfile) {
    useProfileStore.setState({
      isOnboardingCompleted: true,
      visitorProfile: preservedProfile.visitorProfile,
      avatarPresets: preservedProfile.avatarPresets,
    });
  }
}
