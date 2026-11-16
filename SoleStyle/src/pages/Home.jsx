import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { Grid, Section } from '../components/common'
import { svg } from '../data/products'
export default function Home(){const {products,toast}=useStore();const [pref,setPref]=useState({category:'Men',budget:10000,type:'Running'});const [rec,setRec]=useState(null);const [email,setEmail]=useState('')
 const top=(f,s)=>products.filter(f).sort(s).slice(0,4)
 return <div>
 <section className="bg-beige"><div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center"><div><p className="uppercase tracking-[.3em] text-sm">New season</p>
 <h1 className="font-display text-5xl md:text-7xl leading-tight mt-3">Step into<br/>refined comfort.</h1><p className="mt-4 text-neutral-600 max-w-md">Premium footwear for men, women and kids, crafted for every stride.</p>
 <Link to="/shop" className="btn mt-8">Shop Now</Link></div><img src={svg('#161616')} alt="Hero shoe" className="rounded-3xl shadow-2xl hover:rotate-1 transition duration-500"/></div></section>
 <Section title="Shop by collection"><div className="grid sm:grid-cols-3 gap-4">{['Men','Women','Kids'].map(c=><Link key={c} to={`/shop?cat=${c}`} className="relative rounded-2xl overflow-hidden group"><img src={svg({Men:'#1f2a44',Women:'#d8c6a0',Kids:'#b3202a'}[c])} className="group-hover:scale-105 transition duration-500" alt={c}/><span className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full font-semibold">{c}'s Collection</span></Link>)}</div></Section>
 <Section title="New Arrivals" link="/shop?sort=newest"><Grid items={top(()=>true,(a,b)=>b.createdAt-a.createdAt)}/></Section>
 <Section title="Best Sellers" link="/shop?sort=popular"><Grid items={top(()=>true,(a,b)=>b.sold-a.sold)}/></Section>
 <Section title="Special Offers" link="/shop?sort=popular"><Grid items={top(p=>p.discount>=18,(a,b)=>b.discount-a.discount)}/></Section>
 <Section title="AI Recommended for You"><div className="bg-white rounded-2xl p-6"><p className="text-xs text-neutral-500 mb-3">Demo recommendations based on your selections. No real AI is used.</p>
 <div className="grid sm:grid-cols-4 gap-3"><select className="inp" value={pref.category} onChange={e=>setPref({...pref,category:e.target.value})}>{['Men','Women','Kids'].map(x=><option key={x}>{x}</option>)}</select>
 <select className="inp" value={pref.type} onChange={e=>setPref({...pref,type:e.target.value})}>{['Running','Sneakers','Sports','Casual','Formal'].map(x=><option key={x}>{x}</option>)}</select>
 <select className="inp" value={pref.budget} onChange={e=>setPref({...pref,budget:+e.target.value})}>{[5000,10000,20000].map(x=><option key={x} value={x}>Under Rs. {x}</option>)}</select>
 <button className="btn" onClick={()=>setRec(products.filter(p=>p.category===pref.category&&p.type===pref.type&&p.price<=pref.budget))}>Get Recommendations</button></div>
 {rec&&<div className="mt-6">{rec.length?<Grid items={rec}/>:<p>No exact matches. Try a higher budget.</p>}</div>}</div></Section>
 <Section title="What customers say"><div className="grid md:grid-cols-3 gap-4">{[['Ayesha K.','Incredibly comfortable and elegant.'],['Ali R.','Great quality, fast delivery.'],['Sara A.','My kids love their new sneakers.']].map(([n,t])=><div key={n} className="bg-white p-6 rounded-2xl"><p>“{t}”</p><b className="block mt-3">{n}</b></div>)}</div></Section>
 <section className="bg-ink text-white py-14 text-center px-4"><h2 className="font-display text-3xl">Join the SoleStyle list</h2><form className="mt-6 flex gap-2 justify-center max-w-md mx-auto" onSubmit={e=>{e.preventDefault();/\S+@\S+\.\S+/.test(email)?(toast('Subscribed!'),setEmail('')):toast('Enter a valid email','err')}}>
 <input className="inp !text-ink" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)}/><button className="btn !bg-white !text-ink">Subscribe</button></form></section></div>}
