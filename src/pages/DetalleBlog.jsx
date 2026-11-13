import { Link, useParams } from "react-router-dom";
import { obtenerBlog } from "../data/blogs.js";

export default function DetalleBlog() {
  // useParams lee el :id de la URL (/blog/2 => id = "2")
  const { id } = useParams();
  const blog = obtenerBlog(id);

  if (!blog) {
    return (
      <div className="container py-4">
        <h1>Artículo no encontrado</h1>
        <p className="text-secondary">No existe un artículo con ese id.</p>
        <Link to="/blog" className="btn btn-primary">
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <article className="mx-auto" style={{ maxWidth: "760px" }}>
        <Link to="/blog" className="btn btn-outline-light btn-sm mb-3">
          ← Volver al blog
        </Link>
        <h1 className="mb-2">{blog.titulo}</h1>
        <p className="text-secondary">
          {new Date(blog.fecha).toLocaleDateString("es-CL")} · {blog.autor}
        </p>
        <img src={blog.imagen} alt={blog.titulo} className="img-fluid rounded mb-3" />
        {blog.contenido.map((parrafo, indice) => (
          <p key={indice}>{parrafo}</p>
        ))}
      </article>
    </div>
  );
}
