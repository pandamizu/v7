import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import Footer from './Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeToggleButton } from './ThemeToggleButton';
import { translations } from '../translations';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToServices: true } });
    } else {
      const servicesSection = document.getElementById('services');
      servicesSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: translations[language].nav.home, path: '/' },
    { name: translations[language].nav.portfolio, path: '/portfolio' },
    { name: translations[language].nav.cv, path: '/cv' },
    { 
      name: translations[language].nav.services, 
      path: '/#services',
      onClick: handleServicesClick 
    },
    { name: translations[language].nav.contact, path: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const isActivePath = (path: string) => {
    if (path === '/#services') {
      return location.pathname === '/' && location.hash === '#services';
    }
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm dark:shadow-gray-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-blue-400">
                PANDU
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={link.onClick}
                  className={`relative py-2 ${
                    isActivePath(link.path)
                      ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300'
                  }`}
                >
                  {link.name}
                  {isActivePath(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                  )}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{language === 'en' ? 'EN' : 'ID'}</span>
              </button>
              <ThemeToggleButton />
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => {
                    if (link.onClick) {
                      link.onClick(e);
                    }
                    setIsMenuOpen(false);
                  }}
                  className={`block py-2 px-3 rounded-lg ${
                    isActivePath(link.path)
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 w-full"
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">
                  {language === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
                </span>
              </button>
              <div className="px-3 py-2">
                <ThemeToggleButton />
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-16 md:pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
