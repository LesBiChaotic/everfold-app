import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import {
  Send,
  Search,
  Calendar,
  User,
  Shield,
  ArrowLeft,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useLiveStore } from '../../store/liveStore';
import { useARGStore } from '../../store/argStore';
import { SEEDED_USERS } from '../../data/users';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { DialogueChoice } from '../../types';

export const MessagingScreen: React.FC = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContextRail, setShowContextRail] = useState(false);

  const { threads, messages, sendMessage, markThreadRead } = useAppStore();
  const { activeTypingThreads, setTypingState } = useLiveStore();
  const { stage, addStoryFlag, recordVisit } = useARGStore();

  useEffect(() => {
    recordVisit('messages');
  }, [recordVisit]);

  const activeThread = threads.find((t) => t.id === conversationId) || threads[0];
  const activeMessages = activeThread ? messages[activeThread.id] || [] : [];
  const partnerId = activeThread?.participantIds.find((id) => id !== 'visitor_user');
  const partner = SEEDED_USERS.find((u) => u.id === partnerId);
  const isTyping = activeThread ? activeTypingThreads[activeThread.id] : false;

  useEffect(() => {
    if (activeThread && activeThread.unreadCount > 0) {
      markThreadRead(activeThread.id);
    }
  }, [activeThread, markThreadRead]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeThread) return;

    const text = inputText.trim();
    setInputText('');
    sendMessage(activeThread.id, text);

    if (partnerId === 'usr_hana_prasetyo' || partnerId === 'usr_mina_okafor') {
      setTimeout(() => {
        setTypingState(activeThread.id, true);
        setTimeout(() => {
          setTypingState(activeThread.id, false);
          sendMessage(
            activeThread.id,
            `Thank you for taking the time to write. Finding someone who values unhurried dialogue is so refreshing.`,
            false
          );
          soundEngine.playCue('ui.messageReceived');
        }, 3000);
      }, 1000);
    }
  };

  const handleBranchChoice = (choice: DialogueChoice) => {
    if (!activeThread) return;
    soundEngine.playCue('ui.messageSent');
    sendMessage(activeThread.id, choice.userMessage);

    if (choice.unlockFlags) {
      choice.unlockFlags.forEach((flag) => addStoryFlag(flag));
    }

    setTypingState(activeThread.id, true);
    setTimeout(() => {
      setTypingState(activeThread.id, false);
      sendMessage(activeThread.id, choice.botReply);
      soundEngine.playCue('ui.messageReceived');
    }, choice.responseDelayMs || 2500);
  };

  const filteredThreads = threads.filter((t) => {
    if (t.isHistorical && stage < 4) return false;
    const pId = t.participantIds.find((id) => id !== 'visitor_user');
    const p = SEEDED_USERS.find((u) => u.id === pId);
    const title = p ? p.displayName : t.title || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div
      className="messaging-screen"
      style={{
        display: 'flex',
        height: 'calc(100vh - var(--header-height) - var(--space-8))',
        minHeight: '560px',
        maxHeight: '880px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* 1. Thread List Pane (Desktop sidebar & Mobile thread selector) */}
      <div
        className="messaging-thread-list"
        style={{
          width: '300px',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-surface)',
          flexShrink: 0,
        }}
      >
        {/* Search header */}
        <div style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '0 var(--space-3)',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              height: '36px',
            }}
          >
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search correspondence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', width: '100%', fontSize: 'var(--font-size-xs)', outline: 'none' }}
            />
          </div>
        </div>

        {/* Thread Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-1)' }}>
          {filteredThreads.map((thread) => {
            const pId = thread.participantIds.find((id) => id !== 'visitor_user');
            const p = SEEDED_USERS.find((u) => u.id === pId);
            const isSelected = activeThread?.id === thread.id;

            return (
              <div
                key={thread.id}
                onClick={() => {
                  soundEngine.playCue('ui.navigation');
                  navigate(`/messages/${thread.id}`);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--bg-surface-subtle)' : 'transparent',
                  borderLeft: isSelected ? '3px solid var(--accent-plum)' : '3px solid transparent',
                  marginBottom: '2px',
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                {p ? (
                  <AvatarRenderer config={p.avatarConfig} size={42} />
                ) : (
                  <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Foldmark size={20} color="var(--accent-plum)" />
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: thread.unreadCount ? 800 : 600, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p ? p.displayName : thread.title}
                    </span>
                    {thread.unreadCount ? (
                      <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>
                        {thread.unreadCount}
                      </span>
                    ) : null}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                    {thread.lastMessage ? thread.lastMessage.body : 'Open letter...'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Main Chat Conversation Pane */}
      <div
        className="messaging-conversation-pane"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)', minWidth: 0, minHeight: 0 }}
      >
        {/* Chat Top Header */}
        <div
          style={{
            height: '60px',
            padding: '0 var(--space-4)',
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-2)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
            {partner && <AvatarRenderer config={partner.avatarConfig} size={38} />}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {partner ? partner.displayName : activeThread?.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>●</span> {partner?.status || 'Active'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <NavLink to="/date-planner" className="btn btn-secondary btn-sm" style={{ gap: '4px' }}>
              <Calendar size={14} /> Plan Date
            </NavLink>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowContextRail(!showContextRail)}
              title="Toggle Relational Context Rail"
              style={{ width: 34, height: 34, padding: 0 }}
            >
              <Info size={16} color="var(--text-muted)" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div
          className="messaging-message-list"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {activeMessages.map((msg) => {
            const isMe = msg.senderId === 'visitor_user';

            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  className={`message-bubble ${isMe ? 'message-bubble--mine' : 'message-bubble--theirs'}`}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: isMe ? 'var(--accent-surface)' : 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    border: '1px solid',
                    borderColor: isMe ? 'var(--accent-border)' : 'var(--border-subtle)',
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 1.55,
                    boxShadow: 'var(--shadow-sm)',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.body}

                  {/* Authored Branching Reply Choices */}
                  {msg.dialogueChoices && msg.dialogueChoices.length > 0 && (
                    <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Reflective Starters:
                      </div>
                      {msg.dialogueChoices.map((ch) => (
                        <button
                          key={ch.choiceId}
                          onClick={() => handleBranchChoice(ch)}
                          className="btn btn-secondary btn-sm"
                          style={{
                            textAlign: 'left',
                            justifyContent: 'flex-start',
                            padding: 'var(--space-2) var(--space-3)',
                            height: 'auto',
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--text-primary)',
                            whiteSpace: 'normal',
                          }}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: '3px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  <span>{msg.displayTimestamp}</span>
                  {msg.isAnomalousTimestamp && <span className="badge badge-anomaly">ANOMALY</span>}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
              <span className="badge badge-plum">
                {partner?.displayName} is writing...
              </span>
            </div>
          )}
        </div>

        {/* Message Compose Form */}
        <form
          onSubmit={handleSendMessage}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            flexShrink: 0,
          }}
        >
          <input
            type="text"
            className="input"
            placeholder={`Send an unhurried letter to ${partner ? partner.displayName : 'participant'}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ flex: 1, minHeight: '40px' }}
          />
          <button type="submit" className="btn btn-primary" disabled={!inputText.trim()} style={{ width: '42px', height: '40px', padding: 0 }}>
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* 3. Docked Context Rail (Section 18) */}
      {showContextRail && partner && (
        <div
          className="messaging-context-rail"
          style={{
            width: '280px',
            borderLeft: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
            padding: 'var(--space-4)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <AvatarRenderer config={partner.avatarConfig} size={84} />
            <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, marginTop: 'var(--space-2)', color: 'var(--text-primary)' }}>
              {partner.displayName}
            </h3>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              @{partner.handle} • {partner.city}
            </div>
          </div>

          <div className="ef-card-subtle">
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              COMMUNICATION RHYTHM
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {partner.communicationStyle}
            </div>
          </div>

          <div className="ef-card-subtle">
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              RELATIONSHIP GOAL
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {partner.relationshipGoals}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              INTENTIONAL BOUNDARIES
            </div>
            <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {partner.boundaries.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
