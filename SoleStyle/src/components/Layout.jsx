import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, User, Menu, X, MessageCircle, Send, Search } from 'lucide-react'
import { useStore } from '../store'
import { ProductCard } from './common'
const links=[['Home','/'],['Shop','/shop'],['Men','/shop?cat=Men'],['Women','/shop?cat=Women'],['Kids','/shop?cat=Kids']]
function Chatbot(){const {products}=useStore();const [open,setOpen]=useState(false);const [text,setText]=useState('')
 const [msgs,setMsgs]=useState([{from:'bot',t:'Hi! I am the SoleStyle demo assistant. Try: "running shoes", "under 5000", "casual for women", "kids".'}])
 const send=q=>{if(!q.trim())return;const l=q.toLowerCase();let r=products
  if(l.includes('run'))r=r.filter(p=>p.type==='Running');if(l.includes('casual'))r=r.filter(p=>p.type==='Casual')
  if(l.includes('women'))r=r.filter(p=>p.category==='Women');else if(l.includes('kid'))r=r.filter(p=>p.category==='Kids');else if(l.includes('men'))r=r.filter(p=>p.category==='Men')
  const m=l.match(/(\d{4,5})/);if(m)r=r.filter(p=>p.price<=+m[1])
  setMsgs(x=>[...x,{from:'me',t:q},{from:'bot',t:r.length?'Here are some picks (demo recommendations):':'No matches, try another request.',items:r.slice(0,2)}]);setText('')}
 return <>{open&&<div className="fixed bottom-24 right-4 w-[92vw] max-w-sm h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
  <div className="bg-ink text-white p-4 rounded-t-2xl flex justify-between"><b>AI Shopping Assistant</b><button onClick={()=>setOpen(false)}><X/></button></div>
  <div className="flex-1 overflow-y-auto p-3 space-y-3">{msgs.map((m,i)=><div key={i} className={m.from==='me'?'text-right':''}><span className={`inline-block px-3 py-2 rounded-xl text-sm ${m.from==='me'?'bg-ink text-white':'bg-cream'}`}>{m.t}</span>{m.items?.map(p=><div key={p.id} className="mt-2 text-left"><ProductCard p={p}/></div>)}</div>)}</div>
  <div className="p-3 flex gap-2 border-t"><input className="inp" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(text)} placeholder="Ask about shoes..."/><button className="btn !px-3" onClick={()=>send(text)}><Send size={16}/></button></div></div>}
 <button aria-label="Open assistant" onClick={()=>setOpen(!open)} className="fixed bottom-6 right-4 z-50 bg-ink text-white rounded-full p-4 shadow-xl hover:scale-105 transition"><MessageCircle/></button></>}
export default function Layout(){const {cart,wishlist,user,toasts}=useStore();const [menu,setMenu]=useState(false);const [q,setQ]=useState('');const nav=useNavigate()
 return <div className="min-h-screen flex flex-col">
 <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-beige"><div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
  <Link to="/" className="font-display text-2xl font-bold tracking-tight">SoleStyle</Link>
  <nav className="hidden md:flex gap-6 text-sm font-medium">{links.map(([n,t])=><NavLink key={n} to={t} className="hover:underline">{n}</NavLink>)}</nav>
  <form onSubmit={e=>{e.preventDefault();nav('/shop?q='+encodeURIComponent(q))}} className="hidden lg:flex items-center bg-white rounded-full px-3 w-56"><Search size={16}/><input className="p-2 w-full bg-transparent outline-none text-sm" placeholder="Search shoes" value={q} onChange={e=>setQ(e.target.value)}/></form>
  <div className="flex items-center gap-4"><Link to="/wishlist" className="relative"><Heart/>{wishlist.length>0&&<b className="absolute -top-2 -right-2 text-[10px] bg-ink text-white rounded-full w-4 h-4 grid place-items-center">{wishlist.length}</b>}</Link>
  <Link to="/cart" className="relative"><ShoppingBag/>{cart.length>0&&<b className="absolute -top-2 -right-2 text-[10px] bg-ink text-white rounded-full w-4 h-4 grid place-items-center">{cart.length}</b>}</Link>
  <Link to={user?'/admin':'/login'} title={user?user.name:'Login'}><User/></Link><button className="md:hidden" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></div>
  {menu&&<div className="md:hidden px-4 pb-4 flex flex-col gap-3">{links.map(([n,t])=><Link key={n} to={t} onClick={()=>setMenu(false)}>{n}</Link>)}<Link to="/admin" onClick={()=>setMenu(false)}>Admin</Link></div>}</header>
 <main className="flex-1"><Outlet/></main>
 <footer className="bg-ink text-neutral-300 mt-10"><div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-6 text-sm"><div><b className="font-display text-2xl text-white">SoleStyle</b><p className="mt-2">Premium footwear for men, women and kids.</p></div>
 <div className="space-y-1"><b className="text-white">Shop</b>{links.slice(1).map(([n,t])=><Link key={n} className="block" to={t}>{n}</Link>)}</div><div className="space-y-1"><b className="text-white">Account</b><Link className="block" to="/login">Login</Link><Link className="block" to="/wishlist">Wishlist</Link><Link className="block" to="/admin">Admin demo</Link></div></div><p className="text-center text-xs pb-6">© 2026 SoleStyle. Demo frontend.</p></footer>
 <Chatbot/><div className="fixed top-20 right-4 z-[60] space-y-2">{toasts.map(t=><div key={t.id} className={`px-4 py-2 rounded-lg text-white shadow ${t.type==='err'?'bg-red-600':'bg-ink'}`}>{t.msg}</div>)}</div></div>}
