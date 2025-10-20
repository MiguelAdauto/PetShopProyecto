import './Paginacion.css';



interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onPaginaChange: (nuevaPagina: number) => void;
  tipo?: "vendedor" | "admin";
}

const Paginacion = ({ paginaActual, totalPaginas, onPaginaChange, tipo = "vendedor", }: PaginacionProps) => {
const claseRol = tipo === "admin" ? "btn-admin" : "btn-vendedor";
  return (
    <div className="paginacion">
      <button
        className={`btn-paginacion ${claseRol}`}
        onClick={() => onPaginaChange(paginaActual - 1)}
        disabled={paginaActual === 1}
        >
        <i className="bi bi-caret-left-square-fill" style={{ marginRight: "6px" }}></i> Anterior
      </button>

      <span style={{ margin: "0 10px" }}>Página {paginaActual} de {totalPaginas}</span>

      <button
        className={`btn-paginacion ${claseRol}`}
        onClick={() => onPaginaChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente <i className="bi bi-caret-right-square-fill" style={{ marginLeft: "6px" }}></i>
      </button>
    </div>
  );
};

export default Paginacion;