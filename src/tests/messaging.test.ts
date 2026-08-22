import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '../store/appStore';

describe('Messaging roles', () => {
  beforeEach(() => {
    useAppStore.getState().resetAppStore();
  });

  it('keeps player replies and partner responses on their correct sides', () => {
    const thread = useAppStore.getState().threads.find((item) =>
      item.participantIds.includes('visitor_user')
    );
    expect(thread).toBeDefined();

    useAppStore.getState().sendMessage(thread!.id, 'Player choice');
    useAppStore.getState().receiveMessage(thread!.id, 'Partner response');

    const latest = useAppStore.getState().messages[thread!.id].slice(-2);
    expect(latest[0].senderId).toBe('visitor_user');
    expect(latest[1].senderId).toBe(
      thread!.participantIds.find((participantId) => participantId !== 'visitor_user')
    );
  });
});
