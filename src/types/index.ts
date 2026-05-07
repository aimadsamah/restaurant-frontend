export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  image?: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  category: Category | string;
  availability: boolean;
  tags: string[];
  featured: boolean;
  allergens: string[];
  preparationTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuByCategory extends Category {
  items: MenuItem[];
}

export interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  occasion?: string;
  confirmationCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  repliedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items?: T[];
  reservations?: T[];
  messages?: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ReservationStats {
  total: number;
  pending: number;
  confirmed: number;
  today: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UIState {
  mobileMenuOpen: boolean;
  activeCategory: string | null;
}
