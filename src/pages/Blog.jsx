import { Link } from "react-router-dom";
import { leerBlogs } from "../data/blogs.js";

export default function Blog() {
  const blogs = leerBlogs();

  return (
    <div className="container py-4">
      <h1 className="mb-4">Blog</h1>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {blogs.map((blog) => (
          <div className="col" key={blog.id}>
            <div className="card h-100 bg-dark text-light border-secondary">
              <img
                src={blog.imagen}
                className="card-img-top"
                alt={blog.titulo}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h2 className="h5 card-title">{blog.titulo}</h2>
                <p className="text-secondary small mb-2">
                  {new Date(blog.fecha).toLocaleDateString("es-CL")} · {blog.autor}
                </p>
                <p className="card-text">{blog.resumen}</p>
                <Link to={`/blog/${blog.id}`} className="btn btn-outline-light btn-sm mt-auto align-self-start">
                  Leer artículo
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
