import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  MessageSquare,
  TrendingUp,
  Calendar,
  Radio,
  Archive,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Clock,
  Heart,
  ChevronRight,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { useAppStore } from '../../store/appStore';
import { useARGStore } from '../../store/argStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useQuizStore } from '../../store/quizStore';
import { useRewardStore } from '../../store/rewardStore';
import { SEEDED_USERS } from '../../data/users';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { YourEverfoldHomeCard } from '../../components/rewards/YourEverfoldHomeCard';

export const HomeScreen: React.FC = () => {
  const { visitorProfile } = useProfileStore();
  const { matches = [], threads = [], messages = {}, pulsePosts = [], datePlans = [], journalEntries = [] } = useAppStore();
  const { stage = 0, visitCounts, recordVisit, storyFlags } = useARGStore();
  const { dailyQuestions = [] } = useQuizStore();
  const { isRetroactiveMigrated, runRetroactiveMigration } = useRewardStore();

  useEffect(() => {
    recordVisit('home');
    if (!isRetroactiveMigrated) {
      const totalMessages = Object.values(messages).reduce((acc, msgList) => acc + msgList.length, 0);
      runRetroactiveMigration({
        messagesCount: totalMessages || 15,
        journalCount: journalEntries.length || 3,
        postsCount: pulsePosts.filter((p) => p.authorId === 'visitor_user').length || 1,
        commentsCount: 2,
        quizzesCount: 1,
        storiesCount: 1,
        memoriesCount: 2,
        datePlansCount: datePlans.length || 1,
        connectionsCount: matches.length || 2,
      });
    }
  }, [recordVisit, isRetroactiveMigrated, runRetroactiveMigration, messages, journalEntries, pulsePosts, datePlans, matches]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const newMatches = (matches || []).filter((m) => m.status === 'New' || m.status === 'Talking').slice(0, 3);
  const unreadThreads = (threads || []).filter((t) => (t.unreadCount || 0) > 0);
  const nextDate = (datePlans || []).find((d) => d.status === 'Confirmed');
  const recentPost = pulsePosts && pulsePosts.length > 0 ? pulsePosts[0] : null;
  const activeDailyQuestion = dailyQuestions && dailyQuestions.length > 0 ? dailyQuestions[0] : null;

  return (
    <div
      className="home-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* 1. Top Editorial Greeting Row */}
      <section
        className="ef-card-featured"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)',
          border: '1px solid var(--border-default)',
        }}
      >
        <div style={{ flex: '1 1 300px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
            <span className="badge badge-plum">Daily Rhythm</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            {getGreeting()}, {visitorProfile.displayName}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 'var(--space-1) 0 0 0' }}>
            Two conversations await your reply. Your relational pace is steady.
          </p>
        </div>

        {/* Profile Completion / Continuity Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-2) var(--space-4)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0,
          }}
        >
          <AvatarRenderer config={visitorProfile.avatarConfig} size={42} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)' }}>
              {visitorProfile.displayName}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {visitorProfile.city} · {visitorProfile.orientation}
            </div>
          </div>
          <NavLink to="/profile" className="btn btn-ghost btn-sm" title="Edit Profile">
            <ChevronRight size={16} />
          </NavLink>
        </div>
      </section>

      {/* Your Everfold Rewards & Milestones Card */}
      <YourEverfoldHomeCard />

      {/* Continue Where You Left Off (Compact 1-3 Items Module) */}
      <section
        className="ef-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          padding: 'var(--space-4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Sparkles size={15} color="var(--accent-plum)" />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Continue Where You Left Off
            </span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Recent in-app activity</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
          {unreadThreads.length > 0 ? (
            <NavLink
              to={`/messages/${unreadThreads[0].id}`}
              className="ef-card-subtle flex items-center justify-between"
              style={{ padding: 'var(--space-3)', textDecoration: 'none' }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'var(--accent-plum)', fontWeight: 700 }}>UNREAD LETTER</div>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {unreadThreads[0].lastMessage?.body ? `“${unreadThreads[0].lastMessage.body.slice(0, 36)}...”` : 'Conversation waiting'}
                </div>
              </div>
              <ChevronRight size={15} color="var(--text-muted)" />
            </NavLink>
          ) : (
            <NavLink
              to="/messages"
              className="ef-card-subtle flex items-center justify-between"
              style={{ padding: 'var(--space-3)', textDecoration: 'none' }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'var(--accent-plum)', fontWeight: 700 }}>LETTERS & THREADS</div>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  Unhurried exchanges & reflections
                </div>
              </div>
              <ChevronRight size={15} color="var(--text-muted)" />
            </NavLink>
          )}

          <NavLink
            to="/quizzes"
            className="ef-card-subtle flex items-center justify-between"
            style={{ padding: 'var(--space-3)', textDecoration: 'none' }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-info, #0284c7)', fontWeight: 700 }}>RELATIONAL ALIGNMENT</div>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                Daily reflection & 2-person quizzes
              </div>
            </div>
            <ChevronRight size={15} color="var(--text-muted)" />
          </NavLink>

          <NavLink
            to="/journal"
            className="ef-card-subtle flex items-center justify-between"
            style={{ padding: 'var(--space-3)', textDecoration: 'none' }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 700 }}>PRIVATE JOURNAL</div>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                Record your relational pace & notes
              </div>
            </div>
            <ChevronRight size={15} color="var(--text-muted)" />
          </NavLink>
        </div>
      </section>

      {/* 2. Narrative/ARG Clinical Alerts (If Triggered) */}
      {visitCounts.archive >= 2 && !storyFlags.includes('foundLegacyArchive') && (
        <section
          className="ef-card-interactive"
          style={{
            borderLeft: '4px solid var(--color-warning)',
            backgroundColor: 'var(--color-warning-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
            <AlertCircle size={20} color="var(--color-warning)" style={{ flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                Account Historical Lineage Unindexed
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                Three historical platform migrations (1999–2015) remain available for review in the archive.
              </div>
            </div>
          </div>
          <NavLink to="/archive" className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
            Open Archive
          </NavLink>
        </section>
      )}

      {storyFlags.includes('visitorExportAnomaly') && (
        <section
          className="ef-card-interactive"
          style={{
            borderLeft: '4px solid var(--arg-anomaly-tag)',
            backgroundColor: 'var(--arg-anomaly-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
            <Clock size={20} color="var(--arg-anomaly-tag)" style={{ flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                One historical relational container is unresolved
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                Relational UUID instantiated before registration date. Continuity confidence: 99.8%.
              </div>
            </div>
          </div>
          <NavLink to="/forecast/raw/rel_2347_previouslymatched" className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
            Diagnostics
          </NavLink>
        </section>
      )}

      {stage >= 7 && (
        <section
          className="ef-card-interactive"
          style={{
            borderLeft: '4px solid var(--accent-plum)',
            backgroundColor: 'var(--accent-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
            <Foldmark size={22} color="var(--accent-plum)" style={{ flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                One prior connection is available
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                @previouslymatched is active across all historical nodes.
              </div>
            </div>
          </div>
          <NavLink to="/member/previouslymatched" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
            View Connection
          </NavLink>
        </section>
      )}

      {/* 3. Editorial Hero Split: New Matches (60%) + Forecast Preview (40%) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {/* Left: New Matches Spotlight */}
        <div className="ef-card-featured flex flex-col justify-between" style={{ minWidth: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Compass size={20} color="var(--accent-plum)" />
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--text-primary)' }}>
                  Mutual Affinity Matches
                </span>
              </div>
              <NavLink to="/discover" className="btn btn-ghost btn-sm" style={{ color: 'var(--accent-plum)', fontWeight: 700 }}>
                Discover All <ArrowRight size={14} />
              </NavLink>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              {newMatches.map((m) => {
                const partner = SEEDED_USERS.find((u) => u.id === m.userId);
                if (!partner) return null;

                return (
                  <NavLink
                    key={m.id}
                    to={`/discover/${partner.id}`}
                    className="ef-card-interactive"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: 'var(--space-4) var(--space-3)',
                      backgroundColor: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <AvatarRenderer config={partner.avatarConfig} size={64} />
                    <div style={{ marginTop: 'var(--space-2)', fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                      {partner.displayName}, {partner.age}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                      {partner.city} · {partner.occupation}
                    </div>
                    <span className="badge badge-plum" style={{ fontSize: '0.7rem' }}>
                      Fit: {m.compatibilityScore}%
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
            <NavLink to="/discover" className="btn btn-secondary w-full">
              Explore Discover Queue
            </NavLink>
          </div>
        </div>

        {/* Right: Forecast Preview Box */}
        <div className="ef-card-featured flex flex-col justify-between" style={{ minWidth: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <TrendingUp size={20} color="var(--accent-indigo)" />
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--text-primary)' }}>
                  Forecast Trajectory
                </span>
              </div>
              <NavLink to="/forecast" className="btn btn-ghost btn-sm" style={{ color: 'var(--accent-indigo)', fontWeight: 700 }}>
                Full Model <ArrowRight size={14} />
              </NavLink>
            </div>

            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--bg-surface-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                    Naomi Serrano & You
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                    6-Month Markov Model
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--accent-plum)' }}>
                  94.2%
                </div>
              </div>

              {/* Trajectory visualization ribbon */}
              <div style={{ margin: 'var(--space-3) 0', height: '6px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--border-subtle)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '94%', backgroundColor: 'var(--accent-plum)', borderRadius: 'var(--radius-full)' }} />
              </div>

              <p className="ef-prompt-quote" style={{ fontSize: '0.95rem', margin: 'var(--space-2) 0' }}>
                “High aesthetic resonance, asynchronous writing comfort, and shared weekend morning quiet.”
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginTop: 'var(--space-2)' }}>
                <span className="badge">Next: Scheduled Coffee</span>
                <span className="badge">Stability: High</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
            <NavLink to="/forecast/rel_9918_naomi" className="btn btn-secondary w-full">
              Inspect Trajectory Details
            </NavLink>
          </div>
        </div>
      </div>

      {/* 4. Messages Horizontal Strip */}
      <section className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <MessageSquare size={18} color="var(--accent-plum)" />
            <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
              Recent Letters & Messages
            </span>
          </div>
          <NavLink to="/messages" className="btn btn-ghost btn-sm" style={{ fontSize: 'var(--font-size-xs)' }}>
            Open Inbox ({unreadThreads.length} unread)
          </NavLink>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
          {threads.slice(0, 3).map((th) => {
            const partnerId = th.participantIds.find((id) => id !== 'visitor_user');
            const partner = SEEDED_USERS.find((u) => u.id === partnerId);

            return (
              <NavLink
                key={th.id}
                to={`/messages/${th.id}`}
                className="ef-card-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  backgroundColor: th.unreadCount ? 'var(--accent-surface)' : 'var(--bg-surface)',
                  border: th.unreadCount ? '1px solid var(--accent-border)' : '1px solid var(--border-subtle)',
                }}
              >
                {partner ? <AvatarRenderer config={partner.avatarConfig} size={38} /> : <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-surface-subtle)' }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: th.unreadCount ? 800 : 600, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                      {partner ? partner.displayName : th.title}
                    </span>
                    {th.unreadCount ? (
                      <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>
                        {th.unreadCount} new
                      </span>
                    ) : null}
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--text-muted)',
                      margin: '2px 0 0 0',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {th.lastMessage ? th.lastMessage.body : 'Open thread...'}
                  </p>
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>

      {/* 5. Asymmetric Bottom 3-Card Row: Upcoming Date, Community Pulse, Daily Ritual */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {/* Date Planner Box */}
        <div className="ef-card flex flex-col justify-between" style={{ minWidth: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Calendar size={18} color="var(--accent-clay)" />
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>Upcoming Date</span>
              </div>
              <NavLink to="/date-planner" className="btn btn-ghost btn-sm">Planner</NavLink>
            </div>

            {nextDate ? (
              <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                  {nextDate.activityType}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {nextDate.venueName}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {nextDate.scheduledDate} at {nextDate.scheduledTime}
                </div>
                <span className="badge badge-clay" style={{ marginTop: 'var(--space-2)' }}>
                  Acoustic Quiet Rating: High
                </span>
              </div>
            ) : (
              <div style={{ padding: 'var(--space-3)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
                Coordinate a low-stimulation bookstore or courtyard walk.
              </div>
            )}
          </div>

          <NavLink to="/date-planner" className="btn btn-secondary btn-sm w-full" style={{ marginTop: 'var(--space-3)' }}>
            Plan a Date
          </NavLink>
        </div>

        {/* Community Pulse Box */}
        <div className="ef-card flex flex-col justify-between" style={{ minWidth: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Radio size={18} color="var(--accent-rose)" />
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>Community Pulse</span>
              </div>
              <NavLink to="/pulse" className="btn btn-ghost btn-sm">Feed</NavLink>
            </div>

            {recentPost && (
              <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)' }}>
                  {recentPost.authorName}
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: 1.4 }}>
                  {recentPost.body.substring(0, 90)}...
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <span>{(recentPost.replies || []).length} replies</span>
                  <span>•</span>
                  <span>{recentPost.reactions ? Object.values(recentPost.reactions).reduce((a, b) => a + b, 0) : 0} reactions</span>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/pulse" className="btn btn-secondary btn-sm w-full" style={{ marginTop: 'var(--space-3)' }}>
            Join Discussion
          </NavLink>
        </div>

        {/* Daily Ritual / Quizzes Box */}
        <div className="ef-card flex flex-col justify-between" style={{ minWidth: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <HelpCircle size={18} color="var(--accent-lilac)" />
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>Daily Ritual</span>
              </div>
              <NavLink to="/quizzes" className="btn btn-ghost btn-sm">Quizzes</NavLink>
            </div>

            {activeDailyQuestion && (
              <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span className="badge badge-lilac" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                  {activeDailyQuestion.category}
                </span>
                <p className="ef-prompt-quote" style={{ fontSize: '0.88rem', margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
                  “{activeDailyQuestion.prompt}”
                </p>
              </div>
            )}
          </div>

          <NavLink to="/quizzes" className="btn btn-secondary btn-sm w-full" style={{ marginTop: 'var(--space-3)' }}>
            Answer Today
          </NavLink>
        </div>
      </div>
    </div>
  );
};
