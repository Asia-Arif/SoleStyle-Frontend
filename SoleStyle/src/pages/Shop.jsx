import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../store'
import { Grid } from '../components/common'
import { COLORS } from '../data/products'
const PER=9
export default function Shop(){const {products}=useStore();const [sp]=useSearchParams()
 const [f,setF]=useState({q:sp.get('q')||'',cat:sp.get('cat')||'',type:'',brand:'',size:'',color:'',max:25000,sort:sp.get('sort')||'popular'});const [page,setPage]=useState(1)
 const set=(k,v)=>{setF(x=>({...x,[k]:v}));setPage(1)}
 const list=useMemo(()=>{let r=products.filter(p=>(!f.q||(p.name+p.brand).toLowerCase().includes(f.q.toLowerCase()))&&(!f.cat||p.category===f.cat)&&(!f.type||p.type===f.type)&&(!f.brand||p.brand===f.brand)&&(!f.size||p.sizes.includes(+f.size))&&(!f.color||p.colors.includes(f.color))&&p.price<=f.max)
  const s={'price-asc':(a,b)=>a.price-b.price,'price-desc':(a,b)=>b.price-a.price,newest:(a,b)=>b.createdAt-a.createdAt,popular:(a,b)=>b.sold-a.sold}[f.sort];return [...r].sort(s)},[products,f])
 const pages=Math.max(1,Math.ceil(list.length/PER))
 const Sel=({k,label,opts})=><select className="inp" value={f[k]} onChange={e=>set(k,e.target.value)}><option value="">{label}</option>{opts.map(o=><option key={o}>{o}</option>)}</select>
 return <div className="max-w-7xl mx-auto px-4 py-8"><h1 className="font-display text-4xl mb-6">Shop</h1>
 <div className="bg-white rounded-2xl p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
 <input className="inp" placeholder="Search..." value={f.q} onChange={e=>set('q',e.target.value)}/>
 <Sel k="cat" label="All categories" opts={['Men','Women','Kids']}/><Sel k="type" label="All types" opts={['Running','Sneakers','Sports','Casual','Formal']}/>
 <Sel k="brand" label="All brands" opts={['Nike','Adidas','Puma','Bata','Servis','SoleStyle']}/><Sel k="size" label="Any size" opts={[28,30,32,34,39,40,41,42,43,44]}/><Sel k="color" label="Any color" opts={Object.keys(COLORS)}/>
 <label className="text-sm">Max price: Rs. {f.max}<input type="range" min="3000" max="25000" step="500" value={f.max} onChange={e=>set('max',+e.target.value)} className="w-full"/></label>
 <select className="inp" value={f.sort} onChange={e=>set('sort',e.target.value)}><option value="popular">Popularity</option><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div>
 {list.length?<Grid items={list.slice((page-1)*PER,page*PER)}/>:<p className="text-center py-20">No shoes match your filters.</p>}
 <div className="flex justify-center gap-2 mt-8">{Array.from({length:pages},(_,i)=><button key={i} onClick={()=>setPage(i+1)} className={`w-10 h-10 rounded-full ${page===i+1?'bg-ink text-white':'bg-white'}`}>{i+1}</button>)}</div></div>}
