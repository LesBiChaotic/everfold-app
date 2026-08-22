import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '../store/appStore';
import { useProfileStore } from '../store/profileStore';
import { resetEverfoldExperience } from '../utils/resetEverfoldExperience';

describe('full experience restart', () => {
  beforeEach(() => {
    useAppStore.getState().resetAppStore();
    useProfileStore.getState().resetProfileStore();
    useProfileStore.getState().setOnboardingCompleted(true);
  });

  it('can reset activity while preserving the created profile', () => {
    useProfileStore.getState().updateVisitorProfile({ displayName: 'Seal Tester' });
    useProfileStore.getState().saveUserProfile('usr_test_saved');
    useAppStore.getState().sendMessage('th_hana_visitor', 'Temporary message');

    resetEverfoldExperience('keep-profile');

    expect(useProfileStore.getState().visitorProfile.displayName).toBe('Seal Tester');
    expect(useProfileStore.getState().isOnboardingCompleted).toBe(true);
    expect(useProfileStore.getState().savedUserIds).not.toContain('usr_test_saved');
    const messages = useAppStore.getState().messages.th_hana_visitor;
    expect(messages[messages.length - 1]?.body).not.toBe('Temporary message');
  });

  it('can erase the profile and return to onboarding', () => {
    useProfileStore.getState().updateVisitorProfile({ displayName: 'Seal Tester' });

    resetEverfoldExperience('restart-onboarding');

    expect(useProfileStore.getState().visitorProfile.displayName).toBe('Alex Rivers');
    expect(useProfileStore.getState().isOnboardingCompleted).toBe(false);
  });
});
