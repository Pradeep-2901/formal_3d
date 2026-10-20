import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Send, Copy, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { CustomizationEnquiry } from '../../types/admin';
import { saveEnquiry } from '../../data/adminStorage';

interface CustomizePageProps {
  initialProductName?: string;
  onBackToHome?: () => void;
}

export const CustomizePage: React.FC<CustomizePageProps> = ({
  initialProductName = 'Personalized Desk Name Stand',
  onBackToHome
}) => {
  // Form State
  const [printedName, setPrintedName] = useState('Your Name');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [themeType, setThemeType] = useState<'simple' | 'custom' | 'other'>('custom');
  const [themeDescription, setThemeDescription] = useState('Interlocking couple typography with heart motif');
  const [penholder, setPenholder] = useState<'yes' | 'no'>('no');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<CustomizationEnquiry | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const charCount = printedName.trim().length;
  const isOverLimit = charCount > 8;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!printedName.trim()) {
      errs.printedName = 'Please enter the name to be printed.';
    }

    if (!deliveryAddress.trim()) {
      errs.deliveryAddress = 'Please provide your complete delivery address.';
    }

    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phoneNumber = 'Please provide your contact phone number.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phoneNumber = 'Please enter a valid 10-digit mobile number.';
    }

    const cleanPin = pincode.trim();
    if (!cleanPin) {
      errs.pincode = 'Please provide your 6-digit postal PIN code.';
    } else if (!/^\d{6}$/.test(cleanPin)) {
      errs.pincode = 'Please enter a valid 6-digit Indian PIN code.';
    }

    if (themeType === 'custom' && !themeDescription.trim()) {
      errs.themeDescription = 'Please describe your preferred theme or motif.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const enquiry: CustomizationEnquiry = {
      id: `enq-${Date.now()}`,
      productId: 'prod-name-stand-custom',
      productName: initialProductName,
      printedName: printedName.trim(),
      nameLength: charCount,
      isLongNameReview: isOverLimit,
      deliveryAddress: deliveryAddress.trim(),
      phoneNumber: phoneNumber.trim(),
      pincode: pincode.trim(),
      themeType,
      themeDescription: themeDescription.trim() || `${themeType} design`,
      penholder,
      additionalRequirements: additionalRequirements.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    // Simulate reliable persistence
    setTimeout(() => {
      saveEnquiry(enquiry);
      setSubmittedEnquiry(enquiry);
      setIsSubmitting(false);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 600);
  };

  const handleCopySummary = () => {
    if (!submittedEnquiry) return;
    const text = `FORMEL 3D Customization Enquiry
Product: ${submittedEnquiry.productName}
Name to Print: ${submittedEnquiry.printedName} (${submittedEnquiry.nameLength} chars)
Theme: ${submittedEnquiry.themeType} - ${submittedEnquiry.themeDescription}
Penholder: ${submittedEnquiry.penholder === 'yes' ? 'Yes' : 'No'}
Delivery PIN: ${submittedEnquiry.pincode}
Phone: ${submittedEnquiry.phoneNumber}
Address: ${submittedEnquiry.deliveryAddress}
${submittedEnquiry.additionalRequirements ? `Additional Notes: ${submittedEnquiry.additionalRequirements}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const getWhatsAppEnquiryUrl = () => {
    if (!submittedEnquiry) return 'https://wa.me/c/918438594772';
    const msg = `Hello FORMEL 3D! I would like to confirm my custom name board enquiry:
Product: ${submittedEnquiry.productName}
Name: ${submittedEnquiry.printedName} (${submittedEnquiry.nameLength} chars)
Theme: ${submittedEnquiry.themeDescription}
Penholder: ${submittedEnquiry.penholder === 'yes' ? 'Yes' : 'No'}
PIN Code: ${submittedEnquiry.pincode}
Phone: ${submittedEnquiry.phoneNumber}
Address: ${submittedEnquiry.deliveryAddress}`;
    return `https://wa.me/918438594772?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl mb-12">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-[#6E5444] hover:text-[#242322] mb-3 flex items-center gap-1.5 cursor-pointer"
            >
              <span>← Back to Home</span>
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clay-card-ivory text-xs font-bold text-[#C6A15B] uppercase tracking-wider mb-3 border border-white">
            Customization Studio
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#242322]">
            Customize Your Name Board
          </h1>
          <p className="text-sm sm:text-base text-[#6E5444] mt-2.5 leading-relaxed">
            Craft a personalized desk statement, anniversary gift, or executive typography piece printed in dual-color bioplastic.
          </p>
        </div>

        {submittedEnquiry ? (
          /* Confirmation State */
          <div className="clay-card-ivory rounded-[36px] p-8 sm:p-14 border-2 border-white/90 shadow-xl max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-[#B9E3C4]/30 border-2 border-[#B9E3C4] flex items-center justify-center text-[#2E7D32] shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider block mb-1">
                Enquiry Successfully Recorded
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242322]">
                Thank you for your enquiry
              </h2>
              <p className="text-sm text-[#6E5444] mt-2 leading-relaxed">
                Your customization request for <strong className="text-[#242322]">{submittedEnquiry.printedName}</strong> has been structured and recorded in the studio queue for review.
              </p>
            </div>

            {/* Summary Box */}
            <div className="text-left p-6 rounded-2xl bg-white border border-white/90 shadow-xs space-y-2.5 text-xs text-[#563829]">
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#6E5444]">Name to Print:</span>
                <span className="font-bold text-[#242322]">
                  {submittedEnquiry.printedName} ({submittedEnquiry.nameLength} characters)
                </span>
              </div>
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#6E5444]">Theme:</span>
                <span className="font-bold text-[#242322]">{submittedEnquiry.themeDescription}</span>
              </div>
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#6E5444]">Penholder:</span>
                <span className="font-bold text-[#242322]">
                  {submittedEnquiry.penholder === 'yes' ? 'Requested' : 'No'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#563829]/10 pb-2">
                <span className="font-medium text-[#6E5444]">PIN Code:</span>
                <span className="font-bold text-[#242322]">{submittedEnquiry.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6E5444]">Phone:</span>
                <span className="font-bold text-[#242322]">{submittedEnquiry.phoneNumber}</span>
              </div>
            </div>

            <p className="text-xs text-[#6E5444] max-w-md mx-auto leading-relaxed">
              Our team reviews dimensional balance and print bed fit. You can also forward your enquiry directly to the FORMEL 3D workshop on WhatsApp to confirm timing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl clay-btn-soft text-xs font-semibold text-[#563829] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedSummary ? 'Copied Summary' : 'Copy Details'}</span>
              </button>

              {onBackToHome && (
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-[#563829]/20 text-xs font-semibold text-[#563829] cursor-pointer"
                >
                  Return to Home
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Customization Workspace Grid (Form + Live 3D Preview) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Panel (7 cols) */}
            <div className="lg:col-span-7">
              <div className="clay-card-ivory rounded-[36px] p-6 sm:p-10 border-2 border-white/90 shadow-xl space-y-6">
                
                {/* Information Callout */}
                <div className="p-5 rounded-2xl bg-[#FFF3E5] border border-white text-xs text-[#563829] leading-relaxed space-y-2">
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Field 1: Name to be printed */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="nameInput" className="text-xs font-bold text-[#242322]">
                        Name to be printed <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-[11px] font-semibold ${isOverLimit ? 'text-[#C6A15B]' : 'text-[#6E5444]'}`}>
                        {charCount} / 8 characters {isOverLimit ? '(Subject to manual review)' : ''}
                      </span>
                    </div>
                    <input
                      id="nameInput"
                      type="text"
                      value={printedName}
                      onChange={(e) => {
                        setPrintedName(e.target.value);
                        if (errors.printedName) setErrors({ ...errors, printedName: '' });
                      }}
                      placeholder="e.g. AARAV, ANANYA, or YOUR NAME"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm font-semibold text-[#242322] shadow-xs uppercase tracking-wider"
                    />
                    {errors.printedName && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.printedName}</span>
                      </p>
                    )}
                    {isOverLimit && (
                      <p className="mt-1.5 text-[11px] text-[#563829] bg-[#FFF3E5] p-2.5 rounded-xl border border-[#563829]/10 leading-normal">
                        Note: Names over 8 characters will be reviewed by our design team to check structural balance and print bed fit.
                      </p>
                    )}
                  </div>

                  {/* Field 2: Delivery address */}
                  <div>
                    <label htmlFor="addressInput" className="block text-xs font-bold text-[#242322] mb-1.5">
                      Delivery address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="addressInput"
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                      }}
                      rows={2}
                      placeholder="Street address, apartment/door number, locality, city, state"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322] shadow-xs leading-relaxed"
                    />
                    {errors.deliveryAddress && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.deliveryAddress}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 3 & 4: Phone & Pincode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phoneInput" className="block text-xs font-bold text-[#242322] mb-1.5">
                        Phone number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phoneInput"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                        }}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322] shadow-xs"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phoneNumber}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pinInput" className="block text-xs font-bold text-[#242322] mb-1.5">
                        PIN code <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="pinInput"
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => {
                          setPincode(e.target.value);
                          if (errors.pincode) setErrors({ ...errors, pincode: '' });
                        }}
                        placeholder="6-digit Indian PIN code"
                        className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322] shadow-xs"
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.pincode}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Field 5: Theme Preference */}
                  <div className="p-4 rounded-2xl bg-white border border-white/90 shadow-xs space-y-3">
                    <label className="block text-xs font-bold text-[#242322]">
                      Theme preference <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setThemeType('simple')}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          themeType === 'simple'
                            ? 'bg-[#D3B8F5]/30 border-[#D3B8F5] text-[#242322]'
                            : 'bg-white border-[#563829]/15 text-[#6E5444] hover:bg-[#FFF3E5]'
                        }`}
                      >
                        Simple design
                      </button>

                      <button
                        type="button"
                        onClick={() => setThemeType('custom')}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          themeType === 'custom'
                            ? 'bg-[#D3B8F5]/30 border-[#D3B8F5] text-[#242322]'
                            : 'bg-white border-[#563829]/15 text-[#6E5444] hover:bg-[#FFF3E5]'
                        }`}
                      >
                        Customized theme
                      </button>

                      <button
                        type="button"
                        onClick={() => setThemeType('other')}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          themeType === 'other'
                            ? 'bg-[#D3B8F5]/30 border-[#D3B8F5] text-[#242322]'
                            : 'bg-white border-[#563829]/15 text-[#6E5444] hover:bg-[#FFF3E5]'
                        }`}
                      >
                        Other preference
                      </button>
                    </div>

                    <div>
                      <label htmlFor="themeDesc" className="block text-[11px] font-semibold text-[#6E5444] mb-1">
                        Describe requested theme or motif
                      </label>
                      <input
                        id="themeDesc"
                        type="text"
                        value={themeDescription}
                        onChange={(e) => {
                          setThemeDescription(e.target.value);
                          if (errors.themeDescription) setErrors({ ...errors, themeDescription: '' });
                        }}
                        placeholder="e.g. Heart motif, minimalist architectural, floral, executive"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FFF3E5]/50 border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                      />
                      {errors.themeDescription && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.themeDescription}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Field 6: Penholder (Yes/No, Zero Price!) */}
                  <div className="p-4 rounded-2xl bg-white border border-white/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#242322]">
                        Include integrated penholder?
                      </label>
                      <p className="text-[11px] text-[#6E5444] mt-0.5">
                        Adds a tailored cylindrical foundation receptacle to hold desktop pens and styluses.
                      </p>
                    </div>

                    <div className="inline-flex rounded-xl bg-[#FFF3E5] p-1 border border-[#563829]/15 shadow-xs">
                      <button
                        type="button"
                        onClick={() => setPenholder('no')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          penholder === 'no' ? 'bg-white text-[#242322] shadow-xs' : 'text-[#6E5444]'
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => setPenholder('yes')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          penholder === 'yes' ? 'clay-btn-lavender font-bold text-[#242322] shadow-xs' : 'text-[#6E5444]'
                        }`}
                      >
                        Yes
                      </button>
                    </div>
                  </div>

                  {/* Field 7: Additional requirements */}
                  <div>
                    <label htmlFor="reqInput" className="block text-xs font-bold text-[#242322] mb-1.5">
                      Additional requirements (Optional)
                    </label>
                    <textarea
                      id="reqInput"
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                      rows={2}
                      placeholder="Request a larger size, more than 8 characters, special color palettes, or target dates"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322] shadow-xs leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? 'Recording Enquiry...' : 'Submit Enquiry'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              </div>
            </div>

            {/* Right Column: Live Interactive 3D Product Visual Preview (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-4">
                
                <div className="clay-card-ivory rounded-[36px] p-6 border-2 border-white/90 shadow-xl overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C6A15B] block mb-2">
                    Live 3D Name Board Preview
                  </span>

                  {/* Rendered 3D Plate */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF3E5] border border-white/80 p-6 flex flex-col justify-between mb-4 shadow-inner">
                    <img
                      src="/images/products/unicorn_name_stand.svg"
                      alt="3D Desk Name Stand background"
                      className="absolute inset-0 w-full h-full object-cover opacity-75"
                    />
                    
                    {/* Floating 3D Simulated Plate */}
                    <div className="relative z-10 my-auto p-5 rounded-2xl bg-[#FFFAF4]/95 backdrop-blur-md border-2 border-white shadow-xl text-center">
                      <span className="text-[10px] uppercase font-bold text-[#C6A15B] tracking-wider block mb-1">
                        Dual-Extrusion 3D Lettering
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#242322] tracking-wider uppercase drop-shadow-xs">
                        {printedName.trim() || 'YOUR NAME'}
                      </h3>
                      <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-semibold text-[#563829]">
                        <span>~10–12 cm Height</span>
                        <span>·</span>
                        <span>{penholder === 'yes' ? 'Penholder Foundation' : 'Weighted Base'}</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-[11px] font-bold text-[#563829] bg-white/90 px-3 py-1.5 rounded-xl shadow-xs">
                      <span>Theme: {themeType}</span>
                      <span>Bio PLA</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#6E5444] leading-relaxed">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                      <span>Printed in silk champagne and charcoal PLA</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                      <span>{charCount} characters ({isOverLimit ? 'reviewed by studio' : 'standard fit'})</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
