'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, UtensilsCrossed, BookOpen, MessageSquare, LogOut, ChevronRight, Tag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout } from '@/features/auth/authSlice';
import toast from 'react-hot-toast';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/menu', label: 'Menu Items', icon: UtensilsCrossed },
  { href: '/admin/reservations', label: 'Reservations', icon: BookOpen },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(s => s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-64 bg-noir-900 border-r border-noir-800 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-8 border-b border-noir-800">
        <Link href="/" className="block group">
          <span className="font-accent text-gold-400 text-[9px] tracking-ultra-wide uppercase">Maison</span>
          <div className="font-display text-2xl text-cream-100 tracking-widest group-hover:text-gold-400 transition-colors">NOIR</div>
          <span className="font-body text-[10px] text-noir-500 mt-1 block">Admin Dashboard</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-body transition-all duration-200 group ${
                  isActive(href, exact)
                    ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400'
                    : 'text-noir-400 hover:text-cream-100 hover:bg-noir-800 border-l-2 border-transparent'
                }`}
              >
                <Icon size={16} />
                <span className="font-accent text-[11px] tracking-widest uppercase">{label}</span>
                {isActive(href, exact) && <ChevronRight size={12} className="ml-auto" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-noir-800">
        <div className="px-4 py-3 mb-2">
          <p className="font-accent text-[9px] tracking-widest uppercase text-noir-500">Signed in as</p>
          <p className="font-body text-sm text-cream-300 truncate mt-1">{user?.name}</p>
          <p className="font-body text-xs text-noir-500 truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-noir-400 hover:text-red-400 transition-colors duration-200"
        >
          <LogOut size={16} />
          <span className="font-accent text-[11px] tracking-widest uppercase">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
