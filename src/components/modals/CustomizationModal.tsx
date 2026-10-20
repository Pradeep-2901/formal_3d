import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Send, Copy } from 'lucide-react';
import { AdminProduct, CustomizationEnquiry } from '../../types/admin';
import { saveEnquiry } from '../../data/adminStorage';

interface CustomizationModalProps {
  product: AdminProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  // Form State
  const [printedName, setPrintedName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [themeType, setThemeType] = useState<'simple' | 'custom' | 'other'>('custom');
  const [themeDescription, setThemeDescription] = useState('');
  const [penholder, setPenholder] = useState<'yes' | 'no'>('no');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Validation & Submission State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<CustomizationEnquiry | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!isOpen) return null;

  const charCount = printedName.length;
  const isOverRecommended = charCount > 8;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!printedName.trim()) {
      errs.printedName = 'Please provide the name to be printed.';
    }

    if (!deliveryAddress.trim()) {
      errs.deliveryAddress = 'Please enter your delivery address.';
    }

    // Phone validation (Indian 10-digit mobile number)
    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phoneNumber = 'Please enter your phone number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phoneNumber = 'Please enter a valid 10-digit Indian phone number (e.g. 9876543210).';
    }

    // Pincode validation (6-digit Indian PIN)
    const cleanPin = pincode.trim();
    if (!cleanPin) {
      errs.pincode = 'Please enter your postal pincode.';
    } else if (!/^\d{6}$/.test(cleanPin)) {
      errs.pincode = 'Please enter a valid 6-digit Indian PIN code (e.g. 600001).';
    }

    if (themeType === 'custom' && !themeDescription.trim()) {
      errs.themeDescription = 'Please describe your preferred theme.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const enquiry: CustomizationEnquiry = {
      id: `enq-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      printedName: printedName.trim(),
      nameLength: printedName.trim().length,
      isLongNameReview: printedName.trim().length > 8,
      deliveryAddress: deliveryAddress.trim(),
      phoneNumber: phoneNumber.trim(),
      pincode: pincode.trim(),
      themeType,
      themeDescription: themeDescription.trim() || `${themeType} design`,
      penholder,
      additionalRequirements: additionalRequirements.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    saveEnquiry(enquiry);
    setSubmittedEnquiry(enquiry);
  };

  const handleCopySummary = () => {
    if (!submittedEnquiry) return;
    const text = `FORMEL 3D Customization Enquiry
Product: ${submittedEnquiry.productName}
Name to Print: ${submittedEnquiry.printedName} (${submittedEnquiry.nameLength} characters)
Phone: ${submittedEnquiry.phoneNumber}
PIN: ${submittedEnquiry.pincode}
Theme: ${submittedEnquiry.themeType} - ${submittedEnquiry.themeDescription}
Penholder: ${submittedEnquiry.penholder === 'yes' ? 'Requested' : 'No'}
Delivery Address: ${submittedEnquiry.deliveryAddress}
${submittedEnquiry.additionalRequirements ? `Additional Notes: ${submittedEnquiry.additionalRequirements}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const getWhatsAppEnquiryUrl = () => {
    if (!submittedEnquiry) return 'https://wa.me/c/918438594772';
    const msg = `Hello FORMEL 3D! I would like to inquire about a customized name board:
Product: ${submittedEnquiry.productName}
Name to Print: ${submittedEnquiry.printedName}
Theme: ${submittedEnquiry.themeDescription}
Penholder: ${submittedEnquiry.penholder === 'yes' ? 'Yes' : 'No'}
Phone: ${submittedEnquiry.phoneNumber}
PIN: ${submittedEnquiry.pincode}
Delivery: ${submittedEnquiry.deliveryAddress}`;
    return `https://wa.me/918438594772?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#242322]/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl clay-card-ivory rounded-[36px] p-6 sm:p-8 border-2 border-white/95 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-white/80 hover:bg-white text-[#563829] shadow-xs transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedEnquiry ? (
          /* Confirmation State */
          <div className="py-6 space-y-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-[#A9DDB7]/30 border-2 border-[#A9DDB7] flex items-center justify-center shadow-md">
              <CheckCircle className="w-8 h-8 text-[#2E7D32]" />
            </div>

            <div>
              <span className="text-xs font-semibold text-[#C6A15B] tracking-wider uppercase block mb-1">
                Enquiry Recorded
              </span>
              <h3 className="text-2xl font-bold text-[#242322]">
                Thank you for your enquiry
              </h3>
              <p className="text-sm text-[#563829]/80 mt-2 max-w-md mx-auto leading-relaxed">
                Your customization request for <strong className="font-semibold text-[#242322]">{submittedEnquiry.printedName}</strong> has been structured and recorded for review.
              </p>
            </div>

            {/* Structured Summary Card */}
            <div className="text-left p-5 rounded-2xl bg-white/70 border border-white shadow-xs space-y-2.5 text-xs text-[#563829]">
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#563829]/70">Product:</span>
                <span className="font-semibold text-[#242322]">{submittedEnquiry.productName}</span>
              </div>
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#563829]/70">Name to Print:</span>
                <span className="font-semibold text-[#242322]">
                  {submittedEnquiry.printedName} ({submittedEnquiry.nameLength} chars)
                </span>
              </div>
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#563829]/70">Theme:</span>
                <span className="font-semibold text-[#242322]">{submittedEnquiry.themeDescription}</span>
              </div>
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#563829]/70">Penholder:</span>
                <span className="font-semibold text-[#242322]">
                  {submittedEnquiry.penholder === 'yes' ? 'Requested' : 'No'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#563829]/70">Delivery PIN:</span>
                <span className="font-semibold text-[#242322]">{submittedEnquiry.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#563829]/70">Phone Contact:</span>
                <span className="font-semibold text-[#242322]">{submittedEnquiry.phoneNumber}</span>
              </div>
            </div>

            {/* Note on frontend prototype status */}
            <p className="text-[11px] text-[#563829]/70 max-w-md mx-auto leading-normal">
              In this current frontend phase, your enquiry details are saved locally in the browser sandbox. You can forward these details directly to the FORMEL 3D workshop on WhatsApp to confirm production availability.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
              >
                <Send className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl clay-btn-soft text-xs font-semibold text-[#563829] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedSummary ? 'Copied to Clipboard' : 'Copy Summary'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white border border-[#563829]/20 text-xs font-semibold text-[#563829] hover:bg-[#FFF3E2] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Customization Form */
          <div>
            {/* Header Information Box */}
            <div className="mb-6 pb-6 border-b border-[#563829]/15">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF3E2] text-xs font-semibold text-[#C6A15B] tracking-wide mb-2 border border-white">
                Bespoke Name Board Customization
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#242322] leading-tight">
                Customize {product.name}
              </h2>

              {/* Exact user-requested specification text */}
              <div className="mt-4 p-4 rounded-2xl bg-white/70 border border-white shadow-xs text-xs text-[#563829] leading-relaxed space-y-2">
                <p>
                  Our name boards are around 10–12 cm in height and can accommodate up to 8 characters.
                </p>
                <p>
                  You can choose a simple design or customize it with a theme of your choice.
                </p>
                <p>
                  If you would like more than 8 characters or a larger size, please let us know so we can check the available options.
                </p>
                <p className="font-semibold text-[#242322]">
                  Please let us know what design you would like us to create for you.
                </p>
              </div>
            </div>

            {/* The 7 Customization Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Field 1: Name to be printed */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="printedName" className="text-xs font-semibold text-[#242322]">
                    Name to be printed <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-[11px] font-medium ${isOverRecommended ? 'text-[#C6A15B] font-semibold' : 'text-[#563829]/70'}`}>
                    {charCount} / 8 characters {isOverRecommended ? '(Subject to manual review)' : ''}
                  </span>
                </div>
                <input
                  id="printedName"
                  type="text"
                  value={printedName}
                  onChange={(e) => {
                    setPrintedName(e.target.value);
                    if (errors.printedName) setErrors({ ...errors, printedName: '' });
                  }}
                  placeholder="e.g. ARYA, KAVIN, ROHAN & MEERA"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm font-medium text-[#242322] shadow-xs"
                />
                {errors.printedName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.printedName}</span>
                  </p>
                )}
                {isOverRecommended && (
                  <p className="mt-1 text-[11px] text-[#563829]/80 bg-[#FFF3E2] p-2 rounded-xl border border-[#563829]/10">
                    Note: Names over 8 characters will be reviewed by our design team to ensure optimal structural balance and print bed fit.
                  </p>
                )}
              </div>

              {/* Field 2: Delivery address */}
              <div>
                <label htmlFor="deliveryAddress" className="block text-xs font-semibold text-[#242322] mb-1.5">
                  Delivery address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                    if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                  }}
                  rows={2}
                  placeholder="Door number, street name, locality, landmark, city, state"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm text-[#242322] shadow-xs"
                />
                {errors.deliveryAddress && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.deliveryAddress}</span>
                  </p>
                )}
              </div>

              {/* Field 3 & 4: Phone number and Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-semibold text-[#242322] mb-1.5">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                    }}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm text-[#242322] shadow-xs"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phoneNumber}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-xs font-semibold text-[#242322] mb-1.5">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      if (errors.pincode) setErrors({ ...errors, pincode: '' });
                    }}
                    placeholder="6-digit Indian PIN code"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm text-[#242322] shadow-xs"
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.pincode}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Field 5: Theme selection & description */}
              <div className="p-4 rounded-2xl bg-white/60 border border-white space-y-3">
                <label className="block text-xs font-semibold text-[#242322]">
                  Theme preference <span className="text-red-500">*</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setThemeType('simple')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      themeType === 'simple'
                        ? 'bg-[#FFF8EE] border-[#C6A15B] text-[#242322] font-semibold shadow-xs'
                        : 'bg-white border-[#563829]/15 text-[#563829] hover:bg-white/90'
                    }`}
                  >
                    Simple design
                  </button>

                  <button
                    type="button"
                    onClick={() => setThemeType('custom')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      themeType === 'custom'
                        ? 'bg-[#FFF8EE] border-[#C6A15B] text-[#242322] font-semibold shadow-xs'
                        : 'bg-white border-[#563829]/15 text-[#563829] hover:bg-white/90'
                    }`}
                  >
                    Customized theme
                  </button>

                  <button
                    type="button"
                    onClick={() => setThemeType('other')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      themeType === 'other'
                        ? 'bg-[#FFF8EE] border-[#C6A15B] text-[#242322] font-semibold shadow-xs'
                        : 'bg-white border-[#563829]/15 text-[#563829] hover:bg-white/90'
                    }`}
                  >
                    Other preference
                  </button>
                </div>

                <div>
                  <label htmlFor="themeDescription" className="block text-[11px] font-medium text-[#563829]/80 mb-1">
                    Describe your requested design or motif
                  </label>
                  <input
                    id="themeDescription"
                    type="text"
                    value={themeDescription}
                    onChange={(e) => {
                      setThemeDescription(e.target.value);
                      if (errors.themeDescription) setErrors({ ...errors, themeDescription: '' });
                    }}
                    placeholder="e.g. Minimalist heart motif, floral accent, architectural style, or color preference"
                    className="w-full px-4 py-2 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                  />
                  {errors.themeDescription && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.themeDescription}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Field 6: Penholder (Optional Yes/No, zero price displayed!) */}
              <div className="p-4 rounded-2xl bg-white/60 border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#242322]">
                    Include integrated penholder?
                  </label>
                  <p className="text-[11px] text-[#563829]/70 mt-0.5">
                    Adds a tailored cylindrical foundation receptacle to hold desktop pens and styluses.
                  </p>
                </div>

                <div className="inline-flex rounded-xl bg-white p-1 border border-[#563829]/15 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setPenholder('no')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      penholder === 'no' ? 'bg-[#FFF3E2] text-[#242322] font-semibold' : 'text-[#563829]/70'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setPenholder('yes')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      penholder === 'yes' ? 'bg-[#C6A15B] text-white font-semibold' : 'text-[#563829]/70'
                    }`}
                  >
                    Yes
                  </button>
                </div>
              </div>

              {/* Field 7: Additional requirements */}
              <div>
                <label htmlFor="additionalRequirements" className="block text-xs font-semibold text-[#242322] mb-1.5">
                  Additional requirements (Optional)
                </label>
                <textarea
                  id="additionalRequirements"
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  rows={2}
                  placeholder="Request a larger size, describe extended lettering, specific color palettes, or date deadlines"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322] shadow-xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#563829]/15">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl clay-btn-soft text-xs font-semibold text-[#563829] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Submit Enquiry
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
