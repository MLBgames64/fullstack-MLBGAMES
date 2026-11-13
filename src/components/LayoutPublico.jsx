import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// Marco de la tienda: Header arriba, la página que toque en medio y Footer abajo.
// <Outlet /> es el "hueco" donde React Router dibuja la página de la ruta actual.
export default function LayoutPublico() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
