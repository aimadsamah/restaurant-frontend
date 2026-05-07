'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Trash2, ChevronDown, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useGetContactsQuery,
  useMarkContactReadMutation,
  useDeleteContactMutation,
} from '@/features/api';
import type { ContactMessage } from '@/types';

function MessageRow({ msg, onMarkRead, onDelete }: {
  msg: ContactMessage;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border-b border-noir-800 last:border-0 ${!msg.isRead ? 'bg-gold-400/3' : ''}`}>
      <div
        className="flex items-start gap-4 p-4 hover:bg-noir-800/30 transition-colors cursor-pointer"
        onClick={() => { setOpen(o => !o); if (!msg.isRead) onMarkRead(msg._id); }}
      >
        <div className="mt-0.5 flex-shrink-0">
          {msg.isRead
            ? <MailOpen size={16} className="text-noir-500" />
            : <Mail size={16} className="text-gold-400" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <p className={`font-body text-sm ${msg.isRead ? 'text-cream-300' : 'text-cream-100 font-medium'}`}>
              {msg.name}
            </p>
            {!msg.isRead && (
              <span className="font-accent text-[8px] tracking-widest uppercase text-gold-400 bg-gold-400/10 border border-gold-400/20 px-1.5 py-0.5">New</span>
            )}
            <span className="font-body text-xs text-noir-500 ml-auto">
              {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <p className="font-body text-xs text-noir-500 truncate mb-0.5">{msg.email}</p>
          <p className={`font-body text-sm truncate ${msg.isRead ? 'text-noir-500' : 'text-cream-300'}`}>
            {msg.subject}
          </p>
        </div>
        <ChevronDown size={14} className={`text-noir-500 transition-transform flex-shrink-0 mt-1 ${open ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-noir-800/30 px-6 py-5 border-t border-noir-800">
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs font-body">
                <div>
                  <p className="font-accent text-[9px] tracking-widest uppercase text-gold-400/60 mb-1">From</p>
                  <p className="text-cream-300">{msg.name} &lt;{msg.email}&gt;</p>
                </div>
                <div>
                  <p className="font-accent text-[9px] tracking-widest uppercase text-gold-400/60 mb-1">Subject</p>
                  <p className="text-cream-300">{msg.subject}</p>
                </div>
              </div>
              <div className="mb-5">
                <p className="font-accent text-[9px] tracking-widest uppercase text-gold-400/60 mb-2">Message</p>
                <p className="font-body text-sm text-cream-200 leading-relaxed bg-noir-900 p-4 border border-noir-700">
                  {msg.message}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="btn-gold relative z-10 text-[10px]"
                  onClick={e => e.stopPropagation()}
                >
                  Reply via Email
                </a>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(msg._id); }}
                  className="flex items-center gap-1.5 font-accent text-[9px] tracking-widest uppercase px-3 py-2 border border-red-400/20 text-red-400/60 hover:text-red-400 hover:border-red-400/50 transition-all"
                >
                  <Trash2 size={11} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminMessagesPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetContactsQuery({
    page, limit: 20,
    ...(filter === 'unread' && { isRead: false }),
    ...(filter === 'read' && { isRead: true }),
  });

  const [markRead] = useMarkContactReadMutation();
  const [deleteContact] = useDeleteContactMutation();

  const messages: ContactMessage[] = data?.data?.messages ?? [];
  const pagination = data?.data?.pagination;

  const filtered = search
    ? messages.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase())
      )
    : messages;

  const handleMarkRead = async (id: string) => {
    try { await markRead(id).unwrap(); }
    catch { /* silent */ }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await deleteContact(id).unwrap();
      toast.success('Message deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="font-accent text-[10px] tracking-ultra-wide uppercase text-gold-400 mb-1">Management</p>
        <h1 className="font-display text-4xl text-cream-100 font-light">Messages</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full bg-noir-900 border border-noir-700 text-cream-100 text-sm pl-9 pr-4 py-3 outline-none focus:border-gold-400/50 font-body"
          />
        </div>
        <div className="flex border border-noir-700 overflow-hidden">
          {(['all', 'unread', 'read'] as const).map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
              className={`px-4 py-3 font-accent text-[10px] tracking-widest uppercase transition-colors ${
                filter === f ? 'bg-gold-400 text-noir-950' : 'text-noir-400 hover:text-cream-200 hover:bg-noir-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-noir-900 border border-noir-800">
        <div className="p-5 border-b border-noir-800">
          <h2 className="font-accent text-xs tracking-widest uppercase text-cream-300">
            {pagination?.total ?? 0} Messages
          </h2>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-16 w-full" />)}</div>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center font-body text-noir-500 text-sm">No messages found.</p>
        ) : (
          <>
            <div>
              {filtered.map(msg => (
                <MessageRow key={msg._id} msg={msg} onMarkRead={handleMarkRead} onDelete={handleDelete} />
              ))}
            </div>
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-noir-800">
                <span className="font-body text-xs text-noir-500">Page {pagination.page} of {pagination.pages}</span>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-3 py-1.5 font-accent text-[10px] tracking-widest uppercase border border-noir-700 text-noir-400 hover:border-gold-400/50 disabled:opacity-30 transition-colors">
                    Prev
                  </button>
                  <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
                    className="px-3 py-1.5 font-accent text-[10px] tracking-widest uppercase border border-noir-700 text-noir-400 hover:border-gold-400/50 disabled:opacity-30 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
