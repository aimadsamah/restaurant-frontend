'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, GripVertical, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/features/api';
import type { Category } from '@/types';

const schema = z.object({
  name: z.string().min(1, 'Name required').max(50),
  description: z.string().max(200).optional(),
  order: z.string().optional(),
  isActive: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

function CategoryForm({
  initial,
  onSubmit,
  onCancel,
  isLoading,
}: {
  initial?: Category;
  onSubmit: (data: FormData, file?: File) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initial?.image || '');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name ?? '',
      description: initial?.description ?? '',
      order: String(initial?.order ?? 0),
      isActive: initial?.isActive ?? true,
    },
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setImageFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d, imageFile ?? undefined))} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 sm:col-span-1">
          <label className="label-luxury">Category Name *</label>
          <input {...register('name')} className="input-luxury" placeholder="e.g. Starters" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label-luxury">Display Order</label>
          <input {...register('order')} type="number" min="0" className="input-luxury" />
        </div>
      </div>
      <div>
        <label className="label-luxury">Description</label>
        <input {...register('description')} className="input-luxury" placeholder="Short description..." />
      </div>
      <div>
        <label className="label-luxury">Category Image</label>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="cat-img" />
        <label htmlFor="cat-img" className="flex items-center gap-3 cursor-pointer border border-dashed border-noir-600 hover:border-gold-400/50 p-4 transition-colors">
          {preview ? (
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image src={preview} alt="preview" fill className="object-cover" sizes="64px" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-noir-800 flex items-center justify-center flex-shrink-0">
              <Plus size={20} className="text-noir-500" />
            </div>
          )}
          <span className="font-body text-xs text-noir-400">Click to upload image (max 5MB)</span>
        </label>
      </div>
      <div className="flex items-center gap-3">
        <input {...register('isActive')} type="checkbox" id="isActive" className="accent-gold-400" />
        <label htmlFor="isActive" className="font-accent text-[10px] tracking-widest uppercase text-noir-400 cursor-pointer">Active</label>
      </div>
      <div className="flex gap-3 pt-4 border-t border-noir-800">
        <button type="submit" disabled={isLoading} className="btn-gold-filled text-[10px] disabled:opacity-50">
          {isLoading ? 'Saving...' : initial ? 'Update Category' : 'Create Category'}
        </button>
        <button type="button" onClick={onCancel} className="btn-gold relative z-10 text-[10px]">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminCategoriesPage() {
  const { data, isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [showForm, setShowForm] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  const categories: Category[] = data?.data ?? [];

  const buildFormData = (formData: FormData | any, file?: File) => {
    const fd = new window.FormData();
    fd.append('name', formData.name);
    if (formData.description) fd.append('description', formData.description);
    if (formData.order !== undefined) fd.append('order', String(formData.order));
    fd.append('isActive', String(formData.isActive ?? true));
    if (file) fd.append('image', file);
    return fd;
  };

  const handleCreate = async (formData: any, file?: File) => {
    try {
      await createCategory(buildFormData(formData, file)).unwrap();
      toast.success('Category created!');
      setShowForm(false);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create category');
    }
  };

  const handleUpdate = async (formData: any, file?: File) => {
    if (!editingCat) return;
    try {
      await updateCategory({ id: editingCat._id, data: buildFormData(formData, file) }).unwrap();
      toast.success('Category updated!');
      setEditingCat(null);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update category');
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Delete "${cat.name}"? This cannot be undone.`)) return;
    try {
      await deleteCategory(cat._id).unwrap();
      toast.success('Category deleted');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-accent text-[10px] tracking-ultra-wide uppercase text-gold-400 mb-1">Management</p>
          <h1 className="font-display text-4xl text-cream-100 font-light">Categories</h1>
        </div>
        {!showForm && !editingCat && (
          <button onClick={() => setShowForm(true)} className="btn-gold-filled text-[10px] flex items-center gap-2">
            <Plus size={14} /> New Category
          </button>
        )}
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="bg-noir-900 border border-gold-400/20 p-6 mb-8"
          >
            <h2 className="font-accent text-xs tracking-widest uppercase text-gold-400 mb-6 flex items-center justify-between">
              New Category
              <button onClick={() => setShowForm(false)}><X size={16} className="text-noir-500 hover:text-cream-100" /></button>
            </h2>
            <CategoryForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} isLoading={creating} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Table */}
      <div className="bg-noir-900 border border-noir-800">
        <div className="p-6 border-b border-noir-800">
          <h2 className="font-accent text-xs tracking-widest uppercase text-cream-300">All Categories ({categories.length})</h2>
        </div>
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="skeleton h-16 w-full" />)}
          </div>
        ) : categories.length === 0 ? (
          <p className="p-8 text-center font-body text-noir-500 text-sm">No categories yet. Create one above.</p>
        ) : (
          <div className="divide-y divide-noir-800">
            {categories.map((cat) => (
              <div key={cat._id}>
                <AnimatePresence>
                  {editingCat?._id === cat._id ? (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="p-6 bg-noir-800/50"
                    >
                      <p className="font-accent text-[10px] tracking-widest uppercase text-gold-400 mb-4">Editing: {cat.name}</p>
                      <CategoryForm initial={cat} onSubmit={handleUpdate} onCancel={() => setEditingCat(null)} isLoading={updating} />
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-4 p-4 hover:bg-noir-800/30 transition-colors">
                      <GripVertical size={16} className="text-noir-700 flex-shrink-0" />
                      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-noir-800">
                        {cat.image && (
                          <Image src={cat.image.startsWith('http') ? cat.image : `${process.env.NEXT_PUBLIC_UPLOADS_URL}${cat.image}`} alt={cat.name} fill className="object-cover" sizes="48px" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-cream-100 font-medium">{cat.name}</p>
                        <p className="font-body text-xs text-noir-500 truncate">{cat.description || 'No description'}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="font-accent text-[9px] tracking-widest uppercase text-noir-500">Order: {cat.order}</span>
                        <span className={`font-accent text-[9px] tracking-widest uppercase px-2 py-1 ${cat.isActive ? 'text-green-400 bg-green-400/10' : 'text-noir-500 bg-noir-800'}`}>
                          {cat.isActive ? 'Active' : 'Hidden'}
                        </span>
                        <button onClick={() => setEditingCat(cat)} className="p-2 text-noir-500 hover:text-gold-400 transition-colors">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(cat)} className="p-2 text-noir-500 hover:text-red-400 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
