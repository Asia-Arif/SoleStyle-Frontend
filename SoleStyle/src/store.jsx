import { createContext, useContext, useState, useEffect } from 'react'
import seed from './data/products'
const Ctx=createContext()
export const useStore=()=>useContext(Ctx)
const useLS=(k,d)=>{const [v,s]=useState(()=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}});useEffect(()=>localStorage.setItem(k,JSON.stringify(v)),[k,v]);return [v,s]}
const demoOrders=['Ayesha Khan','Ali Raza','Sara Ahmed','Usman Tariq','Hina Malik'].map((n,i)=>({id:'SS-100'+i,customer:n,email:n.split(' ')[0].toLowerCase()+'@mail.com',city:['Karachi','Lahore','Islamabad'][i%3],total:9000+i*4300,status:['Pending','Shipped','Delivered','Processing','Delivered'][i],date:`2026-11-${10+i}`}))
export function StoreProvider({children}){
 const [products,setProducts]=useLS('ss_products',seed)
 const [cart,setCart]=useLS('ss_cart',[])
 const [wishlist,setWishlist]=useLS('ss_wish',[])
 const [orders,setOrders]=useLS('ss_orders',demoOrders)
 const [coupons,setCoupons]=useLS('ss_coupons',[{code:'SOLE10',pct:10},{code:'WELCOME20',pct:20}])
 const [coupon,setCoupon]=useLS('ss_coupon',null)
 const [user,setUser]=useLS('ss_user',null)
 const [toasts,setToasts]=useState([])
 const toast=(msg,type='ok')=>{const id=Math.random();setToasts(t=>[...t,{id,msg,type}]);setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2500)}
 const addToCart=(id,size,color,qty=1)=>{const key=`${id}-${size}-${color}`
  setCart(c=>c.find(i=>i.key===key)?c.map(i=>i.key===key?{...i,qty:i.qty+qty}:i):[...c,{key,id,size,color,qty}]);toast('Added to cart')}
 const setQty=(key,q)=>setCart(c=>c.map(i=>i.key===key?{...i,qty:Math.max(1,q)}:i))
 const removeItem=key=>{setCart(c=>c.filter(i=>i.key!==key));toast('Item removed')}
 const toggleWish=id=>{setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);toast(wishlist.includes(id)?'Removed from wishlist':'Saved to wishlist')}
 const lines=cart.map(i=>({...i,p:products.find(p=>p.id===i.id)})).filter(l=>l.p)
 const subtotal=lines.reduce((s,l)=>s+l.p.price*l.qty,0)
 const discount=coupon?Math.round(subtotal*coupon.pct/100):0
 const delivery=subtotal===0||subtotal>=15000?0:250
 const total=subtotal-discount+delivery
 const applyCoupon=code=>{const c=coupons.find(x=>x.code===code.trim().toUpperCase());if(c){setCoupon(c);toast(`Coupon ${c.code} applied`)}else toast('Invalid coupon','err')}
 return <Ctx.Provider value={{products,setProducts,cart,setCart,wishlist,toggleWish,orders,setOrders,coupons,setCoupons,coupon,setCoupon,user,setUser,toast,toasts,addToCart,setQty,removeItem,lines,subtotal,discount,delivery,total,applyCoupon}}>{children}</Ctx.Provider>
}
export const pkr=n=>'Rs. '+Number(n).toLocaleString('en-PK')
