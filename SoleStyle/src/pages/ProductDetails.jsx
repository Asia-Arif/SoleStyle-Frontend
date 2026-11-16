import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useStore, pkr } from '../store'
import { Grid, Section, Stars } from '../components/common'
import { COLORS } from '../data/products'
export default function ProductDetails(){const {id}=useParams();const {products,addToCart,toggleWish,wishlist,toast}=useStore()
 const p=products.find(x=>x.id===+id);const [img,setImg]=useState(0);const [size,setSize]=useState('');const [color,setColor]=useState('');const [qty,setQty]=useState(1);const [guide,setGuide]=useState(false)
 if(!p)return <div className="p-20 text-center">Product not found. <Link className="underline" to="/shop">Back to shop</Link></div>
 const add=()=>{if(!size||!color)return toast('Please select size and color','err');if(p.stock<1)return toast('Out of stock','err');addToCart(p.id,size,color,qty)}
 const similar=products.filter(x=>x.category===p.category&&x.id!==p.id).slice(0,4);const rec=products.filter(x=>x.type===p.type&&x.id!==p.id).slice(0,4)
 return <div><div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
 <div><img src={p.images[img]} alt={p.name} className="rounded-2xl w-full"/><div className="flex gap-3 mt-3">{p.images.map((im,i)=><img key={i} src={im} onClick={()=>setImg(i)} className={`w-20 rounded-lg cursor-pointer border-2 ${img===i?'border-ink':'border-transparent'}`} alt=""/>)}</div></div>
 <div><p className="uppercase text-xs tracking-widest text-neutral-500">{p.brand}</p><h1 className="font-display text-4xl mt-1">{p.name}</h1><div className="mt-2 flex gap-3 items-center"><Stars r={p.rating}/><span className="text-sm text-neutral-500">{p.reviews} reviews</span></div>
 <p className="text-2xl mt-4 font-bold">{pkr(p.price)} {p.discount>0&&<><s className="text-base font-normal text-neutral-400">{pkr(p.originalPrice)}</s><span className="ml-2 text-sm bg-ink text-white px-2 py-1 rounded-full">-{p.discount}%</span></>}</p>
 <p className="mt-4 text-neutral-600">{p.description}</p>
 <p className="mt-6 font-semibold">Color {color&&`: ${color}`}</p><div className="flex gap-2 mt-2">{p.colors.map(c=><button key={c} title={c} onClick={()=>setColor(c)} style={{background:COLORS[c]}} className={`w-9 h-9 rounded-full border-2 ${color===c?'ring-2 ring-ink ring-offset-2':'border-neutral-300'}`}/>)}</div>
 <div className="flex justify-between mt-6"><b>Size</b><button className="underline text-sm" onClick={()=>setGuide(true)}>Size guide</button></div><div className="flex flex-wrap gap-2 mt-2">{p.sizes.map(s=><button key={s} onClick={()=>setSize(s)} className={`px-4 py-2 rounded-lg border ${size===s?'bg-ink text-white':'bg-white'}`}>{s}</button>)}</div>
 <p className={`mt-4 text-sm ${p.stock>0?'text-green-700':'text-red-600'}`}>{p.stock>0?`In stock (${p.stock} left)`:'Out of stock'}</p>
 <div className="flex gap-3 mt-6 items-center"><div className="flex items-center bg-white rounded-full"><button className="w-10 h-10" onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span className="w-8 text-center">{qty}</span><button className="w-10 h-10" onClick={()=>setQty(Math.min(Math.max(p.stock,1),qty+1))}>+</button></div>
 <button className="btn flex-1" onClick={add}>Add to Cart</button><button className="btn-o !px-4" aria-label="wishlist" onClick={()=>toggleWish(p.id)}><Heart className={wishlist.includes(p.id)?'fill-red-600 text-red-600':''}/></button></div></div></div>
 <Section title="Reviews"><div className="grid md:grid-cols-2 gap-4">{[['Hamza M.',5,'Perfect fit and premium feel.'],['Zainab F.',4,'Looks great, runs slightly narrow.']].map(([n,r,t])=><div key={n} className="bg-white p-5 rounded-2xl"><b>{n}</b> <Stars r={r}/><p className="mt-2 text-sm">{t}</p></div>)}</div></Section>
 <Section title="Similar Products"><Grid items={similar}/></Section><Section title="Recommended for You"><Grid items={rec}/></Section>
 {guide&&<div className="fixed inset-0 bg-black/50 grid place-items-center z-50 p-4" onClick={()=>setGuide(false)}><div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={e=>e.stopPropagation()}><h3 className="font-display text-2xl mb-3">Size Guide</h3>
 <table className="w-full text-sm"><thead><tr className="text-left"><th>EU</th><th>UK</th><th>Foot (cm)</th></tr></thead><tbody>{[[39,6,24.5],[40,7,25.2],[41,8,26],[42,8.5,26.7],[43,9.5,27.5],[44,10,28.2]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className="py-1">{c}</td>)}</tr>)}</tbody></table><button className="btn mt-4 w-full" onClick={()=>setGuide(false)}>Close</button></div></div>}</div>}
