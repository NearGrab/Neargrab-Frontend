import React, { useState } from 'react';
import { X, Layout, MapPin, Clock, CreditCard } from 'lucide-react';
import Button from '../../../../shared/components/ui/Button';

export default function EditShopProfileModal({
  isOpen = false,
  onClose,
  shopInfo = {},
  timings = {},
  paymentMethods = {},
  onSave
}) {
  const [activeTab, setActiveTab] = useState('general');

  // Form Fields State
  const [name, setName] = useState(shopInfo.name || '');
  const [username, setUsername] = useState(shopInfo.username || '');
  const [category, setCategory] = useState(shopInfo.category || '');
  const [phone, setPhone] = useState(shopInfo.phone || '');
  const [whatsapp, setWhatsapp] = useState(shopInfo.whatsapp || '');
  const [email, setEmail] = useState(shopInfo.email || '');
  const [description, setDescription] = useState(shopInfo.description || '');
  const [location, setLocation] = useState(shopInfo.location || '');

  // Timings State
  const [displayHours, setDisplayHours] = useState(timings.displayHours || '');
  const [openAll7Days, setOpenAll7Days] = useState(timings.openAll7Days ?? true);

  // Payments State
  const [upi, setUpi] = useState(paymentMethods.upi ?? true);
  const [googlePay, setGooglePay] = useState(paymentMethods.googlePay ?? true);
  const [phonePe, setPhonePe] = useState(paymentMethods.phonePe ?? true);
  const [paytm, setPaytm] = useState(paymentMethods.paytm ?? true);
  const [cashOnDelivery, setCashOnDelivery] = useState(paymentMethods.cashOnDelivery ?? true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        shopInfo: {
          name,
          username,
          category,
          phone,
          whatsapp,
          email,
          description,
          location
        },
        timings: {
          displayHours,
          openAll7Days
        },
        paymentMethods: {
          upi,
          googlePay,
          phonePe,
          paytm,
          cashOnDelivery
        }
      });
    }
  };

  const tabs = [
    { id: 'general', label: 'Store Info', icon: Layout },
    { id: 'contact', label: 'Contact Details', icon: MapPin },
    { id: 'hours', label: 'Hours & Payments', icon: Clock }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-inter">
      {/* Modal Dialog Box */}
      <div className="bg-white border border-neutral-100 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200 text-left h-[500px]">
        
        {/* Left Side: Tab Selectors */}
        <div className="w-full md:w-48 bg-neutral-50/50 border-b md:border-b-0 md:border-r border-neutral-150 p-4 shrink-0 select-none">
          <div className="flex items-center justify-between md:mb-5">
            <span className="font-poppins font-extrabold text-xs text-text-primary uppercase tracking-wider">
              Profile Editor
            </span>
            <button type="button" onClick={onClose} className="md:hidden p-1 rounded-full hover:bg-neutral-200">
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>

          <div className="flex md:flex-col gap-2 mt-2 md:mt-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-brand-900 text-white shadow-3xs'
                      : 'hover:bg-neutral-100 text-text-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Tab Form fields */}
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between select-none">
            <h3 className="font-poppins font-bold text-sm text-text-primary">
              Edit Shop Details
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="hidden md:flex p-1 rounded-full hover:bg-neutral-100 text-text-muted cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Scroll Body */}
          <div className="p-5 flex-grow overflow-y-auto scrollbar-thin flex flex-col gap-4 text-xs font-bold text-text-secondary">
            
            {/* Tab 1: General Info */}
            {activeTab === 'general' && (
              <div className="flex flex-col gap-4">
                {/* Shop Name */}
                <div className="flex flex-col gap-1.5">
                  <label>Shop Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white"
                  />
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1.5">
                  <label>Store Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-1.5">
                  <label>Categories (e.g. Grocery Store • Kirana Store)</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label>About Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white leading-normal"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Contact details */}
            {activeTab === 'contact' && (
              <div className="flex flex-col gap-4">
                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white"
                  />
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-1.5">
                  <label>WhatsApp Number</label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label>Store Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white"
                  />
                </div>

                {/* Address Location */}
                <div className="flex flex-col gap-1.5">
                  <label>Store Address Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Hours and Payments */}
            {activeTab === 'hours' && (
              <div className="flex flex-col gap-4">
                {/* Hours schedule */}
                <div className="flex flex-col gap-1.5">
                  <label>Display Hours (e.g. 08:00 AM - 10:00 PM)</label>
                  <input
                    type="text"
                    value={displayHours}
                    onChange={(e) => setDisplayHours(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-neutral-200 rounded-xl p-3 text-xs outline-hidden focus:border-brand-900/50 focus:bg-white"
                  />
                </div>

                {/* Open all 7 days checklist */}
                <label className="flex items-center gap-2 mt-1 select-none">
                  <input
                    type="checkbox"
                    checked={openAll7Days}
                    onChange={(e) => setOpenAll7Days(e.target.checked)}
                    className="w-4 h-4 rounded-md text-brand-900 focus:ring-brand-900/40"
                  />
                  <span>Open all 7 days</span>
                </label>

                <div className="h-px bg-neutral-100 my-2" />

                {/* Payment Methods */}
                <span className="font-poppins font-bold text-xs text-text-primary block select-none">
                  Payment Methods Accepted
                </span>

                <div className="flex flex-col gap-2.5 pt-1.5 select-none">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={upi}
                      onChange={(e) => setUpi(e.target.checked)}
                      className="w-4 h-4 rounded-md text-brand-900 focus:ring-brand-900/40"
                    />
                    <span>BHIM UPI Gateway</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={googlePay}
                      onChange={(e) => setGooglePay(e.target.checked)}
                      className="w-4 h-4 rounded-md text-brand-900 focus:ring-brand-900/40"
                    />
                    <span>Google Pay (GPay)</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={phonePe}
                      onChange={(e) => setPhonePe(e.target.checked)}
                      className="w-4 h-4 rounded-md text-brand-900 focus:ring-brand-900/40"
                    />
                    <span>PhonePe Wallet</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={paytm}
                      onChange={(e) => setPaytm(e.target.checked)}
                      className="w-4 h-4 rounded-md text-brand-900 focus:ring-brand-900/40"
                    />
                    <span>Paytm Wallet</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={cashOnDelivery}
                      onChange={(e) => setCashOnDelivery(e.target.checked)}
                      className="w-4 h-4 rounded-md text-brand-900 focus:ring-brand-900/40"
                    />
                    <span>Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>
            )}

          </div>

          {/* Action buttons footer */}
          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-2.5 select-none shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="font-bold text-xs h-9 cursor-pointer shadow-3xs bg-white"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="font-bold text-xs h-9 cursor-pointer shadow-3xs"
            >
              Save Profile Changes
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
