"use client";

import { useState, FormEvent } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/data";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Delivery");
  const [message, setMessage] = useState("");

  const handleWhatsAppSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `*New Website Inquiry/Order*%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Details:* ${message}`;
    window.open(`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Location & Quick Order"
          title="Visit Us or Order Direct"
          subtitle="Located in the heart of Susan Road, Faisalabad. Drop by for dine-in or send us a message for fast delivery."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Info */}
          <AnimatedSection className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-[#FFF8F0] border border-stone-200/80 shadow-xs space-y-6">
              <h3 className="text-xl font-extrabold text-stone-900 border-b border-stone-200 pb-3">
                Store Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Address</h4>
                  <p className="text-stone-600 text-xs mt-0.5 leading-relaxed">
                    {CONTACT.address}
                  </p>
                </div>
              </div>

              {/* Phone / UAN */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Delivery UAN & Mobile</h4>
                  <p className="text-stone-900 font-extrabold text-sm mt-0.5">
                    {CONTACT.phone1}
                  </p>
                  <p className="text-stone-500 text-xs">
                    Mobile: {CONTACT.phone2}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Opening Hours</h4>
                  <p className="text-stone-600 text-xs mt-0.5">
                    {CONTACT.hours}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 border border-stone-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Email Us</h4>
                  <p className="text-stone-600 text-xs mt-0.5">
                    {CONTACT.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md h-64 bg-stone-100 relative">
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
          <AnimatedSection delay={0.2} className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white shadow-2xl border border-stone-800">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-lg bg-green-600 text-white">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-green-400">
                  Direct WhatsApp Connect
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Quick Order / Table Query
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mb-8 leading-relaxed">
                Fill out your details below to instantly start a chat with our WhatsApp order desk.
              </p>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ali Raza"
                      className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Service Type
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm focus:outline-none focus:border-red-500"
                  >
                    <option value="Delivery">Home Delivery (30 Mins)</option>
                    <option value="Takeaway">Takeaway Pickup</option>
                    <option value="Dine-in Reservation">Dine-In Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Order Items / Notes
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. 1 Large Chicken Tikka Pizza + 6 Hot Wings"
                    className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-green-900/30 active:scale-95 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Order via WhatsApp</span>
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}