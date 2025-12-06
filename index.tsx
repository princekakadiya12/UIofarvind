
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
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

// --- SCROLL TO TOP ---
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

// --- CONTEXTS ---

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  priceFormatted: string;
  image: string;
  images: string[];
  category: string;
  material?: string;
  dimensions?: string;
  technique?: string;
  fabric?: string;
  color?: string;
  careNotes?: string;
  description?: string;
  inStock: boolean;
}

// Cart item type
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children?: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, isCartOpen, addToCart, removeFromCart, updateQuantity, toggleCart, closeCart }}>
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

// --- PRODUCTS DATA ---
const productsData: Product[] = [
  {
    id: 1,
    name: "Berel Fabric Box",
    price: 45000,
    priceFormatted: "₹ 45,000",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Furniture",
    material: "White Ash Wood",
    fabric: "Viscose, Polyester, Linen",
    color: "Rich Walnut",
    dimensions: "54 × 18 × 20 IN",
    technique: "Carpentry, Upholstery",
    careNotes: "No chemicals for cleaning. Avoid sharp objects. Avoid direct sunlight.",
    description: "A beautifully crafted fabric box combining traditional carpentry with modern upholstery techniques.",
    inStock: true
  },
  {
    id: 2,
    name: "Delissa Lumbar Cushion Cover",
    price: 2499,
    priceFormatted: "₹ 2,499",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Soft Furnishings",
    material: "Premium Cotton",
    fabric: "100% Cotton with Suzani Embroidery",
    color: "Multi-color",
    dimensions: "30 × 50 CM",
    technique: "Hand Embroidery",
    careNotes: "Dry clean recommended. Store in cool, dry place.",
    description: "Hand-embroidered Suzani pattern cushion cover inspired by Central Asian nomadic traditions.",
    inStock: true
  },
  {
    id: 3,
    name: "Velvet Embroidered Throw",
    price: 4999,
    priceFormatted: "₹ 4,999",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Soft Furnishings",
    material: "Velvet",
    fabric: "Silk Velvet with Gold Thread",
    color: "Deep Blue",
    dimensions: "130 × 170 CM",
    technique: "Machine Embroidery",
    careNotes: "Dry clean only. Do not iron directly.",
    description: "Luxurious velvet throw with intricate gold thread embroidery for an opulent living space.",
    inStock: true
  },
  {
    id: 4,
    name: "Heritage Jacquard Bedsheet",
    price: 7999,
    priceFormatted: "₹ 7,999",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Bed Linen",
    material: "Egyptian Cotton",
    fabric: "400 Thread Count Sateen",
    color: "Ivory with Gold",
    dimensions: "King Size - 274 × 274 CM",
    technique: "Jacquard Weave",
    careNotes: "Machine wash cold. Tumble dry low.",
    description: "Premium Egyptian cotton bedsheet with heritage jacquard patterns woven into the fabric.",
    inStock: false
  },
  {
    id: 5,
    name: "Artisan Woven Rug",
    price: 15999,
    priceFormatted: "₹ 15,999",
    image: "https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555436169-22ce0c26f4a1?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Decor",
    material: "Wool & Jute",
    fabric: "Hand-spun Wool with Jute Base",
    color: "Natural Earth Tones",
    dimensions: "180 × 270 CM",
    technique: "Hand-woven",
    careNotes: "Vacuum regularly. Professional clean only.",
    description: "Hand-woven artisan rug showcasing centuries-old weaving traditions with natural materials.",
    inStock: true
  },
  {
    id: 6,
    name: "Silk Brocade Curtain",
    price: 12499,
    priceFormatted: "₹ 12,499",
    image: "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Curtains",
    material: "Pure Silk",
    fabric: "Banarasi Brocade",
    color: "Gold & Maroon",
    dimensions: "140 × 280 CM (per panel)",
    technique: "Traditional Brocade Weave",
    careNotes: "Dry clean only. Store away from direct sunlight.",
    description: "Exquisite Banarasi brocade curtains featuring traditional motifs woven in pure silk.",
    inStock: true
  }
];

// --- CART DRAWER ---
const CartDrawer = () => {
  const { cart, cartCount, cartTotal, isCartOpen, removeFromCart, updateQuantity, closeCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[7000] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[7001] shadow-2xl transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-redhat font-bold text-xl text-[#2c2c2c]">Shopping Bag ({cartCount})</h2>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={22} className="text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="font-source text-gray-500">Your bag is empty</p>
              <button
                onClick={() => { closeCart(); navigate('/'); }}
                className="mt-6 text-[#9f1b3c] font-source font-semibold text-sm uppercase tracking-wider hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-source font-semibold text-sm text-[#2c2c2c] mb-1">{item.product.name}</h3>
                    <p className="font-source text-xs text-gray-500 mb-2">{item.product.priceFormatted}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-[#9f1b3c] hover:text-[#9f1b3c] transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="font-source text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-[#9f1b3c] hover:text-[#9f1b3c] transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-[#da1f26] transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-source text-gray-600">Subtotal</span>
              <span className="font-redhat font-bold text-xl text-[#2c2c2c]">₹ {cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <button className="button-primary w-full">
              Proceed to Checkout
            </button>
            <p className="text-center text-xs text-gray-500 mt-3 font-source">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

// --- PRODUCT PAGE ---
const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'delivery'>('details');

  const product = productsData.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-redhat font-bold text-3xl text-[#2c2c2c] mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/')} className="button-primary">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${product.name} to cart`);
  };

  return (
    <div className="bg-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm font-source text-gray-500">
            <li><Link to="/" className="hover:text-[#9f1b3c]">Home</Link></li>
            <ChevronRight size={14} />
            <li><Link to="/" className="hover:text-[#9f1b3c]">{product.category}</Link></li>
            <ChevronRight size={14} />
            <li className="text-[#2c2c2c]">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-[#9f1b3c]' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h1 className="font-redhat font-bold text-3xl md:text-4xl text-[#2c2c2c] mb-4 uppercase tracking-wide">
              {product.name}
            </h1>

            <p className="font-garamond text-2xl text-[#9f1b3c] mb-6">{product.priceFormatted}</p>

            {product.description && (
              <p className="font-source text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Specifications */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm font-source">
                {product.material && (
                  <div>
                    <span className="text-gray-500 block mb-1">Material</span>
                    <span className="text-[#2c2c2c] font-medium">{product.material}</span>
                  </div>
                )}
                {product.fabric && (
                  <div>
                    <span className="text-gray-500 block mb-1">Fabric</span>
                    <span className="text-[#2c2c2c] font-medium">{product.fabric}</span>
                  </div>
                )}
                {product.color && (
                  <div>
                    <span className="text-gray-500 block mb-1">Color</span>
                    <span className="text-[#2c2c2c] font-medium">{product.color}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="text-gray-500 block mb-1">Dimensions</span>
                    <span className="text-[#2c2c2c] font-medium">{product.dimensions}</span>
                  </div>
                )}
                {product.technique && (
                  <div className="col-span-2">
                    <span className="text-gray-500 block mb-1">Technique</span>
                    <span className="text-[#2c2c2c] font-medium">{product.technique}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            {product.inStock ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-source text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-source">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 mb-8">
                  <button
                    onClick={handleAddToCart}
                    className="button-primary flex-1 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                  <button className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-[#9f1b3c] hover:text-[#9f1b3c] transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-8 p-4 bg-gray-100 text-center">
                <span className="font-source font-semibold text-gray-600 uppercase tracking-wider">Out of Stock</span>
              </div>
            )}

            {/* Tabs: Details / Delivery */}
            <div className="border-t border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-4 font-source text-sm uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'details' ? 'border-[#9f1b3c] text-[#9f1b3c]' : 'border-transparent text-gray-500 hover:text-[#2c2c2c]'}`}
                >
                  Care Notes
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`flex-1 py-4 font-source text-sm uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'delivery' ? 'border-[#9f1b3c] text-[#9f1b3c]' : 'border-transparent text-gray-500 hover:text-[#2c2c2c]'}`}
                >
                  Delivery Info
                </button>
              </div>
              <div className="py-6">
                {activeTab === 'details' ? (
                  <p className="font-source text-sm text-gray-600 leading-relaxed">
                    {product.careNotes || "Handle with care. Please refer to the care label for specific instructions."}
                  </p>
                ) : (
                  <div className="font-source text-sm text-gray-600 space-y-3">
                    <div className="flex items-start gap-3">
                      <Truck size={18} className="text-[#9f1b3c] mt-0.5" />
                      <p>Free shipping on orders above ₹5,000. Standard delivery within 7-10 business days.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-[#9f1b3c] mt-0.5" />
                      <p>Express delivery available for select pin codes. Additional charges may apply.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collectionsMenuOpen, setCollectionsMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isLightPage = location.pathname.startsWith('/shop') || location.pathname.startsWith('/product');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
        setMegaMenuOpen(false);
        setCollectionsMenuOpen(false);
      } else {
        setHidden(false);
      }
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Categories for mega menu
  const categories = [
    { name: 'Cushions', slug: 'cushions' },
    { name: 'Bedspreads', slug: 'bedspreads' },
    { name: 'Furniture', slug: 'furniture' },
    { name: 'Fabrics', slug: 'fabrics' },
    { name: 'Decor', slug: 'decor' },
    { name: 'Bed Linen', slug: 'bed-linen' },
    { name: 'Curtains', slug: 'curtains' },
  ];

  // Featured products for mega menu
  const featuredProducts = [
    { id: 2, name: 'NEW CUSHIONS', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'NEW BEDSPREADS', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400' },
  ];

  const textColor = scrolled || megaMenuOpen || collectionsMenuOpen || isLightPage ? 'text-[#2c2c2c]' : 'text-white';
  const hoverColor = scrolled || megaMenuOpen || collectionsMenuOpen || isLightPage ? 'hover:text-[#9f1b3c]' : 'hover:text-white/80';

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[5000] transition-all duration-300 ${scrolled || megaMenuOpen || collectionsMenuOpen || isLightPage ? 'bg-white shadow-sm' : 'bg-transparent'} ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        onMouseLeave={() => setMegaMenuOpen(false)}
      >
        <div className="w-full">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4">
            <div className="flex items-center justify-between h-12">
              {/* Left Navigation */}
              <nav className="hidden md:flex items-center gap-6 justify-start">
                {/* NEW IN with Mega Menu */}
                <div
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <button className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${textColor} ${hoverColor} flex items-center gap-1 py-2 border-b-2 ${megaMenuOpen ? 'border-[#9f1b3c]' : 'border-transparent'}`}>
                    NEW IN
                  </button>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => { setCollectionsMenuOpen(true); setMegaMenuOpen(false); }}
                >
                  <button className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${textColor} ${hoverColor} flex items-center gap-1 py-2 border-b-2 ${collectionsMenuOpen ? 'border-[#9f1b3c]' : 'border-transparent'}`}>
                    COLLECTIONS
                  </button>
                </div>

                <button
                  className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${textColor} ${hoverColor} flex items-center gap-1`}
                  onClick={() => setSearchOpen(true)}
                  onMouseEnter={() => setMegaMenuOpen(false)}
                >
                  <Search size={14} />
                  SEARCH
                </button>
              </nav>

              {/* Centered Logo */}
              <div className="flex items-center justify-center">
                <Link to="/" onMouseEnter={() => setMegaMenuOpen(false)}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/clothingfactory-c9f0c.firebasestorage.app/o/logo%2FArvind_logo.png?alt=media&token=140a2325-4c8e-417d-803a-58f16a72df50"
                    alt="Arvind Logo"
                    className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
                    style={{ filter: (scrolled || megaMenuOpen || collectionsMenuOpen || isLightPage) ? 'none' : 'brightness(0) invert(1)' }}
                  />
                </Link>
              </div>

              {/* Right Navigation */}
              <nav className="hidden md:flex items-center gap-6 justify-end" onMouseEnter={() => setMegaMenuOpen(false)}>
                <Link to="/contact" className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${textColor} ${hoverColor}`}>
                  contact us
                </Link>
                <button className={`text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${textColor} ${hoverColor} flex items-center gap-1`}>
                  <User size={14} />
                  ACCOUNT
                </button>
                <button className={`relative text-xs font-source font-semibold uppercase tracking-[0.15em] transition-colors ${textColor} ${hoverColor} flex items-center gap-1`} onClick={toggleCart}>
                  CART({cartCount})
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

        {/* Mega Menu Dropdown */}
        <div
          className={`absolute left-0 w-full bg-[#FDFBF7] border-t border-gray-100 shadow-lg transition-all duration-300 overflow-hidden ${megaMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
          onMouseEnter={() => setMegaMenuOpen(true)}
          onMouseLeave={() => setMegaMenuOpen(false)}
        >
          <div className="max-w-[1400px] mx-auto px-12 py-10">
            <div className="grid grid-cols-4 gap-12">
              {/* Categories List */}
              <div>
                <h3 className="font-source font-bold text-sm uppercase tracking-wider text-[#2c2c2c] mb-6">ALL NEW</h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        to={`/`}
                        className="font-source text-sm text-gray-600 hover:text-[#9f1b3c] transition-colors block py-1 border-b border-transparent hover:border-[#9f1b3c]"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured Products */}
              {featuredProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer" onClick={() => { navigate(`/product/${product.id}`); setMegaMenuOpen(false); }}>
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-source text-sm uppercase tracking-wider text-[#2c2c2c] group-hover:text-[#9f1b3c] transition-colors">
                    {product.name}
                  </h4>
                </div>
              ))}

              {/* Quick Links */}
              <div>
                <h3 className="font-source font-bold text-sm uppercase tracking-wider text-[#2c2c2c] mb-6">COLLECTIONS</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/product/1" className="font-source text-sm text-gray-600 hover:text-[#9f1b3c] transition-colors" onClick={() => setMegaMenuOpen(false)}>
                      Signature Collection
                    </Link>
                  </li>
                  <li>
                    <Link to="/product/3" className="font-source text-sm text-gray-600 hover:text-[#9f1b3c] transition-colors" onClick={() => setMegaMenuOpen(false)}>
                      Heritage Series
                    </Link>
                  </li>
                  <li>
                    <Link to="/product/5" className="font-source text-sm text-gray-600 hover:text-[#9f1b3c] transition-colors" onClick={() => setMegaMenuOpen(false)}>
                      Artisan Edit
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Collections Mega Menu Dropdown */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ${collectionsMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
          onMouseEnter={() => setCollectionsMenuOpen(true)}
          onMouseLeave={() => setCollectionsMenuOpen(false)}
        >
          <div className="max-w-[1400px] mx-auto px-12 py-10">
            <div className="grid grid-cols-6 gap-8">
              {[
                { name: 'Bedding', slug: 'bedding', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400' },
                { name: 'Cushions', slug: 'cushions', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
                { name: 'Curtains', slug: 'curtains', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400' },
                { name: 'Bath', slug: 'bath', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400' },
                { name: 'Table Linen', slug: 'table-linen', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
                { name: 'Decor', slug: 'decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' }
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  className="group text-center"
                  onClick={() => setCollectionsMenuOpen(false)}
                >
                  <div className="aspect-square overflow-hidden bg-gray-100 mb-3">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <span className="font-source text-sm uppercase tracking-wider text-[#2c2c2c] group-hover:text-[#9f1b3c] transition-colors">{cat.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Link
                to="/shop"
                className="inline-block font-source text-sm uppercase tracking-wider text-[#9f1b3c] hover:text-[#064770] transition-colors"
                onClick={() => setCollectionsMenuOpen(false)}
              >
                View All Collections →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[6000] flex items-start justify-center pt-32">
          <div className="bg-white w-full max-w-2xl mx-4 p-6 shadow-2xl animate-slideUp">
            <div className="flex items-center gap-4 mb-4">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 font-source text-lg outline-none border-b-2 border-gray-200 focus:border-[#9f1b3c] pb-2 transition-colors"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <p className="font-source text-sm text-gray-500">Try searching for "cushions", "bedding", or "curtains"</p>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[4000] transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden pt-24 px-6 overflow-y-auto`}>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Shop</h3>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/`}
                className="block py-3 text-lg font-semibold text-gray-800 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <Link to="/contact" className="block py-3 text-sm text-gray-600" onClick={() => setMobileMenuOpen(false)}>Our Stores</Link>
            <button className="block py-3 text-sm text-gray-600 w-full text-left">Account</button>
            <button className="block py-3 text-sm text-gray-600 w-full text-left" onClick={() => { toggleCart(); setMobileMenuOpen(false); }}>Cart ({cartCount})</button>
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
    <div className="w-full min-h-screen bg-white/90 pt-32 pb-20 px-6 md:px-12 animate-fadeIn">
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

const Collections = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const categories = [
    { id: 1, name: "Bedding", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800", slug: "bedding" },
    { id: 2, name: "Ready Made Curtains", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", slug: "curtains" },
    { id: 3, name: "Bath", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800", slug: "bath" },
    { id: 4, name: "Cushion Covers", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800", slug: "cushions" },
    { id: 5, name: "Table Linen", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800", slug: "table-linen" },
    { id: 6, name: "Decor", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", slug: "decor" }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 340;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(containerRef.current.scrollWidth - containerRef.current.clientWidth, scrollPosition + scrollAmount);
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const handleCategoryClick = (slug: string) => {
    navigate(`/shop/${slug}`);
  };

  return (
    <section id="collections" className="py-16 bg-white w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="font-redhat font-bold text-2xl md:text-3xl text-[#2c2c2c] text-center mb-10">SHOP CATEGORIES</h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors -ml-6"
            style={{ display: scrollPosition <= 0 ? 'none' : 'flex' }}
          >
            <ChevronLeft size={24} className="text-[#2c2c2c]" />
          </button>

          {/* Categories Container */}
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={(e) => setScrollPosition((e.target as HTMLDivElement).scrollLeft)}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-[320px] cursor-pointer group"
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="bg-white p-4 flex items-center justify-between">
                  <div>
                    <span className="font-source text-xs uppercase tracking-widest text-[#da1f26] block mb-1">SHOP</span>
                    <h3 className="font-redhat font-bold text-base text-[#2c2c2c]">{category.name}</h3>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-[#da1f26] transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors -mr-6"
          >
            <ChevronRight size={24} className="text-[#2c2c2c]" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FeaturedCollection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const products = [
    {
      id: 2,
      title: 'DELISSA 3 LUMBAR CUSHION COVER',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'DELISSA 4 CUSHION COVER',
      image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="py-20 bg-white/90 w-full min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="font-redhat font-bold text-3xl md:text-4xl text-[#2c2c2c] mb-4">
              New Collection
            </h2>
            <p className="font-source text-lg text-[#2c2c2c]/80 leading-relaxed">
              Discover our latest arrivals featuring premium craftsmanship and contemporary designs.
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
            <div
              key={idx}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
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
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center bg-white/90">
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
    <section id="shop-by-design" className="py-32 bg-white/90 w-full">
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
    <section className="py-32 bg-white/90 w-full border-t border-gray-100">
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
    <section className="py-32 bg-white/90 w-full">
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
    <section id="services" className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px] w-full bg-white/90 border-t border-gray-100">
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
    <section id="our-story" className="py-32 bg-white/90 w-full">
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
  const stores = [
    { city: 'Ahmedabad', address: 'Naroda Road, 380025' },
    { city: 'Delhi', address: 'Defence Colony' },
    { city: 'Mumbai', address: 'BKC, Bandra' }
  ];

  return (
    <section id="stores" className="py-16 bg-white w-full">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <span className="font-source text-xs uppercase tracking-widest text-gray-500">Visit Us</span>
            <div className="w-10 h-1 bg-[#da1f26]" />
          </div>
          <h2 className="font-redhat font-bold text-3xl text-[#2c2c2c]">Our Stores</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.map((store, idx) => (
            <Link
              key={idx}
              to="/contact"
              className="group p-8 bg-[#FDFBF7] border-l-4 border-[#da1f26] hover:shadow-lg transition-all"
            >
              <h3 className="font-redhat font-bold text-lg text-[#064770] mb-2">{store.city}</h3>
              <p className="font-source text-gray-600 text-sm mb-4">{store.address}</p>
              <span className="inline-flex items-center text-[#da1f26] font-source text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                Get Directions <ArrowRight size={14} className="ml-2" />
              </span>
            </Link>
          ))}
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
    <section id="partner" className="relative py-32 w-full flex items-center justify-center bg-[#064770]">
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
    <section className="py-24 bg-white/90 w-full border-t border-gray-100">
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

// ==================== NEW PAGES ====================

// --- ABOUT PAGE ---
const AboutPage = () => {
  const values = [
    { title: 'Purpose', desc: 'We create value for our customers and society. Our businesses strive to address the pressing needs of our time with insight and empathy.' },
    { title: 'Integrity', desc: 'We have a history of doing the right thing. We never compromise on our ethics and values as we pursue our ambitions.' },
    { title: 'Innovation', desc: 'We think big and different. We are not held back by limits, we\'re fuelled by creativity. Our legacy of innovation is born of challenging convention.' },
    { title: 'Optimism', desc: 'Entrepreneurship demands optimism. That\'s why the glass is always half full for us. Our unbridled energy and positivity is the foundation of our enterprise.' }
  ];

  const stats = [
    { value: '1931', label: 'Founded' },
    { value: '42,000+', label: 'Employees' },
    { value: '22', label: 'Global Patents' },
    { value: '6x', label: 'Around Earth with our Fabric' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#064770]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-1 bg-[#da1f26]" />
            <span className="font-source text-sm uppercase tracking-wider text-white/80">About Us</span>
          </div>
          <h1 className="font-redhat font-bold text-4xl md:text-5xl text-white mb-4">Arvind.</h1>
          <h2 className="font-garamond text-2xl md:text-3xl text-white/90 italic">We are one. Yet, we are many.</h2>
        </div>
      </section>

      {/* Orange Accent Divider */}
      <div className="w-full h-1 bg-[#da1f26]" />

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left - Orange Line */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="w-1 h-full bg-[#da1f26]" />
            </div>

            {/* Content */}
            <div className="lg:col-span-11">
              <p className="font-source text-lg text-[#2c2c2c] leading-relaxed mb-8">
                We are a fashion powerhouse that is also building new age homes; We are a global leader in apparel manufacturing that is also transforming water management; A denim pioneer that is a trailblazer in advanced materials; A wearable technology manufacturer that is also delivering state-of-the-art engineering solutions.
              </p>
              <p className="font-source text-base text-[#2c2c2c]/80 leading-relaxed mb-8">
                That's where textile to retail conglomerate with focus on textiles, apparels, advanced materials, environmental solutions, telecom and Omni-channel commerce stands today. Where we aren't just driven by bottom lines and profits, but able and willing to drive social impact.
              </p>
              <p className="font-source text-base text-[#2c2c2c]/80 leading-relaxed">
                Today, the fabric made by Arvind can go around the earth 6 times over. 2 pieces of apparel are sold by an Arvind managed brand, every second in India. 42,000 employees across verticals believe that at Arvind, the possibilities are endless. It just depends on how you fashion them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats with Orange Accent */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <h2 className="font-redhat font-bold text-2xl text-[#064770]">The Arvind Story</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 border-t-4 border-[#da1f26] bg-white">
                <span className="font-redhat font-bold text-3xl text-[#064770] block mb-2">{stat.value}</span>
                <span className="font-source text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values with Orange Accents */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <h2 className="font-redhat font-bold text-2xl text-[#064770]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-1 h-full bg-[#da1f26]" />
                </div>
                <div>
                  <h3 className="font-redhat font-bold text-lg text-[#2c2c2c] mb-2">{value.title}</h3>
                  <p className="font-source text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Orange Accent */}
      <section className="py-16 bg-[#064770]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-[#da1f26] mx-auto mb-8" />
          <h2 className="font-garamond text-3xl text-white mb-4 italic">Fashioning Possibilities</h2>
          <p className="font-source text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            It is this philosophy that has helped us touch people's lives through innovative and pioneering solutions since 1931.
          </p>
          <Link to="/contact" className="inline-block bg-[#da1f26] text-white px-10 py-4 text-xs font-bold font-source uppercase tracking-[0.2em] hover:bg-white hover:text-[#da1f26] transition-all">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

// --- BUSINESSES PAGE ---
const BusinessesPage = () => {
  const businesses = [
    { name: 'Textiles & Apparel', desc: 'From premium denims to luxury fabrics, we craft textiles that define global standards.', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800' },
    { name: 'Advanced Materials', desc: 'Pioneering technical textiles for automotive, defense, and industrial applications.', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800' },
    { name: 'Brands & Retail', desc: 'Building iconic fashion brands that resonate with millions of consumers.', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800' },
    { name: 'Real Estate', desc: 'Developing sustainable urban spaces that enhance quality of life.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#064770]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-1 bg-[#da1f26]" />
            <span className="font-source text-sm uppercase tracking-wider text-white/80">Our Ventures</span>
          </div>
          <h1 className="font-redhat font-bold text-4xl md:text-5xl text-white mb-4">Our Businesses</h1>
          <p className="font-garamond text-xl text-white/90 italic">Diverse Ventures, Unified Vision</p>
        </div>
      </section>

      {/* Orange Accent Divider */}
      <div className="w-full h-1 bg-[#da1f26]" />

      {/* Business Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <h2 className="font-redhat font-bold text-2xl text-[#064770]">Our Business Segments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businesses.map((biz, idx) => (
              <div key={idx} className="group relative overflow-hidden cursor-pointer h-[320px]">
                <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-10 h-1 mb-3 bg-[#da1f26]" />
                  <h3 className="font-redhat font-bold text-xl text-white mb-2">{biz.name}</h3>
                  <p className="font-source text-white/80 text-sm mb-3">{biz.desc}</p>
                  <span className="inline-flex items-center text-white font-source text-xs uppercase tracking-wider hover:text-[#da1f26] transition-colors">
                    Learn More <ArrowRight size={14} className="ml-2" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#064770]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-[#da1f26] mx-auto mb-8" />
          <h2 className="font-garamond text-3xl text-white mb-4 italic">Partner With Excellence</h2>
          <p className="font-source text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join our ecosystem of innovation and become part of a legacy that spans generations.
          </p>
          <Link to="/contact" className="inline-block bg-[#da1f26] text-white px-10 py-4 text-xs font-bold font-source uppercase tracking-[0.2em] hover:bg-white hover:text-[#da1f26] transition-all">
            Become a Partner
          </Link>
        </div>
      </section>
    </div>
  );
};

// --- SUSTAINABILITY PAGE ---
const SustainabilityPage = () => {
  const stats = [
    { value: '50M+', label: 'Litres Water Saved' },
    { value: '30%', label: 'Carbon Reduction' },
    { value: '60%', label: 'Renewable Energy' },
    { value: '100K+', label: 'People Impacted' }
  ];

  const initiatives = [
    { icon: <Leaf size={32} />, title: 'Circular Economy', desc: 'Closing the loop on textile waste through innovative recycling.' },
    { icon: <Globe size={32} />, title: 'Water Conservation', desc: 'Advanced water treatment reducing consumption by 50%.' },
    { icon: <Star size={32} />, title: 'Renewable Energy', desc: 'Transitioning to 100% renewable energy.' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#47b74e]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-1 bg-[#da1f26]" />
            <span className="font-source text-sm uppercase tracking-wider text-white/80">Our Commitment</span>
          </div>
          <h1 className="font-redhat font-bold text-4xl md:text-5xl text-white mb-4">Sustainability</h1>
          <p className="font-garamond text-xl text-white/90 italic">Building a greener future, one thread at a time</p>
        </div>
      </section>

      {/* Orange Accent Divider */}
      <div className="w-full h-1 bg-[#da1f26]" />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <h2 className="font-redhat font-bold text-2xl text-[#064770]">Our Impact</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 border-t-4 border-[#da1f26] bg-[#FDFBF7]">
                <span className="font-redhat font-bold text-3xl text-[#47b74e] block mb-2">{stat.value}</span>
                <span className="font-source text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-1 hidden lg:block">
              <div className="w-1 h-full bg-[#da1f26]" />
            </div>
            <div className="lg:col-span-11">
              <p className="font-source text-lg text-[#2c2c2c] leading-relaxed mb-6">
                Materiality is the compass by which we navigate our journey towards sustainability. It serves as the convergence point for the concerns and insights of both internal and external stakeholders.
              </p>
              <p className="font-source text-base text-[#2c2c2c]/80 leading-relaxed">
                Having successfully implemented Zero Liquid Discharge and utilizing solely recycled water in our manufacturing processes, the next significant area where water has a substantial impact is in our fibre sourcing operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <h2 className="font-redhat font-bold text-2xl text-[#064770]">Our Initiatives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initiatives.map((init, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-1 h-full bg-[#da1f26]" />
                </div>
                <div>
                  <div className="w-12 h-12 mb-3 bg-[#47b74e]/10 rounded-lg flex items-center justify-center text-[#47b74e]">
                    {init.icon}
                  </div>
                  <h3 className="font-redhat font-bold text-lg text-[#2c2c2c] mb-2">{init.title}</h3>
                  <p className="font-source text-sm text-gray-600">{init.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#064770]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-[#da1f26] mx-auto mb-8" />
          <h2 className="font-garamond text-3xl text-white mb-4 italic">Committed to Sustainability</h2>
          <p className="font-source text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Learn more about our ESG initiatives and performance.
          </p>
          <Link to="/contact" className="inline-block bg-[#da1f26] text-white px-10 py-4 text-xs font-bold font-source uppercase tracking-[0.2em] hover:bg-white hover:text-[#da1f26] transition-all">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

// --- INNOVATION PAGE ---
const InnovationPage = () => {
  const focusAreas = [
    { icon: <PenTool size={28} />, title: 'Smart Textiles', desc: 'Fabrics embedded with sensors and conductive fibers.' },
    { icon: <Globe size={28} />, title: 'Advanced Materials', desc: 'High-performance materials for aerospace and defense.' },
    { icon: <Star size={28} />, title: 'Digital Solutions', desc: 'AI-powered design and supply chain optimization.' },
    { icon: <Leaf size={28} />, title: 'Sustainable Tech', desc: 'Bio-based materials and zero-waste manufacturing.' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#1071b9]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-1 bg-[#da1f26]" />
            <span className="font-source text-sm uppercase tracking-wider text-white/80">R&D Excellence</span>
          </div>
          <h1 className="font-redhat font-bold text-4xl md:text-5xl text-white mb-4">Innovation</h1>
          <p className="font-garamond text-xl text-white/90 italic">Pushing boundaries of textile technology</p>
        </div>
      </section>

      {/* Orange Accent Divider */}
      <div className="w-full h-1 bg-[#da1f26]" />

      {/* Focus Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <h2 className="font-redhat font-bold text-2xl text-[#064770]">Future Focus Areas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-1 h-full bg-[#da1f26]" />
                </div>
                <div>
                  <div className="w-10 h-10 mb-3 bg-[#1071b9]/10 rounded-lg flex items-center justify-center text-[#1071b9]">
                    {area.icon}
                  </div>
                  <h3 className="font-redhat font-bold text-base text-[#2c2c2c] mb-2">{area.title}</h3>
                  <p className="font-source text-gray-600 text-sm">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#064770]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-[#da1f26] mx-auto mb-8" />
          <h2 className="font-garamond text-3xl text-white mb-4 italic">Join Our Innovation Labs</h2>
          <p className="font-source text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Collaborate with our world-class researchers and shape the future of textiles.
          </p>
          <Link to="/contact" className="inline-block bg-[#da1f26] text-white px-10 py-4 text-xs font-bold font-source uppercase tracking-[0.2em] hover:bg-white hover:text-[#da1f26] transition-all">
            Explore Partnerships
          </Link>
        </div>
      </section>
    </div>
  );
};

// --- CAREERS PAGE ---
const CareersPage = () => {
  const whyArvind = [
    { icon: <Star size={28} />, title: 'Growth Culture', desc: 'Continuous learning opportunities.' },
    { icon: <Globe size={28} />, title: 'Global Exposure', desc: 'Work with international teams.' },
    { icon: <Leaf size={28} />, title: 'Sustainability Focus', desc: 'Meaningful work that matters.' },
    { icon: <Heart size={28} />, title: 'Work-Life Balance', desc: 'Flexible policies for you.' }
  ];

  const openings = [
    { title: 'Senior Textile Engineer', dept: 'Manufacturing', location: 'Ahmedabad', type: 'Full-time' },
    { title: 'Sustainability Manager', dept: 'ESG', location: 'Mumbai', type: 'Full-time' },
    { title: 'Digital Marketing Lead', dept: 'Brands', location: 'Delhi', type: 'Full-time' },
    { title: 'R&D Scientist', dept: 'Innovation', location: 'Bangalore', type: 'Full-time' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#9f1b3c]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-1 bg-[#da1f26]" />
            <span className="font-source text-sm uppercase tracking-wider text-white/80">Join Us</span>
          </div>
          <h1 className="font-redhat font-bold text-4xl md:text-5xl text-white mb-4">Careers</h1>
          <p className="font-garamond text-xl text-white/90 italic">Life Beyond Toplines and Bottomlines</p>
        </div>
      </section>

      {/* Orange Accent Divider */}
      <div className="w-full h-1 bg-[#da1f26]" />

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-1 hidden lg:block">
              <div className="w-1 h-full bg-[#da1f26]" />
            </div>
            <div className="lg:col-span-11">
              <p className="font-source text-lg text-[#2c2c2c] leading-relaxed mb-6">
                At Arvind, people come to work with the knowledge that what they're doing is not just creating ripples, but waves of impact across the country.
              </p>
              <p className="font-source text-base text-[#2c2c2c]/80 leading-relaxed">
                When you become a part of Arvind, you open yourself to opportunities of innovating, experimenting, and even empowering and touching lives of thousands of people. And all of these possibilities are fashioned by staying true to our core values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Arvind */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <h2 className="font-redhat font-bold text-2xl text-[#064770]">Why Work With Us</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyArvind.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-1 h-full bg-[#da1f26]" />
                </div>
                <div>
                  <div className="w-10 h-10 mb-3 bg-[#9f1b3c]/10 rounded-lg flex items-center justify-center text-[#9f1b3c]">
                    {item.icon}
                  </div>
                  <h3 className="font-redhat font-bold text-base text-[#2c2c2c] mb-1">{item.title}</h3>
                  <p className="font-source text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 bg-[#da1f26]" />
            <h2 className="font-redhat font-bold text-2xl text-[#064770]">Open Positions</h2>
          </div>
          <div className="space-y-4">
            {openings.map((job, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-[#FDFBF7] border-l-4 border-[#da1f26] hover:bg-gray-100 transition-all cursor-pointer">
                <div>
                  <h3 className="font-redhat font-bold text-base text-[#2c2c2c]">{job.title}</h3>
                  <p className="font-source text-gray-600 text-sm">{job.dept} • {job.location} • {job.type}</p>
                </div>
                <ArrowRight size={18} className="text-[#da1f26] mt-3 md:mt-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#064770]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-[#da1f26] mx-auto mb-8" />
          <h2 className="font-garamond text-3xl text-white mb-4 italic">Pick Your Fit</h2>
          <p className="font-source text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            If you are interested in a career with Arvind, send your resume to jobs@arvind.in
          </p>
          <Link to="/contact" className="inline-block bg-[#da1f26] text-white px-10 py-4 text-xs font-bold font-source uppercase tracking-[0.2em] hover:bg-white hover:text-[#da1f26] transition-all">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

// --- SHOP PAGE ---
const ShopPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['category']);

  const allProducts = [
    { id: 1, name: 'Ice Cream Bedsheet', price: '₹3,399', collection: 'Little Brats', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800', category: 'bedding', subcategory: 'bedsheets' },
    { id: 2, name: 'Around The World Bedsheet', price: '₹1,499', collection: 'Little Brats', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', category: 'bedding', subcategory: 'bedsheets' },
    { id: 3, name: 'Velvet Morning Bedsheet', price: '₹3,399', collection: 'Virasat', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', category: 'bedding', subcategory: 'comforters' },
    { id: 4, name: 'Luxury Bath Towel Set', price: '₹1,999', collection: 'Essentials', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800', category: 'bath', subcategory: 'towels' },
    { id: 5, name: 'Handwoven Suzani Cushion', price: '₹2,499', collection: 'Heritage', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', category: 'cushions', subcategory: 'covers' },
    { id: 6, name: 'Silk Table Runner', price: '₹1,799', collection: 'Premium', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', category: 'table-linen', subcategory: 'runners' },
    { id: 7, name: 'Decorative Ceramic Vase', price: '₹899', collection: 'Artisan', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', category: 'decor', subcategory: 'vases' },
    { id: 8, name: 'Queen Size Duvet Cover', price: '₹3,499', collection: 'Virasat', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800', category: 'bedding', subcategory: 'duvets' }
  ];

  const categoryFilters = [
    { name: 'Bedding', slug: 'bedding', children: ['Bedsheets', 'Comforters', 'Duvets', 'Pillow Covers'] },
    { name: 'Cushions', slug: 'cushions', children: ['Covers', 'Fillers', 'Sets'] },
    { name: 'Curtains', slug: 'curtains', children: ['Blackout', 'Sheer', 'Printed'] },
    { name: 'Bath', slug: 'bath', children: ['Towels', 'Robes', 'Mats'] },
    { name: 'Table Linen', slug: 'table-linen', children: ['Runners', 'Napkins', 'Placemats'] },
    { name: 'Decor', slug: 'decor', children: ['Vases', 'Frames', 'Accents'] }
  ];

  const filterSections = [
    { key: 'category', label: 'Category' },
    { key: 'discount', label: 'Discount' },
    { key: 'size', label: 'Size' },
    { key: 'collection', label: 'Collection' },
    { key: 'price', label: 'Price' },
    { key: 'fabricType', label: 'Fabric Type' },
    { key: 'color', label: 'Color' }
  ];

  const toggleFilter = (key: string) => {
    setExpandedFilters(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const filteredProducts = category && category !== 'all'
    ? allProducts.filter(p => p.category === category)
    : allProducts;

  const currentCategory = categoryFilters.find(c => c.slug === category);
  const displayTitle = currentCategory?.name || 'ALL';

  return (
    <div className="w-full bg-[#f8f6f3] min-h-screen pt-32">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <p className="font-source text-xs text-gray-500">
            <Link to="/" className="hover:text-[#da1f26]">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-[#da1f26]">Shop</Link>
            {category && <><span className="mx-2">/</span><span className="text-[#da1f26]">{displayTitle}</span></>}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sticky Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="font-redhat font-bold text-lg text-[#2c2c2c] mb-6">Shop By</h2>

              {filterSections.map((section) => (
                <div key={section.key} className="border-b border-gray-200 py-4">
                  <button
                    onClick={() => toggleFilter(section.key)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="font-source text-sm text-[#2c2c2c]">{section.label}</span>
                    <span className="text-gray-400">{expandedFilters.includes(section.key) ? '−' : '+'}</span>
                  </button>

                  {expandedFilters.includes(section.key) && section.key === 'category' && (
                    <div className="mt-3 space-y-2">
                      <Link
                        to="/shop"
                        className={`block text-sm font-source py-1 ${!category ? 'text-[#da1f26] font-semibold' : 'text-gray-600 hover:text-[#da1f26]'}`}
                      >
                        All Products
                      </Link>
                      {categoryFilters.map((cat) => (
                        <div key={cat.slug}>
                          <Link
                            to={`/shop/${cat.slug}`}
                            className={`block text-sm font-source py-1 ${category === cat.slug ? 'text-[#da1f26] font-semibold' : 'text-gray-600 hover:text-[#da1f26]'}`}
                          >
                            {cat.name}
                          </Link>
                          {category === cat.slug && (
                            <div className="ml-4 mt-1 space-y-1">
                              {cat.children.map((child, idx) => (
                                <button
                                  key={idx}
                                  className="block text-xs font-source text-gray-500 hover:text-[#da1f26] py-0.5"
                                >
                                  {child}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {expandedFilters.includes(section.key) && section.key === 'collection' && (
                    <div className="mt-3 space-y-2">
                      {['Little Brats', 'Virasat', 'Heritage', 'Essentials', 'Premium', 'Artisan'].map((col) => (
                        <label key={col} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-[#da1f26]" />
                          <span className="text-sm font-source text-gray-600">{col}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {expandedFilters.includes(section.key) && section.key === 'size' && (
                    <div className="mt-3 space-y-2">
                      {['Single', 'Double', 'King', 'Queen'].map((size) => (
                        <label key={size} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-[#da1f26]" />
                          <span className="text-sm font-source text-gray-600">{size}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {expandedFilters.includes(section.key) && section.key === 'price' && (
                    <div className="mt-3 space-y-2">
                      {['Under ₹1,000', '₹1,000 - ₹2,500', '₹2,500 - ₹5,000', 'Above ₹5,000'].map((range) => (
                        <label key={range} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-[#da1f26]" />
                          <span className="text-sm font-source text-gray-600">{range}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {expandedFilters.includes(section.key) && section.key === 'color' && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['#fff', '#000', '#9f1b3c', '#064770', '#47b74e', '#f5d742'].map((color) => (
                        <button key={color} className="w-6 h-6 border border-gray-300 hover:ring-2 ring-offset-1 ring-[#da1f26]" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-baseline gap-3">
                <h1 className="font-redhat font-bold text-2xl md:text-3xl text-[#2c2c2c] uppercase">{displayTitle}</h1>
                <span className="font-source text-sm text-gray-500">{filteredProducts.length} Items</span>
              </div>
              <select className="px-4 py-2 border border-gray-300 font-source text-sm bg-white focus:outline-none focus:border-[#da1f26]">
                <option>Sort By</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer bg-white"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative aspect-square overflow-hidden bg-[#f8f6f3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-source text-sm text-[#2c2c2c] mb-1 group-hover:text-[#da1f26] transition-colors">
                          {product.name}
                        </h3>
                        <p className="font-source text-xs text-gray-400 uppercase">{product.collection}</p>
                      </div>
                      <p className="font-redhat font-bold text-base text-[#2c2c2c] whitespace-nowrap">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// --- CONTACT PAGE ---
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Thank you! We'll get back to you soon.");
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const offices = [
    { name: 'Corporate Office', address: 'Naroda Road, Ahmedabad 380025, Gujarat', phone: '+91 79 6826 8000', email: 'info@arvind.com' },
    { name: 'Delhi Office', address: 'Connaught Place, New Delhi 110001', phone: '+91 11 2345 6789', email: 'delhi@arvind.com' },
    { name: 'Mumbai Office', address: 'Bandra Kurla Complex, Mumbai 400051', phone: '+91 22 2345 6789', email: 'mumbai@arvind.com' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#064770]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-1 bg-[#da1f26]" />
            <span className="font-source text-sm uppercase tracking-wider text-white/80">Reach Out</span>
          </div>
          <h1 className="font-redhat font-bold text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p className="font-garamond text-xl text-white/90 italic">We'd love to hear from you</p>
        </div>
      </section>

      {/* Orange Accent Divider */}
      <div className="w-full h-1 bg-[#da1f26]" />

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-1 bg-[#da1f26]" />
                <h2 className="font-redhat font-bold text-2xl text-[#064770]">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-4 border border-gray-300 focus:border-[#da1f26] focus:outline-none font-source" required />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-4 border border-gray-300 focus:border-[#da1f26] focus:outline-none font-source" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-4 border border-gray-300 focus:border-[#da1f26] focus:outline-none font-source" />
                  <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-4 border border-gray-300 focus:border-[#da1f26] focus:outline-none font-source" required>
                    <option value="">Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="business">Business Partnership</option>
                    <option value="careers">Careers</option>
                    <option value="media">Media</option>
                  </select>
                </div>
                <textarea placeholder="Your Message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={5} className="w-full px-4 py-4 border border-gray-300 focus:border-[#da1f26] focus:outline-none font-source resize-none" required />
                <button type="submit" className="bg-[#da1f26] text-white px-10 py-4 text-xs font-bold font-source uppercase tracking-[0.2em] hover:bg-[#064770] transition-all">
                  Submit Message
                </button>
              </form>
            </div>

            {/* Offices */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-1 bg-[#da1f26]" />
                <h2 className="font-redhat font-bold text-2xl text-[#064770]">Our Offices</h2>
              </div>
              <div className="space-y-5">
                {offices.map((office, idx) => (
                  <div key={idx} className="p-5 bg-[#FDFBF7] border-l-4 border-[#da1f26]">
                    <h3 className="font-redhat font-bold text-base text-[#2c2c2c] mb-3">{office.name}</h3>
                    <div className="space-y-2 font-source text-gray-600 text-sm">
                      <p className="flex items-start gap-3"><MapPin size={16} className="text-[#da1f26] mt-0.5" /> {office.address}</p>
                      <p className="flex items-center gap-3"><Phone size={16} className="text-[#da1f26]" /> {office.phone}</p>
                      <p className="flex items-center gap-3"><Mail size={16} className="text-[#da1f26]" /> {office.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#9f1b3c] text-white pt-24 pb-12 w-full">
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
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/businesses" className="hover:text-white transition-colors">Businesses</Link></li>
              <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link to="/innovation" className="hover:text-white transition-colors">Innovation</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
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
  return (
    <ErrorBoundary>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
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
                <Routes>
                  <Route path="/" element={
                    <>
                      <Hero />
                      <div className="bg-white/90 backdrop-blur-sm">
                        <Collections />
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm">
                        <FeaturedCollection />
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm">
                        <OurStores />
                      </div>
                    </>
                  } />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/shop/:category" element={<ShopPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/businesses" element={<BusinessesPage />} />
                  <Route path="/sustainability" element={<SustainabilityPage />} />
                  <Route path="/innovation" element={<InnovationPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
              </main>
              <Footer />
              <CartDrawer />
            </div>
          </BrowserRouter>
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
