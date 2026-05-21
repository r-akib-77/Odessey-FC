"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import {
  PlusCircle,
  Upload,
  Type,
  Calendar as CalendarIcon,
  Tag,
  FileText,
  CheckCircle,
  Eye,
  Trash2,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { dummyData } from "@/dummyData";

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

interface NewsFormState {
  title: string;
  slug: string;
  desc: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
}

export default function NewsAdminPanel() {
  const [newsList, setNewsList] = useState(dummyData);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<NewsFormState>({
    title: "",
    slug: "",
    desc: "",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    category: "Sponsorship",
    image: "",
    featured: false,
  });

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocalImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const temporaryBlobUrl = URL.createObjectURL(selectedFile);
      setFormData((prev) => ({
        ...prev,
        image: temporaryBlobUrl,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please choose a cover image file first.");
      return;
    }

    const newPost = {
      id: Date.now(),
      ...formData,
    };

    let updatedList = [...newsList];
    if (formData.featured) {
      updatedList = updatedList.map((post) => ({ ...post, featured: false }));
    }

    setNewsList([newPost, ...updatedList]);
    setShowSuccess(true);

    setFormData({
      title: "",
      slug: "",
      desc: "",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: "Sponsorship",
      image: "",
      featured: false,
    });

    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this press release item?")) {
      setNewsList(newsList.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.98)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full text-white px-3 sm:px-6 py-6 sm:py-12 md:py-16 relative">
      {/* Responsive Glow Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[95vw] md:w-[75vw] h-[35vh] bg-[#E9C349]/5 blur-[60px] md:blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col gap-5 sm:gap-10">
        {/* PANEL HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 sm:pb-5 gap-3 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-1.5 text-[#E9C349] font-black tracking-widest text-[9px] sm:text-xs uppercase mb-1">
              <Lock className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Backoffice Portal
            </div>
            <h1 className="font-extrabold italic text-xl sm:text-3xl md:text-4xl tracking-tighter uppercase leading-none">
              NEWS MANAGEMENT CONTROL
            </h1>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2.5 self-center sm:self-auto">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-400">
              STATUS: MOCK_MODE
            </span>
          </div>
        </div>

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-bold mx-0.5"
          >
            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 shrink-0 text-emerald-500" />
            Post generated successfully inside frontend storage array memory!
          </motion.div>
        )}

        {/* MAIN WORKSPACE GRID CONFIGURATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
          {/* FORM COMPONENT (Stacked on Mobile, 7 columns on Desktop) */}
          <motion.form
            variants={panelVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-[#121212]/70 backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl flex flex-col gap-4 sm:gap-5 shadow-2xl w-full"
          >
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#E9C349] border-b border-white/5 pb-2 flex items-center gap-2">
              <PlusCircle className="w-3.5 h-3.5" /> Create Press Release
            </h2>

            {/* Title Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] sm:text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                <Type className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E9C349]" />{" "}
                Article Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter article title..."
                className="w-full bg-black/50 border border-white/10 focus:border-[#E9C349] rounded-lg px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-white font-medium outline-none transition-colors"
              />
            </div>

            {/* System Router Slug */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] sm:text-xs font-black uppercase text-gray-500 tracking-wider">
                System Router Slug (Auto-Generated)
              </label>
              <input
                type="text"
                readOnly
                value={formData.slug}
                placeholder="slug-path-generates-automatically"
                className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-mono text-gray-400 outline-none cursor-not-allowed"
              />
            </div>

            {/* Category & Date Row Setup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] sm:text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E9C349]" />{" "}
                  Category Group
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 focus:border-[#E9C349] rounded-lg px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-white font-medium outline-none cursor-pointer appearance-none"
                  >
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Tournament">Tournament</option>
                    <option value="Business">Business</option>
                    <option value="Development">Development</option>
                    <option value="Club News">Club News</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] sm:text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                  <CalendarIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E9C349]" />{" "}
                  Custom Release Date
                </label>
                <input
                  type="text"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-white/10 focus:border-[#E9C349] rounded-lg px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-white font-medium outline-none"
                />
              </div>
            </div>

            {/* Local Image Input Dropzone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] sm:text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E9C349]" />{" "}
                Cover Media Asset
              </label>

              <div className="relative border-2 border-dashed border-white/10 hover:border-[#E9C349]/50 rounded-xl p-3 sm:p-4 transition-colors bg-black/30 flex flex-col items-center justify-center text-center min-h-[130px] sm:min-h-[140px]">
                {formData.image ? (
                  <div className="w-full flex flex-col items-center gap-3">
                    <div className="relative w-full aspect-[16/9] sm:h-32 sm:w-auto rounded-lg overflow-hidden border border-white/10 max-w-sm">
                      <Image
                        src={formData.image}
                        alt="Local preview asset"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#E9C349] bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-1.5 rounded-md cursor-pointer transition-colors">
                      Change Local File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLocalImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-3 sm:p-4 group select-none">
                    <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500 group-hover:text-[#E9C349] transition-colors mb-2" />
                    <span className="text-xs font-bold text-gray-300 block">
                      Choose image file
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">
                      Previews instantly on screen
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLocalImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Description Textarea Area */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] sm:text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E9C349]" />{" "}
                Summary Description Text
              </label>
              <textarea
                name="desc"
                required
                rows={4}
                value={formData.desc}
                onChange={handleInputChange}
                placeholder="Write summary metrics of the victory here..."
                className="w-full bg-black/50 border border-white/10 focus:border-[#E9C349] rounded-lg p-3 sm:p-3.5 text-xs sm:text-sm text-white outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Hero Configuration Checkbox Toggle */}
            <label className="flex items-start gap-3 bg-white/[0.02] border border-white/5 hover:border-white/10 p-3 sm:p-3.5 rounded-lg cursor-pointer transition-colors select-none">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, featured: e.target.checked }))
                }
                className="w-4 h-4 rounded border-white/10 bg-black/50 text-black focus:ring-0 cursor-pointer accent-[#E9C349] mt-0.5"
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-black uppercase block tracking-wider text-white">
                  Set As Featured Hero Post
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5 leading-normal">
                  Enabling this places this item inside your primary banner
                  view.
                </span>
              </div>
            </label>

            <button
              type="submit"
              className="w-full text-black font-black uppercase italic tracking-widest text-xs sm:text-sm py-3 sm:py-3.5 rounded-lg bg-[#E9C349] hover:bg-[#FFF9D2] transition-colors duration-300 shadow-lg mt-1"
            >
              Push To Local Feed
            </button>
          </motion.form>

          {/* MONITOR LIST LOG (Stacked below form container inputs on mobile) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 w-full mt-4 lg:mt-0">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-400 border-b border-white/5 pb-2 px-1 flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#E9C349]" /> Active Storage
              Monitor ({newsList.length})
            </h2>

            <div className="flex flex-col gap-3 max-h-[400px] lg:max-h-[770px] overflow-y-auto pr-0.5 no-scrollbar">
              {newsList.map((item) => (
                <div
                  key={item.id}
                  className={`border p-3 rounded-xl bg-[#121212]/40 backdrop-blur-sm flex gap-3 sm:gap-3.5 items-center justify-between relative overflow-hidden ${
                    item.featured ? "border-[#E9C349]" : "border-white/10"
                  }`}
                >
                  <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-white/5">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        unoptimized={item.image.startsWith("blob:")}
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-[9px]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-[8px] font-black uppercase">
                      <span className="text-[#E9C349]">{item.category}</span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span className="text-gray-400 font-mono">
                        {item.date}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm uppercase italic text-gray-100 truncate pr-1">
                      {item.title}
                    </h4>
                    <span className="text-[8px] sm:text-[9px] font-mono text-gray-500 truncate block mt-0.5">
                      path: /news/{item.slug}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  {item.featured && (
                    <div className="absolute top-0 right-0 bg-[#E9C349] text-black font-black uppercase text-[6px] tracking-widest px-1.5 py-0.5 rounded-bl shadow-sm">
                      Hero
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
