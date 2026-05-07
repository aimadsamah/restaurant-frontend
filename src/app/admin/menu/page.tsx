"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Search, Filter } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} from "@/features/api";
import type { MenuItem, Category } from "@/types";

const schema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().min(1, "Description required"),
  price: z.string().min(1, "Price required"),
  category: z.string().min(1, "Category required"),
  availability: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.string().optional(),
  allergens: z.string().optional(),
  preparationTime: z.string().optional(),
  image: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

function MenuItemForm({
  initial,
  categories,
  onSubmit,
  onCancel,
  isLoading,
}: {
  initial?: MenuItem;
  categories: Category[];
  onSubmit: (d: FormData, f?: File) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initial?.image || "");

  const categoryId =
    typeof initial?.category === "object"
      ? (initial.category as Category)._id
      : (initial?.category ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name ?? "",
      description: initial?.description ?? "",
      price: String(initial?.price ?? ""),
      category: categoryId,
      availability: initial?.availability ?? true,
      featured: initial?.featured ?? false,
      tags: initial?.tags?.join(", ") ?? "",
      allergens: initial?.allergens?.join(", ") ?? "",
      preparationTime: String(initial?.preparationTime ?? 20),
      image: initial?.image ?? "",
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
    <form
      onSubmit={handleSubmit((d) => onSubmit(d, imageFile ?? undefined))}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label-luxury">Item Name *</label>
          <input {...register("name")} className="input-luxury" />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="label-luxury">Price (DA) *</label>
          <input
            {...register("price")}
            type="number"
            step="0.01"
            min="0"
            className="input-luxury"
          />
          {errors.price && (
            <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className="label-luxury">Description *</label>
        <textarea
          {...register("description")}
          rows={3}
          className="input-luxury resize-none"
        />
        {errors.description && (
          <p className="text-red-400 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label-luxury">Category *</label>
          <select
            {...register("category")}
            className="input-luxury bg-transparent cursor-pointer"
          >
            <option value="" className="bg-noir-800">
              Select category
            </option>
            {categories.map((c) => (
              <option key={c._id} value={c._id} className="bg-noir-800">
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-400 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <label className="label-luxury">Prep Time (min)</label>
          <input
            {...register("preparationTime")}
            type="number"
            min="1"
            className="input-luxury"
          />
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="label-luxury">Image</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="item-img"
            />
            <label
              htmlFor="item-img"
              className="flex items-center gap-3 cursor-pointer border border-dashed border-noir-600 hover:border-gold-400/50 p-4 transition-colors"
            >
              {preview ? (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={preview}
                    alt="preview"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-noir-800 flex items-center justify-center flex-shrink-0">
                  <Plus size={20} className="text-noir-500" />
                </div>
              )}
              <span className="font-body text-xs text-noir-400">
                Upload image
              </span>
            </label>
          </div>
          <div>
            <label className="label-luxury">Or Image URL</label>
            <input
              {...register("image")}
              className="input-luxury"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label-luxury">Tags (comma-separated)</label>
          <input
            {...register("tags")}
            className="input-luxury"
            placeholder="signature, vegetarian..."
          />
        </div>
        <div>
          <label className="label-luxury">Allergens (comma-separated)</label>
          <input
            {...register("allergens")}
            className="input-luxury"
            placeholder="dairy, gluten..."
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <input
            {...register("availability")}
            type="checkbox"
            id="avail"
            className="accent-gold-400"
          />
          <label
            htmlFor="avail"
            className="font-accent text-[10px] tracking-widest uppercase text-noir-400 cursor-pointer"
          >
            Available
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            {...register("featured")}
            type="checkbox"
            id="feat"
            className="accent-gold-400"
          />
          <label
            htmlFor="feat"
            className="font-accent text-[10px] tracking-widest uppercase text-noir-400 cursor-pointer"
          >
            Featured / Chef's Choice
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-noir-800">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-gold-filled text-[10px] disabled:opacity-50"
        >
          {isLoading ? "Saving..." : initial ? "Update Item" : "Create Item"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-gold relative z-10 text-[10px]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminMenuPage() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [page, setPage] = useState(1);

  const { data: menuData, isLoading } = useGetMenuItemsQuery({
    limit: 20,
    page,
    ...(filterCat && { category: filterCat }),
  });
  const { data: catData } = useGetCategoriesQuery();
  const [createMenuItem, { isLoading: creating }] = useCreateMenuItemMutation();
  const [updateMenuItem, { isLoading: updating }] = useUpdateMenuItemMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const items: MenuItem[] = menuData?.data?.items ?? [];
  const pagination = menuData?.data?.pagination;
  const categories: Category[] = catData?.data ?? [];

  const filteredItems = search
    ? items.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.description.toLowerCase().includes(search.toLowerCase()),
      )
    : items;

  const buildFD = (formData: any, file?: File) => {
    const fd = new window.FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== undefined && v !== "") fd.append(k, String(v));
    });
    if (file) fd.append("image", file);
    return fd;
  };

  const handleCreate = async (formData: any, file?: File) => {
    try {
      await createMenuItem(buildFD(formData, file)).unwrap();
      toast.success("Menu item created!");
      setShowForm(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create item");
    }
  };

  const handleUpdate = async (formData: any, file?: File) => {
    if (!editingItem) return;
    try {
      await updateMenuItem({
        id: editingItem._id,
        data: buildFD(formData, file),
      }).unwrap();
      toast.success("Menu item updated!");
      setEditingItem(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update item");
    }
  };

  const handleDelete = async (item: MenuItem) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await deleteMenuItem(item._id).unwrap();
      toast.success("Item deleted");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-accent text-[10px] tracking-ultra-wide uppercase text-gold-400 mb-1">
            Management
          </p>
          <h1 className="font-display text-4xl text-cream-100 font-light">
            Menu Items
          </h1>
        </div>
        {!showForm && !editingItem && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-gold-filled text-[10px] flex items-center gap-2"
          >
            <Plus size={14} /> New Item
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      <AnimatePresence>
        {(showForm || editingItem) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-noir-900 border border-gold-400/20 p-6 mb-8"
          >
            <h2 className="font-accent text-xs tracking-widest uppercase text-gold-400 mb-6 flex justify-between">
              {editingItem ? `Editing: ${editingItem.name}` : "New Menu Item"}
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              >
                <X size={16} className="text-noir-500 hover:text-cream-100" />
              </button>
            </h2>
            <MenuItemForm
              initial={editingItem ?? undefined}
              categories={categories}
              onSubmit={editingItem ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              isLoading={creating || updating}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full bg-noir-900 border border-noir-700 text-cream-100 text-sm pl-9 pr-4 py-3 outline-none focus:border-gold-400/50 font-body"
          />
        </div>
        <div className="relative">
          <Filter
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-500"
          />
          <select
            value={filterCat}
            onChange={(e) => {
              setFilterCat(e.target.value);
              setPage(1);
            }}
            className="bg-noir-900 border border-noir-700 text-cream-100 text-sm pl-9 pr-8 py-3 outline-none focus:border-gold-400/50 font-body cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-noir-900 border border-noir-800">
        <div className="p-6 border-b border-noir-800 flex items-center justify-between">
          <h2 className="font-accent text-xs tracking-widest uppercase text-cream-300">
            {pagination?.total ?? 0} Items
          </h2>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-20 w-full" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="p-8 text-center font-body text-noir-500 text-sm">
            No items found.
          </p>
        ) : (
          <>
            <div className="divide-y divide-noir-800">
              {filteredItems.map((item) => {
                const catName =
                  typeof item.category === "object"
                    ? (item.category as Category).name
                    : "—";
                const imgSrc = item.image
                  ? item.image.startsWith("http")
                    ? item.image
                    : `${process.env.NEXT_PUBLIC_UPLOADS_URL}${item.image}`
                  : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&q=60";

                return (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-4 hover:bg-noir-800/30 transition-colors"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden bg-noir-800">
                      <Image
                        src={imgSrc}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-body text-sm text-cream-100 font-medium truncate">
                          {item.name}
                        </p>
                        {item.featured && (
                          <span className="font-accent text-[8px] tracking-widest uppercase text-gold-400 border border-gold-400/30 px-1.5 py-0.5 flex-shrink-0">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="font-body text-xs text-noir-500 truncate">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <span className="font-accent text-[10px] tracking-widest uppercase text-noir-400 hidden sm:block">
                        {catName}
                      </span>
                      <span className="font-display text-gold-400 text-lg">
                        ${item.price}
                      </span>
                      <span
                        className={`font-accent text-[8px] tracking-widest uppercase px-2 py-1 ${item.availability ? "text-green-400 bg-green-400/10" : "text-noir-500 bg-noir-800"}`}
                      >
                        {item.availability ? "Available" : "Unavail."}
                      </span>
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-noir-500 hover:text-gold-400 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-noir-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-noir-800">
                <span className="font-body text-xs text-noir-500">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 font-accent text-[10px] tracking-widest uppercase border border-noir-700 text-noir-400 hover:border-gold-400/50 hover:text-cream-100 disabled:opacity-30 transition-colors"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(pagination.pages, p + 1))
                    }
                    disabled={page === pagination.pages}
                    className="px-3 py-1.5 font-accent text-[10px] tracking-widest uppercase border border-noir-700 text-noir-400 hover:border-gold-400/50 hover:text-cream-100 disabled:opacity-30 transition-colors"
                  >
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
