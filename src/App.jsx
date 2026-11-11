import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Categorias from "./pages/Categorias.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Blog from "./pages/Blog.jsx";
import DetalleBlog from "./pages/DetalleBlog.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Carrito from "./pages/Carrito.jsx";
import Checkout from "./pages/Checkout.jsx";
import PagoCorrecto from "./pages/PagoCorrecto.jsx";
import PagoError from "./pages/PagoError.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminProductos from "./pages/admin/AdminProductos.jsx";
import ProductoForm from "./pages/admin/ProductoForm.jsx";
import AdminUsuarios from "./pages/admin/AdminUsuarios.jsx";
import AdminOrdenes from "./pages/admin/AdminOrdenes.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pago-correcto" element={<PagoCorrecto />} />
          <Route path="/pago-error" element={<PagoError />} />

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/productos/nuevo" element={<ProductoForm />} />
          <Route path="/admin/productos/:id/editar" element={<ProductoForm />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/ordenes" element={<AdminOrdenes />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
