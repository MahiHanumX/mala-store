import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';


interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Mala Selection & Spiritual Guidance',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#121214] border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-medium mb-2">15-Min Call Reserved!</h3>
            <p className="text-sm text-white/70 mb-6 max-w-sm leading-relaxed">
              Mitha will reach out via email with your calendar invite and spiritual mala consultation pre-session guide.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 cursor-pointer transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85"
                alt="Mitha"
                className="w-12 h-14 rounded-lg object-cover border border-white/15"
              />
              <div>
                <h3 className="text-lg font-medium text-white">Book 15-Mins Call with Mitha</h3>
                <span className="font-mono text-xs text-white/60 uppercase tracking-wider">
                  Co-founder & Spiritual Guide
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1.5">
                  Consultation Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white focus:outline-none"
                >
                  <option value="Mala Selection & Spiritual Guidance" className="bg-[#121214]">
                    Custom Mala Recommendation
                  </option>
                  <option value="Bespoke 108 Gemstone Knotted Request" className="bg-[#121214]">
                    Bespoke 108 Gemstone Order
                  </option>
                  <option value="AI Automation & Integration" className="bg-[#121214]">
                    AI Automation & Enterprise Integration
                  </option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Consultation Request</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
