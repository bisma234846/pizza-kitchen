"use client";

import React from "react";
import { MessageSquare, Send, CheckCircle2, Clock, Users, ArrowRight } from "lucide-react";

export default function FollowUpWAPage() {
  const campaigns = [
    {
      id: "WA-01",
      title: "Post-Meal Quality Check (1 Hour Post Delivery)",
      template: "Hi {{CustomerName}}, hope you loved your pizza from The Pizza Kitchen! Rate your meal in 1 click and get Rs 100 off your next order.",
      sentToday: 42,
      responseRate: "68%",
      status: "Automated & Active",
    },
    {
      id: "WA-02",
      title: "Inactive Customer Win-Back (14 Days)",
      template: "We miss you at The Pizza Kitchen Susan Road! Here's an exclusive 20% discount code: COMEBACK20. Valid this weekend only.",
      sentToday: 85,
      responseRate: "34%",
      status: "Scheduled Weekly",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">WhatsApp Follow-up Automation</h2>
          <p className="text-xs text-stone-400">Automated post-meal feedback requests and customer retention flows</p>
        </div>

        <button
          onClick={() => alert("New WhatsApp campaign creator launched!")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-lg shadow-green-950/40"
        >
          <MessageSquare className="w-4 h-4" />
          <span>+ Create Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">{c.id}</span>
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-[10px] font-bold border border-green-500/30">
                  {c.status}
                </span>
              </div>

              <h4 className="text-sm font-black text-white">{c.title}</h4>

              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300 font-mono">
                {c.template}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <div>
                <span>Sent Today: <strong className="text-white">{c.sentToday}</strong></span>
                <span className="mx-2">•</span>
                <span>Response: <strong className="text-amber-400">{c.responseRate}</strong></span>
              </div>

              <button
                onClick={() => alert(`Broadcast test for ${c.title}`)}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-[11px]"
              >
                Send Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
