'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, ChevronDown, Trash2, Check, X as XIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useGetReservationsQuery,
  useUpdateReservationStatusMutation,
  useDeleteReservationMutation,
} from '@/features/api';
import type { Reservation } from '@/types';

const statusOptions = ['pending', 'confirmed', 'cancelled', 'completed'];

const statusStyle: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  confirmed: 'text-green-400 bg-green-400/10 border-green-400/20',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
  completed: 'text-noir-400 bg-noir-700 border-noir-600',
};

function ReservationRow({ res, onStatusChange, onDelete }: {
  res: Reservation;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-noir-800 last:border-0">
      <div
        className="flex items-center gap-4 p-4 hover:bg-noir-800/30 transition-colors cursor-pointer"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 min-w-0">
          <div>
            <p className="font-body text-sm text-cream-100">{res.name}</p>
            <p className="font-body text-xs text-noir-500 truncate">{res.email}</p>
          </div>
          <div>
            <p className="font-body text-sm text-cream-200">
              {new Date(res.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="font-body text-xs text-noir-500">{res.time} · {res.guests} guests</p>
          </div>
          <div className="hidden md:block">
            <p className="font-body text-xs text-noir-400">{res.phone}</p>
            <p className="font-accent text-[9px] tracking-widest uppercase text-gold-400/60 mt-1">{res.confirmationCode}</p>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span className={`font-accent text-[9px] tracking-widest uppercase px-2 py-1 border ${statusStyle[res.status]}`}>
              {res.status}
            </span>
            <ChevronDown size={14} className={`text-noir-500 transition-transform ${open ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-noir-800/30 px-6 py-4 border-t border-noir-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {res.specialRequests && (
              <div>
                <p className="font-accent text-[9px] tracking-widest uppercase text-gold-400/60 mb-1">Special Requests</p>
                <p className="font-body text-sm text-cream-300">{res.specialRequests}</p>
              </div>
            )}
            {res.occasion && (
              <div>
                <p className="font-accent text-[9px] tracking-widest uppercase text-gold-400/60 mb-1">Occasion</p>
                <p className="font-body text-sm text-cream-300 capitalize">{res.occasion}</p>
              </div>
            )}
            <div>
              <p className="font-accent text-[9px] tracking-widest uppercase text-gold-400/60 mb-1">Submitted</p>
              <p className="font-body text-sm text-cream-300">
                {new Date(res.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-accent text-[9px] tracking-widest uppercase text-noir-500 mr-2">Update Status:</span>
            {statusOptions.map(s => (
              <button
                key={s}
                onClick={(e) => { e.stopPropagation(); onStatusChange(res._id, s); }}
                disabled={res.status === s}
                className={`font-accent text-[9px] tracking-widest uppercase px-3 py-1.5 border transition-all duration-200 disabled:opacity-40 ${
                  res.status === s
                    ? statusStyle[s]
                    : 'border-noir-600 text-noir-400 hover:border-gold-400/50 hover:text-cream-200'
                }`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(res._id); }}
              className="ml-auto flex items-center gap-1.5 font-accent text-[9px] tracking-widest uppercase px-3 py-1.5 border border-red-400/20 text-red-400/60 hover:text-red-400 hover:border-red-400/50 transition-all"
            >
              <Trash2 size={11} /> Delete
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function AdminReservationsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetReservationsQuery({
    page, limit: 15,
    ...(statusFilter && { status: statusFilter }),
    ...(dateFilter && { date: dateFilter }),
  });

  const [updateStatus] = useUpdateReservationStatusMutation();
  const [deleteReservation] = useDeleteReservationMutation();

  const reservations: Reservation[] = data?.data?.reservations ?? [];
  const pagination = data?.data?.pagination;

  const filtered = search
    ? reservations.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.confirmationCode.toLowerCase().includes(search.toLowerCase())
      )
    : reservations;

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Status updated to ${status}`);
    } catch { toast.error('Failed to update status'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this reservation?')) return;
    try {
      await deleteReservation(id).unwrap();
      toast.success('Reservation deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="font-accent text-[10px] tracking-ultra-wide uppercase text-gold-400 mb-1">Management</p>
        <h1 className="font-display text-4xl text-cream-100 font-light">Reservations</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email, code..."
            className="w-full bg-noir-900 border border-noir-700 text-cream-100 text-sm pl-9 pr-4 py-3 outline-none focus:border-gold-400/50 font-body"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-noir-900 border border-noir-700 text-cream-100 text-sm px-4 py-3 outline-none focus:border-gold-400/50 font-body cursor-pointer"
        >
          <option value="">All Statuses</option>
          {statusOptions.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <div className="relative">
          <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-500" />
          <input
            type="date"
            value={dateFilter}
            onChange={e => { setDateFilter(e.target.value); setPage(1); }}
            className="bg-noir-900 border border-noir-700 text-cream-100 text-sm pl-9 pr-4 py-3 outline-none focus:border-gold-400/50 font-body [color-scheme:dark]"
          />
        </div>
        {(statusFilter || dateFilter) && (
          <button
            onClick={() => { setStatusFilter(''); setDateFilter(''); setPage(1); }}
            className="flex items-center gap-1.5 font-accent text-[10px] tracking-widest uppercase px-4 py-3 border border-noir-700 text-noir-400 hover:text-cream-100 hover:border-gold-400/30 transition-colors"
          >
            <XIcon size={12} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-noir-900 border border-noir-800">
        <div className="p-5 border-b border-noir-800 flex items-center justify-between">
          <h2 className="font-accent text-xs tracking-widest uppercase text-cream-300">
            {pagination?.total ?? 0} Reservations
          </h2>
          <button onClick={() => refetch()} className="font-accent text-[9px] tracking-widest uppercase text-gold-400/60 hover:text-gold-400 transition-colors">
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="skeleton h-16 w-full" />)}</div>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center font-body text-noir-500 text-sm">No reservations found.</p>
        ) : (
          <>
            <div>
              {filtered.map(res => (
                <ReservationRow
                  key={res._id}
                  res={res}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
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
