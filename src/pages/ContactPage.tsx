import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Twitter, Youtube, Link as LinkIcon, MessageSquare, Copy, Linkedin, Bean as Behance } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const ContactPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section with improved background */}
      <div className="relative h-[60vh] flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 main-gradient"></div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 -top-32 -left-32 bg-white/10 dark:bg-slate-700/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-500/10 dark:bg-indigo-700/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute w-64 h-64 top-1/2 left-1/4 bg-blue-500/10 dark:bg-blue-700/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t.contact.title}</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glassmorphism rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Background pattern - adjusted for dark mode too */}
            <div className="absolute inset-0 opacity-5 dark:opacity-[0.02]">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,white_25%,white_50%,transparent_50%,transparent_75%,white_75%,white_100%)] dark:bg-[linear-gradient(45deg,transparent_25%,theme(colors.slate.700)_25%,theme(colors.slate.700)_50%,transparent_50%,transparent_75%,theme(colors.slate.700)_75%,theme(colors.slate.700)_100%)] bg-[length:20px_20px]"></div>
            </div>

            <div className="space-y-8 relative z-10">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white dark:text-white">{t.contact.connect}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center p-4 bg-white/10 dark:bg-slate-700/30 rounded-xl backdrop-blur-sm hover:bg-white/20 dark:hover:bg-slate-600/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-slate-600/50 flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-white dark:text-indigo-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white dark:text-gray-100 font-medium">{t.contact.email}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-white/70 dark:text-gray-400">pandutirta25@gmail.com</p>
                        <button 
                          onClick={() => handleCopy('pandutirta25@gmail.com', 'email')}
                          className="ml-2 p-1 rounded hover:bg-white/20 dark:hover:bg-slate-500/50 transition-colors"
                          aria-label="Copy email"
                        >
                          <Copy className="h-4 w-4 text-white dark:text-gray-300" />
                        </button>
                      </div>
                    </div>
                    {copied === 'email' && (
                      <span className="ml-2 text-xs text-green-400 dark:text-green-500 animate-fade-in-out">
                        {language === 'en' ? 'Copied!' : 'Tersalin!'}
                      </span>
                    )}
                  </div>

                  <a 
                    href="https://wa.me/6287737783462"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white/10 dark:bg-slate-700/30 rounded-xl backdrop-blur-sm hover:bg-white/20 dark:hover:bg-slate-600/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-slate-600/50 flex items-center justify-center mr-4">
                      <MessageSquare className="h-6 w-6 text-white dark:text-indigo-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white dark:text-gray-100 font-medium">{t.contact.whatsapp}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-white/70 dark:text-gray-400">+62 877-3778-3462</p>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCopy('+6287737783462', 'whatsapp');
                          }}
                          className="ml-2 p-1 rounded hover:bg-white/20 dark:hover:bg-slate-500/50 transition-colors"
                          aria-label="Copy phone number"
                        >
                          <Copy className="h-4 w-4 text-white dark:text-gray-300" />
                        </button>
                      </div>
                    </div>
                    {copied === 'whatsapp' && (
                      <span className="ml-2 text-xs text-green-400 dark:text-green-500 animate-fade-in-out">
                        {language === 'en' ? 'Copied!' : 'Tersalin!'}
                      </span>
                    )}
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6 text-white dark:text-white">{t.contact.socialMedia}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { href: "https://www.instagram.com/pandapediahome?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: Instagram, name: "Instagram" },
                    { href: "https://www.linkedin.com/in/pandu-tirta-buana/", icon: Linkedin, name: "LinkedIn" },
                    { href: "https://www.behance.net/koalagraphic", icon: Behance, name: "Behance" },
                    { href: "https://x.com/mizuevren", icon: Twitter, name: "Twitter" },
                    { href: "https://youtube.com/@mizuevren?si=TcLfezCbzpSqVJEE", icon: Youtube, name: "YouTube" },
                    { href: "https://linktr.ee/pandapedia", icon: LinkIcon, name: "Linktree" }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white/10 dark:bg-slate-700/30 rounded-xl backdrop-blur-sm hover:bg-white/20 dark:hover:bg-slate-600/40 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-slate-600/50 flex items-center justify-center mr-3 group-hover:bg-white/30 dark:group-hover:bg-slate-500/60 transition-colors">
                        <social.icon className="h-5 w-5 text-white dark:text-indigo-300" />
                      </div>
                      <span className="text-white dark:text-gray-200">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center pt-8 border-t border-white/10 dark:border-slate-600/50">
                <p className="text-white/70 dark:text-gray-400">
                  {t.contact.ready}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
