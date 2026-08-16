import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  LifeBuoy,
  Send,
  PlusCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useSupportStore } from '../../store/supportStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { useProfileStore } from '../../store/profileStore';
import { SupportTicket } from '../../types/socialEcosystem';

export const SupportTicketScreen: React.FC = () => {
  const { tickets, createTicket, replyTicket } = useSupportStore();
  const { visitorProfile } = useProfileStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false);
  const [replyInput, setReplyInput] = useState('');

  // New Ticket form
  const [category, setCategory] = useState<SupportTicket['category']>('Technical');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const activeTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const created = createTicket(category, subject.trim(), description.trim());
    setSelectedTicketId(created.id);
    setSubject('');
    setDescription('');
    setNewTicketModalOpen(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeTicket) return;

    replyTicket(activeTicket.id, visitorProfile.displayName, replyInput.trim());
    setReplyInput('');
  };

  return (
    <div className="support-ticket-screen" style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to="/help" className="btn btn-ghost" style={{ gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
          <ArrowLeft size={15} /> Help Center
        </NavLink>

        <button className="btn btn-primary" onClick={() => setNewTicketModalOpen(true)} style={{ fontSize: 'var(--font-size-xs)' }}>
          <PlusCircle size={14} /> Open New Ticket
        </button>
      </div>

      {/* Main Ticket Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 320px) 1fr', gap: 'var(--space-4)' }}>
        {/* Left Column: Tickets List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <h2 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Your Dispatches ({tickets.length})
          </h2>

          {tickets.map((tkt) => {
            const isSelected = tkt.id === selectedTicketId;

            return (
              <div
                key={tkt.id}
                onClick={() => setSelectedTicketId(tkt.id)}
                className="card"
                style={{
                  cursor: 'pointer',
                  padding: 'var(--space-3)',
                  border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: isSelected ? 'var(--bg-surface-subtle)' : 'var(--bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-family-mono)' }}>{tkt.ticketNumber}</span>
                  <span className="badge badge-subtle" style={{ fontSize: '9px' }}>{tkt.status}</span>
                </div>

                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tkt.subject}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{tkt.category}</div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Ticket Detail & Reply Thread */}
        {activeTicket && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', backgroundColor: 'var(--bg-surface)' }}>
            {/* Header */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <span className="badge" style={{ fontSize: '10px' }}>{activeTicket.ticketNumber} • {activeTicket.category}</span>
                <span className="badge badge-anomaly" style={{ fontSize: '10px' }}>{activeTicket.status}</span>
              </div>
              <h1 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, margin: '4px 0' }}>{activeTicket.subject}</h1>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {activeTicket.description}
              </p>
            </div>

            {/* Replies Thread */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minHeight: '200px' }}>
              {activeTicket.replies.map((rep) => (
                <div
                  key={rep.id}
                  style={{
                    padding: 'var(--space-3)',
                    backgroundColor: rep.isStaff ? 'var(--bg-surface-subtle)' : 'var(--bg-surface)',
                    border: rep.isStaff ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                      {rep.authorName} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>({rep.authorRole})</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {new Date(rep.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.5, margin: 0 }}>{rep.body}</p>
                </div>
              ))}
            </div>

            {/* Internal Staff Notes (Visible if Story Access is Full or T&S unlocked) */}
            {(unlockAllStoryPages || activeTicket.reclassifiedToContinuity) && activeTicket.internalNotes && (
              <div className="card" style={{ backgroundColor: 'var(--bg-surface-subtle)', border: '1px dashed var(--color-warning)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <Lock size={14} color="var(--color-warning)" />
                  <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'var(--font-family-mono)', color: 'var(--color-warning)' }}>
                    INTERNAL TRUST & SAFETY DISPATCH NOTE
                  </span>
                </div>
                {activeTicket.internalNotes.map((inote) => (
                  <div key={inote.id} style={{ fontSize: '11px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                    <strong>{inote.staffName}</strong>: {inote.note}
                  </div>
                ))}
              </div>
            )}

            {/* Reply Composer */}
            <form onSubmit={handleSendReply} style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <input
                type="text"
                className="input"
                placeholder="Reply to support specialist..."
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                style={{ flex: 1, minHeight: '38px', fontSize: 'var(--font-size-xs)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ minHeight: '38px', fontSize: 'var(--font-size-xs)' }}>
                <Send size={13} /> Send Reply
              </button>
            </form>
          </div>
        )}
      </div>

      {/* New Ticket Modal */}
      {newTicketModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-4)',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '500px',
              width: '100%',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <h2 id="ticket-modal-title" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '0 0 var(--space-3)' }}>
              Submit Support Ticket
            </h2>

            <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Category:</label>
                <select
                  className="input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                >
                  <option value="Technical">Technical Issue</option>
                  <option value="Matching">Matching & Discover</option>
                  <option value="Forecast">Forecast & Telemetry</option>
                  <option value="Archive">Archive & Export</option>
                  <option value="Privacy">Privacy & Account</option>
                  <option value="Continuity Issue">Continuity & Invariant Lineage</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Subject:</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Summary of issue..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Description:</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Detailed description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setNewTicketModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
