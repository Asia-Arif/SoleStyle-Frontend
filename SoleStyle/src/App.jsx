import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import { Cart, Checkout, Confirmation, Wishlist, Auth } from './pages/Flow'
import AdminLayout, { Dashboard, Products, Orders, Inventory, Coupons, Insights } from './admin/Admin'
export default function App(){return <Routes>
 <Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/product/:id" element={<ProductDetails/>}/>
 <Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/order-confirmation/:id" element={<Confirmation/>}/>
 <Route path="/wishlist" element={<Wishlist/>}/><Route path="/login" element={<Auth mode="login"/>}/><Route path="/signup" element={<Auth mode="signup"/>}/><Route path="*" element={<Home/>}/></Route>
 <Route path="/admin" element={<AdminLayout/>}><Route index element={<Dashboard/>}/><Route path="products" element={<Products/>}/><Route path="orders" element={<Orders/>}/>
 <Route path="inventory" element={<Inventory/>}/><Route path="coupons" element={<Coupons/>}/><Route path="insights" element={<Insights/>}/></Route></Routes>}
