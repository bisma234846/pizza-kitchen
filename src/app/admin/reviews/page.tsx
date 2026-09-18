"use client";

import React, { useState, useMemo } from "react";
import {
  Star,
  MessageSquare,
  CheckCircle,
  Reply,
  Search,
  Filter,
  ThumbsUp,
  ExternalLink,
  Plus,
  Trash2,
  Eye,
  AlertCircle,
  Sparkles,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";
import { RESTAURANT } from "@/lib/data";

interface AdminReview {
  id: string;
  name: string;
  initial: string;
  rating: number;
  date: string;
  source: "Google" | "Website" | "WhatsApp";
  orderRef?: string;
  itemOrdered?: string;
  text: string;
  isFeatured: boolean;
  reply?: {
    text: string;
    repliedAt: string;
    repliedBy: string;
  };
}

const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: "REV-101",
    name: "Dr. Hamza Tariq",
    initial: "H",
    rating: 5,
    date: "Today, 11:30 AM",
    source: "Google",
    orderRef: "#PK-1043",
    itemOrdered: "Chicken Supreme Large & Garlic Bread",
    text: "Hands down the crispiest crust in Faisalabad! The stuffed crust was overflowing with cheese and arrived piping hot on Susan Road within 25 minutes. 10/10 recommended!",
    isFeatured: true,
    reply: {
      text: "Thank you Dr. Hamza! We take immense pride in our fresh dough and swift dispatch. Excited to serve you again soon!",
      repliedAt: "Today, 11:45 AM",
      repliedBy: "Muhammad Hamza (Admin)",
    },
  },
  {
    id: "REV-102",
    name: "Ayesha Malik",
    initial: "A",
    rating: 5,
    date: "Yesterday",
    source: "Website",
    orderRef: "#PK-1038",
    itemOrdered: "Fettuccine Alfredo & BBQ Wings",
    text: "The Alfredo pasta was silky and deeply flavorful, and the wings had the perfect smoky tang. Ordering on the website was seamless.",
    isFeatured: true,
  },
  {
    id: "REV-103",
    name: "Usman Ghani",
    initial: "U",
    rating: 4,
    date: "16 Sep 2026",
    source: "WhatsApp",
    orderRef: "#PK-1034",
    itemOrdered: "Family Platter & 1.5L Coke",
    text: "Great taste and very generous portion size for the family feast. Delivery took 38 mins instead of 30 mins, but food was still warm.",
    isFeatured: true,
    reply: {
      text: "Thanks for the feedback Usman! We are optimizing our rush-hour dispatch routes on Susan Rd. We hope to deliver even faster next time!",
      repliedAt: "16 Sep, 3:10 PM",
      repliedBy: "Support Team",
    },
  },
  {
    id: "REV-104",
    name: "Zainab Bibi",
    initial: "Z",
    rating: 5,
    date: "15 Sep 2026",
    source: "Google",
    orderRef: "#PK-1030",
    itemOrdered: "Chicken Tikka Pizza & Mint Margarita",
    text: "Celebrated my sister's birthday here! Staff arranged a complimentary brownie with candle and the hospitality was exceptional.",
    isFeatured: true,
  },
  {
    id: "REV-105",
    name: "Bilal Farooq",
    initial: "B",
    rating: 3,
    date: "14 Sep 2026",
    source: "Website",
    orderRef: "#PK-1027",
    itemOrdered: "Beef Pepperoni Medium",
    text: "Pizza was good but needed a bit more oregano and chili flakes packets. Would love extra seasoning options on web checkout.",
    isFeatured: false,
  },
  {
    id: "REV-106",
    name: "Nida Kamran",
    initial: "N",
    rating: 5,
    date: "13 Sep 2026",
    source: "Google",
    orderRef: "#PK-1021",
    itemOrdered: "Malai Boti Pizza & Cheese Sticks",
    text: "Best Pakistani fusion flavor! Tender chicken chunks and the dip sauce is unmatched.",
    isFeatured: true,
  },
  {
    id: "REV-107",
    name: "Kashif Mehmood",
    initial: "K",
    rating: 2,
    date: "12 Sep 2026",
    source: "WhatsApp",
    orderRef: "#PK-1018",
    itemOrdered: "Peri Peri Chicken Pizza",
    text: "The pizza was too spicy for the kids even though we requested mild spice. Kindly double check custom instructions.",
    isFeatured: false,
    reply: {
      text: "We deeply apologize Kashif! We've credited your account with a PKR 300 voucher for your next order. Our kitchen head has been alerted to review spice notes closely.",
      repliedAt: "12 Sep, 8:20 PM",
      repliedBy: "Branch Manager",
    },
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Reply Modal State
  const [replyingReview, setReplyingReview] = useState<AdminReview | null>(null);
  const [replyText, setReplyText] = useState("");

  // Add Review Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    source: "Google" as "Google" | "Website" | "WhatsApp",
    text: "",
    orderRef: "",
    itemOrdered: "",
  });

  // Calculate Metrics
  const totalCount = 142; // Lifetime count
  const averageRating = 4.1;
  const ratingDistribution = [
    { stars: 5, count: 82, percent: 58 },
    { stars: 4, count: 34, percent: 24 },
    { stars: 3, count: 14, percent: 10 },
    { stars: 2, count: 7, percent: 5 },
    { stars: 1, count: 5, percent: 3 },
  ];

  // Filtering
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          r.name.toLowerCase().includes(q) ||
          r.text.toLowerCase().includes(q) ||
          r.itemOrdered?.toLowerCase().includes(q) ||
          r.orderRef?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Rating filter
      if (ratingFilter === "5" && r.rating !== 5) return false;
      if (ratingFilter === "4" && r.rating !== 4) return false;
      if (ratingFilter === "3" && r.rating !== 3) return false;
      if (ratingFilter === "critical" && r.rating > 2) return false;

      // Source filter
      if (sourceFilter !== "all" && r.source !== sourceFilter) return false;

      // Status filter
      if (statusFilter === "needs-reply" && r.reply) return false;
      if (statusFilter === "replied" && !r.reply) return false;
      if (statusFilter === "featured" && !r.isFeatured) return false;

      return true;
    });
  }, [reviews, searchQuery, ratingFilter, sourceFilter, statusFilter]);

  // Actions
  const toggleFeatured = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r))
    );
  };

  const deleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingReview || !replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyingReview.id
          ? {
              ...r,
              reply: {
                text: replyText.trim(),
                repliedAt: "Just now",
                repliedBy: "Admin Management",
              },
            }
          : r
      )
    );

    setReplyingReview(null);
    setReplyText("");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    const created: AdminReview = {
      id: `REV-${Date.now().toString().slice(-4)}`,
      name: newReview.name.trim(),
      initial: newReview.name.trim()[0].toUpperCase(),
      rating: newReview.rating,
      date: "Just now",
      source: newReview.source,
      orderRef: newReview.orderRef.trim() || undefined,
      itemOrdered: newReview.itemOrdered.trim() || undefined,
      text: newReview.text.trim(),
      isFeatured: true,
    };

    setReviews([created, ...reviews]);
    setShowAddModal(false);
    setNewReview({
      name: "",
      rating: 5,
      source: "Google",
      text: "",
      orderRef: "",
      itemOrdered: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>Customer Reviews & Feedback</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              4.1 ★ Verified
            </span>
          </h2>
          <p className="text-xs text-stone-400">
            Monitor Google ratings, web feedback, and WhatsApp post-meal reviews for Susan Road branch
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* TOP RATING SUMMARY & DISTRIBUTION BARS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Rating Score Card (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Overall Reputation
            </span>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-5xl font-black text-white">{averageRating}</span>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400/30 text-amber-400/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  Based on {totalCount} verified reviews
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs">
            <span className="text-stone-400">Google Rating</span>
            <span className="font-extrabold text-amber-300">4.1 ★ (Susan Rd HQ)</span>
          </div>
        </div>

        {/* Rating Star Distribution Bar Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
              Star Rating Breakdown
            </h3>
            <span className="text-xs text-green-400 font-bold">88% Positive Feedback</span>
          </div>

          <div className="space-y-2.5">
            {ratingDistribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-bold text-stone-300 flex items-center gap-1">
                  <span>{d.stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                </span>

                <div className="flex-1 h-3 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      d.stars >= 4
                        ? "bg-amber-500"
                        : d.stars === 3
                        ? "bg-amber-600/70"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${d.percent}%` }}
                  />
                </div>

                <span className="w-14 text-right text-stone-400 font-semibold text-[11px]">
                  {d.count} ({d.percent}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews by customer, dish or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500 transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Rating Dropdown */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-semibold text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars Only</option>
            <option value="4">4 Stars Only</option>
            <option value="3">3 Stars Only</option>
            <option value="critical">Critical (&le; 2 Stars)</option>
          </select>

          {/* Source Dropdown */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-semibold text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Sources</option>
            <option value="Google">Google</option>
            <option value="Website">Website</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-semibold text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Status</option>
            <option value="needs-reply">Needs Reply</option>
            <option value="replied">Replied</option>
            <option value="featured">Featured on Web</option>
          </select>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReviews.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-stone-900/60 rounded-3xl border border-dashed border-stone-800">
            <p className="text-stone-400 text-sm">No reviews matched your filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setRatingFilter("all");
                setSourceFilter("all");
                setStatusFilter("all");
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-stone-800 text-xs font-bold text-stone-300 hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`p-6 rounded-3xl bg-stone-900 border transition-all flex flex-col justify-between space-y-4 shadow-xl ${
                review.rating <= 2
                  ? "border-red-900/50 bg-red-950/10"
                  : review.isFeatured
                  ? "border-stone-800 hover:border-amber-500/40"
                  : "border-stone-800"
              }`}
            >
              {/* Review Card Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  {/* Reviewer info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                      {review.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-extrabold text-white">{review.name}</h4>
                        <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 text-[10px] font-bold">
                          {review.source}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500">{review.date}</span>
                    </div>
                  </div>

                  {/* Rating Stars & Source */}
                  <div className="flex items-center gap-1 text-amber-400 bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-stone-700 text-stone-700"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-[11px] font-black text-white">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                {/* Order Item Badge */}
                {review.itemOrdered && (
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <span className="text-red-400 font-bold">{review.orderRef}</span>
                    <span>&bull;</span>
                    <span className="truncate">{review.itemOrdered}</span>
                  </div>
                )}

                {/* Review Content */}
                <p className="text-xs text-stone-300 leading-relaxed italic bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800/80">
                  "{review.text}"
                </p>

                {/* Management Reply block if present */}
                {review.reply && (
                  <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-red-400 flex items-center gap-1">
                        <Reply className="w-3 h-3" />
                        Management Response ({review.reply.repliedBy})
                      </span>
                      <span className="text-stone-500">{review.reply.repliedAt}</span>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-normal">
                      {review.reply.text}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                {/* Feature on Website Switch */}
                <button
                  onClick={() => toggleFeatured(review.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    review.isFeatured
                      ? "bg-green-600/20 text-green-400 border border-green-500/30"
                      : "bg-stone-800 text-stone-400 hover:text-white"
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{review.isFeatured ? "Featured on Web" : "Feature on Web"}</span>
                </button>

                {/* Action Buttons: Reply, Delete */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setReplyingReview(review);
                      setReplyText(review.reply?.text || "");
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Reply className="w-3.5 h-3.5 text-red-400" />
                    <span>{review.reply ? "Edit Reply" : "Reply"}</span>
                  </button>

                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-1.5 rounded-xl bg-stone-800 hover:bg-red-600/20 text-stone-400 hover:text-red-400 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* REPLY MODAL */}
      {replyingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-stone-900 border border-stone-800 p-6 text-white shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-sm font-extrabold flex items-center gap-2">
                <Reply className="w-4 h-4 text-red-500" />
                <span>Reply to {replyingReview.name}</span>
              </h3>
              <button
                onClick={() => setReplyingReview(null)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer review summary */}
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-stone-400">
                <span className="font-bold text-white">{replyingReview.name} ({replyingReview.rating}★)</span>
                <span>{replyingReview.date}</span>
              </div>
              <p className="text-stone-300 italic">"{replyingReview.text}"</p>
            </div>

            {/* Quick Templates */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Quick Reply Templates:
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setReplyText(
                      "Thank you so much for the love! We are thrilled that you enjoyed our fresh dough and speedy service. See you again soon!"
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-medium transition-colors"
                >
                  Positive Review Thank You
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setReplyText(
                      "We deeply apologize for your experience. Please share your phone number with our management team on WhatsApp (0300-1234567) so we can make this right for you immediately."
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-medium transition-colors"
                >
                  Service Apology & Resolution
                </button>
              </div>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3">
              <textarea
                required
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write an official management response..."
                className="w-full p-3 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReplyingReview(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-red-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD REVIEW MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-stone-900 border border-stone-800 p-6 text-white shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-sm font-extrabold flex items-center gap-2">
                <Plus className="w-4 h-4 text-red-500" />
                <span>Add Customer Feedback</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-300">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Farhan Ali"
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-300">Rating (Stars)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({ ...newReview, rating: Number(e.target.value) })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Poor)</option>
                    <option value={1}>1 Star (Critical)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-300">Source</label>
                  <select
                    value={newReview.source}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        source: e.target.value as "Google" | "Website" | "WhatsApp",
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Google">Google Review</option>
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-300">Order Ref</label>
                  <input
                    type="text"
                    value={newReview.orderRef}
                    onChange={(e) =>
                      setNewReview({ ...newReview, orderRef: e.target.value })
                    }
                    placeholder="e.g. #PK-1049"
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-300">Dishes Ordered</label>
                <input
                  type="text"
                  value={newReview.itemOrdered}
                  onChange={(e) =>
                    setNewReview({ ...newReview, itemOrdered: e.target.value })
                  }
                  placeholder="e.g. Chicken Tikka Pizza Large"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-300">Review Text</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Enter customer feedback details..."
                  className="w-full mt-1 p-3 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-md shadow-red-600/30"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
