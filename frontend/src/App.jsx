import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function readStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api' });
api.interceptors.request.use(config => {
  const session = readStored('session', null);
  if (session?.token) config.headers.Authorization = 'Bearer ' + session.token;
  return config;
});

const text = {
  mr: {
    brand: 'शेतमाल बाजार',
    marketplace: 'बाजारपेठ',
    prices: 'बाजारभाव',
    login: 'लॉग इन',
    direct: 'थेट शेतातून',
    heroOne: 'चांगले पीक.',
    heroTwo: 'चांगली बाजारपेठ.',
    heroDescription: 'विश्वासार्ह स्थानिक शेतकऱ्यांकडून ताजा, दर्जेदार शेतमाल थेट खरेदी करा.',
    explore: 'बाजारपेठ पहा →',
    why: 'फार्म2मार्केट का?',
    support: 'शेतकऱ्यांना पाठिंबा',
    supportDescription: 'योग्य भाव आणि थेट संपर्क.',
    fresh: 'ताजा शेतमाल',
    freshDescription: 'तुमचे अन्न कुठून येते ते जाणून घ्या.',
    trade: 'सोपे व्यवहार',
    tradeDescription: 'शेतमाल शोधा, ऑर्डर करा आणि मागोवा घ्या.',
    footer: 'शेतातून ताजा • शेतकऱ्यांसाठी योग्य भाव • समुदायासाठी',
    listings: 'ताज्या नोंदी',
    discover: 'तुमच्या जवळच्या शेतकऱ्यांचा शेतमाल पहा.',
    search: 'भाज्या, फळे शोधा...',
    allCategories: 'सर्व प्रकार',
    vegetables: 'भाज्या',
    fruits: 'फळे',
    flowers: 'फुले',
    available: 'उपलब्ध',
    grade: 'प्रत',
    addCart: 'कार्टमध्ये जोडा',
    cart: 'कार्ट',
    remove: 'काढा',
    emptyCart: 'तुमचे कार्ट रिकामे आहे.',
    cartSummary: 'कार्टचा तपशील',
    itemCount: 'वस्तू',
    proceedCheckout: 'चेकआउट करा',
    checkout: 'चेकआउट',
    deliveryLocation: 'वितरणाचा पत्ता',
    addressPlaceholder: 'पूर्ण वितरणाचा पत्ता लिहा',
    placeOrder: 'ऑर्डर नोंदवा',
    placingOrder: 'ऑर्डर नोंदवत आहोत...',
    orderSuccess: 'तुमची ऑर्डर नोंदवली आहे.',
    orderError: 'ऑर्डर नोंदवता आली नाही. कृपया पुन्हा प्रयत्न करा.',
    partialOrder: 'काही ऑर्डर्स नोंदवल्या; उरलेल्या ऑर्डर्स कार्टमध्ये आहेत.',
    demoOrderError: 'हे नमुना शेतमाल आहे. खरेदीसाठी शेतकऱ्याने नोंदवलेला शेतमाल निवडा.',
    loginRequired: 'चेकआउटसाठी आधी खरेदीदार म्हणून लॉग इन करा.',
    signOut: 'लॉग आउट',
    dashboard: 'माझे खाते',
    orderTotal: 'ऑर्डरची एकूण रक्कम',
    deliveryNote: 'या आवृत्तीत ऑनलाइन पेमेंट घेतले जात नाही.',
    increaseQuantity: 'संख्या वाढवा',
    decreaseQuantity: 'संख्या कमी करा',
    noResults: 'या शोधासाठी शेतमाल सापडला नाही.',
    welcome: 'पुन्हा स्वागत आहे',
    signIn: 'खात्यात प्रवेश करा',
    signInDescription: 'बाजारपेठेतील तुमचे व्यवहार पाहण्यासाठी खात्यात प्रवेश करा.',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signInButton: 'प्रवेश करा',
    newHere: 'नवीन आहात?',
    createAccount: 'खाते तयार करा',
    join: 'बाजारपेठेत सहभागी व्हा',
    name: 'नाव',
    accountType: 'खात्याचा प्रकार',
    buyer: 'खरेदीदार',
    farmer: 'शेतकरी',
    register: 'नोंदणी करा',
    alreadyRegistered: 'आधीच नोंदणी केली आहे?',
    registerError: 'नोंदणी करता आली नाही. पुन्हा प्रयत्न करा.',
    loginError: 'प्रवेश करता आला नाही. API किंवा लॉग इन तपशील तपासा.',
    yourSpace: 'तुमचे खाते',
    hello: 'नमस्कार',
    activeListings: 'सक्रिय नोंदी',
    thisMonth: 'या महिन्यात',
    orders: 'ऑर्डर्स',
    continueShopping: 'खरेदी सुरू ठेवा',
    marketWatch: 'बाजारभाव पाहा',
    todaysPrices: 'आजचे बाजारभाव',
    localAverage: 'स्थानिक बाजारातील सरासरी',
    language: 'भाषा बदला',
    switchToEnglish: 'English'
  },
  en: {
    brand: 'Farm2Market',
    marketplace: 'Marketplace',
    prices: 'Market Prices',
    login: 'Login',
    direct: 'DIRECT FROM THE FARM',
    heroOne: 'Better harvests.',
    heroTwo: 'Better markets.',
    heroDescription: 'Buy fresh, quality produce directly from trusted local farmers.',
    explore: 'Explore marketplace →',
    why: 'Why Farm2Market?',
    support: 'Support farmers',
    supportDescription: 'Fair prices and direct connections.',
    fresh: 'Fresh produce',
    freshDescription: 'Know where your food comes from.',
    trade: 'Simple trade',
    tradeDescription: 'Browse, order and track with ease.',
    footer: 'Fresh from farms • Fair for farmers • Built for communities',
    listings: 'FRESH LISTINGS',
    discover: 'Discover produce from farmers near you.',
    search: 'Search vegetables, fruits...',
    allCategories: 'All categories',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    flowers: 'Flowers',
    available: 'Available',
    grade: 'Grade',
    addCart: 'Add to cart',
    cart: 'Cart',
    remove: 'Remove',
    emptyCart: 'Your cart is empty.',
    cartSummary: 'Cart summary',
    itemCount: 'items',
    proceedCheckout: 'Proceed to checkout',
    checkout: 'Checkout',
    deliveryLocation: 'Delivery address',
    addressPlaceholder: 'Enter your full delivery address',
    placeOrder: 'Place order',
    placingOrder: 'Placing order...',
    orderSuccess: 'Your order has been placed.',
    orderError: 'Could not place the order. Please try again.',
    partialOrder: 'Some orders were placed; the remaining items are still in your cart.',
    demoOrderError: 'These are sample listings. Select produce listed by a farmer to place an order.',
    loginRequired: 'Please log in as a buyer before checkout.',
    signOut: 'Log out',
    dashboard: 'My account',
    orderTotal: 'Order total',
    deliveryNote: 'Online payment is not collected in this version.',
    increaseQuantity: 'Increase quantity',
    decreaseQuantity: 'Decrease quantity',
    noResults: 'No produce found for this search.',
    welcome: 'WELCOME BACK',
    signIn: 'Sign in',
    signInDescription: 'Sign in to your account to manage your marketplace activity.',
    email: 'Email',
    password: 'Password',
    signInButton: 'Sign in',
    newHere: 'New here?',
    createAccount: 'Create an account',
    join: 'JOIN THE MARKET',
    name: 'Name',
    accountType: 'Account type',
    buyer: 'Buyer',
    farmer: 'Farmer',
    register: 'Register',
    alreadyRegistered: 'Already registered?',
    registerError: 'Unable to register. Please try again.',
    loginError: 'Unable to sign in. Check the API or credentials.',
    yourSpace: 'YOUR SPACE',
    hello: 'Hello',
    activeListings: 'Active listings',
    thisMonth: 'This month',
    orders: 'Orders',
    continueShopping: 'Continue shopping',
    marketWatch: 'MARKET WATCH',
    todaysPrices: "Today's market prices",
    localAverage: 'Local market average',
    language: 'Change language',
    switchToEnglish: 'मराठी'
  }
};

const demo = [
  ['टोमॅटो', 'VEGETABLE', '₹30/kg', '500 kg', 'सासवड, पुणे'],
  ['कांदा', 'VEGETABLE', '₹28/kg', '800 kg', 'नारायणगाव, पुणे'],
  ['अंजीर', 'FRUIT', '₹180/kg', '200 kg', 'पुरंदर, पुणे'],
  ['आंबा', 'FRUIT', '₹120/kg', '250 kg', 'रत्नागिरी'],
  ['झेंडू', 'FLOWER', '₹90/kg', '150 kg', 'पुणे']
];

const t = (lang, key) => text[lang][key];
const categoryText = (lang, category) => ({
  VEGETABLE: t(lang, 'vegetables'),
  FRUIT: t(lang, 'fruits'),
  FLOWER: t(lang, 'flowers')
}[category] || category);

function Nav({ lang, onToggle, session, cartCount, onLogout }) {
  return <header>
    <Link className="brand" to="/">🌱 {t(lang, 'brand')}</Link>
    <nav>
      <Link to="/marketplace">{t(lang, 'marketplace')}</Link>
      <Link to="/prices">{t(lang, 'prices')}</Link>
      {session
        ? <><Link to="/dashboard">{t(lang, 'dashboard')}</Link><button className="nav-action" type="button" onClick={onLogout}>{t(lang, 'signOut')}</button></>
        : <Link to="/login">{t(lang, 'login')}</Link>}
      <Link className="cart-link" to="/cart">{t(lang, 'cart')} <span className="cart-count">{cartCount}</span></Link>
      <button className="language-toggle" type="button" onClick={onToggle} aria-label={t(lang, 'language')}>{t(lang, 'switchToEnglish')}</button>
    </nav>
  </header>;
}

function Layout({ children, lang, onToggle, session, cartCount, onLogout }) {
  return <>
    <Nav lang={lang} onToggle={onToggle} session={session} cartCount={cartCount} onLogout={onLogout} />
    <main>{children}</main>
    <footer>{t(lang, 'footer')}</footer>
  </>;
}

function Home({ lang }) {
  return <>
    <section className="hero">
      <div>
        <span className="eyebrow">{t(lang, 'direct')}</span>
        <h1>{t(lang, 'heroOne')}<br /><em>{t(lang, 'heroTwo')}</em></h1>
        <p>{t(lang, 'heroDescription')}</p>
        <Link className="button" to="/marketplace">{t(lang, 'explore')}</Link>
      </div>
      <div className="hero-art" aria-hidden="true">🥕<br />🍅 🌽 🍌</div>
    </section>
    <section className="section">
      <h2>{t(lang, 'why')}</h2>
      <div className="features">
        <article>🚜<h3>{t(lang, 'support')}</h3><p>{t(lang, 'supportDescription')}</p></article>
        <article>🥬<h3>{t(lang, 'fresh')}</h3><p>{t(lang, 'freshDescription')}</p></article>
        <article>🤝<h3>{t(lang, 'trade')}</h3><p>{t(lang, 'tradeDescription')}</p></article>
      </div>
    </section>
  </>;
}

function Marketplace({ lang, onAddToCart }) {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('ALL');

  useEffect(() => {
    api.get('/products').then(r => setItems(r.data.data)).catch(() => setItems([]));
  }, []);

  const listings = items.length ? items : demo.map((d, i) => ({
    id: i + 1,
    name: lang === 'mr' ? d[0] : ['Tomato', 'Onion', 'Fig / Anjeer', 'Mango', 'Marigold'][i],
    category: d[1],
    pricePerKg: Number(d[2].replace(/[^0-9]/g, '')),
    availableQuantity: d[3],
    location: lang === 'mr' ? d[4] : ['Saswad, Pune', 'Narayangaon, Pune', 'Purandar, Pune', 'Ratnagiri', 'Pune'][i],
    qualityGrade: 'A',
    demoItem: true
  }));

  const visible = listings.filter(item =>
    item.name.toLowerCase().includes(q.toLowerCase()) &&
    (category === 'ALL' || item.category === category)
  );

  return <>
    <section className="page-head">
      <span className="eyebrow">{t(lang, 'listings')}</span>
      <h1>{t(lang, 'marketplace')}</h1>
      <p>{t(lang, 'discover')}</p>
    </section>
    <div className="toolbar">
      <input aria-label={t(lang, 'search')} placeholder={t(lang, 'search')} value={q} onChange={e => setQ(e.target.value)} />
      <select aria-label={t(lang, 'allCategories')} value={category} onChange={e => setCategory(e.target.value)}>
        <option value="ALL">{t(lang, 'allCategories')}</option>
        <option value="VEGETABLE">{t(lang, 'vegetables')}</option>
        <option value="FRUIT">{t(lang, 'fruits')}</option>
        <option value="FLOWER">{t(lang, 'flowers')}</option>
      </select>
    </div>
    <section className="grid">
      {visible.map(item => <article className="card" key={item.id}>
        <div className="produce">{item.category === 'FRUIT' ? '🍌' : item.category === 'FLOWER' ? '🌼' : '🥬'}</div>
        <span className="tag">{categoryText(lang, item.category)}</span>
        <h3>{item.name}</h3>
        <strong>₹{item.pricePerKg}/kg</strong>
        <p>{t(lang, 'available')}: {item.availableQuantity}</p>
        <small>📍 {item.location} · {t(lang, 'grade')} {item.qualityGrade}</small>
        <button className="button full" type="button" onClick={() => onAddToCart(item)}>{t(lang, 'addCart')}</button>
      </article>)}
      {visible.length === 0 && <p className="empty-state">{t(lang, 'noResults')}</p>}
    </section>
  </>;
}

function Login({ lang, onSessionChange }) {
  const nav = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submit(e) {
    e.preventDefault();
    api.post('/auth/login', { email, password })
      .then(r => {
        localStorage.setItem('session', JSON.stringify(r.data.data));
        onSessionChange(r.data.data);
        nav(location.state?.from || '/dashboard');
      })
      .catch(() => alert(t(lang, 'loginError')));
  }

  return <div className="auth">
    <span className="eyebrow">{t(lang, 'welcome')}</span>
    <h1>{t(lang, 'signIn')}</h1>
    <p>{t(lang, 'signInDescription')}</p>
    <form onSubmit={submit}>
      <label>{t(lang, 'email')}<input type="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>{t(lang, 'password')}<input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button className="button full">{t(lang, 'signInButton')}</button>
    </form>
    <p>{t(lang, 'newHere')} <Link to="/register" state={location.state}>{t(lang, 'createAccount')}</Link></p>
  </div>;
}

function Register({ lang, onSessionChange }) {
  const nav = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'BUYER' });
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    setError('');
    api.post('/auth/register', form)
      .then(r => {
        localStorage.setItem('session', JSON.stringify(r.data.data));
        onSessionChange(r.data.data);
        nav('/dashboard');
      })
      .catch(e => setError(e.response?.data?.message || t(lang, 'registerError')));
  }

  return <div className="auth">
    <span className="eyebrow">{t(lang, 'join')}</span>
    <h1>{t(lang, 'createAccount')}</h1>
    <form onSubmit={submit}>
      <label>{t(lang, 'name')}<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
      <label>{t(lang, 'email')}<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
      <label>{t(lang, 'password')}<input required minLength="6" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label>
      <label>{t(lang, 'accountType')}
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="BUYER">{t(lang, 'buyer')}</option>
          <option value="FARMER">{t(lang, 'farmer')}</option>
        </select>
      </label>
      {error && <p role="alert">{error}</p>}
      <button className="button full">{t(lang, 'register')}</button>
    </form>
    <p>{t(lang, 'alreadyRegistered')} <Link to="/login">{t(lang, 'signIn')}</Link></p>
  </div>;
}


function CartPage({ lang, cart, onQuantityChange, onRemove }) {
  const total = cart.reduce((sum, item) => sum + Number(item.pricePerKg || 0) * Number(item.quantity || 0), 0);
  return <section className="checkout-page">
    <div className="page-head">
      <span className="eyebrow">{t(lang, 'cartSummary')}</span>
      <h1>{t(lang, 'cart')}</h1>
      <p>{cart.length} {t(lang, 'itemCount')}</p>
    </div>
    {cart.length === 0
      ? <div className="checkout-panel empty-cart"><p>{t(lang, 'emptyCart')}</p><Link className="button" to="/marketplace">{t(lang, 'continueShopping')}</Link></div>
      : <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => <article className="cart-item" key={item.id}>
            <div className="produce cart-produce">{item.category === 'FRUIT' ? '🍌' : item.category === 'FLOWER' ? '🌼' : '🥬'}</div>
            <div className="cart-item-info">
              <span className="tag">{categoryText(lang, item.category)}</span>
              <h3>{item.name}</h3>
              <p>₹{item.pricePerKg}/{item.unit || 'kg'}</p>
              <div className="quantity-control">
                <button type="button" aria-label={t(lang, 'decreaseQuantity')} onClick={() => onQuantityChange(item.id, Math.max(1, Number(item.quantity) - 1))}>−</button>
                <span>{item.quantity}</span>
                <button type="button" aria-label={t(lang, 'increaseQuantity')} onClick={() => onQuantityChange(item.id, Number(item.quantity) + 1)}>+</button>
              </div>
            </div>
            <div className="cart-item-end">
              <strong>₹{(Number(item.pricePerKg || 0) * Number(item.quantity || 0)).toLocaleString('en-IN')}</strong>
              <button className="text-button" type="button" onClick={() => onRemove(item.id)}>{t(lang, 'remove')}</button>
            </div>
          </article>)}
        </div>
        <aside className="checkout-panel">
          <h2>{t(lang, 'cartSummary')}</h2>
          <div className="summary-row"><span>{t(lang, 'orderTotal')}</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
          <Link className="button full" to="/checkout">{t(lang, 'proceedCheckout')}</Link>
        </aside>
      </div>}
  </section>;
}

function Checkout({ lang, session, cart, onClearCart, onRemoveItems }) {
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [placing, setPlacing] = useState(false);
  const total = cart.reduce((sum, item) => sum + Number(item.pricePerKg || 0) * Number(item.quantity || 0), 0);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!session || session.role !== 'BUYER') {
      setError(t(lang, 'loginRequired'));
      return;
    }
    if (cart.some(item => item.demoItem)) {
      setError(t(lang, 'demoOrderError'));
      return;
    }

    const groups = new Map();
    cart.forEach(item => {
      const farmerId = item.farmer?.id || item.farmerId || item.id;
      if (!groups.has(farmerId)) groups.set(farmerId, { lines: [], cartIds: [] });
      groups.get(farmerId).lines.push({ productId: item.id, quantity: Number(item.quantity) });
      groups.get(farmerId).cartIds.push(item.id);
    });

    setPlacing(true);
    const completedIds = [];
    let failure = '';
    for (const group of groups.values()) {
      try {
        await api.post('/orders', { deliveryLocation, items: group.lines });
        completedIds.push(...group.cartIds);
      } catch (requestError) {
        failure = requestError.response?.data?.message || t(lang, 'orderError');
        break;
      }
    }
    setPlacing(false);

    if (completedIds.length) onRemoveItems(completedIds);
    if (failure) {
      setError(completedIds.length ? t(lang, 'partialOrder') + ' ' + failure : failure);
      return;
    }
    onClearCart();
    setSuccess(t(lang, 'orderSuccess'));
  }

  if (success) {
    return <div className="checkout-page"><div className="checkout-panel order-success">
      <span className="eyebrow">{t(lang, 'checkout')}</span>
      <h1>{success}</h1>
      <Link className="button" to="/marketplace">{t(lang, 'continueShopping')}</Link>
    </div></div>;
  }

  return <section className="checkout-page">
    <div className="page-head"><span className="eyebrow">{t(lang, 'checkout')}</span><h1>{t(lang, 'checkout')}</h1></div>
    {!session && <div className="checkout-panel"><p>{t(lang, 'loginRequired')}</p><Link className="button" to="/login" state={{ from: '/checkout' }}>{t(lang, 'login')}</Link></div>}
    {session && session.role !== 'BUYER' && <div className="checkout-panel"><p>{t(lang, 'loginRequired')}</p></div>}
    {session?.role === 'BUYER' && cart.length === 0 && <div className="checkout-panel"><p>{t(lang, 'emptyCart')}</p><Link className="button" to="/marketplace">{t(lang, 'continueShopping')}</Link></div>}
    {session?.role === 'BUYER' && cart.length > 0 && <form className="checkout-layout" onSubmit={submit}>
      <div className="checkout-panel">
        <h2>{t(lang, 'deliveryLocation')}</h2>
        <label>{t(lang, 'deliveryLocation')}
          <textarea required rows="4" placeholder={t(lang, 'addressPlaceholder')} value={deliveryLocation} onChange={e => setDeliveryLocation(e.target.value)} />
        </label>
        <p className="checkout-note">{t(lang, 'deliveryNote')}</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button full" type="submit" disabled={placing}>{placing ? t(lang, 'placingOrder') : t(lang, 'placeOrder')}</button>
      </div>
      <aside className="checkout-panel">
        <h2>{t(lang, 'cartSummary')}</h2>
        {cart.map(item => <div className="summary-row" key={item.id}><span>{item.name} × {item.quantity}</span><strong>₹{(Number(item.pricePerKg || 0) * Number(item.quantity || 0)).toLocaleString('en-IN')}</strong></div>)}
        <div className="summary-row summary-total"><span>{t(lang, 'orderTotal')}</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
      </aside>
    </form>}
  </section>;
}

function Dashboard({ lang }) {
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  return <div className="dashboard">
    <span className="eyebrow">{t(lang, 'yourSpace')}</span>
    <h1>{t(lang, 'hello')}, {session.user || (lang === 'mr' ? 'मित्रा' : 'there')} 👋</h1>
    <div className="stats">
      <div><b>12</b><span>{t(lang, 'activeListings')}</span></div>
      <div><b>₹4,280</b><span>{t(lang, 'thisMonth')}</span></div>
      <div><b>6</b><span>{t(lang, 'orders')}</span></div>
    </div>
    <Link className="button" to="/marketplace">{t(lang, 'continueShopping')}</Link>
  </div>;
}

function Prices({ lang }) {
  return <div className="dashboard">
    <span className="eyebrow">{t(lang, 'marketWatch')}</span>
    <h1>{t(lang, 'todaysPrices')}</h1>
    <div className="table">
      {demo.map(d => <div key={d[0]}>
        <b>{lang === 'mr' ? d[0] : ({ 'टोमॅटो': 'Tomato', 'कांदा': 'Onion', 'अंजीर': 'Fig / Anjeer', 'आंबा': 'Mango', 'झेंडू': 'Marigold' }[d[0]])}</b>
        <span>{d[2]}</span>
        <small>{t(lang, 'localAverage')}</small>
      </div>)}
    </div>
  </div>;
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('farm2market-language') || 'mr');
  const [session, setSession] = useState(() => readStored('session', null));
  const [cart, setCart] = useState(() => readStored('farm2market-cart', []));
  const toggleLanguage = () => setLang(current => current === 'mr' ? 'en' : 'mr');

  useEffect(() => {
    localStorage.setItem('farm2market-language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (session) localStorage.setItem('session', JSON.stringify(session));
    else localStorage.removeItem('session');
  }, [session]);

  useEffect(() => {
    localStorage.setItem('farm2market-cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        const stock = Number.parseFloat(product.availableQuantity) || Infinity;
        return current.map(item => item.id === product.id
          ? { ...item, quantity: Math.min(Number(item.quantity) + 1, stock) }
          : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function updateCartQuantity(id, quantity) {
    setCart(current => current.map(item => item.id === id ? { ...item, quantity } : item));
  }

  function removeCartItem(id) {
    setCart(current => current.filter(item => item.id !== id));
  }

  function removeCartItems(ids) {
    const completed = new Set(ids);
    setCart(current => current.filter(item => !completed.has(item.id)));
  }

  function logout() {
    setSession(null);
  }

  const cartCount = cart.reduce((count, item) => count + Number(item.quantity || 0), 0);

  return <BrowserRouter>
    <Layout lang={lang} onToggle={toggleLanguage} session={session} cartCount={cartCount} onLogout={logout}>
      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/marketplace" element={<Marketplace lang={lang} onAddToCart={addToCart} />} />
        <Route path="/login" element={<Login lang={lang} onSessionChange={setSession} />} />
        <Route path="/register" element={<Register lang={lang} onSessionChange={setSession} />} />
        <Route path="/dashboard" element={session ? <Dashboard lang={lang} /> : <Login lang={lang} onSessionChange={setSession} />} />
        <Route path="/cart" element={<CartPage lang={lang} cart={cart} onQuantityChange={updateCartQuantity} onRemove={removeCartItem} />} />
        <Route path="/checkout" element={<Checkout lang={lang} session={session} cart={cart} onClearCart={() => setCart([])} onRemoveItems={removeCartItems} />} />
        <Route path="/prices" element={<Prices lang={lang} />} />
        <Route path="*" element={<Home lang={lang} />} />
      </Routes>
    </Layout>
  </BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<App />);
