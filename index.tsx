
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Star,
  Leaf,
  Globe,
  PenTool,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Check,
  Clock,
  Truck,
  Play,
  Heart,
  Search,
  User,
  ChevronDown
} from 'lucide-react';

// --- CSS STYLES & FONTS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Red+Hat+Display:wght@400;500;700;900&family=Source+Sans+3:wght@300;400;600;700&display=swap');

  :root {
    /* Brand Book Colors */
    --arvind-base: #9f1b3c;  /* Primary Brand Color - Deep Red */
    --arvind-red: #da1f26;   /* Bright Accent */
    --prussian-blue: #064770; /* Secondary Brand Color */
    --dark-river: #2c2c2c;    /* Text Color */
    --clean-white: #FFFFFF;
    --neutral-bg: #FDFBF7;    /* Very subtle warm white */
    --warm-grey: #f4f4f4;
    --border-color: #eaeaea;
  }

  * {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Source Sans 3', sans-serif;
    background-color: var(--clean-white);
    color: var(--dark-river);
  }

  .font-redhat { font-family: 'Red Hat Display', sans-serif; }
  .font-source { font-family: 'Source Sans 3', sans-serif; }
  .font-garamond { font-family: 'EB Garamond', serif; }

  /* Utilities */
  html {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  html::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* Animations */
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { 
    from { opacity: 0; transform: translateY(20px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes kenburns { 
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  @keyframes sectionReveal {
    from { 
      opacity: 0; 
      transform: translateY(30px);
    }
    to { 
      opacity: 1; 
      transform: translateY(0);
    }
  }

  .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
  .animate-slideUp { animation: slideUp 0.3s ease-out forwards; }
  .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
  .animate-kenburns { animation: kenburns 15s infinite alternate linear; }
  
  /* Section reveal on scroll */
  section {
    animation: sectionReveal 0.8s ease-out;
  }

  .fixed-bg-effect {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .button-primary {
    background-color: var(--arvind-base);
    color: white;
    padding: 14px 40px;
    border-radius: 0px; 
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 13px;
    transition: all 0.4s ease;
    border: 1px solid var(--arvind-base);
    cursor: pointer;
  }
  .button-primary:hover {
    background-color: white;
    color: var(--arvind-base);
  }

  .button-secondary {
    background-color: transparent;
    border: 1px solid white;
    color: white;
    padding: 14px 40px;
    border-radius: 0px;
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 13px;
    transition: all 0.4s ease;
    cursor: pointer;
  }
  .button-secondary:hover {
    background-color: white;
    color: var(--arvind-base);
    border-color: white;
  }

  .button-outline-dark {
    background-color: transparent;
    border: 1px solid var(--dark-river);
    color: var(--dark-river);
    padding: 14px 40px;
    border-radius: 0px;
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 13px;
    transition: all 0.4s ease;
    cursor: pointer;
  }
  .button-outline-dark:hover {
    background-color: var(--arvind-base);
    border-color: var(--arvind-base);
    color: white;
  }
  
  /* Text Selection Color */
  ::selection {
    background: var(--arvind-base);
    color: white;
  }

  /* Luxury Card Hover */
  .luxury-card .overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
  }
`;

// --- ERROR BOUNDARY ---
interface ErrorBoundaryProps {
  children?: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 font-source">
          <h1 className="text-4xl font-bold mb-4 font-redhat text-[#9f1b3c]">Something went wrong.</h1>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#0F2333] text-white rounded hover:bg-opacity-90"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- CONTEXTS ---

interface CartContextType {
  cartCount: number;
  addToCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children?: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

interface ToastContextType {
  showToast: (msg: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider = ({ children }: { children?: ReactNode }) => {
  const [toast, setToast] = useState<{ msg: string, visible: boolean }>({ msg: '', visible: false });

  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`fixed bottom-8 right-8 bg-[#064770] text-white px-6 py-4 rounded shadow-2xl transition-all duration-300 z-[9999] transform ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex items-center gap-3">
          <Check size={20} className="text-[#A3B18A]" />
          <span className="font-source font-medium">{toast.msg}</span>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

// --- COMPONENTS ---

const ProductModal = ({ product, onClose }: { product: any, onClose: () => void }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart();
    showToast(`Added ${product.title} to cart`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
      <div className="bg-white max-w-5xl w-full grid md:grid-cols-2 shadow-2xl animate-scaleIn">
        <div className="h-96 md:h-auto bg-gray-50 relative">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[#9f1b3c] uppercase tracking-widest text-xs font-bold mb-2 block">Arvind Signature</span>
              <h3 className="font-redhat font-bold text-4xl text-[#064770]">{product.title}</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-[#9f1b3c] transition-colors">
              <X size={24} />
            </button>
          </div>
          <p className="font-garamond text-2xl italic text-gray-500 mb-8 font-light">{product.subtitle || "Experience the luxury of fine craftsmanship."}</p>
          <div className="space-y-4 mb-10">
            <p className="font-source text-gray-600 leading-relaxed text-lg font-light">
              Expertly crafted from the finest materials, this piece exemplifies Arvind's commitment to quality and sustainable innovation.
            </p>
            <ul className="text-sm text-gray-500 space-y-2 font-source">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9f1b3c] rounded-full"></div> 100% Premium Cotton</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9f1b3c] rounded-full"></div> Sustainable Production</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9f1b3c] rounded-full"></div> Hand-finished details</li>
            </ul>
          </div>
          <div className="flex items-center gap-4 mt-auto">
            <button
              onClick={handleAddToCart}
              className="button-primary flex-1 flex items-center justify-center gap-3"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>
            <button className="px-8 py-3.5 border border-gray-300 text-gray-600 font-source font-semibold uppercase text-xs tracking-widest hover:border-[#9f1b3c] hover:text-[#9f1b3c] transition-colors">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { cartCount } = useCart();
  const [wishlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const mainNavItems = ['Collections', 'Services', 'Our Story', 'Sustainability', 'Blog', 'Partner'];

  const collectionsDropdown = {
    categories: ['Bed Sheets', 'Fitted Bed Sheets', 'Bed In A Bag', 'Bedding Set', 'Dohars', 'Quilts', 'Bed Cover'],
    designs: ['Photographic', 'Paisley', 'Leaves', 'Plains & Textures', 'Scroll', 'Abstract', 'Damask', 'Floral'],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400'
  };
  const secondaryNavItems = ['Bedding', 'Bath', 'Ready Made Curtains', 'Cushion Covers', 'Gifting', 'Kids', 'Decor Accessories', 'Offers'];

  return (
    <>
      <header className={`fixed top-0 w-full z-[5000] transition-all duration-500 ${scrolled ? 'bg-white/98 backdrop-blur-md shadow-lg' : 'bg-transparent'} ${hidden ? '-translate-y-full' : 'translate-y-0'
        }`}>
        {/* Single Bar with Centered Logo */}
        <div className="w-full">
          <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-6">
            <div className="grid grid-cols-3 items-center">
              {/* Left Navigation */}
              <nav className="hidden md:flex items-center gap-8 justify-start">
                <a href="#new" className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${scrolled ? 'text-[#2c2c2c] hover:text-[#9f1b3c]' : 'text-white hover:text-white/80'}`}>
                  NEW IN
                </a>
                <a href="#shop" className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${scrolled ? 'text-[#2c2c2c] hover:text-[#9f1b3c]' : 'text-white hover:text-white/80'}`}>
                  SHOP
                </a>
                <a href="#search" className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${scrolled ? 'text-[#2c2c2c] hover:text-[#9f1b3c]' : 'text-white hover:text-white/80'}`}>
                  SEARCH
                </a>
              </nav>

              {/* Centered Logo */}
              <div className="flex items-center justify-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/clothingfactory-c9f0c.firebasestorage.app/o/logo%2FArvind_logo.png?alt=media&token=140a2325-4c8e-417d-803a-58f16a72df50"
                  alt="Arvind Logo"
                  className="h-12 md:h-14 w-auto object-contain transition-all duration-300"
                  style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
                />
              </div>

              {/* Right Navigation */}
              <nav className="hidden md:flex items-center gap-8 justify-end">
                <a href="#stores" className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${scrolled ? 'text-[#2c2c2c] hover:text-[#9f1b3c]' : 'text-white hover:text-white/80'}`}>
                  OUR STORES
                </a>
                <a href="#account" className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${scrolled ? 'text-[#2c2c2c] hover:text-[#9f1b3c]' : 'text-white hover:text-white/80'}`}>
                  ACCOUNT
                </a>
                <button className="relative">
                  <ShoppingBag className={`w-5 h-5 transition-colors ${scrolled ? 'text-[#2c2c2c] hover:text-[#9f1b3c]' : 'text-white hover:text-white/80'}`} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#da1f26] text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </nav>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden ml-auto"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className={scrolled ? 'text-[#2c2c2c]' : 'text-white'} size={24} /> : <Menu className={scrolled ? 'text-[#2c2c2c]' : 'text-white'} size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[4000] transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden pt-32 px-8 overflow-y-auto`}>
        <div className="flex flex-col gap-6">
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Main Menu</h3>
            {mainNavItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block py-3 text-lg font-semibold text-gray-800 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Shop By Category</h3>
            {secondaryNavItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block py-2 text-sm text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero images showcasing elegant home furnishings - 6 slides
  // Hero images showcasing elegant home furnishings - 6 slides
  const heroSlides = [
    {
      type: 'video',
      src: '/prince.mp4',
      category: 'EXPERIENCE ARVIND',
      title: 'Fashioning Possibilities',
      buttonText: 'DISCOVER MORE'
    },
    {
      type: 'video',
      src: '/prince2.mp4',
      category: 'EXPERIENCE ARVIND',
      title: 'Fashioning Possibilities',
      buttonText: 'DISCOVER MORE'
    },
    {
      type: 'video',
      src: '/prince3.mp4',
      category: 'EXPERIENCE ARVIND',
      title: 'Fashioning Possibilities',
      buttonText: 'DISCOVER MORE'
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=90&w=2600",
      category: "SIGNATURE COLLECTION",
      title: "Meticulously curated jacquards inspired by the warm tones and textures of deserts.",
      buttonText: "EXPLORE COLLECTION"
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=90&w=2600",
      category: "PREMIUM CURTAINS & DRAPES",
      title: "Elegant drapery crafted from the finest fabrics for sophisticated interiors.",
      buttonText: "DISCOVER MORE"
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=90&w=2600",
      category: "LUXURY BED LINEN",
      title: "Hand-finished textiles that blend traditional craftsmanship with modern aesthetics.",
      buttonText: "VIEW COLLECTION"
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=90&w=2600",
      category: "ARTISAN CUSHIONS",
      title: "Handcrafted cushion covers featuring traditional embroidery and modern designs.",
      buttonText: "SHOP NOW"
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=90&w=2600",
      category: "HANDWOVEN CARPETS",
      title: "Exquisite carpets that bring warmth and artistry to your floors.",
      buttonText: "VIEW COLLECTION"
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=90&w=2600",
      category: "ELEGANT TABLE LINEN",
      title: "Set the perfect table with our collection of fine linens and runners.",
      buttonText: "SHOP NOW"
    }
  ];

  const currentSlide = heroSlides[currentImageIndex];
  const nextSlideIndex = (currentImageIndex + 1) % heroSlides.length;

  useEffect(() => {
    // Only set interval for image slides
    if (currentSlide.type === 'image') {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [currentSlide.type, heroSlides.length]);

  const handleVideoEnded = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-screen overflow-hidden flex items-center justify-start bg-[#FDFBF7] mt-0 pt-0">
      {/* Background Image/Video with Transition */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentImageIndex;
        const isNext = index === nextSlideIndex;
        const shouldRenderVideo = isActive || isNext; // Only render video if active or next (for preloading)

        return (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {slide.type === 'video' ? (
              shouldRenderVideo && (
                <video
                  className="w-full h-full object-cover"
                  autoPlay={isActive} // Only autoplay if active
                  muted
                  playsInline
                  preload={isActive ? "auto" : "metadata"} // Optimize loading
                  onEnded={isActive ? handleVideoEnded : undefined} // Only listen to end event if active
                  ref={(el) => {
                    if (el) {
                      if (isActive) {
                        el.play().catch(() => { /* Handle autoplay prevention */ });
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }}
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              )
            ) : (
              <img
                src={slide.src}
                alt={slide.category}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            )}
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
          </div>
        );
      })}

      {/* Content Overlay */}
      <div className="relative z-10 max-w-[1600px] w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          {/* Category Tag */}
          <div className="mb-4 md:mb-6 animate-slideUp opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="text-white text-[10px] md:text-sm uppercase tracking-[0.25em] font-source font-bold">
              {currentSlide.category}
            </span>
          </div>

          {/* Main Heading - Red Hat Display as per brand guidelines */}
          <h1 className="font-redhat font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 md:mb-8 animate-slideUp opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {currentSlide.title}
          </h1>

          {/* CTA Button - Arvind Base Color */}
          <div className="animate-slideUp opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <button className="bg-[#9f1b3c] text-white px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-xs font-bold font-source uppercase tracking-[0.2em] hover:bg-white hover:text-[#9f1b3c] border-2 border-[#9f1b3c] transition-all duration-300 shadow-lg">
              {currentSlide.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 ${index === currentImageIndex
              ? 'w-8 h-2 bg-[#9f1b3c]'
              : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Help Button (Bottom Right) - Prussian Blue */}
      <button className="absolute bottom-8 right-8 z-20 bg-[#064770] text-white px-5 py-3 rounded-full text-xs font-source font-semibold flex items-center gap-2 hover:bg-[#9f1b3c] transition-all duration-300 shadow-lg">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01" />
        </svg>
        Help
      </button>
    </section>
  );
};

// Category Page Component
const CategoryPage = ({ category, onBack }: { category: string; onBack: () => void }) => {
  const [sortOpen, setSortOpen] = useState(false);

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Handwoven Suzani Cushion",
      price: "₹ 2,499",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
      tag: "Dispatch within 7-10 Days",
      status: "in-stock"
    },
    {
      id: 2,
      name: "Velvet Embroidered Throw",
      price: "₹ 4,999",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800",
      tag: "Sold Out",
      status: "sold-out"
    },
    {
      id: 3,
      name: "Silk Jacquard Bed Cover",
      price: "₹ 8,999",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
      tag: "Dispatch within 7-10 Days",
      status: "in-stock"
    },
    {
      id: 4,
      name: "Cotton Block Print Sheet",
      price: "₹ 3,299",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      tag: "New Arrival",
      status: "in-stock"
    },
    {
      id: 5,
      name: "Linen Blend Curtains",
      price: "₹ 5,499",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      tag: "Dispatch within 24 Hours",
      status: "in-stock"
    },
    {
      id: 6,
      name: "Textured Wool Rug",
      price: "₹ 12,999",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800",
      tag: "Out of Stock",
      status: "out-of-stock"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white/10 pt-32 pb-20 px-6 md:px-12 animate-fadeIn">
      {/* Header / Breadcrumbs */}
      <div className="max-w-[1600px] mx-auto mb-12">
        <button
          onClick={onBack}
          className="text-xs font-source font-semibold uppercase tracking-widest text-gray-500 hover:text-[#9f1b3c] transition-colors mb-8 flex items-center gap-2"
        >
          <ChevronRight className="rotate-180" size={14} /> Back to Home
        </button>

        <h1 className="font-garamond text-4xl md:text-5xl text-[#2c2c2c] mb-4">{category}</h1>

        <div className="flex justify-between items-end border-b border-gray-200 pb-4">
          <span className="text-xs font-source font-semibold tracking-widest text-gray-500">ITEMS {products.length}</span>

          <div className="flex gap-8">
            <button className="text-xs font-source font-semibold tracking-widest text-[#2c2c2c] hover:text-[#9f1b3c] uppercase">Filter</button>
            <button className="text-xs font-source font-semibold tracking-widest text-[#2c2c2c] hover:text-[#9f1b3c] uppercase">Sort</button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${product.status !== 'in-stock' ? 'opacity-80' : ''}`}
              />

              {/* Tags */}
              {product.tag && (
                <div className="absolute top-4 left-4 bg-[#FDFBF7] px-3 py-1.5 text-[10px] font-source font-semibold uppercase tracking-wider text-[#2c2c2c]">
                  {product.tag}
                </div>
              )}

              {/* Status Overlay */}
              {product.status === 'sold-out' && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                  <span className="bg-white px-4 py-2 text-xs font-source font-bold uppercase tracking-widest text-[#2c2c2c]">SOLD OUT</span>
                </div>
              )}

              {product.status === 'out-of-stock' && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                  <span className="bg-white px-4 py-2 text-xs font-source font-bold uppercase tracking-widest text-[#2c2c2c]">OUT OF STOCK</span>
                </div>
              )}
            </div>

            <div className="text-center">
              <h3 className="font-garamond text-xl text-[#2c2c2c] mb-1 group-hover:text-[#9f1b3c] transition-colors">{product.name}</h3>
              <p className="font-source text-sm text-gray-600">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Collections = ({ onCategoryClick }: { onCategoryClick: (category: string) => void }) => {
  const categories = [
    {
      id: 1,
      name: "Bed Linen",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
      link: "#"
    },
    {
      id: 2,
      name: "Soft Furnishing",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
      link: "#"
    },
    {
      id: 3,
      name: "Bath",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800",
      link: "#"
    },
    {
      id: 4,
      name: "Decor",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      link: "#"
    }
  ];

  return (
    <section id="collections" className="py-20 bg-white/0 w-full min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="font-redhat font-bold text-3xl md:text-4xl text-[#2c2c2c] mb-12">Discover by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => onCategoryClick(category.name)}
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              </div>
              <h3 className="font-source font-semibold text-lg text-[#2c2c2c] uppercase tracking-wider group-hover:text-[#9f1b3c] transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedCollection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      title: 'DELISSA 3 LUMBAR CUSHION COVER',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'DELISSA 4 CUSHION COVER',
      image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="py-20 bg-white/10 w-full min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="font-redhat font-bold text-3xl md:text-4xl text-[#2c2c2c] mb-4">
              Explore our Suzani Collection
            </h2>
            <p className="font-source text-lg text-[#2c2c2c]/80 leading-relaxed">
              Inspired by ancient craft passed down by the nomadic tribes of Central Asia. Bold, Inspiring, Understated.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="p-2 border border-gray-300 hover:border-[#9f1b3c] hover:text-[#9f1b3c] transition-colors disabled:opacity-30"
              disabled={currentIndex === 0}
            >
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <span className="font-source text-sm text-gray-600">{currentIndex + 1} / {products.length}</span>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(products.length - 1, prev + 1))}
              className="p-2 border border-gray-300 hover:border-[#9f1b3c] hover:text-[#9f1b3c] transition-colors disabled:opacity-30"
              disabled={currentIndex === products.length - 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-source text-sm uppercase tracking-wider text-[#2c2c2c] group-hover:text-[#9f1b3c] transition-colors">
                {product.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Spotlight = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center bg-white/10">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=2600"
          alt="Artisan Heritage"
          className="w-full h-full object-cover fixed-bg-effect opacity-90"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full flex justify-end">
        <div className="max-w-lg bg-white p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] animate-slideUp">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-1 bg-gray-300"></div>
            <span className="font-source uppercase tracking-[0.2em] text-[#9f1b3c] text-xs font-bold">Signature Series</span>
            <div className="h-[1px] flex-1 bg-gray-300"></div>
          </div>
          <h2 className="font-redhat font-bold text-4xl md:text-5xl text-[#064770] mb-8 text-center leading-tight">Artisan Heritage Collection</h2>
          <p className="font-garamond text-xl text-gray-600 leading-relaxed mb-10 text-center font-light">
            "Hand-embroidered geometries inspired by Art Deco elegance, blending traditional craftsmanship with contemporary design."
          </p>
          <div className="flex justify-center">
            <button className="button-outline-dark">
              Discover the Craft
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShopByCategory = () => {
  const categories = [
    { name: 'By Room', icon: <ShoppingBag size={20} />, img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800' },
    { name: 'By Style', icon: <Star size={20} />, img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800' },
    { name: 'By Pattern', icon: <PenTool size={20} />, img: 'https://images.unsplash.com/photo-1534349762913-96e96b526308?auto=format&fit=crop&q=80&w=800' },
    { name: 'By Fabric', icon: <Leaf size={20} />, img: 'https://images.unsplash.com/photo-1628498424075-f9f30b912cb1?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section id="shop-by-design" className="py-32 bg-white/10 w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="font-redhat font-bold text-3xl md:text-4xl text-[#2c2c2c] text-center mb-16">Shop by Design</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-gray-100">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110 opacity-90 group-hover:opacity-100" />
              <div className="absolute bottom-6 left-6 right-6 bg-white py-6 px-4 text-center shadow-lg transition-transform duration-500 transform translate-y-2 group-hover:translate-y-0">
                <h3 className="font-redhat font-bold text-lg uppercase tracking-widest text-[#064770] mb-2">{cat.name}</h3>
                <span className="text-xs text-[#9f1b3c] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Collection</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// REMOVED COLOR BRICKS: Changed bg from gray to white, removed heavy color blocks
const ReadyMade = () => {
  const products = [
    { title: "Indigo Throw", price: "₹2,499", img: "https://images.unsplash.com/photo-1589139268832-613d038f4675?auto=format&fit=crop&q=80&w=600" },
    { title: "Velvet Cushion", price: "₹1,299", img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=600" },
    { title: "Silk Runner", price: "₹3,999", img: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=600" },
    { title: "Cotton Drapes", price: "₹4,599", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <section className="py-32 bg-white/10 w-full border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16 border-b border-[#e5e5e5] pb-6">
          <div>
            <h2 className="font-redhat font-bold text-3xl md:text-4xl text-[#064770] mb-2">Ready to Ship</h2>
            <p className="font-garamond italic text-xl text-gray-500 font-light">Bring home elegant furnishings today.</p>
          </div>
          <a href="#" className="hidden md:flex items-center text-[#9f1b3c] font-bold uppercase text-xs tracking-widest hover:text-[#064770] transition-colors">
            Shop All <ArrowRight size={14} className="ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-gray-50 relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button className="absolute bottom-0 right-0 bg-[#064770] text-white p-3 hover:bg-[#9f1b3c] transition-colors translate-y-full group-hover:translate-y-0 duration-300">
                  <ShoppingBag size={18} />
                </button>
              </div>
              <h3 className="font-redhat font-bold text-lg text-[#2c2c2c] group-hover:text-[#9f1b3c] transition-colors">{p.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-source text-gray-500 font-medium">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Advantage = () => {
  const advantages = [
    { icon: <Leaf size={32} />, title: "Integrated Excellence", desc: "From yarn to finished goods, ensuring quality at every step." },
    { icon: <Globe size={32} />, title: "Sustainable Innovation", desc: "Eco-friendly production meeting global sustainability standards." },
    { icon: <Star size={32} />, title: "Global Standards", desc: "Products that define international benchmarks in luxury." },
    { icon: <PenTool size={32} />, title: "Bespoke Solutions", desc: "Custom design services tailored to your unique vision." }
  ];

  return (
    <section className="py-32 bg-white/10 w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="font-source uppercase tracking-[0.2em] text-[#9f1b3c] text-xs font-bold mb-4 block">Our Ethos</span>
          <h2 className="font-redhat font-bold text-4xl text-[#064770] mb-4">The Arvind Advantage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {advantages.map((adv, i) => (
            <div key={i} className="text-center group p-8 bg-white shadow-sm hover:shadow-lg transition-all duration-500">
              <div className="w-16 h-16 mx-auto bg-[#FDFBF7] rounded-full flex items-center justify-center mb-8 text-[#064770] group-hover:bg-[#064770] group-hover:text-white transition-all duration-500">
                {adv.icon}
              </div>
              <h3 className="font-redhat font-bold text-xl mb-4 text-[#2c2c2c]">{adv.title}</h3>
              <p className="font-source text-gray-500 leading-relaxed font-light">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// REMOVED COLOR BRICKS: Lightened background to white for seamless flow
const Services = () => {
  return (
    <section id="services" className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px] w-full bg-white/10 border-t border-gray-100">
      <div className="relative h-[400px] lg:h-auto">
        <img
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000"
          alt="Interior Styling"
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
      <div className="p-12 lg:p-24 flex flex-col justify-center bg-[#FDFBF7]">
        <span className="font-source uppercase tracking-[0.2em] text-[#9f1b3c] text-xs font-bold mb-4">Bespoke</span>
        <h2 className="font-redhat font-bold text-4xl md:text-5xl text-[#064770] mb-8">Interior Styling Services</h2>
        <p className="font-source text-xl text-gray-600 leading-loose mb-12 max-w-lg font-light">
          A customized interior styling service that brings our signature aesthetic home. We offer expert guidance, refined curation, and a deeply collaborative process to realize your vision.
        </p>
        <div className="flex flex-col sm:flex-row gap-12 mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#064770] font-bold font-redhat text-lg">
              <PenTool size={18} /> Consultation
            </div>
            <p className="text-sm text-gray-500 font-source font-light">Expert advice from top designers</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#064770] font-bold font-redhat text-lg">
              <ShoppingBag size={18} /> Curation
            </div>
            <p className="text-sm text-gray-500 font-source font-light">Personalized product selection</p>
          </div>
        </div>
        <button className="button-outline-dark w-fit">
          Book Consultation
        </button>
      </div>
    </section>
  );
};

const Heritage = () => {
  return (
    <section id="our-story" className="py-32 bg-white/10 w-full">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        <h2 className="font-redhat font-bold text-4xl md:text-5xl text-[#064770] mb-12">The Arvind Legacy</h2>
        <div className="relative mb-20">
          <QuoteIcon className="absolute -top-10 left-1/2 -translate-x-1/2 text-gray-100 w-24 h-24" />
          <p className="font-garamond italic text-2xl md:text-4xl text-[#2c2c2c] max-w-4xl mx-auto leading-relaxed relative z-10 font-light">
            "Since 1931, we've woven excellence into every thread, carrying forward 17 generations of textile mastery. Audacity with Tenacity is our creed."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 border-t border-gray-100 pt-16">
          {[
            { year: "1931", title: "The Beginning", desc: "Lalbhai family establishes Arvind Limited." },
            { year: "1980s", title: "Denim Revolution", desc: "Bringing denim to the domestic market." },
            { year: "Today", title: "Global Leader", desc: "Pioneering advanced materials and sustainability." }
          ].map((item, i) => (
            <div key={i} className="relative">
              <span className="block font-redhat font-bold text-[#9f1b3c] text-2xl mb-2">{item.year}</span>
              <h3 className="font-source font-semibold text-lg text-[#064770] mb-3">{item.title}</h3>
              <p className="font-source text-gray-500 font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurStores = () => {
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);

  const stores = [
    {
      city: 'AHMEDABAD',
      description: 'We look forward to welcoming you at a Sarita Handa store. Connect with the store directly to arrange a personalised visit and discover our timeless collection.'
    },
    {
      city: 'DELHI DEF COL',
      description: 'Visit our flagship store in Delhi Defence Colony for an exclusive collection of luxury home furnishings.'
    },
    {
      city: 'MUMBAI',
      description: 'Explore our curated collection at our Mumbai showroom, featuring the latest in home textiles.'
    }
  ];

  return (
    <section id="stores" className="py-20 bg-white/10 w-full min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="font-redhat font-bold text-3xl md:text-4xl text-[#2c2c2c] mb-16">Our Stores</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <p className="font-source text-gray-600 text-lg leading-relaxed mb-8">
              {stores[currentStoreIndex].description}
            </p>
            <a
              href="#"
              className="inline-flex items-center text-[#064770] font-source font-bold uppercase text-xs tracking-widest hover:text-[#9f1b3c] transition-colors"
            >
              VIEW ALL <ArrowRight size={14} className="ml-2" />
            </a>

            {/* Navigation */}
            <div className="flex items-center gap-6 mt-12">
              <button
                onClick={() => setCurrentStoreIndex(prev => Math.max(0, prev - 1))}
                className="p-2 border border-gray-300 hover:border-[#9f1b3c] hover:text-[#9f1b3c] transition-colors disabled:opacity-30"
                disabled={currentStoreIndex === 0}
              >
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <span className="font-source text-sm text-gray-600">{currentStoreIndex + 1} / {stores.length}</span>
              <button
                onClick={() => setCurrentStoreIndex(prev => Math.min(stores.length - 1, prev + 1))}
                className="p-2 border border-gray-300 hover:border-[#9f1b3c] hover:text-[#9f1b3c] transition-colors disabled:opacity-30"
                disabled={currentStoreIndex === stores.length - 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Store Cards */}
          <div className="grid grid-cols-2 gap-6">
            {stores.slice(0, 2).map((store, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-8 aspect-square flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                {/* Store Icon */}
                <div className="mb-6">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-source font-bold text-sm uppercase tracking-wider text-[#064770]">{store.city}</h3>
                <ArrowRight size={16} className="mt-4 text-[#9f1b3c]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21L14.017 18C14.017 16.896 14.389 15.954 15.133 15.174C15.878 14.394 16.85 14.004 18.049 14.004L18.049 15.012C17.29 15.012 16.719 15.19 16.336 15.546C15.953 15.902 15.761 16.516 15.761 17.388L15.761 21H14.017ZM8.00397 21L8.00397 18C8.00397 16.896 8.37597 15.954 9.11997 15.174C9.86397 14.394 10.836 14.004 12.035 14.004L12.035 15.012C11.276 15.012 10.705 15.19 10.322 15.546C9.93897 15.902 9.74797 16.516 9.74797 17.388L9.74797 21H8.00397ZM12.035 12.024C10.519 12.024 9.14197 12.564 7.90397 13.644C6.66597 14.724 6.04697 16.208 6.04697 18.096L6.04697 23H11.723V18.732C11.723 18.276 11.789 17.964 11.921 17.796C12.053 17.628 12.277 17.544 12.593 17.544C12.909 17.544 13.133 17.628 13.265 17.796C13.397 17.964 13.463 18.276 13.463 18.732V23H19.74V18.096C19.74 16.208 19.121 14.724 17.883 13.644C16.645 12.564 15.268 12.024 13.752 12.024H12.035Z" />
  </svg>
);

const Partner = () => {
  return (
    <section id="partner" className="sticky top-0 relative py-32 w-full flex items-center justify-center bg-[#064770] z-40 min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-50">
        <img
          src="/kim.png"
          alt="Partner Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-3xl text-center px-6">
        <h2 className="font-garamond text-4xl md:text-6xl text-white mb-8">Partner Programme</h2>
        <p className="font-source text-xl text-white/90 mb-12 font-light leading-relaxed">
          Join our network of exclusive partners and bring the elegance of Arvind to your customers.
          Audacity with Tenacity.
        </p>
        <button className="bg-white text-[#064770] px-12 py-4 text-xs font-bold font-source uppercase tracking-[0.2em] hover:bg-[#9f1b3c] hover:text-white transition-all duration-300">
          Become a Partner
        </button>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast("Subscribed! Check your email for 10% off.");
    setEmail('');
  };

  return (
    <section className="py-24 bg-white/10 w-full border-t border-gray-100">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h2 className="font-redhat font-bold text-3xl text-[#2c2c2c] mb-4">Stay Connected</h2>
        <p className="font-source text-gray-500 mb-8 font-light">
          Get 10% off your first purchase and be the first to access new collections.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 focus:border-[#9f1b3c] focus:outline-none font-source text-center placeholder:text-center"
            required
          />
          <button type="submit" className="button-primary w-full">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="sticky top-0 bg-[#9f1b3c] text-white pt-24 pb-12 w-full z-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            {/* Wordmark Footer */}
            <span className="font-redhat font-bold text-3xl tracking-tight block mb-6">Arvind</span>
            <p className="font-source text-gray-400 leading-relaxed text-sm">
              Fashioning Possibilities since 1931. A multi-sectoral business with seven decades of heritage and a vision for tomorrow.
            </p>
          </div>

          <div>
            <h4 className="font-source font-bold text-xs uppercase tracking-widest mb-8 text-gray-500">Collections</h4>
            <ul className="space-y-4 font-source text-sm text-gray-300">
              {['Premium Bed Linen', 'Curtains & Drapes', 'Soft Furnishings', 'Artisan Rugs', 'Wall Coverings'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-source font-bold text-xs uppercase tracking-widest mb-8 text-gray-500">Company</h4>
            <ul className="space-y-4 font-source text-sm text-gray-300">
              {['Our Story', 'Leadership', 'Sustainability', 'Investor Relations', 'Careers'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-source font-bold text-xs uppercase tracking-widest mb-8 text-gray-500">Follow Us</h4>
            <div className="flex gap-6 mb-8">
              <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
            <div className="text-sm text-gray-400">
              <p className="mb-2">info@arvind.com</p>
              <p>+91 79 6826 8000</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-source">
          <p>© 2024 Arvind Limited. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'category'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('category');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  return (
    <ErrorBoundary>
      <CartProvider>
        <ToastProvider>
          <style dangerouslySetInnerHTML={{ __html: styles }} />
          <div className="w-full min-h-screen flex flex-col relative">
            {/* Fixed Background Image for Non-Hero Sections */}
            <div
              className="fixed inset-0 z-[-1] pointer-events-none"
              style={{
                backgroundImage: "url('/jim.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            />

            <Header />
            <main className="flex-grow">
              {currentView === 'home' ? (
                <>
                  <Hero />
                  <div className="bg-white/10 backdrop-blur-sm">
                    <Collections onCategoryClick={handleCategoryClick} />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm">
                    <FeaturedCollection />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm">
                    <OurStores />
                  </div>
                  <Partner />
                </>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm">
                  <CategoryPage category={selectedCategory} onBack={handleBackToHome} />
                </div>
              )}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </CartProvider>
    </ErrorBoundary>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
