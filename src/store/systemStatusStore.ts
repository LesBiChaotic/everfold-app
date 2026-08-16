import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CompanyStatusService,
  StatusIncident,
  ChangelogEntry,
  TransparencyReport,
} from '../types/socialEcosystem';
import {
  STATUS_SERVICES,
  SEEDED_STATUS_INCIDENTS,
  SEEDED_CHANGELOG_ENTRIES,
  SEEDED_TRANSPARENCY_REPORTS,
} from '../data/statusChangelogData';

interface SystemStatusState {
  services: CompanyStatusService[];
  incidents: StatusIncident[];
  changelog: ChangelogEntry[];
  transparencyReports: TransparencyReport[];

  // Actions
  resetSystemStatusStore: () => void;
}

export const useSystemStatusStore = create<SystemStatusState>()(
  persist(
    (set) => ({
      services: STATUS_SERVICES,
      incidents: SEEDED_STATUS_INCIDENTS,
      changelog: SEEDED_CHANGELOG_ENTRIES,
      transparencyReports: SEEDED_TRANSPARENCY_REPORTS,

      resetSystemStatusStore: () => {
        set({
          services: STATUS_SERVICES,
          incidents: SEEDED_STATUS_INCIDENTS,
          changelog: SEEDED_CHANGELOG_ENTRIES,
          transparencyReports: SEEDED_TRANSPARENCY_REPORTS,
        });
      },
    }),
    {
      name: 'everfold.systemStatus.v2',
    }
  )
);
