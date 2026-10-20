import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ExternalLink, Sparkles, MapPin, Phone } from 'lucide-react';
import { saveEnquiry } from '../../data/adminStorage';
import { CustomizationEnquiry } from '../../types/admin';

interface ContactPageProps {
  onExploreCollections: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onExploreCollections }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    deliveryAddress: '',
    themePreference: '',
    penholder: 'no' as 'yes' | 'no',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name or printed name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for order coordination.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required for delivery check.';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit Indian postal pincode.';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required.';
    }

    if (!formData.themePreference.trim()) {
      newErrors.themePreference = 'Please specify your design preference or product idea.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newEnquiry: CustomizationEnquiry = {
        id: `enquiry-contact-${Date.now()}`,
        productId: 'general-enquiry',
        productName: 'General Studio Enquiry',
        printedName: formData.name.trim(),
        nameLength: formData.name.trim().length,
        isLongNameReview: formData.name.trim().length > 8,
        deliveryAddress: formData.deliveryAddress.trim(),
        phoneNumber: formData.phone.trim(),
        pincode: formData.pincode.trim(),
        themeType: 'custom',
        themeDescription: formData.themePreference.trim(),
        penholder: formData.penholder,
        additionalRequirements: formData.notes.trim() || undefined,
        createdAt: new Date().toISOString()
      };

      saveEnquiry(newEnquiry);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-card-lavender text-xs font-bold uppercase tracking-wider text-[#563829]">
          <MessageSquare className="w-3.5 h-3.5 text-[#563829]" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#242322]">
          Let’s Bring Your Idea to Life
        </h1>
        <p className="text-sm sm:text-base text-[#563829]/80 font-medium leading-relaxed">
          Reach out for custom 3D models, bespoke name boards, sensory toys, or personalized bulk gifting. We respond directly to coordinate your creation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Official Channels & Verified Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Card */}
          <div className="clay-card-ivory rounded-3xl p-6 sm:p-7 border-2 border-white/90 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl clay-card-mint flex items-center justify-center text-[#242322]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#242322]">Official WhatsApp</h2>
                <p className="text-xs text-[#563829]/80">View catalogue & order directly</p>
              </div>
            </div>

            <p className="text-xs text-[#563829]/85 leading-relaxed">
              Browse our updated catalog or send your references directly via WhatsApp for quick coordination.
            </p>

            <a
              href="https://wa.me/c/918438594772"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl clay-card-mint hover:opacity-90 font-bold text-xs uppercase tracking-wider text-[#242322] transition-opacity cursor-pointer"
            >
              <span>Open WhatsApp Catalogue</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Instagram Direct Card */}
          <div className="clay-card-ivory rounded-3xl p-6 sm:p-7 border-2 border-white/90 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl clay-card-pink flex items-center justify-center text-[#242322]">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#242322]">Instagram Studio</h2>
                <p className="text-xs text-[#563829]/80">@formel_3d</p>
              </div>
            </div>

            <p className="text-xs text-[#563829]/85 leading-relaxed">
              Explore our latest workshop reels, customer prints, and behind-the-scenes 3D printing timelapses.
            </p>

            <a
              href="https://www.instagram.com/formel_3d/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl clay-card-pink hover:opacity-90 font-bold text-xs uppercase tracking-wider text-[#242322] transition-opacity cursor-pointer"
            >
              <span>Follow on Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Shipping & Studio Note */}
          <div className="clay-card-yellow rounded-3xl p-6 border-2 border-white/90 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#563829]" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#563829]">Pan-India Delivery</h3>
            </div>
            <p className="text-xs text-[#563829]/90 leading-relaxed">
              Orders are packaged with protective cushioning and delivered all across India. Standard print calibration takes 2–4 working days.
            </p>
          </div>

        </div>

        {/* Right: Soft 3D Customization Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="clay-card-ivory rounded-3xl sm:rounded-4xl p-6 sm:p-8 border-2 border-white/90 space-y-6">
            
            {isSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full clay-card-mint mx-auto flex items-center justify-center text-[#242322]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-[#242322]">Enquiry Submitted!</h2>
                <p className="text-xs sm:text-sm text-[#563829]/80 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. We have received your customization details and will review the specifications to contact you shortly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        pincode: '',
                        deliveryAddress: '',
                        themePreference: '',
                        penholder: 'no',
                        notes: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-white text-xs font-bold text-[#563829] border border-[#563829]/15 hover:bg-white/80 cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                  <button
                    onClick={onExploreCollections}
                    className="px-6 py-2.5 rounded-full clay-btn-lavender text-xs font-bold text-[#242322] cursor-pointer"
                  >
                    Explore Collections
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-black text-[#242322]">Customization & Project Form</h2>
                  <p className="text-xs text-[#563829]/80 mt-1">
                    Fill out your requirements below. All enquiries are saved directly to our studio dashboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#242322]">
                      Your Name / Name to Print <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Aarav, Ananya, Mihir"
                      className={`w-full px-4 py-2.5 rounded-2xl bg-white/90 border text-xs text-[#242322] focus:outline-none focus:ring-2 focus:ring-[#D3B8F5] transition-all ${
                        errors.name ? 'border-rose-400' : 'border-[#563829]/15'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#242322]">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-4 py-2.5 rounded-2xl bg-white/90 border text-xs text-[#242322] focus:outline-none focus:ring-2 focus:ring-[#D3B8F5] transition-all ${
                        errors.phone ? 'border-rose-400' : 'border-[#563829]/15'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pincode */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#242322]">
                      Pincode <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => {
                        setFormData({ ...formData, pincode: e.target.value });
                        if (errors.pincode) setErrors({ ...errors, pincode: '' });
                      }}
                      placeholder="6-digit Indian PIN"
                      className={`w-full px-4 py-2.5 rounded-2xl bg-white/90 border text-xs text-[#242322] focus:outline-none focus:ring-2 focus:ring-[#D3B8F5] transition-all ${
                        errors.pincode ? 'border-rose-400' : 'border-[#563829]/15'
                      }`}
                    />
                    {errors.pincode && <p className="text-[11px] text-rose-500">{errors.pincode}</p>}
                  </div>

                  {/* Penholder Optional choice */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#242322]">
                      Include Penholder? (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, penholder: 'yes' })}
                        className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          formData.penholder === 'yes'
                            ? 'clay-btn-lavender text-[#242322]'
                            : 'bg-white/80 border border-[#563829]/15 text-[#563829]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, penholder: 'no' })}
                        className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          formData.penholder === 'no'
                            ? 'clay-btn-lavender text-[#242322]'
                            : 'bg-white/80 border border-[#563829]/15 text-[#563829]'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#242322]">
                    Delivery Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.deliveryAddress}
                    onChange={(e) => {
                      setFormData({ ...formData, deliveryAddress: e.target.value });
                      if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                    }}
                    placeholder="House/Flat number, Street, Landmark, City, State"
                    className={`w-full px-4 py-2.5 rounded-2xl bg-white/90 border text-xs text-[#242322] focus:outline-none focus:ring-2 focus:ring-[#D3B8F5] transition-all resize-none ${
                      errors.deliveryAddress ? 'border-rose-400' : 'border-[#563829]/15'
                    }`}
                  />
                  {errors.deliveryAddress && <p className="text-[11px] text-rose-500">{errors.deliveryAddress}</p>}
                </div>

                {/* Theme / Product Preference */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#242322]">
                    Theme or Design Preference <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.themePreference}
                    onChange={(e) => {
                      setFormData({ ...formData, themePreference: e.target.value });
                      if (errors.themePreference) setErrors({ ...errors, themePreference: '' });
                    }}
                    placeholder="e.g. Heart motif, dinosaur theme, dual-color champagne gold"
                    className={`w-full px-4 py-2.5 rounded-2xl bg-white/90 border text-xs text-[#242322] focus:outline-none focus:ring-2 focus:ring-[#D3B8F5] transition-all ${
                      errors.themePreference ? 'border-rose-400' : 'border-[#563829]/15'
                    }`}
                  />
                  {errors.themePreference && <p className="text-[11px] text-rose-500">{errors.themePreference}</p>}
                </div>

                {/* Additional Requirements */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#242322]">
                    Additional Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Names exceeding 8 characters, larger dimensions, specific color pairings, or deadline notes..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/90 border border-[#563829]/15 text-xs text-[#242322] focus:outline-none focus:ring-2 focus:ring-[#D3B8F5] transition-all resize-none"
                  />
                  <p className="text-[11px] text-[#563829]/70">
                    Standard name boards accommodate up to 8 characters and are 10–12 cm high. Longer names and larger sizes are reviewed as special requests.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full clay-btn-lavender font-bold text-xs uppercase tracking-wider text-[#242322] shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-transform flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Customization Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
