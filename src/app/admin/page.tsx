'use client';
import { motion } from 'framer-motion';
import { BookOpen, UtensilsCrossed, MessageSquare, Tag, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import {
  useGetReservationStatsQuery,
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
  useGetContactsQuery,
  useGetReservationsQuery,
} from '@/features/api';
import { useAppSelector } from '@/hooks/redux';
import type { Reservation } from '@/types';

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: any; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-noir-900 border border-noir-800 p-6 hover:border-gold-400/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <TrendingUp size={14} className="text-noir-600" />
      </div>
      <div className="font-display text-4xl text-cream-100 font-light mb-1">{value}</div>
      <div className="font-accent text-[10px] tracking-widest uppercase text-noir-500">{label}</div>
      {sub && <div className="font-body text-xs text-gold-400/60 mt-2">{sub}</div>}
    </motion.div>
  );
}

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  confirmed: 'text-green-400 bg-green-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
  completed: 'text-noir-400 bg-noir-700',
};

export default function AdminDashboard() {
  const user = useAppSelector(s => s.auth.user);
  const { data: statsData } = useGetReservationStatsQuery();
  const { data: menuData } = useGetMenuItemsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: contactData } = useGetContactsQuery({ isRead: false });
  const { data: recentRes } = useGetReservationsQuery({ limit: 5 });

  const stats = statsData?.data;
  const totalItems = menuData?.data?.pagination?.total ?? 0;
  const totalCats = categoriesData?.data?.length ?? 0;
  const unreadMessages = contactData?.data?.pagination?.total ?? 0;
  const recent: Reservation[] = recentRes?.data?.reservations?.slice(0, 5) ?? [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-accent text-[10px] tracking-ultra-wide uppercase text-gold-400 mb-1">
          Welcome back
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl text-cream-100 font-light">
          {user?.name}
        </motion.h1>
        <p className="font-body text-noir-500 text-sm mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={BookOpen} label="Total Reservations" value={stats?.total ?? '—'} sub={`${stats?.today ?? 0} today`} color="text-gold-400 bg-gold-400/10" />
        <StatCard icon={AlertCircle} label="Pending" value={stats?.pending ?? '—'} sub="Awaiting confirmation" color="text-yellow-400 bg-yellow-400/10" />
        <StatCard icon={UtensilsCrossed} label="Menu Items" value={totalItems} sub={`${totalCats} categories`} color="text-green-400 bg-green-400/10" />
        <StatCard icon={MessageSquare} label="Unread Messages" value={unreadMessages} sub="New inquiries" color="text-blue-400 bg-blue-400/10" />
      </div>

      {/* Recent Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-noir-900 border border-noir-800">
          <div className="flex items-center justify-between p-6 border-b border-noir-800">
            <h2 className="font-accent text-xs tracking-widest uppercase text-cream-300">Recent Reservations</h2>
            <a href="/admin/reservations" className="font-accent text-[10px] tracking-widest uppercase text-gold-400 hover:text-gold-300 transition-colors">
              View All →
            </a>
          </div>
          <div className="divide-y divide-noir-800">
            {recent.length === 0 ? (
              <p className="p-6 font-body text-noir-500 text-sm text-center">No reservations yet.</p>
            ) : (
              recent.map((res) => (
                <div key={res._id} className="p-4 flex items-center gap-4 hover:bg-noir-800/50 transition-colors">
                  <div className="w-8 h-8 bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={14} className="text-gold-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-cream-200 truncate">{res.name}</p>
                    <p className="font-body text-xs text-noir-500">
                      {new Date(res.date).toLocaleDateString()} at {res.time} · {res.guests} guests
                    </p>
                  </div>
                  <span className={`font-accent text-[9px] tracking-widest uppercase px-2 py-1 ${statusColors[res.status]}`}>
                    {res.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-noir-900 border border-noir-800">
          <div className="p-6 border-b border-noir-800">
            <h2 className="font-accent text-xs tracking-widest uppercase text-cream-300">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { href: '/admin/categories', icon: Tag, label: 'Add Category' },
              { href: '/admin/menu', icon: UtensilsCrossed, label: 'Add Menu Item' },
              { href: '/admin/reservations', icon: BookOpen, label: 'View Reservations' },
              { href: '/admin/messages', icon: MessageSquare, label: 'View Messages' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-3 p-3 hover:bg-noir-800 transition-colors group"
              >
                <Icon size={15} className="text-gold-400" />
                <span className="font-accent text-[11px] tracking-widest uppercase text-noir-400 group-hover:text-cream-200 transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Summary */}
          <div className="p-6 border-t border-noir-800">
            <h3 className="font-accent text-[10px] tracking-widest uppercase text-noir-500 mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-body text-xs text-noir-400">Confirmed</span>
                <span className="font-body text-xs text-green-400">{stats?.confirmed ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-noir-400">Pending</span>
                <span className="font-body text-xs text-yellow-400">{stats?.pending ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-xs text-noir-400">Today's Covers</span>
                <span className="font-body text-xs text-gold-400">{stats?.today ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
