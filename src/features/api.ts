import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type {
  Category, MenuItem, MenuByCategory, Reservation,
  ContactMessage, ApiResponse, PaginatedResponse, ReservationStats
} from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
        || (typeof window !== 'undefined' ? localStorage.getItem('mn_token') : null);
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Categories', 'MenuItems', 'Reservations', 'Contacts'],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation<ApiResponse<{ token: string; user: any }>, { email: string; password: string }>({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
    getMe: builder.query<ApiResponse<any>, void>({
      query: () => '/auth/me',
    }),

    // Categories
    getCategories: builder.query<ApiResponse<Category[]>, { active?: boolean } | void>({
      query: (params) => ({ url: '/categories', params: params || {} }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<ApiResponse<Category>, FormData>({
      query: (data) => ({ url: '/categories', method: 'POST', body: data }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<ApiResponse<Category>, { id: string; data: FormData }>({
      query: ({ id, data }) => ({ url: `/categories/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Categories'],
    }),

    // Menu Items
    getMenuItems: builder.query<ApiResponse<{ items: MenuItem[]; pagination: any }>, Record<string, any> | void>({
      query: (params) => ({ url: '/menu', params: params || {} }),
      providesTags: ['MenuItems'],
    }),
    getMenuByCategory: builder.query<ApiResponse<MenuByCategory[]>, void>({
      query: () => '/menu/by-category',
      providesTags: ['MenuItems'],
    }),
    createMenuItem: builder.mutation<ApiResponse<MenuItem>, FormData>({
      query: (data) => ({ url: '/menu', method: 'POST', body: data }),
      invalidatesTags: ['MenuItems'],
    }),
    updateMenuItem: builder.mutation<ApiResponse<MenuItem>, { id: string; data: FormData }>({
      query: ({ id, data }) => ({ url: `/menu/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['MenuItems'],
    }),
    deleteMenuItem: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/menu/${id}`, method: 'DELETE' }),
      invalidatesTags: ['MenuItems'],
    }),

    // Reservations
    createReservation: builder.mutation<ApiResponse<{ reservation: Reservation; confirmationCode: string }>, Partial<Reservation>>({
      query: (data) => ({ url: '/reservations', method: 'POST', body: data }),
    }),
    getReservations: builder.query<ApiResponse<{ reservations: Reservation[]; pagination: any }>, Record<string, any> | void>({
      query: (params) => ({ url: '/reservations', params: params || {} }),
      providesTags: ['Reservations'],
    }),
    getReservationStats: builder.query<ApiResponse<ReservationStats>, void>({
      query: () => '/reservations/stats',
    }),
    updateReservationStatus: builder.mutation<ApiResponse<Reservation>, { id: string; status: string }>({
      query: ({ id, status }) => ({ url: `/reservations/${id}/status`, method: 'PUT', body: { status } }),
      invalidatesTags: ['Reservations'],
    }),
    deleteReservation: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/reservations/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Reservations'],
    }),

    // Contact
    createContact: builder.mutation<ApiResponse<ContactMessage>, Partial<ContactMessage>>({
      query: (data) => ({ url: '/contact', method: 'POST', body: data }),
    }),
    getContacts: builder.query<ApiResponse<{ messages: ContactMessage[]; pagination: any }>, Record<string, any> | void>({
      query: (params) => ({ url: '/contact', params: params || {} }),
      providesTags: ['Contacts'],
    }),
    markContactRead: builder.mutation<ApiResponse<ContactMessage>, string>({
      query: (id) => ({ url: `/contact/${id}/read`, method: 'PUT' }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/contact/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetMenuItemsQuery,
  useGetMenuByCategoryQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useCreateReservationMutation,
  useGetReservationsQuery,
  useGetReservationStatsQuery,
  useUpdateReservationStatusMutation,
  useDeleteReservationMutation,
  useCreateContactMutation,
  useGetContactsQuery,
  useMarkContactReadMutation,
  useDeleteContactMutation,
} = restaurantApi;
