import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api' });

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

function Nav({ lang, onToggle }) {
  return <header>
    <Link className="brand" to="/">🌱 {t(lang, 'brand')}</Link>
    <nav>
      <Link to="/marketplace">{t(lang, 'marketplace')}</Link>
      <Link to="/prices">{t(lang, 'prices')}</Link>
      <Link to="/login">{t(lang, 'login')}</Link>
      <button className="language-toggle" type="button" onClick={onToggle} aria-label={t(lang, 'language')}>{t(lang, 'switchToEnglish')}</button>
    </nav>
  </header>;
}

function Layout({ children, lang, onToggle }) {
  return <>
    <Nav lang={lang} onToggle={onToggle} />
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

function Marketplace({ lang }) {
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
    qualityGrade: 'A'
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
        <button className="button full" type="button">{t(lang, 'addCart')}</button>
      </article>)}
      {visible.length === 0 && <p className="empty-state">{t(lang, 'noResults')}</p>}
    </section>
  </>;
}

function Login({ lang }) {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submit(e) {
    e.preventDefault();
    api.post('/auth/login', { email, password })
      .then(r => {
        localStorage.setItem('session', JSON.stringify(r.data.data));
        nav('/dashboard');
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
    <p>{t(lang, 'newHere')} <Link to="/register">{t(lang, 'createAccount')}</Link></p>
  </div>;
}

function Register({ lang }) {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'BUYER' });
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    setError('');
    api.post('/auth/register', form)
      .then(r => {
        localStorage.setItem('session', JSON.stringify(r.data.data));
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
  const toggleLanguage = () => setLang(current => current === 'mr' ? 'en' : 'mr');

  useEffect(() => {
    localStorage.setItem('farm2market-language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return <BrowserRouter>
    <Layout lang={lang} onToggle={toggleLanguage}>
      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/marketplace" element={<Marketplace lang={lang} />} />
        <Route path="/login" element={<Login lang={lang} />} />
        <Route path="/register" element={<Register lang={lang} />} />
        <Route path="/dashboard" element={<Dashboard lang={lang} />} />
        <Route path="/prices" element={<Prices lang={lang} />} />
        <Route path="*" element={<Home lang={lang} />} />
      </Routes>
    </Layout>
  </BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<App />);
