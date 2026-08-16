import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SupportArticle,
  SupportTicket,
  SupportReply,
  StaffProfile,
} from '../types/socialEcosystem';
import {
  STAFF_PROFILES,
  SEEDED_SUPPORT_ARTICLES,
  SEEDED_SUPPORT_TICKETS,
} from '../data/supportData';
import { soundEngine } from '../audio/soundEngine';

interface SupportState {
  staffProfiles: StaffProfile[];
  helpArticles: SupportArticle[];
  tickets: SupportTicket[];
  helpfulArticleVotes: Record<string, 'yes' | 'no'>;

  // Actions
  createTicket: (category: SupportTicket['category'], subject: string, description: string) => SupportTicket;
  replyTicket: (ticketId: string, authorName: string, body: string) => void;
  voteArticleHelpful: (articleId: string, vote: 'yes' | 'no') => void;
  advanceTicketStatus: (ticketId: string, nextStatus: SupportTicket['status'], staffReply?: SupportReply) => void;
  resetSupportStore: () => void;
}

export const useSupportStore = create<SupportState>()(
  persist(
    (set, get) => ({
      staffProfiles: STAFF_PROFILES,
      helpArticles: SEEDED_SUPPORT_ARTICLES,
      tickets: SEEDED_SUPPORT_TICKETS,
      helpfulArticleVotes: {},

      createTicket: (category, subject, description) => {
        const ticketNum = `TS-${Math.floor(1000 + Math.random() * 9000)}`;
        const ticketId = `tkt_${Date.now()}`;

        const newTicket: SupportTicket = {
          id: ticketId,
          ticketNumber: ticketNum,
          category,
          subject,
          description,
          status: 'Received',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          replies: [
            {
              id: `rep_${Date.now()}`,
              authorName: 'Everfold Support System',
              authorRole: 'Automated Dispatch',
              isStaff: true,
              timestamp: new Date().toISOString(),
              body: `Thank you for contacting Everfold Support. Ticket ${ticketNum} has been queued for specialist assignment.`,
            },
          ],
        };

        soundEngine.playCue('support.ticketCreated');

        set((state) => ({
          tickets: [newTicket, ...state.tickets],
        }));

        // Simulated progression to Assigned & Reviewing after 3.5s
        setTimeout(() => {
          get().advanceTicketStatus(ticketId, 'Reviewing', {
            id: `rep_${Date.now() + 1}`,
            authorName: 'Callum Price',
            authorRole: 'Product Engineering',
            isStaff: true,
            timestamp: new Date().toISOString(),
            body: 'Hello! I am reviewing your case details and cross-checking our database logs.',
          });
        }, 3500);

        return newTicket;
      },

      replyTicket: (ticketId, authorName, body) => {
        soundEngine.playCue('comment.post');
        set((state) => ({
          tickets: state.tickets.map((t) => {
            if (t.id !== ticketId) return t;
            const newReply: SupportReply = {
              id: `rep_${Date.now()}`,
              authorName,
              authorRole: 'Member',
              isStaff: false,
              timestamp: new Date().toISOString(),
              body,
            };
            return {
              ...t,
              updatedAt: new Date().toISOString(),
              replies: [...t.replies, newReply],
            };
          }),
        }));
      },

      advanceTicketStatus: (ticketId, nextStatus, staffReply) => {
        set((state) => ({
          tickets: state.tickets.map((t) => {
            if (t.id !== ticketId) return t;
            return {
              ...t,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
              replies: staffReply ? [...t.replies, staffReply] : t.replies,
            };
          }),
        }));
        soundEngine.playCue('comment.replyArrive');
      },

      voteArticleHelpful: (articleId, vote) => {
        soundEngine.playCue('ui.save');
        set((state) => {
          if (state.helpfulArticleVotes[articleId]) return state;
          return {
            helpfulArticleVotes: {
              ...state.helpfulArticleVotes,
              [articleId]: vote,
            },
            helpArticles: state.helpArticles.map((art) => {
              if (art.id !== articleId) return art;
              return {
                ...art,
                helpfulYesCount: vote === 'yes' ? art.helpfulYesCount + 1 : art.helpfulYesCount,
                helpfulNoCount: vote === 'no' ? art.helpfulNoCount + 1 : art.helpfulNoCount,
              };
            }),
          };
        });
      },

      resetSupportStore: () => {
        set({
          staffProfiles: STAFF_PROFILES,
          helpArticles: SEEDED_SUPPORT_ARTICLES,
          tickets: SEEDED_SUPPORT_TICKETS,
          helpfulArticleVotes: {},
        });
      },
    }),
    {
      name: 'everfold.support.v2',
    }
  )
);
