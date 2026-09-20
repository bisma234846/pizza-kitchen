"use client";

import { useState, FormEvent } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/data";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Delivery");
  const [message, setMessage] = useState("");

  const handleWhatsAppSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `*New Inquiry / Order — The Pizza Kitchen*%0A*Name:* ${encodeURIComponent(
      name
    )}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(
      service
    )}%0A*Details:* ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e74728]">
            Location & Quick Order
          </p>
          <h2 className="mt-3 font-serif text-5xl font-black text-[#153b2e]">
            Visit us or order direct
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-[#61766b]">
            Located at Susan Road, Faisalabad. Stop by for cozy dine-in, fast takeaway, or 30-min home delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Cards & Info */}
          <AnimatedSection className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-[1.5rem] bg-[#fffaf0] border border-[#eadfca] shadow-[0_4px_20px_rgba(38,60,45,.04)] space-y-6">
              <h3 className="text-xl font-black text-[#153b2e] border-b border-[#eadfca] pb-3">
                Branch & Contact Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#e74728] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#153b2e]">Susan Road Branch</h4>
                  <p className="text-[#61766b] text-xs mt-0.5 leading-relaxed">
                    {CONTACT.address}
                  </p>
                </div>
              </div>

              {/* Phone / UAN */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#153b2e] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5 text-[#ffd34e]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#153b2e]">Delivery Hotline & UAN</h4>
                  <p className="text-[#153b2e] font-black text-sm mt-0.5">
                    {CONTACT.phone1}
                  </p>
                  <p className="text-[#70847a] text-xs">
                    Direct Mobile: {CONTACT.phone2}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ffd34e] text-[#153b2e] flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#153b2e]">Operating Hours</h4>
                  <p className="text-[#61766b] text-xs mt-0.5">
                    {CONTACT.hours}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#fffaf0] text-[#70847a] flex items-center justify-center shrink-0 border border-[#eadfca]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#153b2e]">Email Inquiry</h4>
                  <p className="text-[#61766b] text-xs mt-0.5">
                    {CONTACT.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-[1.5rem] overflow-hidden border border-[#eadfca] shadow-md h-60 bg-stone-100 relative">
              <iframe
                title="The Pizza Kitchen Location Map"
                src={CONTACT.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>

          {/* Right Column: Fast WhatsApp Message Form */}
          <AnimatedSection delay={0.15} className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-[2rem] bg-[#153b2e] text-[#fff9e7] shadow-2xl border border-[#153b2e]">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="p-1.5 rounded-lg bg-green-600 text-white">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-green-400">
                  Instant WhatsApp Connect
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#fff9e7] mb-2 font-serif">
                Send an order or inquiry
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mb-6 leading-relaxed">
                Fill in your details below to directly connect with our WhatsApp order desk.
              </p>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wider">
                      Your Name <span className="text-[#e74728]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ali Raza"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-[#fff9e7] text-xs sm:text-sm placeholder-white/30 focus:outline-none focus:border-[#ffd34e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wider">
                      Phone Number <span className="text-[#e74728]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-[#fff9e7] text-xs sm:text-sm placeholder-white/30 focus:outline-none focus:border-[#ffd34e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wider">
                    Service Type
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-[#fff9e7] text-xs sm:text-sm focus:outline-none focus:border-[#ffd34e]"
                  >
                    <option value="Delivery" className="bg-[#153b2e]">Home Delivery (30 Mins across Faisalabad)</option>
                    <option value="Takeaway" className="bg-[#153b2e]">Takeaway Pickup</option>
                    <option value="Dine-in Reservation" className="bg-[#153b2e]">Dine-In Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wider">
                    Order Details / Message <span className="text-[#e74728]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. 1 Large Chicken Tikka Pizza + 6 Hot Wings for delivery at D-Ground"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-[#fff9e7] text-xs sm:text-sm placeholder-white/30 focus:outline-none focus:border-[#ffd34e] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#e74728] hover:bg-[#ffd34e] hover:text-[#153b2e] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg min-h-[48px] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}