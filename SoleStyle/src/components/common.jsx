import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { useStore, pkr } from '../store'
export const Stars=({r})=><span className="inline-flex items-center gap-1 text-sm"><Star size={14} className="fill-amber-500 text-amber-500"/>{r}</span>
export function ProductCard({p}){const {wishlist,toggleWish}=useStore()
 return <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
  <div className="relative overflow-hidden"><Link to={`/product/${p.id}`}><img src={p.images[0]} alt={p.name} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"/></Link>
  {p.discount>0&&<span className="absolute top-3 left-3 bg-ink text-white text-xs px-3 py-1 rounded-full">-{p.discount}%</span>}
  <button aria-label="wishlist" onClick={()=>toggleWish(p.id)} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"><Heart size={18} className={wishlist.includes(p.id)?'fill-red-600 text-red-600':''}/></button></div>
  <div className="p-4"><p className="text-xs uppercase tracking-widest text-neutral-500">{p.brand} · {p.category}</p>
  <Link to={`/product/${p.id}`} className="font-semibold block mt-1">{p.name}</Link>
  <div className="flex justify-between items-center mt-2"><span><b>{pkr(p.price)}</b>{p.discount>0&&<s className="ml-2 text-sm text-neutral-400">{pkr(p.originalPrice)}</s>}</span><Stars r={p.rating}/></div></div></div>}
export const Grid=({items})=><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">{items.map(p=><ProductCard key={p.id} p={p}/>)}</div>
export const Section=({title,link,children})=><section className="max-w-7xl mx-auto px-4 py-10"><div className="flex justify-between items-end mb-6"><h2 className="font-display text-3xl">{title}</h2>{link&&<Link to={link} className="underline text-sm">View all</Link>}</div>{children}</section>
